import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './App.css'


function Login() {

    const [values, setValues] = useState({
        email: "",
        password: ""
    })
    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: [event.target.value] }))
    }
    axios.defaults.withCredentials = true
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault()
        axios.post('http://localhost:8082/login', values)
            .then(res => {
                if (res.data.Login) {
                    navigate('/')
                } else {
                    alert('No record')
                }
                console.log(res)

            })
            .catch(err => console.log('Err'))
    }
    useEffect(()=>{
        axios.get('http://localhost:8081')
        .then(res=>{
          //console.log(res)
          if(res.data.valid){
           navigate('/')
    
          }else{
            navigate('/login')
    
          }
        })
        .catch(err=>console.log(err))
    
       },[])     

    return (
        <div className='d-flex vh-100 justify-content-center align-items-center blend-bg'>
            <div className='w-50 bg-white rounded p-4'>
                <h1>Sign-In</h1>
                <form onSubmit={handleSubmit}>
                    <div className='mb-3'>
                        <label htmlFor='name'>Email</label>
                        <input type='text' placeholder='enter Email' className='form-control' name='email'
                            onChange={handleInput}
                        />

                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password'>Password</label>
                        <input type='password' placeholder='enter Password' className='form-control' name='password'
                            onChange={handleInput}
                        />
                        <button type='submit' className='btn btn-success w-100 rounded-0'>Login</button>
                        <p>You agree with our Terms And policies</p>
                        <Link to='/signup' className='btn btn-default border w-100 bg-light rounded-0'>Create Account</Link>

                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login