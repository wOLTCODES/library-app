package cz.utb.libraryapp.repository

import cz.utb.libraryapp.model.entity.Book
import org.springframework.data.domain.Sort
import org.springframework.data.mongodb.repository.MongoRepository
import org.springframework.data.mongodb.repository.Query

interface BookRepository: MongoRepository<Book, String> {
    @Query(value = "?0")
    fun searchAllAndSort(searchQuery: String, sort: Sort): List<Book>
}