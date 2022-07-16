import React from 'react'

interface ToolbarProps {
room:any
}

export const Toolbar: React.FC<ToolbarProps> = ({room}) => {
return (
 <div className='bg-slate-600 text-white p-1 w-full flex justify-evenly items-center'>
  <div className='p-2 mx-7'>{room?.room}</div>
  <div className='p-2'>{room?.users?"Users online :":""}{room?.users}</div>
 </div>
);
}
