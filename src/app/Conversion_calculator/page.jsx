"use client"
import React, { useState, useEffect } from 'react'
import moment from 'moment'

import { useRouter } from 'next/navigation'
import { useSession } from 'next-auth/react'

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ConversionCalcPage = (page) => {
  
  const router = useRouter();
  const { data: session } = useSession();

  const currencies = ['USD (\u0024)', 'AUD (\u0024)', 'EURO (\u20AC)', 'CAD (\u0024)'];
  const [foreignCurrency, setforeignCurrency] = useState("")
  const [amount, setAmount] = useState("")
  const [value, setValue] = useState("")
  const [convertedValue, setconvertedValue] = useState("")
  const [credit, setcredit] = useState(0)
  const [debit, setDebit] = useState(0)
  const [loan, setLoan] = useState(0)
  const [total, settotal] = useState(0)

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
  }, [session?.user.id])  

  
function ConvertedValueBloack({ amount, value, onChange }) {

  useEffect(() => {
    setconvertedValue(amount * 1/value);
  }, [amount, value]);

  return (
    <div className='flex justify-between '>
      <h3 className='text-2xl m-5 px-4 py-2 font-bold'>Amount in INR: </h3>
      <h3 className='text-2xl border-zinc-800 border-2 m-5 px-4 py-2'>{convertedValue}</h3>
    </div>
  );
}
  const submitCredit =  async (convertedValue)=> {
    const amount = convertedValue
    const desc = "Got foreign currency"
    const mode = "online"
    const CurrentDate = moment().format('MMMM Do YYYY')
    
    // let updatedMainTask
    // let MainTaskYet = localStorage.getItem('History')
    // if(MainTaskYet)
    // {
    //   updatedMainTask = JSON.parse(MainTaskYet)
    //   updatedMainTask = [... updatedMainTask, {amount, desc, mode, CurrentDate}]
    // }
    // else {
    //   updatedMainTask = [{amount, desc, mode, CurrentDate}]
    // }
    // localStorage.setItem('History', JSON.stringify(updatedMainTask))

    // let Credityet = localStorage.getItem('Total Credit')
    // Credityet = JSON.parse(Credityet)
    // Credityet += amount
    // localStorage.setItem('Total Credit', JSON.stringify(Credityet))

    // let Amountyet = localStorage.getItem('Total Amount')
    // Amountyet = JSON.parse(Amountyet)
    // Amountyet += amount
    // localStorage.setItem('Total Amount', JSON.stringify(Amountyet))

    try {
      const response = await fetch('/api/history/new', {
        method: 'POST',
        body: JSON.stringify({
          email: session?.user.id,
          amount: amount,
          desc: desc,
          mode: mode,
          date: CurrentDate,
        })
      })
      if(response.ok)
      {
      router.push('./')
      }
      const response1 = await fetch('/api/table/new', {
        method: 'POST',
        body: JSON.stringify({
          email: session?.user.id,
          total: total + amount,
          credit: credit + amount,
          debit: debit,
          loan: loan,
        })
      })
    
  }
  catch(error) {
    console.log(error)
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
  } 


  const submitDebit = async (convertedValue)=> {
    const amount = 0 - convertedValue
    const desc = "Paid in foreign currency"
    const mode = "online"
    const CurrentDate = moment().format('MMMM Do YYYY')

    if(convertedValue > total)
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
    else {
        
    // let updatedMainTask
    // let MainTaskYet = localStorage.getItem('History')
    // if(MainTaskYet)
    // {
    //   updatedMainTask = JSON.parse(MainTaskYet)
    //   updatedMainTask = [... updatedMainTask, {amount, desc, mode, CurrentDate}]
    // }
    // else {
    //   updatedMainTask = [{amount, desc, mode, CurrentDate}]
    // }
    // localStorage.setItem('History', JSON.stringify(updatedMainTask))

    // let Debityet = localStorage.getItem('Total Debit')
    // Debityet = JSON.parse(Debityet)
    // Debityet += amount
    // localStorage.setItem('Total Debit', JSON.stringify(Debityet))

    // let Amountyet = localStorage.getItem('Total Amount')
    // Amountyet = JSON.parse(Amountyet)
    // Amountyet += amount
    // localStorage.setItem('Total Amount', JSON.stringify(Amountyet))

    try {
      const response = await fetch('/api/history/new', {
        method: 'POST',
        body: JSON.stringify({
          email: session?.user.id,
          amount: amount,
          desc: desc,
          mode: mode,
          date: CurrentDate,
        })
      })
      if(response.ok)
      {
      router.push('./')
      }
      const response1 = await fetch('/api/table/new', {
        method: 'POST',
        body: JSON.stringify({
          email: session?.user.id,
          total: total + amount,
          credit: credit,
          debit: debit + amount,
          loan: loan,
        })
      })
    
  }
  catch(error) {
    console.log(error)
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
}
  } 
  return (
    <>
      <div className='flex justify-between'>
        <div className='text-2xl m-5 px-4 py-2 font-bold'>Select the the foreign currecy:</div>
        <div>
    <select className="text-2xl border-zinc-800 border-2 m-5 px-4 py-2" value={foreignCurrency} onChange={(e) => setforeignCurrency(e.target.value)}>
      {currencies.map((option) => (
        <option key={option} value={option}>
        {option}
      </option>
      ))}
      </select>
      </div>
      </div>
        
      <div className='flex justify-between'>
      <div className='text-2xl m-5 px-4 py-2 font-bold text-right'> Enter the amount:</div>
      <div>
      <input type='number' min={0} step={0.01} className='text-2xl border-zinc-800 border-2 m-5 px-4 py-2' value={amount} onChange={(e) =>{setAmount(e.target.value)}}/>
      </div>
      </div>

      <div className='flex justify-between '>
      <div className='text-2xl m-5 px-4 py-2 font-bold text-right'> Enter the foreign amount you will get in exchange of 1 INR:</div>
      <div>
      <input type='number' min={0} step={0.01} className='text-2xl border-zinc-800 border-2 m-5 px-4 py-2' value={value} onChange={(e) =>{setValue(e.target.value)}}/>
      </div>
      </div>
       <br />
       <ConvertedValueBloack amount={amount} value={value} />
        <br />
        <br />
       <div className='flex justify-center'>
      <button className='bg-black text-white px-4 py-3 text-2xl font-bold rounded m-5' onClick={()=> {submitCredit(convertedValue)}}>Add To Credit</button>
      <button className='bg-black text-white px-4 py-3 text-2xl font-bold rounded m-5' onClick={()=> {submitDebit(convertedValue)}}>Add To Debit</button>
      </div>
      <ToastContainer />
    </>
  )
}

export default ConversionCalcPage