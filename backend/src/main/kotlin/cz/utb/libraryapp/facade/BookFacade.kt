package cz.utb.libraryapp.facade

import cz.utb.libraryapp.model.entity.Book
import cz.utb.libraryapp.model.entity.BorrowHistory
import cz.utb.libraryapp.model.entity.BorrowedCurrently
import cz.utb.libraryapp.model.entity.CustomUserDetails
import cz.utb.libraryapp.model.request.BookRequestBean
import cz.utb.libraryapp.repository.BookRepository
import cz.utb.libraryapp.repository.BorrowHistoryRepository
import cz.utb.libraryapp.repository.BorrowedCurrentlyRepository
import org.bson.types.ObjectId
import org.springframework.http.HttpStatus
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException


interface BookFacade {
    fun getAllBooks(): List<Book>
    fun getBorrowedBooks(): List<Book>
    fun insertBook(book: BookRequestBean): ObjectId
    fun editBook(bookId: ObjectId, book: BookRequestBean)
    fun borrowBook(bookId: ObjectId)
    fun returnBook(bookId: ObjectId)
    fun deleteBook(bookId: ObjectId)
}

@Service
class BookFacadeImpl(val bookRepository: BookRepository, val borrowedCurrentlyRepository: BorrowedCurrentlyRepository, val borrowHistoryRepository: BorrowHistoryRepository): BookFacade {
    override fun getAllBooks(): List<Book> {
        return bookRepository.findAll()
    }

    override fun getBorrowedBooks(): List<Book> {
        return bookRepository.findAll()
    }

    override fun insertBook(book: BookRequestBean): ObjectId {
        return bookRepository.insert(Book(
            book.name,
            book.author,
            book.pageNumber,
            book.publishedYear,
            book.coverImg,
            book.copies
        )).id
    }

    override fun editBook(bookId: ObjectId, book: BookRequestBean) {
        val bookFromDb = bookRepository.findById(bookId.toString())
        if (bookFromDb.isEmpty) {
            throw ResponseStatusException(HttpStatus.NOT_FOUND, "Book ${bookId} does not exist")
        }

        bookRepository.save(bookFromDb.get().copy(
            id = bookId,
            name = book.name,
            author = book.author,
            pageNumber = book.pageNumber,
            publishedYear = book.publishedYear,
            coverImg = book.coverImg,
            copies = book.copies,
        ))
    }

    override fun borrowBook(bookId: ObjectId) {
        val book = bookRepository.findById(bookId.toString())
        if (book.isEmpty) {
            throw ResponseStatusException(HttpStatus.NOT_FOUND, "The book ${bookId} does not exist")
        }

        val borrowedCoppiesOfTheBook = borrowedCurrentlyRepository.findAllByBookId(bookId.toString())
        if (borrowedCoppiesOfTheBook.count() >= book.get().copies) {
            throw ResponseStatusException(HttpStatus.CONFLICT, "There are no more copies in the inventory")
        }

        val auth = (SecurityContextHolder.getContext()?.authentication?.principal as CustomUserDetails?) ?: throw ResponseStatusException(HttpStatus.UNAUTHORIZED, "User is not logged in")
        val alreadyBorrowed = borrowedCurrentlyRepository.findByUserIdAndBookId(auth.id.toString(), bookId.toString())
        if (alreadyBorrowed != null) {
            throw ResponseStatusException(HttpStatus.CONFLICT, "You have borrowed this book already")
        }

        borrowHistoryRepository.insert(BorrowHistory(
            auth.id.toString(),
            bookId.toString()
        ))
        borrowedCurrentlyRepository.insert(BorrowedCurrently(
            auth.id.toString(),
            bookId.toString()
        ))

    }

    override fun returnBook(bookId: ObjectId) {
        val auth = (SecurityContextHolder.getContext()?.authentication?.principal as CustomUserDetails?) ?: throw ResponseStatusException(HttpStatus.UNAUTHORIZED, "User is not logged in")
        borrowedCurrentlyRepository.deleteByUserIdAndBookId(auth.id.toString(), bookId.toString())
        borrowHistoryRepository.findAndSetReturnedAtByUserIdAndBookId(auth.id.toString(), bookId.toString())
    }

    override fun deleteBook(bookId: ObjectId) {
        val borrowed = borrowedCurrentlyRepository.findByBookId(bookId.toString())
        if (borrowed != null) {
            throw ResponseStatusException(HttpStatus.CONFLICT, "Cannot delete a currently borrowed book")
        }

        bookRepository.deleteById(bookId.toString())
    }

}