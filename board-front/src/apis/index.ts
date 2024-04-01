import { SignInRequestDto, SignUpRequestDto } from './request/auth';
import axios from 'axios';
import { SignInResponseDto, SignUpResponseDto } from './response/auth';
import { ResponseDto } from './response';

const DOMAIN = 'http://localhost:4000';
const API_DOMAIN = `${DOMAIN}/api/v1`; // 백틱(`) 사용

const SIGN_IN_URL = () => `${API_DOMAIN}/auth/sign-in`; // 백틱(`) 사용
const SIGN_UP_URL = () => `${API_DOMAIN}/auth/sign-up`; // 백틱(`) 사용

export const signInRequest = async (requestBody: SignInRequestDto) => {
    const result = await axios.post(SIGN_IN_URL(), requestBody)
        .then(response => {
            const responseBody: SignInResponseDto = response.data;
            return responseBody;
        })
        .catch(error => {
            if (!error.response.data) return null;
            const responseBody: ResponseDto = error.response.data;
            return responseBody;
        })
    return result;
}

export const signUpRequest = async (requestBody: SignUpRequestDto) => {
    // signUpRequest 구현 필요
    const result = await axios.post(SIGN_UP_URL(), requestBody)
    .then(response => {
        const responseBody: SignUpResponseDto = response.data;
        return responseBody;
    })
    .catch(error => {
        if (!error.response.data) return null;
        const responseBody: ResponseDto = error.response.data;
        return responseBody;
    })
    return result;
}
