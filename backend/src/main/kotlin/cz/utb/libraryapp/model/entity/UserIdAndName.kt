package cz.utb.libraryapp.model.entity

import org.bson.types.ObjectId
import org.springframework.data.mongodb.core.mapping.MongoId

data class UserIdAndName(
    val id: ObjectId,
    val username: String
)
