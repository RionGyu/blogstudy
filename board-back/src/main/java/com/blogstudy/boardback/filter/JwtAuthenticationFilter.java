package com.blogstudy.boardback.filter;

import java.io.IOException;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.blogstudy.boardback.provider.JwtProvider;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    
    // private final UserRepository userRepository;
    private final JwtProvider jwtProvider;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException{

       
        try {
            String token = parseBearerToekn(request);

            if (token == null){
                filterChain.doFilter(request, response);
                return;
    
            }
    
            String email = jwtProvider.validate(token);
    
            if(email == null ){
                filterChain.doFilter(request, response);
                return;
            }
    
            AbstractAuthenticationToken authenticationToken = 
                new UsernamePasswordAuthenticationToken(email, null, AuthorityUtils.NO_AUTHORITIES);
            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
            // 웹 인증 정보 소스
    
            SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
            securityContext.setAuthentication(authenticationToken);
    
            SecurityContextHolder.setContext(securityContext);
        }

        catch(Exception exception){
            exception.printStackTrace();
        }
           filterChain.doFilter(request, response);
            
        //     if(token == null){
        //         filterChain.doFilter(request, response);
        //         return;
        //     }

        //     String userId = jwtProvider.validate(token);
        //     if (userId == null){
        //         filterChain.doFilter(request, response);
        //         return;
        //     }

        //     UserEntity userEntity = userRepository.findByUserId(userId);
        //     String role = userEntity.getRole();

        // } catch (Exception exception){
        //     exception.printStackTrace();
        // }
        
        // filterChain.doFilter(request, response);

    }

    private String parseBearerToekn(HttpServletRequest request) {

        String authorization = request.getHeader("Authorization");

        boolean hasAuthorization = StringUtils.hasText(authorization);
        if (!hasAuthorization) return null;

        boolean isBearer = authorization.startsWith("Bearer");
        if(!isBearer) return null;

        String token = authorization.substring(7);
        return token;
    }
}
