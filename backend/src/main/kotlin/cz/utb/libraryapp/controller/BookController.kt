package cz.utb.libraryapp.controller

import cz.utb.libraryapp.model.Book
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/book")
class BookController {
    fun getAllBooks(): ResponseEntity<List<Book>> {

        return TODO("Provide the return value")
    }

    fun editBook(): ResponseEntity<Unit> {

        return TODO("Provide the return value")
    }

    fun deleteBook(): ResponseEntity<Unit> {

        return TODO("Provide the return value")
    }

    fun getBorrowedBooks(): ResponseEntity<List<Book>> {

        return TODO("Provide the return value")
    }

    fun borrowBook(): ResponseEntity<Unit> {

        return TODO("Provide the return value")
    }
}