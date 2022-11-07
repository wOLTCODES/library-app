package cz.utb.libraryapp.model.entity

import java.time.Instant
import org.bson.types.ObjectId
import org.springframework.data.mongodb.core.index.Indexed
import org.springframework.data.mongodb.core.mapping.Document
import org.springframework.data.mongodb.core.mapping.MongoId

@Document
data class BorrowedCurrently (
    val userId: String,
    val bookId: String,
    @Indexed(expireAfterSeconds = 518400) // 6 days in seconds
    val createdAt: Instant = Instant.now(),
    val returnsAt: Instant = Instant.now().plusSeconds(518400),
    @MongoId
    val id: ObjectId = ObjectId(),
)
