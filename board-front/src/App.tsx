import { Route, Routes } from 'react-router-dom';
import Search from 'views/Search';
import Authentication from 'views/Authentication';
import Main from 'views/Main';
import User from 'views/User';
import BoardDetail from 'views/Board/Detail';
import BoardWrite from 'views/Board/Write';
import BoardUpdate from 'views/Board/Update';
import Container from 'layouts/Container';
import { AUTH_PATH, BOARD_DETAIL_PATH, BOARD_PATH, BOARD_UPDATE_PATH, BOARD_WRITE_PATH, MAIN_PATH, SEARCH_PATH, USER_PATH } from 'constant';
import './App.css';
import { useEffect } from 'react';
import { useCookies } from 'react-cookie';
import { useLoginUserStore } from 'stores';
// import BoardItem from 'components/BoardItem';
// import { commentListMock, favoriteListMock, latestBoardListMock, top3BoardListMock } from 'mocks';
// import Top3Item from 'components/Top3Item';
// import CommentItem from 'components/CommentItem';
// import FavoriteItem from 'components/FavoriteItem';
// import InputBox from 'components/InputBox';
//                    component: Application 컴포넌트         //




function App() {

  //            state: 로그인 유저 전역 상태       //
  const { setLoginUser, resetLoginUser} = useLoginUserStore();

  //            state: cookie 상태                 //
  const [cookies, setCookie ] = useCookies();
  //            effect: accessToekn cookie 값이 변경될때마다 실행할 함수   //
  useEffect(() => {
    if (!cookies.accessToekn){

    }
  }, [cookies.accessToekn]);
  //  const [value, setValue] = useState<string>('');
  //                    render: Application 렌더링        //
  //   description: 메인화면 :  '/' - Main  //
  //   description: 로그인 + 회원가입 : '/auth' - Authentication //
  //   description: 검색화면 : '/search/:word' - Search //
  //   description: 유저페이지 : '/user/:userEmail' - user //
  //   description: 게시물 상세보기 : '/board/detail/:boardNumber' - BoardDetail //
  //   description: 게시물 작성하기 : '/board/write' - BoardWrite //
  //   description: 게시물 수정하기 : '/board/update/:boardNumber' - BoardUpdate //
  return (
    <>
      <Routes>
        <Route element={<Container />}>
          <Route path={MAIN_PATH()} element={<Main />} />
          <Route path={AUTH_PATH()} element={<Authentication />} />
          <Route path={SEARCH_PATH(':searchWord')} element={<Search />} />
          <Route path={USER_PATH(':userEmail')} element={<User />} />
          <Route path={BOARD_PATH()}>
            <Route path={BOARD_WRITE_PATH()} element={<BoardWrite />} />
            <Route path={BOARD_DETAIL_PATH(':boardNumber')} element={<BoardDetail />} />
            <Route path={BOARD_UPDATE_PATH(':boardNumber')} element={<BoardUpdate />} />

          </Route>
        </Route>
      </Routes>
      {/* <InputBox label='이메일' type='text' placeholder='이메일 주소를 입력해주세요' value={value} error={true} setValue={setValue} message='아무거나'/> */}
      {/* <div style={{ display: 'flex', columnGap: '30px', rowGap: '20px'}}>
                      {favoriteListMock.map(favoriteListItem => <FavoriteItem favoriteListItem={favoriteListItem}/>)}
                    </div> */}
      {/* <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '30px'}}>
                    {commentListMock.map(commentListItem => <CommentItem commentListItem={commentListItem}/>)}
                  </div> */}

      {/* <div style={{ display: 'flex', justifyContent: 'center', gap:'24px'}}>
                   {top3BoardListMock.map(top3ListItem => <Top3Item top3ListItem={top3ListItem}/>)}
                  </div> */}
      {/* {latestBoardListMock.map(boardListItem => <BoardItem boardListItem={boardListItem} />)} */}
    </>
  );
}
