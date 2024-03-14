import React, { useState } from 'react';
import './style.css';
import InputBox from 'components/InputBox';

//        component: 인증 화면 컴포넌트         //
export default function Authentication() {

  //        state: 화면상태                      //
  const [view, setView] = useState<'sign-in' | 'sign-up'>('sign-in');
  //        component: 인증 화면 컴포넌트         //
  const SignInCard = () => {

    //        render: SignInCard 컴포넌트 렌더링        //
    return(
      <div className='auth-card'>
        <div className='auth-card-box'>
          <div className='auth-card-top'>
            <div className='auth-card-title-box'>
              <div className='auth-card-title'>{'로그인'}</div>
            </div>
          </div>
          <InputBox />
          <InputBox />
        </div>
        <div className='auth-card-bottom'>
          <div className='auth-sign-in-error-box'>
            <div className='auth-sign-in-error-message'>
              {'이메일 주소 또는 비밀번호를 잘못 입력했습니다.\n입력하신 내용을 다시 확인해주세요.'}
            </div>
          </div>
          <div className='black-large-full-button'>{'로그인'}</div>
          <div className='auth-description-box'>
            <div className='auth-description'>{'신규 사용자이신가요?'}<span className='auth-description-link'>{'회원가입'}</span></div>
          </div>
        </div>
      </div>
    )
  };
  //        component: 인증 화면 컴포넌트         //
  const SignUpCard = () => {

    //        render: SignUpCard 컴포넌트    렌더링     //
    return(
      <div className='auth-card'></div>
    )
  };
  //        render: 인증 화면 컴포넌트         //
  return (
    <div id = 'auth-wrapper'>
      <div className='auth-container'>
        <div className='auth-jumbotron-box'>
          <div className='auth-jombotron-contents'>
            <div className='auth-logo-icon'></div>
            <div className='auth-jumbotron-text-box'>
              <div className='auth-jumbotron-text'>{'환영합니다.'}</div>
              <div className='auth-jumbotron-text'>{'Gyus Board입니다.'}</div>
            </div>
          </div>
        </div>
        {view === 'sign-in' && <SignInCard />}
        {view === 'sign-up' && <SignUpCard />}
        </div>
    </div>
  )
}
