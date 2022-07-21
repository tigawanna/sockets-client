import React from 'react'
import {BiExit} from 'react-icons/bi'
import { User } from './../App';

interface ToolbarProps {
room:any
updateUser: (user: User) => void
}

export const Toolbar: React.FC<ToolbarProps> = ({room,updateUser}) => {
return (
 <div className='bg-slate-600 text-white p-1 w-full flex justify-between items-center h-12'>
  <div className='p-2 m-1 text-xl font-bold flex'>
  <div className='p-2  text-xl font-bold '>  {room?.room}</div>

{room.room?<div className='p-1 m-1  text-base font-normal shadow shadow-white hover:shadow-red-400
   flex-center cursor-pointer'
   onClick={()=>{
    localStorage.removeItem('user-room') ;
    updateUser({username:"",room:""})
    }}><BiExit/></div>:null}

    </div>
  <div className='p-2 m-1 font-bold'>{room?.users}{room?.users?" online ":""}</div>
 </div>
);
}
