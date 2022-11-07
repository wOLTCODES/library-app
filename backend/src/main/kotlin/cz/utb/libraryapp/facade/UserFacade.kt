package cz.utb.libraryapp.facade

import cz.utb.libraryapp.model.entity.CustomUserDetails
import cz.utb.libraryapp.model.request.EditUserRequestBean
import cz.utb.libraryapp.model.request.RegisterRequestBean
import cz.utb.libraryapp.repository.UserDetailsRepository
import org.bson.types.ObjectId
import org.springframework.http.HttpStatus
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException

interface UserFacade {
    fun registerUser(registerRequest: RegisterRequestBean): ObjectId
    fun editUser(userId: ObjectId, editUserRequest: EditUserRequestBean)
    fun reviewUser(userId: ObjectId)
    fun banUser(userId: ObjectId)
    fun unbanUser(userId: ObjectId)
    fun promoteUser(userId: ObjectId)
    fun demoteUser(userId: ObjectId)
}

@Service
class UserFacadeImpl(val userDetailsRepository: UserDetailsRepository, val bCryptPasswordEncoder: BCryptPasswordEncoder): UserFacade {
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
            authorities = listOf(SimpleGrantedAuthority("USER")),
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