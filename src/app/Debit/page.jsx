"use client"
import React, { useEffect, useState } from 'react';
import History from '../History';
import { useSession } from 'next-auth/react'

const DebitPage = () => {

  const { data: session } = useSession();
  const [mainTask, setmainTask] = useState([])

  useEffect(()=> {
    const fetchHistory = async ()=> {
      const response = await fetch(`/api/users/${session?.user.id}/posts`)
      const data = await response.json()

      setmainTask(data)
    }
    if(session?.user.id) fetchHistory()
  }, [session?.user.id, mainTask])


  let renderTask = <h2 className='text-center'>No Transaction History Availible</h2>
  if(mainTask.length>0)
  {
    renderTask = mainTask.map((t,i)=>{  
    let listColor
    if(t.amount < 0 && t.mode != 'loan')
    {
      return(
        <li key={i} className='border-sky-300 border-b-2 flex justify-between mb-4' style={{backgroundImage: listColor}}>
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
      <br />
      <History renderTask={renderTask}/>
    </div>
  );
}

export default DebitPage;
