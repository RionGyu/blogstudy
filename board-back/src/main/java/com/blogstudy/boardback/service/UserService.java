package com.blogstudy.boardback.service;

import org.springframework.http.ResponseEntity;

import com.blogstudy.boardback.dto.response.user.GetSignInUserResponseDto;

public interface UserService {
     
   
    ResponseEntity<? super GetSignInUserResponseDto> getSignInUser (String email);
}
