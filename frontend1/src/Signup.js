import axios from 'axios'
import React, { useState} from 'react'
import {Link,useNavigate } from 'react-router-dom'
import './App.css'


function Signup() {
     const [values, setValues]= useState({
        name:"",
        email:"",
        password:""
     })
     const handleInput = (event)=>{
        setValues(prev=>({...prev,[event.target.name]:[event.target.value]}))
     }
    
      const navigate = useNavigate()

     const handleSubmit = async(event)=>{
        event.preventDefault()
         axios.post('http://localhost:8082/signup',values)
        .then(res=>{
            console.log(res.data)
            navigate('/login')
        })
         .catch(err=>console.log(err))   
     }

  return (
    <div className='d-flex vh-100 justify-content-center align-items-center blend-bg'>
        <div className='w-50 bg-white rounded p-4'>
                <h1>Sign-Up</h1>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                <label htmlFor='username'>Username</label>
                <input type='text' placeholder='enter Username' className='form-control' name='name' value={values.name}
                    onChange={handleInput}
                />

                </div>

                <div className='mb-3'>
                <label htmlFor='name'>Email</label>
                <input type='text' placeholder='enter Email' className='form-control' name='email' value={values.email}
                    onChange={handleInput}
                />

                </div>

                <div className='mb-3'>
                <label htmlFor='password'>Password</label>
                <input type='password' placeholder='enter Password' className='form-control' name='password' value={values.password}
                    onChange={handleInput}
                />
                <button type='submit' className='btn btn-success w-100 rounded-0'>Sign Up</button>
                <p>You agree with our Terms And policies</p>
                <Link to ='/login' className='btn btn-default  border w-100 bg-danger rounded-0'>Login</Link>
      
                </div>
            </form>
        </div>
    </div>
    
  )
}

export default Signup