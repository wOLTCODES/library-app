package cz.utb.libraryapp.repository

import cz.utb.libraryapp.model.entity.AggregateGroupByUserId
import cz.utb.libraryapp.model.entity.BorrowHistory
import cz.utb.libraryapp.model.entity.BorrowedCurrently
import java.time.Instant
import org.bson.types.ObjectId
import org.springframework.data.mongodb.repository.Aggregation
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.data.mongodb.repository.Update

interface BorrowedCurrentlyRepository: MongoRepository<BorrowedCurrently,String> {
    fun findByUserIdAndBookId(userId: String, bookId: String): BorrowedCurrently?

    fun findAllByBookId(bookId: String): List<BorrowedCurrently>

    fun findByBookId(bookId: String): BorrowedCurrently?

    fun findAllByUserId(userId: String): List<BorrowedCurrently>

    @Aggregation(pipeline = [
        "{ \$match: { '\$expr': { '\$in': [ '\$userId', ?0 ] }}}",
        "{ \$group: { _id: '\$userId', count: { \$sum: 1 }}}"
    ])
    fun groupByUserId(userIds: List<String>): List<AggregateGroupByUserId>

    fun deleteByUserIdAndBookId(userId: String, bookId: String)
}