package cz.utb.libraryapp.model.entity

import org.bson.types.ObjectId
import org.springframework.data.mongodb.core.mapping.MongoId

data class BookIdAndName(
    val id: ObjectId,
    val name: String
)
