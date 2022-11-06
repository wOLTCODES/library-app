package cz.utb.libraryapp.model

data class User(
    val username: String,
    val password: String,
    val repeatedPassword: String,
    val firstname: String,
    val lastname: String,
    val birthNumber: Int,
    val address: String,
    val isAdmin: Boolean,
    val isBanned: Boolean,
    val isReviewed: Boolean
)
