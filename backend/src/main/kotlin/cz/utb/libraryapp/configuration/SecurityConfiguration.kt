package cz.utb.libraryapp.configuration

import cz.utb.libraryapp.facade.UserDetailsFacade
import cz.utb.libraryapp.model.entity.CustomUserDetails
import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.security.authentication.AuthenticationManager
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder
import org.springframework.security.config.annotation.web.builders.HttpSecurity
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder
import org.springframework.security.web.SecurityFilterChain


@Configuration
@EnableWebSecurity
class SecurityConfiguration(val bCryptPasswordEncoder: BCryptPasswordEncoder, val userDetailsFacade: UserDetailsFacade) {

    @Bean
    fun customAuthenticationManager(http: HttpSecurity): AuthenticationManager {
        val authenticationManagerBuilder = http.getSharedObject(AuthenticationManagerBuilder::class.java)
        authenticationManagerBuilder.userDetailsService(userDetailsFacade).passwordEncoder(bCryptPasswordEncoder)
        return authenticationManagerBuilder.build()
    }

    @Bean
    fun securityFilterChain(http: HttpSecurity): SecurityFilterChain {
        http.authorizeRequests()
            .antMatchers("/knihovna/api/user/register").permitAll()
            .anyRequest().authenticated()
            .and()
            .formLogin()
            .loginPage("/user/login-redirect")
            .loginProcessingUrl("/user/login").permitAll()
            .successHandler { request, response, authentication ->
                if(!(authentication.principal as CustomUserDetails).isReviewed) {
                    response.setHeader("Location", "/knihovna/api/user/logout?error=USER_NOT_REVIEWED")
                    response.sendError(401, "USER_NOT_REVIEWED")
                } else if((authentication.principal as CustomUserDetails).isBanned) {
                    response.setHeader("Location", "/knihovna/api/user/logout?error=USER_BANNED")
                    response.sendError(401, "USER_BANNED")
                } else {
                    response.status = 200
                }
            }
            .failureHandler { request, response, exception ->
                response.setHeader("Location", "/knihovna/login?error=LOGIN_FAILURE")
                response.sendError(401, "LOGIN_FAILED")
            }
            .usernameParameter("username")
            .passwordParameter("password")
            .and()
            .logout()
            .logoutUrl("/user/logout")
            .deleteCookies("JSESSIONID")
            .logoutSuccessHandler { request, response, authentication ->
                response.status = 200
            }
            .and()
            .exceptionHandling()
            .accessDeniedHandler{ request, response, exception->
                response.sendError(403, "ACCESS_DENIED")
            }
            .authenticationEntryPoint{ request, response, exception->
                response.sendError(401, "NOT_LOGGED_IN")
            }
            .and()
            .csrf().disable()

        return http.build()
    }

}