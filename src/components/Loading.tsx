import React from 'react'

interface LoadingProps {

}

export const Loading: React.FC<LoadingProps> = ({}) => {
return (
 <div className='h-full w-full flex-center bg-slate-300 text-lg'>
 loading ...
 </div>
);
}
