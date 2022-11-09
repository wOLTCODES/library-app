package cz.utb.libraryapp.facade

import cz.utb.libraryapp.model.entity.AggregateGroupByUserId
import cz.utb.libraryapp.model.entity.BorrowHistory
import cz.utb.libraryapp.model.entity.BorrowedCurrently
import cz.utb.libraryapp.model.entity.CustomUserDetails
import cz.utb.libraryapp.repository.BorrowHistoryRepository
import cz.utb.libraryapp.repository.BorrowedCurrentlyRepository
import org.springframework.http.HttpStatus
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.stereotype.Service
import org.springframework.web.server.ResponseStatusException

interface BorrowFacade {
    fun getCurrentlyBorrowedBooksForUserIds(userIds: List<String>): List<AggregateGroupByUserId>
    fun getBorrowedCurrentlyForUserId(): List<BorrowedCurrently>
    fun getBorrowHistoryForUserId(): List<BorrowHistory>
    fun getBorrowHistory(): List<BorrowHistory>
}

@Service
class BorrowFacadeImpl(
    val borrowHistoryRepository: BorrowHistoryRepository,
    val borrowedCurrentlyRepository: BorrowedCurrentlyRepository
): BorrowFacade {
    override fun getCurrentlyBorrowedBooksForUserIds(userIds: List<String>): List<AggregateGroupByUserId> {
        return borrowedCurrentlyRepository.groupByUserId(userIds)
    }

    override fun getBorrowedCurrentlyForUserId(): List<BorrowedCurrently> {
        val auth = (SecurityContextHolder.getContext()?.authentication?.principal as CustomUserDetails?) ?: throw ResponseStatusException(HttpStatus.UNAUTHORIZED, "User is not logged in")
        return borrowedCurrentlyRepository.findAllByUserId(auth.id.toString())
    }

    override fun getBorrowHistoryForUserId(): List<BorrowHistory> {
        val auth = (SecurityContextHolder.getContext()?.authentication?.principal as CustomUserDetails?) ?: throw ResponseStatusException(HttpStatus.UNAUTHORIZED, "User is not logged in")
        return borrowHistoryRepository.findAllByUserId(auth.id.toString())
    }

    override fun getBorrowHistory(): List<BorrowHistory> {
        return borrowHistoryRepository.findAll()
    }

}