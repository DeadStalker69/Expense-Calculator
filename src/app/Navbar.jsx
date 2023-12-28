"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';

const Navbar = () => {
  const { data: session } = useSession();
  const [providers, setProviders] = useState(null);

  useEffect(() => {
    const fetchProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };
    fetchProviders();
  }, []);

  return (
    console.log({providers}),
    <nav className='flex justify-between bg-black'>
      <Link href='/' className='text-white p-3 text-3xl font-bold text-center mt-4'>My Expense Tracker</Link>
      {session?.user ? (
        <div className='p-5'>
         <Link href='/Debit' className='text-white p-3 text-3xl font-bold text-center pr-7'>Debit</Link>
          <Link href='/Credit' className='text-white p-3 text-3xl font-bold text-center'>Credit</Link>
          <Link href='/Loan' className='text-white p-3 text-3xl font-bold text-center'>Loan</Link>
          <Link href='/Conversion_calculator' className='text-white p-3 text-3xl font-bold text-center'>Converter</Link>
          <button type="button" onClick={signOut} className='text-white p-3 text-3xl font-bold text-center'>Sign-Out</button>
        </div>
      ) : (
        <div className='p-5'>
              <button
                type="button"
                onClick={() => signIn("google")}
                className='text-white p-3 text-3xl font-bold text-center'
              > Sign-In </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
