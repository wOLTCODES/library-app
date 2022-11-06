package cz.utb.libraryapp.model

data class Book(
    val name: String,
    val author: String,
    val pageNumber: String,
    val publishedYear: Int,
    val coverImg: String,
    val inventoryNumber: Int
)
