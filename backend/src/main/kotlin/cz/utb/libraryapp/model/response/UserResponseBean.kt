package cz.utb.libraryapp.model.response

import org.bson.types.ObjectId

data class UserResponseBean (
    val id: ObjectId,
    val username: String,
    val firstname: String,
    val lastname: String,
    val birthNumber: Int,
    val address: String,
    val isAdmin: Boolean,
    val isBanned: Boolean,
    val isReviewed: Boolean,
    val numberOfBorrowedBooks: Int
)

