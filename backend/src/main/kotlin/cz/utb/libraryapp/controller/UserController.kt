package cz.utb.libraryapp.controller

import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/user")
class UserController {
    fun loginUser(): ResponseEntity<Unit> {

        return TODO("Provide the return value")
    }

    fun registerUser(): ResponseEntity<Unit> {

        return TODO("Provide the return value")
    }

    fun editUser(): ResponseEntity<Unit> {

        return TODO("Provide the return value")
    }
}