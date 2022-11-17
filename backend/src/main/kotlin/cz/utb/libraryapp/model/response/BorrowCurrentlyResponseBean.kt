package cz.utb.libraryapp.model.response

import java.time.Instant
import org.bson.types.ObjectId
import org.springframework.data.mongodb.core.index.Indexed
import org.springframework.data.mongodb.core.mapping.MongoId

data class BorrowCurrentlyResponseBean(
    val id: ObjectId,
    val userId: String,
    val bookId: String,
    val createdAt: Instant,
    val returnsAt: Instant,
    val userName: String,
    val bookName: String
)
