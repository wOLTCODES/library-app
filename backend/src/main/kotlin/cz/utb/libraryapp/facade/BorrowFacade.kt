package cz.utb.libraryapp.facade

import cz.utb.libraryapp.model.entity.AggregateGroupBy
import cz.utb.libraryapp.model.entity.CustomUserDetails
import cz.utb.libraryapp.model.response.BorrowCurrentlyResponseBean
import cz.utb.libraryapp.model.response.BorrowHistoryResponseBean
import cz.utb.libraryapp.repository.BookRepository
import cz.utb.libraryapp.repository.BorrowHistoryRepository
import cz.utb.libraryapp.repository.BorrowedCurrentlyRepository
import cz.utb.libraryapp.repository.UserDetailsRepository
import org.bson.types.ObjectId
import org.springframework.http.HttpStatus
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException

interface BorrowFacade {
    fun getCurrentlyBorrowedBooksForUserIds(userIds: List<String>): List<AggregateGroupBy>
    fun getBorrowedCurrentlyForUserId(): List<BorrowCurrentlyResponseBean>
    fun getBorrowHistoryForUserId(): List<BorrowHistoryResponseBean>
    fun getBorrowHistory(): List<BorrowHistoryResponseBean>
}

@Service
class BorrowFacadeImpl(
    val borrowHistoryRepository: BorrowHistoryRepository,
    val borrowedCurrentlyRepository: BorrowedCurrentlyRepository,
    val userDetailsRepository: UserDetailsRepository,
    val bookRepository: BookRepository
): BorrowFacade {
    override fun getCurrentlyBorrowedBooksForUserIds(userIds: List<String>): List<AggregateGroupBy> {
        return borrowedCurrentlyRepository.groupByUserId(userIds)
    }

    override fun getBorrowedCurrentlyForUserId(): List<BorrowCurrentlyResponseBean> {
        val auth = (SecurityContextHolder.getContext()?.authentication?.principal as CustomUserDetails?) ?: throw ResponseStatusException(HttpStatus.UNAUTHORIZED, "User is not logged in")
        val borrows = borrowedCurrentlyRepository.findAllByUserId(auth.id.toString())
        val userNames = userDetailsRepository.getAllUsersIn(borrows.map { ObjectId(it.userId) })
        val bookNames = bookRepository.getAllUsersIn(borrows.map { ObjectId(it.bookId) })
        return borrows.map {
            val userName = userNames.firstOrNull() { username -> username.id.toString() == it.userId }?.username ?: "Deleted User"
            val bookName = bookNames.firstOrNull() { bookName -> bookName.id.toString() == it.bookId }?.name ?: "Deleted Book"
            BorrowCurrentlyResponseBean(
                it.id,
                it.userId,
                it.bookId,
                it.createdAt,
                it.returnsAt,
                userName,
                bookName,
            )
        }
    }

    override fun getBorrowHistoryForUserId(): List<BorrowHistoryResponseBean> {
        val auth = (SecurityContextHolder.getContext()?.authentication?.principal as CustomUserDetails?) ?: throw ResponseStatusException(HttpStatus.UNAUTHORIZED, "User is not logged in")
        val borrows = borrowHistoryRepository.findAllByUserId(auth.id.toString())
        val userNames = userDetailsRepository.getAllUsersIn(borrows.map { ObjectId(it.userId) })
        val bookNames = bookRepository.getAllUsersIn(borrows.map { ObjectId(it.bookId) })
        return borrows.map {
            val userName = userNames.firstOrNull() { username -> username.id.toString() == it.userId }?.username ?: "Deleted User"
            val bookName = bookNames.firstOrNull() { bookName -> bookName.id.toString() == it.bookId }?.name ?: "Deleted Book"
            BorrowHistoryResponseBean(
                it.userId,
                it.bookId,
                it.createdAt,
                it.id,
                userName,
                bookName,
                it.returnedAt
            )
        }
    }

    override fun getBorrowHistory(): List<BorrowHistoryResponseBean> {
        val borrows = borrowHistoryRepository.findAll()
        val userNames = userDetailsRepository.getAllUsersIn(borrows.map { ObjectId(it.userId) })
        val bookNames = bookRepository.getAllUsersIn(borrows.map { ObjectId(it.bookId) })
        return borrows.map {
            val userName = userNames.firstOrNull() { username -> username.id.toString() == it.userId }?.username ?: "Deleted User"
            val bookName = bookNames.firstOrNull() { bookName -> bookName.id.toString() == it.bookId }?.name ?: "Deleted Book"
            BorrowHistoryResponseBean(
                it.userId,
                it.bookId,
                it.createdAt,
                it.id,
                userName,
                bookName,
                it.returnedAt
            )
        }
    }

}