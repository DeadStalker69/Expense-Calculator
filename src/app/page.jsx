"use client"
import React, { useState, useEffect } from 'react'
import Table from './Table'
import History from './History'
import Form from './Form'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import moment from 'moment'
import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'




const page = () => {

  const router = useRouter();
  const { data: session } = useSession();
  
  const [amount, setamount] = useState("")
  const [desc, setdesc] = useState("")

  const modes = ['cash', 'online', 'loan'];
  const [mode, setMode] = useState("cash")

  const [credit, setcredit] = useState(0)
  const [debit, setDebit] = useState(0)
  const [loan, setLoan] = useState(0)
  const [total, settotal] = useState(0)

  const [mainTask, setMainTask] = useState([])

  useEffect(()=> {
    const fetchHistory = async ()=> {
      const response = await fetch(`/api/users/${session?.user.id}/posts`)
      const data = await response.json()

      setMainTask(data)
    }
    if(session?.user.id) fetchHistory()
  }, [session?.user.id, mainTask])


  useEffect(()=> {
    const fetchtable = async ()=> {
      const response = await fetch(`/api/users/${session?.user.id}/table`)
      const data = await response.json()

      data.map((t)=> {
        setDebit(t.debit)
        setcredit(t.credit)
        setLoan(t.loan)
        settotal(t.total)
      })
    }
    if(session?.user.id) fetchtable()
  }, [mainTask])  

  const submitHandler = async (e)=>{
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
      try {
        const response1 = await fetch('/api/table/new', {
          method: 'POST',
          body: JSON.stringify({
            email: session?.user.id,
            total: total,
            credit: credit,
            debit: debit,
            loan: updateLoan,
          })
        })
        if(!response1.ok)
        {
          throw new error("Failed to fetch response 1")
        }

        const response2 = await fetch('/api/history/new', {
          method: 'POST',
          body: JSON.stringify({
            email: session?.user.id,
            amount: newAmount,
            desc: desc,
            mode: mode,
            date: CurrentDate,
          })
        })
        if(!response2.ok)
        {
          throw new error("Failed to fetch response 2")
        }

        console.log("Both APIs called successfully")
      }
      catch(error)
      {
        console.log(error)
      }
    }
    else {
    if(newAmount>0)
    {
      const updatedCredit = currentCredit + newAmount
      setcredit(updatedCredit)
      settotal(updatedTotal)
      try {
        const response1 = await fetch('/api/table/new', {
          method: 'POST',
          body: JSON.stringify({
            email: session?.user.id,
            total: updatedTotal,
            credit: updatedCredit,
            debit: debit,
            loan: loan,
          })
        })
        if(!response1.ok)
        {
          throw new error("Failed to fetch response 1")
        }

        const response2 = await fetch('/api/history/new', {
          method: 'POST',
          body: JSON.stringify({
            email: session?.user.id,
            amount: newAmount,
            desc: desc,
            mode: mode,
            date: CurrentDate,
          })
        })
        if(!response2.ok)
        {
          throw new error("Failed to fetch response 2")
        }

        console.log("Both APIs called successfully")
      }
      catch(error)
      {
        console.log(error)
      }
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
      try {
        const response1 = await fetch('/api/table/new', {
          method: 'POST',
          body: JSON.stringify({
            email: session?.user.id,
            total: updatedTotal,
            credit: credit,
            debit: updatedDebit,
            loan: loan,
          })
        })
        if(!response1.ok)
        {
          throw new error("Failed to fetch response 1")
        }

        const response2 = await fetch('/api/history/new', {
          method: 'POST',
          body: JSON.stringify({
            email: session?.user.id,
            amount: newAmount,
            desc: desc,
            mode: mode,
            date: CurrentDate,
          })
        })
        if(!response2.ok)
        {
          throw new error("Failed to fetch response 2")
        }

        console.log("Both APIs called successfully")
      }
      catch(error)
      {
        console.log(error)
      }
    }
  }
      toast.success("Transaction added successfully.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        progress: undefined,
        theme: "dark",
      }
      )
      setamount("")
      setdesc("")
      }

  const loan_handler = async (loan, credit, toal, debit)=>{

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

      try {
        const response = await fetch('/api/history/new', {
          method: 'POST',
          body: JSON.stringify({
            email: session?.user.id,
            amount: loan,
            desc: "Loan repaid",
            mode: "loan",
            date: CurrentDate,
          })
        })
    }
    catch(error) {
      console.log(error)
    }
    try {
      const response1 = await fetch('/api/table/new', {
        method: 'POST',
        body: JSON.stringify({
          email: session?.user.id,
          total: total,
          credit: parseFloat(credit),
          debit: parseFloat(debit),
          loan: 0,
        })
      })
      if(response1.ok)
      {
        console.log("Success")
      router.push('./')
      }
    }
    catch(error)
    {
      console.log(error)
    }

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
        <h6 className='text-right text-xl font-semibold pr-5 min-w-[25%]'>{t.date}</h6>
      </li>
      )
    })
  }

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