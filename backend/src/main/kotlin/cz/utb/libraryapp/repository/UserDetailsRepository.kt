package cz.utb.libraryapp.repository

import cz.utb.libraryapp.model.entity.CustomUserDetails
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.data.mongodb.repository.Query

interface UserDetailsRepository: MongoRepository<CustomUserDetails, String> {
    @Query("{username: '?0'}")
    fun findCustomUserDetailsByUsername(username: String): CustomUserDetails?
}