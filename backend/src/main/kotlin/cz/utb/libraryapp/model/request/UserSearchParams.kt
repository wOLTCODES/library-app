package cz.utb.libraryapp.model.request

data class UserSearchParams (
    val filterType: FilterType?,
    val firstname: String?,
    val lastname: String?,
    val address: String?,
    val birthNumber: Int?,
    val orderBy: OrderByUser?,
    val orderByType: OrderByType?
)