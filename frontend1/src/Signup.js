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
      const [loading, setLoading] = useState(false)
      const [error, setError] = useState('')

     const handleInput = (event)=>{
          setValues(prev=>({...prev,[event.target.name]:event.target.value}))
     }
    
      const navigate = useNavigate()

     const handleSubmit = async(event)=>{
        event.preventDefault()
        setError('')
        if (!values.name || !values.email || !values.password) {
            setError('All fields are required.')
            return
        }

        try {
            setLoading(true)
            const res = await axios.post('http://localhost:8082/signup',values)
            console.log(res.data)
            navigate('/login')
        } catch (err) {
            console.error('Signup failed:', err)
            setError('Unable to signup. Check backend/auth server.')
        } finally {
            setLoading(false)
        }
     }

  return (
    <div className='page-wrap auth-wrap'>
        <div className='auth-card card-shell'>
                <h1 className='form-title'>Create Account</h1>
                <p className='form-subtitle'>Get started with your student management workspace.</p>
            <form onSubmit={handleSubmit} className='form-grid'>
            {error && <div className='status-banner error'>{error}</div>}
                <div className='mb-3'>
                <label htmlFor='username' className='field-label'>Full Name</label>
                <input type='text' placeholder='Enter your full name' className='form-control field-input' name='name' value={values.name}
                    onChange={handleInput}
                />

                </div>

                <div className='mb-3'>
                <label htmlFor='name' className='field-label'>Email Address</label>
                <input type='text' placeholder='name@company.com' className='form-control field-input' name='email' value={values.email}
                    onChange={handleInput}
                />

                </div>

                <div className='mb-3'>
                <label htmlFor='password' className='field-label'>Password</label>
                <input type='password' placeholder='Create a secure password' className='form-control field-input' name='password' value={values.password}
                    onChange={handleInput}
                />

                </div>
                <button type='submit' className='btn app-btn btn-primary-main w-100' disabled={loading}>{loading ? 'Creating...' : 'Sign Up'}</button>
                <p className='form-meta'>Your account gives you access to secure student CRUD operations.</p>
                <Link to ='/login' className='btn app-btn btn-ghost w-100'>Login</Link>
      
            </form>
        </div>
    </div>
    
  )
}

export default Signup