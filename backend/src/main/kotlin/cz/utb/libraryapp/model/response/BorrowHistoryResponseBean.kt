package cz.utb.libraryapp.model.response

import java.time.Instant
import org.bson.types.ObjectId

data class BorrowHistoryResponseBean(
    val userId: String,
    val bookId: String,
    val createdAt: Instant,
    val id: ObjectId,
    val userName: String,
    val bookName: String,
    val returnedAt: Instant?
)
