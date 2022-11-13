package cz.utb.libraryapp.facade

import com.google.common.base.CaseFormat
import cz.utb.libraryapp.model.RoleEnum
import cz.utb.libraryapp.model.entity.CustomUserDetails
import cz.utb.libraryapp.model.request.BookSearchParams
import cz.utb.libraryapp.model.request.EditUserRequestBean
import cz.utb.libraryapp.model.request.OrderByType
import cz.utb.libraryapp.model.request.RegisterRequestBean
import cz.utb.libraryapp.model.request.UserSearchParams
import cz.utb.libraryapp.model.response.UserResponseBean
import cz.utb.libraryapp.repository.BorrowedCurrentlyRepository
import cz.utb.libraryapp.repository.UserDetailsRepository
import org.bson.types.ObjectId
import org.springframework.data.domain.Sort
import org.springframework.http.HttpStatus
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException

interface UserFacade {
    fun getAllUsers(searchParams: UserSearchParams): List<UserResponseBean>
    fun getCurrentUserInfo(): UserResponseBean
    fun getPendingUsers(): List<UserResponseBean>
    fun registerUser(registerRequest: RegisterRequestBean): ObjectId
    fun editUser(userId: ObjectId, editUserRequest: EditUserRequestBean)
    fun reviewUser(userId: ObjectId)
    fun banUser(userId: ObjectId)
    fun unbanUser(userId: ObjectId)
    fun promoteUser(userId: ObjectId)
    fun demoteUser(userId: ObjectId)
}

@Service
class UserFacadeImpl(
    val userDetailsRepository: UserDetailsRepository,
    val currentlyRepository: BorrowedCurrentlyRepository,
    val bCryptPasswordEncoder: BCryptPasswordEncoder
): UserFacade {

    private fun getSearchQueryString(searchParams: UserSearchParams): String {
        val userSearchQuery = StringBuilder()
        userSearchQuery.append("{")
        if (searchParams.filterType != null) {
            if (searchParams.firstname != null || searchParams.lastname != null || searchParams.address != null || searchParams.birthNumber != null) {
                userSearchQuery.append("\$${searchParams.filterType.name.lowercase()}:[")

                if (!searchParams.firstname.isNullOrBlank()) {
                    userSearchQuery.append("{firstname:/.*${searchParams.firstname}.*/},")
                }

                if (!searchParams.lastname.isNullOrBlank()) {
                    userSearchQuery.append("{lastname:/.*${searchParams.lastname}.*/},")
                }

                if (searchParams.address != null) {
                    userSearchQuery.append("{address:/.*${searchParams.address}.*/},")
                }

                if (searchParams.birthNumber != null) {
                    userSearchQuery.append("{birthNumber:/.*${searchParams.birthNumber}.*/},")
                }

                userSearchQuery.append("]")
            }
        }
        userSearchQuery.append("}")
        return userSearchQuery.toString()
    }

    private fun getSort(searchParams: UserSearchParams): Sort {
        if (searchParams.orderBy == null && searchParams.orderByType == null) {
            return Sort.unsorted()
        }

        return Sort.by(
            if (searchParams.orderByType == OrderByType.ASC) {
                Sort.Direction.ASC} else {
                Sort.Direction.DESC},
            CaseFormat.UPPER_UNDERSCORE.to(CaseFormat.LOWER_CAMEL, searchParams.orderBy!!.name)
        )
    }

    override fun getAllUsers(searchParams: UserSearchParams): List<UserResponseBean> {
        val searchQuery = getSearchQueryString(searchParams)
        val sortQuery = getSort(searchParams)
        val usersFromDb = userDetailsRepository.searchAllAndSort(searchQuery, sortQuery)
        val userIdBorrows = currentlyRepository.groupByUserId(usersFromDb.map { it.id.toString() })
        return usersFromDb.map {
            UserResponseBean(
                it.id,
                it.username,
                it.firstname,
                it.lastname,
                it.birthNumber,
                it.address,
                it.isAdmin,
                it.isBanned,
                it.isReviewed,
                userIdBorrows.firstOrNull { userIdBorrowCount -> userIdBorrowCount.id == it.id.toString() }?.count ?: 0
            )
        }
    }

    override fun getCurrentUserInfo(): UserResponseBean {
        val auth = (SecurityContextHolder.getContext()?.authentication?.principal as CustomUserDetails?) ?: throw ResponseStatusException(HttpStatus.UNAUTHORIZED, "User is not logged in")
        val userIdBorrows = currentlyRepository.groupByUserId(listOf(auth.id.toString()))
        return UserResponseBean(
            auth.id,
            auth.username,
            auth.firstname,
            auth.lastname,
            auth.birthNumber,
            auth.address,
            auth.isAdmin,
            auth.isBanned,
            auth.isReviewed,
            userIdBorrows.firstOrNull { userIdBorrowCount -> userIdBorrowCount.id == auth.id.toString() }?.count ?: 0
        )
    }

    override fun getPendingUsers(): List<UserResponseBean> {
        val pendingUsers = userDetailsRepository.findAllByIsReviewed(false)
        val userIdBorrows = currentlyRepository.groupByUserId(pendingUsers.map { it.id.toString() })

        return pendingUsers.map {
            UserResponseBean(
                it.id,
                it.username,
                it.firstname,
                it.lastname,
                it.birthNumber,
                it.address,
                it.isAdmin,
                it.isBanned,
                it.isReviewed,
                userIdBorrows.firstOrNull { userIdBorrowCount -> userIdBorrowCount.id == it.id.toString() }?.count ?: 0
            )
        }
    }

    override fun registerUser(registerRequest: RegisterRequestBean): ObjectId {
        if (registerRequest.password != registerRequest.repeatedPassword) {
            throw ResponseStatusException(HttpStatus.BAD_REQUEST, "Passwords are not matching")
        }

        val userInDb = userDetailsRepository.findCustomUserDetailsByUsername(registerRequest.username)
        if (userInDb != null) {
            throw ResponseStatusException(HttpStatus.CONFLICT, "User ${registerRequest.username} exists already")
        }

        val customDetails = CustomUserDetails(
            registerRequest.username,
            bCryptPasswordEncoder.encode(registerRequest.password),
            enabled = true,
            accountNonExpired = true,
            credentialsNonExpired = true,
            accountNonLocked = true,
            authorities = listOf(SimpleGrantedAuthority(RoleEnum.USER.name)),
            registerRequest.firstname,
            registerRequest.lastname,
            registerRequest.birthNumber,
            registerRequest.address,
            isAdmin = false,
            isBanned = false,
            isReviewed = false
        )

        return userDetailsRepository.insert(customDetails).id
    }

    override fun editUser(userId: ObjectId, editUserRequest: EditUserRequestBean) {
        userDetailsRepository.save(CustomUserDetails(
            editUserRequest.username,
            editUserRequest.password,
            enabled = true,
            accountNonExpired = true,
            credentialsNonExpired = true,
            accountNonLocked = true,
            authorities = listOf(SimpleGrantedAuthority(RoleEnum.USER.name)),
            editUserRequest.firstname,
            editUserRequest.lastname,
            editUserRequest.birthNumber,
            editUserRequest.address,
            isAdmin = false,
            isBanned = false,
            isReviewed = false,
            userId
        ))
    }

    override fun reviewUser(userId: ObjectId) {
        userDetailsRepository.findAndSetIsReviewedById(userId, true)
    }

    override fun banUser(userId: ObjectId) {
        userDetailsRepository.findAndSetIsBannedById(userId, true)
    }

    override fun unbanUser(userId: ObjectId) {
        userDetailsRepository.findAndSetIsBannedById(userId, false)
    }

    override fun promoteUser(userId: ObjectId) {
        userDetailsRepository.findAndSetIsAdminById(userId, true)
    }

    override fun demoteUser(userId: ObjectId) {
        userDetailsRepository.findAndSetIsAdminById(userId, false)
    }

}