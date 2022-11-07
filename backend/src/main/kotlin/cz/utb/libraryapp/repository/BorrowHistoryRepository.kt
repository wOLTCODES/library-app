package cz.utb.libraryapp.repository

import cz.utb.libraryapp.model.entity.BorrowHistory
import org.springframework.data.mongodb.repository.MongoRepository

interface BorrowHistoryRepository: MongoRepository<BorrowHistory, String> {
}