package cz.utb.libraryapp.model.response

import com.fasterxml.jackson.databind.annotation.JsonSerialize
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer
import org.bson.types.ObjectId
import org.springframework.data.mongodb.core.mapping.Document
import org.springframework.data.mongodb.core.mapping.MongoId

data class BookResponseBean(
    @JsonSerialize(using = ToStringSerializer::class)
    val id: ObjectId,
    val name: String,
    val author: String,
    val pageNumber: String,
    val publishedYear: Int,
    val coverImg: String,
    val copies: Int,
    val canBorrow: Boolean
)
