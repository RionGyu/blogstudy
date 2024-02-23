import React from 'react';
import './App.css';
import BoardItem from 'components/BoardItem';
import { commentListMock, latestBoardListMock, top3BoardListMock } from 'mocks';
import Top3Item from 'components/Top3Item';
import CommentItem from 'components/CommentItem';

function App() {
  return (
    <>
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: '30px'}}>
        {commentListMock.map(commentListItem => <CommentItem commentListItem={commentListItem}/>)}
      </div>
        
      {/* <div style={{ display: 'flex', justifyContent: 'center', gap:'24px'}}>
       {top3BoardListMock.map(top3ListItem => <Top3Item top3ListItem={top3ListItem}/>)}
      </div> */}
      {/* {latestBoardListMock.map(boardListItem => <BoardItem boardListItem={boardListItem} />)} */}
    </>
  );
}

export default App;
