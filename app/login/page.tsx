"use client"

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

function page() {  

  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')

  
  const router = useRouter()

  const  handleSubmit = async(e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      // console.log(email,password)
      const result = await signIn("credentials",{
        email,
        password,
        redirect:false,
      })

      // console.log(result)
      if(result?.error){
        console.log(result.error)
      }else{
        alert("User Register Successfully")
        router.push("/")
      }

  }


  return (
   <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-xl border border-gray-200 bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-3xl font-bold text-gray-800">
          Login
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

          <button
            type="submit"
            className="w-full rounded-lg bg-emerald-600 py-3 font-semibold text-white transition hover:bg-emerald-700 active:scale-[0.98]"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <button
            onClick={() => router.push("/register")}
            className="font-semibold text-emerald-600 transition hover:text-emerald-700 hover:underline"
          >
            Register
          </button>
        </div>

        {/*
        <button
          onClick={() => signIn("google")}
          className="mt-4 flex w-full items-center justify-center rounded-lg border border-gray-300 py-3 font-medium transition hover:bg-gray-100"
        >
          Sign in with Google
        </button>
        */}
      </div>
   </div>
  )
}

export default page
