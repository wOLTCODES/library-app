package cz.utb.libraryapp.repository

import cz.utb.libraryapp.model.entity.CustomUserDetails
import org.bson.types.ObjectId
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.data.mongodb.repository.Query
import org.springframework.data.mongodb.repository.Update

interface UserDetailsRepository: MongoRepository<CustomUserDetails, String> {
    @Query("{username: '?0'}")
    fun findCustomUserDetailsByUsername(username: String): CustomUserDetails?

    fun findAllByIsReviewed(isReviewed: Boolean): List<CustomUserDetails>

    @Update("{ '\$set': { 'isReviewed': ?1 }}")
    fun findAndSetIsReviewedById(id: ObjectId, isReviewed: Boolean)

    @Update("{ '\$set': { 'isBanned': ?1 }}")
    fun findAndSetIsBannedById(id: ObjectId, isBanned: Boolean)

    @Update("{ '\$set': { 'isAdmin': ?1 }}")
    fun findAndSetIsAdminById(id: ObjectId, isAdmin: Boolean)
}