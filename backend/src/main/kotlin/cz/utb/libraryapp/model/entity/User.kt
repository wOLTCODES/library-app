package cz.utb.libraryapp.model.entity

data class User (
    val id: String,
    val username: String,
    val password: String,
    val repeatedPassword: String,
    val firstname: String,
    val lastname: String,
    val birthNumber: Int,
    val address: String,
    val isAdmin: Boolean,
    val isBanned: Boolean,
    val isReviewed: Boolean,
    val numberOfBorrowedBooks: Int
)