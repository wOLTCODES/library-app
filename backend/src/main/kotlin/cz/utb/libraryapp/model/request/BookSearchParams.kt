package cz.utb.libraryapp.model.request

data class BookSearchParams(
    val filterType: FilterType?,
    val bookName: String?,
    val authorName: String?,
    val publishedYear: Int?,
    val orderBy: OrderByBook?,
    val orderByType: OrderByType?
)
