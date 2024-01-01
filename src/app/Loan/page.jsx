"use client"
import React, { useEffect, useState } from 'react';
import History from '../History';

const getHistory = ()=> {
  let list = localStorage.getItem('History')
  console.log(list)

  if(list)
  {
    return JSON.parse(localStorage.getItem('History'))
  }
  else{
    return [];
  }
}

const LoanPage = () => {

  const [mainTask, setmainTask] = useState(getHistory)

  let renderTask = <h2 className='text-center'>No Transaction History Availible</h2>
  if(mainTask.length>0)
  {
    renderTask = mainTask.map((t,i)=>{  
    if(t.mode === 'loan')
    {
      return(
        <li key={i} className='border-sky-300 border-b-2 flex justify-between mb-4' style={{backgroundImage: "linear-gradient(to right, rgba(0,0,255,0), rgba(0,0,255,0.7))"}}>
        <h5 className='text-xl font-semibold pl-10 min-w-[25%]'>{'\u20B9'}{t.amount}</h5>
        <h6 className='text-center truncate text-xl font-semibold min-w-[25%] max-w-[25%]'>{t.desc}</h6>
        <h6 className='text-center text-xl font-semibold min-w-[25%]'>{t.mode}</h6>
        <h6 className='text-right text-xl font-semibold pr-5 min-w-[25%]'>{t.date}</h6>
      </li>
      )
    }
    })
  }

  return (
    <div>
      <br/>
      
    <hr/> <br/>
      <History renderTask={renderTask}/>
    </div>
  );
}

export default LoanPage;
