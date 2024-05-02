package com.blogstudy.boardback.service;

import org.springframework.http.ResponseEntity;

import com.blogstudy.boardback.dto.request.board.PostBoardRequestDto;
import com.blogstudy.boardback.dto.response.board.PostBoardResponseDto;

public interface BoardService {
    ResponseEntity<? super PostBoardResponseDto> postBoard(PostBoardRequestDto dto, String email);
}
