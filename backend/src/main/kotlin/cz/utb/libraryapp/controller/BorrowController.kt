package cz.utb.libraryapp.controller

import cz.utb.libraryapp.facade.BorrowFacade
import cz.utb.libraryapp.model.entity.BorrowHistory
import cz.utb.libraryapp.model.entity.BorrowedCurrently
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PathVariable
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/borrow")
class BorrowController(val borrowFacade: BorrowFacade) {

    @GetMapping("/my")
    fun getCurrentBorrowingsForUser(): ResponseEntity<List<BorrowedCurrently>> {
        return ResponseEntity(borrowFacade.getBorrowedCurrentlyForUserId(), HttpStatus.OK)
    }

    @GetMapping("/history/{userId}")
    fun getBorrowingsForUserId(@PathVariable userId: String): ResponseEntity<List<BorrowHistory>> {
        return ResponseEntity(borrowFacade.getBorrowHistoryForUserId(), HttpStatus.OK)
    }

    @GetMapping("/history/all")
    fun getAllBorrowings(): ResponseEntity<List<BorrowHistory>> {
        return ResponseEntity(borrowFacade.getBorrowHistory(), HttpStatus.OK)
    }

}