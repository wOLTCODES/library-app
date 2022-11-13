package cz.utb.libraryapp.model.response

import com.fasterxml.jackson.databind.annotation.JsonSerialize
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer
import org.bson.types.ObjectId

data class ObjectIdResponse(
    @JsonSerialize(using = ToStringSerializer::class)
    val id: ObjectId
)
