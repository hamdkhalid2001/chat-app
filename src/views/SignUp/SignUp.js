import React from 'react'
import { Link } from "react-router-dom";

function SignUp() {
  return (
    <div className='w-full h-[100vh] flex flex-col justify-center items-center'>
        <h1>Sign up to Get Started</h1>
        <section className='mt-8 grid gap-y-4'>
            <input type="text" name="text" id="firstName" placeholder='First Name'/>
            <input type="text" name="text" id="lastName" placeholder='Last Name'/>
            <input type="text" name="username" id="username" placeholder='User Name'/>
            <input type="text" name="email" id="email" placeholder='Email'/>
            <input type="password" name="password" id="password" placeholder='Password' />
            <input type="date" id="birthday" name="birthday"></input>
            <Link to={'/chat-page'}>
                <button className='w-[450px] mt-5 rounded-[8px] text-center py-2 bg-blue-500 text-white'>SignUp</button>
            </Link>
        </section>
    </div>
  )
}

export default SignUp
