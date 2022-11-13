package cz.utb.libraryapp.repository

import cz.utb.libraryapp.model.entity.Book
import cz.utb.libraryapp.model.entity.BookIdAndName
import org.bson.types.ObjectId
import org.springframework.data.domain.Sort
import org.springframework.data.mongodb.repository.Aggregation
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.data.mongodb.repository.Query

interface BookRepository: MongoRepository<Book, String> {
    @Query(value = "?0")
    fun searchAllAndSort(searchQuery: String, sort: Sort): List<Book>

    @Aggregation(pipeline = [
        "{ \$match: { '\$expr': { '\$in': [ '\$_id', ?0 ] }}}",
        "{ \$project: { _id: 1, name: 1 }}"
    ])
    fun getAllUsersIn(userIds: List<ObjectId>): List<BookIdAndName>
}