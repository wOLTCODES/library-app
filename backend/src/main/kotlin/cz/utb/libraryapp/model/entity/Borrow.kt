package cz.utb.libraryapp.model.entity

import java.time.Instant

data class Borrow (
    val userId: String,
    val bookId: String,
    val createdAt: Instant
)
