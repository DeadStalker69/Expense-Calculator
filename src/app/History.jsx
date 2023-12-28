import React from 'react'

const History = ({renderTask}) => {
  return (
    <div className='p-8 bg-slate-200'> 
    <p className='text-center bg-black text-white font-bold text-3xl p-3'>Transaction History</p>
    <br/>
    <div className='flex justify-between border-b-2'>
      <h3 className='pl-10 font-bold text-2xl min-w-[25%]'>Amount</h3>
      <h3 className=' text-center font-bold text-2xl min-w-[25%]'>Description</h3>
      <h3 className='text-center font-bold text-2xl min-w-[25%]'>Mode</h3>
      <h3 className='text-right pr-10 font-bold text-2xl min-w-[25%]'>Date</h3>
    </div>
    <br/>
    <ul>{renderTask}</ul>
    </div>
 
  )
}

export default History