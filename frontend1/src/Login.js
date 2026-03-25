import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import './App.css'


function Login() {

    const [values, setValues] = useState({
        email: "",
        password: ""
    })
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const handleInput = (event) => {
        setValues(prev => ({ ...prev, [event.target.name]: event.target.value }))
    }
    axios.defaults.withCredentials = true
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault()
        setError('')
        if (!values.email || !values.password) {
            setError('Email and password are required.')
            return
        }

        try {
            setLoading(true)
            const res = await axios.post('http://localhost:8082/login', values)
            if (res?.data?.Login) {
                navigate('/')
            } else {
                setError('No record found.')
            }
        } catch (err) {
            console.error('Login request failed:', err)
            setError('Login failed. Check if auth backend is running on port 8082.')
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        axios.get('http://localhost:8082')
        .then(res=>{
          if(res.data.valid){
           navigate('/')
    
          }else{
            navigate('/login')
    
          }
        })
        .catch(err=>{
            console.error('Session check failed:', err)
        })
    
       },[navigate])     

    return (
        <div className='page-wrap auth-wrap'>
            <div className='auth-card card-shell'>
                <h1 className='form-title'>Welcome Back</h1>
                <p className='form-subtitle'>Sign in to manage students, records, and updates securely.</p>
                <form onSubmit={handleSubmit} className='form-grid'>
                    {error && <div className='status-banner error'>{error}</div>}
                    <div className='mb-3'>
                        <label htmlFor='name' className='field-label'>Email Address</label>
                        <input type='text' placeholder='name@company.com' className='form-control field-input' name='email'
                            onChange={handleInput}
                        />

                    </div>
                    <div className='mb-3'>
                        <label htmlFor='password' className='field-label'>Password</label>
                        <input type='password' placeholder='Enter your secure password' className='form-control field-input' name='password'
                            onChange={handleInput}
                        />

                    </div>
                    <button type='submit' className='btn app-btn btn-primary-main w-100' disabled={loading}>{loading ? 'Logging in...' : 'Login'}</button>
                    <p className='form-meta'>By continuing, you agree to our terms and privacy policy.</p>
                    <Link to='/signup' className='btn app-btn btn-ghost w-100'>Create Account</Link>

                </form>
            </div>
        </div>
    )
}

export default Login