package cz.utb.libraryapp.model.entity

import java.time.Instant
import org.bson.types.ObjectId
import org.springframework.data.mongodb.core.mapping.Document
import org.springframework.data.mongodb.core.mapping.MongoId

@Document
data class BorrowHistory (
    val userId: String,
    val bookId: String,
    val createdAt: Instant = Instant.now(),
    val returnedAt: Instant? = null,
    @MongoId
    val id: ObjectId = ObjectId(),
)
