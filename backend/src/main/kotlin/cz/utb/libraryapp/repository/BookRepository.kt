package cz.utb.libraryapp.repository

import cz.utb.libraryapp.model.entity.Book
import org.springframework.data.mongodb.repository.MongoRepository

interface BookRepository: MongoRepository<Book, String> {
}