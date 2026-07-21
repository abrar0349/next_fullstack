// import { error } from 'console'
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

        if(!data.ok){
          throw new Error(data.error || "Registeration Failed")
        }
        console.log(data)

        router.push("/login")

      }catch(error){

        console.error(error)
      }
  }
  return (
    <div>
        <h1>Register</h1>
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
             <input 
            type="password"
            placeholder='Confirm Password'
            value={confirmPassword}
            onChange={(e) => setPassword(e.target.value)} 
          />

          <button type = "submit">Registered</button>

        </form>

        <div>
          <p>Already have an Account <a href="/login">Login</a></p>
        </div>
    </div>
  )
}

export default RegisterPage
