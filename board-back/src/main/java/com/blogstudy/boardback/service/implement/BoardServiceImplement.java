package com.blogstudy.boardback.service.implement;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.blogstudy.boardback.dto.request.board.PostBoardRequestDto;
import com.blogstudy.boardback.dto.response.ResponseDto;
import com.blogstudy.boardback.dto.response.board.PostBoardResponseDto;
import com.blogstudy.boardback.entity.BoardEntity;
import com.blogstudy.boardback.repository.BoardRepository;
import com.blogstudy.boardback.repository.UserRepository;
import com.blogstudy.boardback.service.BoardService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class BoardServiceImplement implements BoardService {
    
    private final BoardRepository boardRepository;
    private final UserRepository userRepository;
    

    @Override
    public ResponseEntity<? super PostBoardResponseDto> postBoard(PostBoardRequestDto dto, String email) {
       
        try {
            
            boolean existedEmail = userRepository.existsByEmail(email);
            if (!existedEmail) return PostBoardResponseDto.notExistUser();

            BoardEntity boardEntity = new BoardEntity(dto, email);
            boardRepository.save(boardEntity);


        } catch (Exception exception) {
            exception.printStackTrace();
            return ResponseDto.databaseError();
        }

        return PostBoardResponseDto.success();
    }
    
}
