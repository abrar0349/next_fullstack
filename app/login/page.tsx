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

      const result = await signIn("credentials",{
        email,
        password,
        redirect:false
      })

      if(result?.error){
        console.log(result.error)
      }else{
        alert("User Register Successfully")
        router.push("/")
      }

  }


  return (
    <div>
      
       <h1>Login</h1>
        <form onSubmit={handleSubmit}>

          <input 
            type="email"
            placeholder='Email'
            value={email}
            onChange={(e) => setEmail(e.target.value)} 
          />
          <input 
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)} 
          />
        
          <button type = "submit">Login</button>

        </form>

        <div>

{/*       <button
            onClick={() => signIn("google")}>
             SigIn With Google
          </button> */}

          Don't have an Account? <button onClick={() => router.push("/register")}>Register</button>
        </div>
    </div>
  )
}

export default page
