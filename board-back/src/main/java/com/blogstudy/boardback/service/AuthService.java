package com.blogstudy.boardback.service;

import org.springframework.http.ResponseEntity;

import com.blogstudy.boardback.dto.request.auth.SignInRequestDto;
import com.blogstudy.boardback.dto.request.auth.SignUpRequestDto;
import com.blogstudy.boardback.dto.response.auth.SignUpResponseDto;
import com.blogstudy.boardback.dto.response.auth.SignInResponseDto;

public interface AuthService {
    
    ResponseEntity<? super SignUpResponseDto> signUp(SignUpRequestDto dto);
    ResponseEntity<? super SignInResponseDto> signIn(SignInRequestDto dto);
}
