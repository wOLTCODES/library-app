package cz.utb.libraryapp.model.request

import org.bson.types.ObjectId

data class BookRequestBean(
    val name: String,
    val author: String,
    val pageNumber: String,
    val publishedYear: Int,
    val coverImg: String,
    val copies: Int
)
