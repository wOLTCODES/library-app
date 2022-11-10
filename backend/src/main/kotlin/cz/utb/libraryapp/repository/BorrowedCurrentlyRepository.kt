package cz.utb.libraryapp.repository

import cz.utb.libraryapp.model.entity.AggregateGroupBy
import cz.utb.libraryapp.model.entity.BorrowedCurrently
import org.springframework.data.mongodb.repository.Aggregation
import org.springframework.data.mongodb.repository.MongoRepository

interface BorrowedCurrentlyRepository: MongoRepository<BorrowedCurrently,String> {
    fun findByUserIdAndBookId(userId: String, bookId: String): BorrowedCurrently?

    fun findAllByBookId(bookId: String): List<BorrowedCurrently>

    fun findByBookId(bookId: String): BorrowedCurrently?

    fun findAllByUserId(userId: String): List<BorrowedCurrently>

    @Aggregation(pipeline = [
        "{ \$match: { '\$expr': { '\$in': [ '\$userId', ?0 ] }}}",
        "{ \$group: { _id: '\$userId', count: { \$sum: 1 }}}"
    ])
    fun groupByUserId(userIds: List<String>): List<AggregateGroupBy>

    @Aggregation(pipeline = [
        "{ \$match: { '\$expr': { '\$in': [ '\$bookId', ?0 ] }}}",
        "{ \$group: { _id: '\$bookId', count: { \$sum: 1 }}}"
    ])
    fun groupByBookId(bookIds: List<String>): List<AggregateGroupBy>

    fun deleteByUserIdAndBookId(userId: String, bookId: String)
}