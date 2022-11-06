package cz.utb.libraryapp.model.entity

data class Book (
    val id: String,
    val name: String,
    val author: String,
    val pageNumber: String,
    val publishedYear: Int,
    val coverImg: String,
    val copies: Int,
    val canBorrow: Boolean
)
