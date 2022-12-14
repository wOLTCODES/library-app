package cz.utb.libraryapp.model.entity

import org.bson.types.ObjectId
import org.springframework.data.mongodb.core.mapping.Document
import org.springframework.data.mongodb.core.mapping.MongoId

@Document
data class Book (
    val name: String,
    val author: String,
    val pageNumber: String,
    val publishedYear: Int,
    val coverImg: String,
    val copies: Int,
    @MongoId
    val id: ObjectId = ObjectId(),
)
