package cz.utb.libraryapp.configuration

import com.fasterxml.jackson.databind.ObjectMapper
import cz.utb.libraryapp.facade.UserDetailsFacade
import cz.utb.libraryapp.model.entity.CustomUserDetails
import cz.utb.libraryapp.model.response.ErrorResponse
import javax.servlet.http.HttpServletResponse
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.dao.EmptyResultDataAccessException
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.web.SecurityFilterChain


@Configuration
@EnableWebSecurity
class SecurityConfiguration(val bCryptPasswordEncoder: BCryptPasswordEncoder, val userDetailsFacade: UserDetailsFacade, val mapper: ObjectMapper) {

    @Bean
    fun customAuthenticationManager(http: HttpSecurity): AuthenticationManager {
        val authenticationManagerBuilder = http.getSharedObject(AuthenticationManagerBuilder::class.java)
        authenticationManagerBuilder.userDetailsService(userDetailsFacade).passwordEncoder(bCryptPasswordEncoder)
        return authenticationManagerBuilder.build()
    }

    @Bean
    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain {
        http.authorizeRequests()
            .antMatchers("/user/register").permitAll()
            .anyRequest().authenticated()
            .and()
            .formLogin()
            .loginPage("/user/login-redirect")
            .loginProcessingUrl("/user/login").permitAll()
            .successHandler { request, response, authentication ->
                if(!(authentication.principal as CustomUserDetails).isReviewed) {
                    SecurityContextHolder.getContext().authentication = null
                    request.session.invalidate()
                    response.status = HttpServletResponse.SC_UNAUTHORIZED
                    response.outputStream.write(mapper.writeValueAsString(ErrorResponse("USER_NOT_REVIEWED")).toByteArray())
                    response.outputStream.flush()
                } else if((authentication.principal as CustomUserDetails).isBanned) {
                    SecurityContextHolder.getContext().authentication = null
                    request.session.invalidate()
                    response.status = HttpServletResponse.SC_UNAUTHORIZED
                    response.outputStream.write(mapper.writeValueAsString(ErrorResponse("USER_BANNED")).toByteArray())
                    response.outputStream.flush()
                } else {
                    response.status = 200
                }
            }
            .failureHandler { request, response, exception ->
                SecurityContextHolder.getContext().authentication = null
                request.session.invalidate()
                response.status = HttpServletResponse.SC_UNAUTHORIZED
                if (exception.cause != null && exception.cause is EmptyResultDataAccessException) {
                    response.outputStream.write(mapper.writeValueAsString(ErrorResponse("NO_LOGIN_PASSWORD_COMBO")).toByteArray())
                } else {
                    response.outputStream.write(mapper.writeValueAsString(ErrorResponse("LOGIN_FAILURE")).toByteArray())
                }
                response.outputStream.flush()
            }
            .usernameParameter("username")
            .passwordParameter("password")
            .and()
            .logout()
            .logoutUrl("/user/logout")
            .invalidateHttpSession(true)
            .deleteCookies("JSESSIONID")
            .logoutSuccessHandler { request, response, authentication ->
                response.status = 200
            }
            .and()
            .exceptionHandling()
            .accessDeniedHandler{ request, response, exception->
                response.status = HttpServletResponse.SC_FORBIDDEN
                response.outputStream.write(mapper.writeValueAsString(ErrorResponse("USER_DOES_NOT_HAVE_PROPER_RIGHTS")).toByteArray())
                response.outputStream.flush()
            }
            .authenticationEntryPoint{ request, response, exception->
                SecurityContextHolder.getContext().authentication = null
                request.session.invalidate()
                response.status = HttpServletResponse.SC_UNAUTHORIZED
                response.outputStream.write(mapper.writeValueAsString(ErrorResponse("USER_NOT_LOGGED_IN")).toByteArray())
                response.outputStream.flush()
            }
            .and()
            .csrf().disable()

        return http.build()
    }

}