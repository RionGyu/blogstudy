package com.blogstudy.boardback.provider;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtProvider {

    @Value("${secret-key}")//오..
    private String secretKey;

    public String create(String email){

        Date expiredDate = Date.from(Instant.now().plus(1, ChronoUnit.HOURS));
        Key key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
        String jwt = Jwts.builder()
            .signWith(key, SignatureAlgorithm.HS256)
            .setSubject(email).setIssuedAt(new Date()).setExpiration(expiredDate)
            .compact();
        System.out.println("jwt="+jwt);
        return jwt;    
    }

    public String validate(String jwt){
        String subject = null;
        
        Key key = Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));

        try {
            subject = Jwts.parserBuilder()
                 .setSigningKey(key)
                 .build()
                 .parseClaimsJws(jwt)
                 .getBody()
                 .getSubject();

        } catch (Exception exception) {
            exception.printStackTrace();
            return null;
        }

        return subject;
    }
}
