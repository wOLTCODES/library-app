export interface BorrowHistory {
  id: string,
  userId: string,
  bookId: string,
  createdAt: Date,
  returnedAt: Date,
  userName: string,
  bookName: string
}
