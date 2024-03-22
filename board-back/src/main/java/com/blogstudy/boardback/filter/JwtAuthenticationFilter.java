package com.blogstudy.boardback.filter;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import com.blogstudy.boardback.entity.UserEntity;
import com.blogstudy.boardback.provider.JwtProvider;
import com.blogstudy.boardback.repository.UserRepository;

import jakarta.annotation.Nonnull;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    
    private final UserRepository userRepository;
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

            UserEntity userEntity = userRepository.findByEmail(email);
            String role = userEntity.getRole(); // role : ROLE_USER, ROLE_ADMIN

            List<GrantedAuthority> authorities = new ArrayList<>();
            authorities.add(new SimpleGrantedAuthority(role));
             System.out.println("실행여부");

            SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
            AbstractAuthenticationToken authenticationToken = 
                new UsernamePasswordAuthenticationToken(email, null, authorities);
            authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));


            securityContext.setAuthentication(authenticationToken);
    
            SecurityContextHolder.setContext(securityContext);
            
            
            // 웹 인증 정보 소스
    
            
        }

        catch(Exception exception){
            exception.printStackTrace();
        }
        filterChain.doFilter(request, response);
            

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
