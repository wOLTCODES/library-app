package cz.utb.libraryapp.repository

import cz.utb.libraryapp.model.entity.BorrowedCurrently
import org.springframework.data.mongodb.repository.MongoRepository

interface BorrowedCurrentlyRepository: MongoRepository<BorrowedCurrently,String> {
    fun findByUserIdAndBookId(userId: String, bookId: String): BorrowedCurrently?
    fun findByBookId(bookId: String): BorrowedCurrently?
}