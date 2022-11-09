package cz.utb.libraryapp.facade

import cz.utb.libraryapp.repository.UserDetailsRepository
import org.springframework.dao.EmptyResultDataAccessException
import org.springframework.security.core.userdetails.UserDetails
import org.springframework.security.core.userdetails.UserDetailsService
import org.springframework.stereotype.Service


interface UserDetailsFacade: UserDetailsService {

}

@Service
class UserDetailsFacadeImpl(val customUserDetailsRepository: UserDetailsRepository): UserDetailsFacade {
    override fun loadUserByUsername(username: String): UserDetails {
        return customUserDetailsRepository.findCustomUserDetailsByUsername(username) ?: throw EmptyResultDataAccessException("${username} not found", 1)
    }
}