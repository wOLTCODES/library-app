package cz.utb.libraryapp.controller

import cz.utb.libraryapp.facade.BookFacade
import cz.utb.libraryapp.model.entity.Book
import cz.utb.libraryapp.model.request.BookRequestBean
import cz.utb.libraryapp.model.response.BookResponseBean
import org.bson.types.ObjectId
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.DeleteMapping
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestBody
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/book")
class BookController(val bookFacade: BookFacade) {
    @GetMapping
    fun getAllBooks(): ResponseEntity<List<BookResponseBean>> {
        val books = bookFacade.getAllBooks()
        return ResponseEntity(books, HttpStatus.OK)
    }

    @GetMapping("/borrowed")
    fun getBorrowedBooks(): ResponseEntity<List<BookResponseBean>> {
        val books = bookFacade.getBorrowedBooks()
        return ResponseEntity(books, HttpStatus.OK)
    }

    @PostMapping("/insert")
    fun insertBook(@RequestBody book: BookRequestBean): ResponseEntity<String> {
        bookFacade.insertBook(book)
        return ResponseEntity(HttpStatus.OK)
    }

    @PostMapping("/edit/{bookId}")
    fun editBook(@PathVariable bookId: ObjectId, @RequestBody book: BookRequestBean): ResponseEntity<Unit> {
        bookFacade.editBook(bookId, book)
        return ResponseEntity(HttpStatus.OK)
    }

    @PostMapping("/borrow/{bookId}")
    fun borrowBook(@PathVariable bookId: ObjectId): ResponseEntity<Unit> {
        bookFacade.borrowBook(bookId)
        return ResponseEntity(HttpStatus.OK)
    }

    @PostMapping("/return/{bookId}")
    fun returnBook(@PathVariable bookId: ObjectId): ResponseEntity<Unit> {
        bookFacade.returnBook(bookId)
        return ResponseEntity(HttpStatus.OK)
    }

    @DeleteMapping("/delete/{bookId}")
    fun deleteBook(@PathVariable bookId: ObjectId): ResponseEntity<Unit> {
        bookFacade.deleteBook(bookId)
        return ResponseEntity(HttpStatus.OK)
    }
}