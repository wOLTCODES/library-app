package cz.utb.libraryapp.controller

import cz.utb.libraryapp.facade.UserFacade
import cz.utb.libraryapp.model.entity.CustomUserDetails
import cz.utb.libraryapp.model.request.BookSearchParams
import cz.utb.libraryapp.model.request.EditUserRequestBean
import cz.utb.libraryapp.model.request.RegisterRequestBean
import cz.utb.libraryapp.model.request.UserSearchParams
import cz.utb.libraryapp.model.response.NumberOfPendingUsersResponseBean
import cz.utb.libraryapp.model.response.ObjectIdResponse
import cz.utb.libraryapp.model.response.UserResponseBean
import cz.utb.libraryapp.repository.UserDetailsRepository
import javax.servlet.http.HttpServletResponse
import javax.websocket.server.PathParam
import org.bson.types.ObjectId
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.authority.SimpleGrantedAuthority
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.util.LinkedMultiValueMap
import org.springframework.util.MultiValueMap
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.springframework.web.server.ResponseStatusException

@RestController
@RequestMapping("/user")
class UserController(val userFacade: UserFacade) {

    @GetMapping("/login-redirect")
    fun loginRedirect(servletResponse: HttpServletResponse): ResponseEntity<Unit> {
        return ResponseEntity(
            LinkedMultiValueMap(mutableMapOf(
                "Location" to mutableListOf("")
            )),
            HttpStatus.UNAUTHORIZED
        )
    }

    @GetMapping
    fun getAllUsers(searchParams: UserSearchParams): ResponseEntity<List<UserResponseBean>> {
        val users = userFacade.getAllUsers(searchParams)
        return ResponseEntity(users, HttpStatus.OK)
    }

    @GetMapping("/current-user")
    fun getCurrentUserInfo(): ResponseEntity<UserResponseBean> {
        val currentUser = userFacade.getCurrentUserInfo()
        return ResponseEntity(currentUser, HttpStatus.OK)
    }

    @GetMapping("/pending")
    fun getPendingUsers(): ResponseEntity<List<UserResponseBean>> {
        val pendingUsers = userFacade.getPendingUsers()
        return ResponseEntity(pendingUsers, HttpStatus.OK)
    }

    @GetMapping("/pending/number")
    fun getNumberOfPendingUsers(): ResponseEntity<NumberOfPendingUsersResponseBean> {
        val pendingUsers = userFacade.getPendingUsers()
        return ResponseEntity(NumberOfPendingUsersResponseBean(pendingUsers.count()), HttpStatus.OK)
    }

    @PostMapping("/register")
    fun registerUser(@RequestBody registerRequest: RegisterRequestBean): ResponseEntity<ObjectIdResponse> {
        val insertedId = userFacade.registerUser(registerRequest)
        return ResponseEntity(ObjectIdResponse(insertedId), HttpStatus.OK)
    }

    @PostMapping("/edit/{userId}")
    fun editUser(@PathVariable userId: ObjectId, @RequestBody editUserRequestBean: EditUserRequestBean): ResponseEntity<Unit> {
        userFacade.editUser(userId, editUserRequestBean)
        return ResponseEntity(HttpStatus.OK)
    }

    @PostMapping("/review/{userId}")
    fun reviewUser(@PathVariable userId: ObjectId): ResponseEntity<Unit> {
        userFacade.reviewUser(userId)
        return ResponseEntity(HttpStatus.OK)
    }

    @PostMapping("/ban/{userId}")
    fun banUser(@PathVariable userId: ObjectId): ResponseEntity<Unit> {
        userFacade.banUser(userId)
        return ResponseEntity(HttpStatus.OK)
    }

    @PostMapping("/unban/{userId}")
    fun unbanUser(@PathVariable userId: ObjectId): ResponseEntity<Unit> {
        userFacade.unbanUser(userId)
        return ResponseEntity(HttpStatus.OK)
    }
    @PostMapping("/promote/{userId}")
    fun promoteUser(@PathVariable userId: ObjectId): ResponseEntity<Unit> {
        userFacade.promoteUser(userId)
        return ResponseEntity(HttpStatus.OK)
    }

    @PostMapping("/demote/{userId}")
    fun demoteUser(@PathVariable userId: ObjectId): ResponseEntity<Unit> {
        userFacade.demoteUser(userId)
        return ResponseEntity(HttpStatus.OK)
    }
}