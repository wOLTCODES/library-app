package cz.utb.libraryapp.repository

import cz.utb.libraryapp.model.entity.BorrowHistory
import java.time.Instant
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.data.mongodb.repository.Update

interface BorrowHistoryRepository: MongoRepository<BorrowHistory, String> {
    @Update("{ '\$set': { 'returnedAt': ?2 }}")
    fun findAndSetReturnedAtByUserIdAndBookId(userId: String, bookId: String, returnedAt: Instant = Instant.now())

    fun findAllByUserId(userId: String): List<BorrowHistory>
}