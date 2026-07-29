// import { error } from 'console'
"use client"

import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function RegisterPage() {

  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')
  const [confirmPassword , setConfirmPassword] = useState('')
  
  const router = useRouter()

  const  handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      if(password !== confirmPassword){
        alert('Password do no Match')
        return;
      }

      try{
        const res = await fetch("/api/auth/register",{
          method:"post",
          headers:{
            "Content-type": "application/json"
          },
          body: JSON.stringify({
            email,
            password
          }),
        })

        const data = await res.json()

        if(!res.ok){
          throw new Error(data.error || "Registeration Failed")
        }
        console.log(data)
        alert(data.message)
        router.push("/login")

      }catch(error){

          if (error instanceof Error) {
                console.error(error.message);
                alert(error.message);
            } else {
                console.error("Unknown Error");
            } 
      }
  }

  return (
  <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
  <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-8 shadow-lg">
    <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
      Register
    </h1>

    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-gray-700">
          Confirm Password
        </label>
        <input
          type="password"
          placeholder="Confirm your password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200"
        />
      </div>

      <button
        type="submit"
        className="w-full rounded-lg bg-emerald-600 py-3 font-semibold text-white transition hover:bg-emerald-700 active:scale-[0.98]"
      >
        Register
      </button>
    </form>

    <div className="mt-6 text-center text-sm text-gray-600">
      Already have an account?{" "}
      <button
        type="button"
        onClick={() => router.push("/login")}
        className="font-semibold text-emerald-600 transition hover:text-emerald-700 hover:underline"
      >
        Login
      </button>
    </div>
  </div>
</div>
  )
}

export default RegisterPage
