import React from 'react'
import Search from './Search'
import Chats from './Chats'
function SideBar() {
  return (
    <div>
        <p className='text-[28px] font-bold mb-2'>Chats</p>
        <Search/>
        <Chats/>
    </div>
  )
}

export default SideBar
