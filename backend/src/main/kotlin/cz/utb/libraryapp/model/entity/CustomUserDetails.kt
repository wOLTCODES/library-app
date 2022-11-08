package cz.utb.libraryapp.model.entity

import org.bson.types.ObjectId
import org.springframework.data.mongodb.core.index.Indexed
import org.springframework.data.mongodb.core.mapping.Document
import org.springframework.data.mongodb.core.mapping.MongoId
import org.springframework.security.core.GrantedAuthority
import org.springframework.security.core.userdetails.User
import org.springframework.security.core.userdetails.UserDetails

@Document("User")
class CustomUserDetails(
    username: String,
    password: String,
    enabled: Boolean,
    accountNonExpired: Boolean,
    credentialsNonExpired: Boolean,
    accountNonLocked: Boolean,
    authorities: Collection<GrantedAuthority>,
    val firstname: String,
    val lastname: String,
    val birthNumber: Int,
    val address: String,
    val isAdmin: Boolean,
    val isBanned: Boolean,
    val isReviewed: Boolean,
    @MongoId
    val id: ObjectId = ObjectId(),
) : User(username, password, enabled, accountNonExpired, credentialsNonExpired, accountNonLocked, authorities), UserDetails {

}