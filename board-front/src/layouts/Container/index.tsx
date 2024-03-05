import { Outlet, useLocation } from 'react-router-dom'
import Footer from 'layouts/Footer'
import Header from 'layouts/Header'
import React from 'react'
import { AUTH_PATH } from 'constant';


//        component:  레이아웃              //
export default function Container() {
//        state: 현재페이지 path name상태       //
const { pathname } = useLocation();

//        render:  레이아웃 렌더링       //
  return (
    <>
        <Header />
        <Outlet />
        {pathname !== AUTH_PATH() && <Footer />}
    </>
  )
}
