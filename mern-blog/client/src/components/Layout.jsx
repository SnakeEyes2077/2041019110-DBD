import React from 'react'
import { Outlet } from "react-router-dom"
import TopNav from './TopNav'
import BotNav from './BotNav'


const Layouts = () => {
  return (
    <>
      <TopNav />
      <Outlet />
      <BotNav />
    </>
  )
}

export default Layouts


