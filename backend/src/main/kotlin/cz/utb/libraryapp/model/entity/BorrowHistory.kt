package cz.utb.libraryapp.model.entity

import java.time.Instant

data class BorrowHistory (
    val userId: String,
    val bookId: String,
    val createdAt: Instant,
    val returnedAt: Instant
)
