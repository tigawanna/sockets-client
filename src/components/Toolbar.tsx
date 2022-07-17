import React from 'react'

interface ToolbarProps {
room:any
}

export const Toolbar: React.FC<ToolbarProps> = ({room}) => {
return (
 <div className='bg-slate-600 text-white p-1 w-full flex justify-between items-center'>
  <div className='p-2 m-1 text-xl font-bold'>{room?.room}</div>
  <div className='p-2 m-1 font-bold'>{room?.users}{room?.users?" online ":""}</div>
 </div>
);
}
