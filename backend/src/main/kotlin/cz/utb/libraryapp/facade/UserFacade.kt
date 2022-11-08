package cz.utb.libraryapp.facade

import cz.utb.libraryapp.model.RoleEnum
import cz.utb.libraryapp.model.entity.CustomUserDetails
import cz.utb.libraryapp.model.request.EditUserRequestBean
import cz.utb.libraryapp.model.request.RegisterRequestBean
import cz.utb.libraryapp.model.response.UserResponseBean
import cz.utb.libraryapp.repository.BorrowedCurrentlyRepository
import cz.utb.libraryapp.repository.UserDetailsRepository
import org.bson.types.ObjectId
import org.springframework.http.HttpStatus
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException

interface UserFacade {
    fun getAllUsers(): List<CustomUserDetails>
    fun getPendingUsers(): List<CustomUserDetails>
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
    override fun getAllUsers(): List<CustomUserDetails> {
        return userDetailsRepository.findAll()
    }

    override fun getPendingUsers(): List<CustomUserDetails> {
        val pendingUsers = userDetailsRepository.findAllByReviewed(false)
        val currentlyBorrowed = currentlyRepository //TODO: count borrowed documents with userId

//        val users = pendingUsers.map {
//            pendingUsers.map {
//                UserResponseBean(
//                    it.id,
//                    it.username,
//                    it.firstname,
//                    it.lastname,
//                    it.birthNumber,
//                    it.address,
//                    it.isAdmin,
//                    it.isBanned,
//                    it.isReviewed,
//                    currentlyBorrowed
//                )
//            }
//        }
        return emptyList()
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
            isReviewed = false,
            numberOfBorrowedBooks = 0
        )

        return userDetailsRepository.insert(customDetails).id
    }

    override fun editUser(userId: ObjectId, editUserRequest: EditUserRequestBean) {
        TODO("Not yet implemented")
    }

    override fun reviewUser(userId: ObjectId) {
        TODO("Not yet implemented")
    }

    override fun banUser(userId: ObjectId) {
        TODO("Not yet implemented")
    }

    override fun unbanUser(userId: ObjectId) {
        TODO("Not yet implemented")
    }

    override fun promoteUser(userId: ObjectId) {
        TODO("Not yet implemented")
    }

    override fun demoteUser(userId: ObjectId) {
        TODO("Not yet implemented")
    }

}