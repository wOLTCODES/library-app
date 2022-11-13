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
import org.springframework.web.cors.CorsConfiguration


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
                    response.outputStream.write(mapper.writeValueAsString(ErrorResponse("Your registration has not been reviewed yet")).toByteArray())
                    response.outputStream.flush()
                } else if((authentication.principal as CustomUserDetails).isBanned) {
                    SecurityContextHolder.getContext().authentication = null
                    request.session.invalidate()
                    response.status = HttpServletResponse.SC_UNAUTHORIZED
                    response.outputStream.write(mapper.writeValueAsString(ErrorResponse("You are banned :)")).toByteArray())
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
                    response.outputStream.write(mapper.writeValueAsString(ErrorResponse("The combination of username and password doesn't exist")).toByteArray())
                } else {
                    response.outputStream.write(mapper.writeValueAsString(ErrorResponse("There was an error while trying to login")).toByteArray())
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
                response.outputStream.write(mapper.writeValueAsString(ErrorResponse("You do not have the proper rights to do this action")).toByteArray())
                response.outputStream.flush()
            }
            .authenticationEntryPoint{ request, response, exception->
                SecurityContextHolder.getContext().authentication = null
                request.session.invalidate()
                response.status = HttpServletResponse.SC_UNAUTHORIZED
                response.outputStream.write(mapper.writeValueAsString(ErrorResponse("You are not logged in")).toByteArray())
                response.outputStream.flush()
            }
            .and()
            .cors()
            .configurationSource { CorsConfiguration().applyPermitDefaultValues() }
            .and()
            .csrf().disable()

        return http.build()
    }

}