import React from 'react'
import page from './page'

export const Table = ({ credit, debit, loan, total, totalColor, loanColor }) => {
  return (
    <div className='flex items-center justify-center'>
    <table className='border-black border border-collapse border-spacing-2 min-w-[40%]'>
    <thead>
      <tr>
        <th className='border border-black p-5'>Total Credit</th>
        <th className='border border-black p-5'> Total Debit</th>
        <th className='border border-black p-5'>Loan</th>
      </tr>
    </thead>
    <tbody>
    <tr >
      <td className='border border-black p-10 bg-green-300 text-center text-4xl '>{credit}</td>
      <td className='border border-black p-10  bg-red-300 to-white text-center text-4xl'>{debit}</td>
      <td className='border border-black p-10 text-center text-4xl' style={{backgroundColor: loanColor}} rowSpan={2}>{loan}</td>
    </tr>
    <tr>
      <td className='border border-black p-3 text-center font-semibold'>Total</td>
      <td className='border border-black p-3 text-center' style={{backgroundColor: totalColor}}> {total}</td>
    </tr>
    </tbody>
    
  </table>
  </div>
  )
}

export default Table
