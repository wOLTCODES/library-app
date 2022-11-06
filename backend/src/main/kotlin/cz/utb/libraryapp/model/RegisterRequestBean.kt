package cz.utb.libraryapp.model

data class RegisterRequestBean(
    val username: String,
    val password: String,
    val repeatedPassword: String,
    val firstname: String,
    val lastname: String,
    val birthNumber: Int,
    val address: String
)
