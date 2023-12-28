"use client"
import React, { useState, useEffect } from 'react'
import Table from './Table'
import History from './History'
import Form from './Form'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment'

const getHistory = ()=> {
  let list = localStorage.getItem('History')
  if(list)
  {
    return JSON.parse(localStorage.getItem('History'))
  }
  else{
    return [];
  }
}

const getCredit = ()=> {
  let list = localStorage.getItem('Total Credit')
  if(list)
  {
    return JSON.parse(localStorage.getItem('Total Credit'))
  }
  else{
    return 0;
  }
}

const getDebit = ()=> {
  let list = localStorage.getItem('Total Debit')
  if(list)
  {
    return JSON.parse(localStorage.getItem('Total Debit'))
  }
  else{
    return 0;
  }
}

const getLoan = ()=> {
  let list = localStorage.getItem('Total Loan')
  if(list)
  {
    return JSON.parse(localStorage.getItem('Total Loan'))
  }
  else{
    return 0;
  }
}

const getAmount = ()=> {
  let list = localStorage.getItem('Total Amount')
  if(list)
  {
    return JSON.parse(localStorage.getItem('Total Amount'))
  }
  else{
    return 0;
  }
}

const page = () => {
  
  const [amount, setamount] = useState("")
  const [desc, setdesc] = useState("")

  const modes = ['cash', 'online', 'loan'];
  const [mode, setMode] = useState("cash")

  const [credit, setcredit] = useState(getCredit())
  const [debit, setDebit] = useState(getDebit())
  const [loan, setLoan] = useState(getLoan())
  const [total, settotal] = useState(getAmount())

  const [mainTask, setMainTask] = useState(getHistory())

  const submitHandler = (e)=>{
    e.preventDefault()
    const currentCredit = parseFloat(credit);
    const currentDebit = parseFloat(debit);
    const currentLoan = parseFloat(loan)
    const currentTotal = parseFloat(total)
    const newAmount = parseFloat(amount); 
    const CurrentDate = moment().format('MMMM Do YYYY')

    const updatedTotal = currentTotal + newAmount
    if(mode === 'loan')
    {
      const updateLoan = currentLoan + newAmount
      setLoan(updateLoan)
    }
    else {
    if(newAmount>0)
    {
      const updatedCredit = currentCredit + newAmount
      setcredit(updatedCredit)
      settotal(updatedTotal)
    }
    if(newAmount<0)
    {
      if((newAmount + currentTotal) < 0)
      {
        toast.error("Debit amount cannot be more than total holdings.", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "dark",
          });
          return;
      }
      const updatedDebit = currentDebit + newAmount
      setDebit(updatedDebit)
      settotal(updatedTotal)
    }
  }
    setMainTask([... mainTask, {amount, desc, mode, CurrentDate}])
    console.log(mainTask)
    setamount("")
    setdesc("")
  }

  const loan_handler =(loan, credit, toal, debit)=>{
    if(loan < 0)
    {
      toast.info("No pending loan amount.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
        });
        return;
    }
    if(loan>toal)
    { toast.error("The loan amount is more than money availible. Cannot process the transaction.", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: "dark",
      });
      return;
    }
    else{
      const CurrentDate = moment().format('MMMM Do YYYY')
      setMainTask([... mainTask, {amount:loan, desc:"paid all pending loans", mode:'loan', CurrentDate}])

      
      toal = toal - loan
      debit = debit - loan
      settotal(toal)
      setLoan("0")
      setDebit(debit)

      toast.success("Loan Repaid", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
        });
        return;
    }
  }
  
  let totalColor = "white"
  if((total < 0))
  {
    totalColor="rgb(252 165 165)"
  }

  let loanColor = "white"
  if((loan > 0))
  {
    loanColor = "rgb(252 165 165)"
  }
  if((loan < 0))
  {
     loanColor = "rgb(134 239 172)"
  }

  let renderTask = <h2 className='text-center'>No Transaction History Availible</h2>
  if(mainTask.length>0)
  {
    renderTask = mainTask.map((t,i)=>{  
    let listColor
    if(t.mode === 'loan')
    {
      listColor = " linear-gradient(to right, rgba(0,0,255,0), rgba(0,0,255,0.7))"
    }
      return(
        <li key={i} className='border-sky-300 border-b-2 flex justify-between mb-4' style={{backgroundImage: listColor}}>
        <h5 className='text-xl font-semibold pl-10 min-w-[25%]'>{'\u20B9'}{t.amount}</h5>
        <h6 className='text-center truncate text-xl font-semibold min-w-[25%] max-w-[25%]'>{t.desc}</h6>
        <h6 className='text-center text-xl font-semibold min-w-[25%]'>{t.mode}</h6>
        <h6 className='text-right text-xl font-semibold pr-5 min-w-[25%]'>{t.CurrentDate}</h6>
      </li>
      )
    })
  }

  useEffect(()=> {
    localStorage.setItem('History', JSON.stringify(mainTask))
  }, [mainTask]
  )

  useEffect(()=> {
    localStorage.setItem('Total Credit', JSON.stringify(credit))
  }, [credit]
  )

  useEffect(()=> {
    localStorage.setItem('Total Debit', JSON.stringify(debit))
  }, [debit]
  )

  useEffect(()=> {
    localStorage.setItem('Total Loan', JSON.stringify(loan))
  }, [loan]
  )

  useEffect(()=> {
    localStorage.setItem('Total Amount', JSON.stringify(total))
  }, [total]
  )
  return (
    <>
    <Form amount={amount} desc={desc} mode={mode} modes={modes} submitHandler={submitHandler} setamount={setamount} setdesc={setdesc} setMode={setMode} />
    <hr/> <br/>
    <Table credit={credit} debit={debit} loan={loan} total={total} totalColor={totalColor} loanColor = {loanColor} />
    <div className='flex items-center justify-center'>
    <button className='bg-black text-white px-4 py-3 text-2xl font-bold rounded m-5' onClick={()=>{{loan_handler(loan, credit, total, debit)}}}>Loan Repaid</button>
    </div> <br/>
    <History renderTask={renderTask} />
    <hr />
    <ToastContainer />
   </>
  )
}
export default page