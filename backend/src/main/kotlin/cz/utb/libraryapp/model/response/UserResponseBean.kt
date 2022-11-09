package cz.utb.libraryapp.model.response

import com.fasterxml.jackson.databind.annotation.JsonDeserialize
import com.fasterxml.jackson.databind.annotation.JsonSerialize
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer
import org.bson.types.ObjectId

data class UserResponseBean (
    @JsonSerialize(using = ToStringSerializer::class)
    val id: ObjectId,
    val username: String,
    val firstname: String,
    val lastname: String,
    val birthNumber: Int,
    val address: String,
    val isAdmin: Boolean,
    val isBanned: Boolean,
    val isReviewed: Boolean,
    val numberOfBorrowedBooks: Int
)

