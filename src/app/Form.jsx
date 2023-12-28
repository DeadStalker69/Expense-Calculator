import React from 'react'

const Form = ({amount, desc, mode, modes, submitHandler, setamount, setdesc, setMode,}) => {
  return (
    <form onSubmit={submitHandler} className='text-center'>
      <input type='number'  className='text-2xl border-zinc-800 border-2 m-5 px-4 py-2' placeholder='Enter amount here' value={amount} onChange={(e) =>{setamount(e.target.value)}}/>
      
      <input type='text' className='text-2xl border-zinc-800 border-2 m-5 px-4 py-2' placeholder='Enter Description here' value={desc} onChange={(e)=>{setdesc(e.target.value)}}/>

      <select className="text-2xl border-zinc-800 border-2 m-5 px-4 py-2" value={mode} onChange={(e) => setMode(e.target.value)}>
      {modes.map((option) => (
        <option key={option} value={option}>
        {option}
      </option>
      ))}
      </select>

      <button className='bg-black text-white px-4 py-3 text-2xl font-bold rounded m-5'>Add Transaction</button>
    </form>
  )
}

export default Form