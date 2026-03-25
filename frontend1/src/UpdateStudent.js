import React, { useEffect, useState } from "react"
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import './App.css'

function UpdateStudent() {
    const { id } = useParams();
    const [first, setFirst] = useState('')
       const [last, setLast] = useState('')
       const [course, setCourse] = useState('')
       const [reg, setReg] = useState('')
       const [idno, setIDNo] = useState('')
       const [email, setEmail] = useState('')
       const [date, setDate] = useState('')
       const [loading, setLoading] = useState(false)
       const [pageLoading, setPageLoading] = useState(true)
       const [error, setError] = useState('')
    const navigate = useNavigate();

    useEffect(() => {
        const loadStudent = async () => {
            setPageLoading(true)
            try {
                const res = await axios.get('http://localhost:8081/')
                const rows = Array.isArray(res?.data?.data) ? res.data.data : []
                const current = rows.find((row) => String(row.ID) === String(id))

                if (!current) {
                    setError('Student not found.')
                    return
                }

                setFirst(current.First || '')
                setLast(current.Last || '')
                setCourse(current.Course || '')
                setReg(current.Reg || '')
                setIDNo(current.IDNo || '')
                setEmail(current.Email || '')
                setDate(current.Date || '')
            } catch (err) {
                console.error('Failed to load student for edit:', err)
                setError('Unable to load student data. Check backend connection.')
            } finally {
                setPageLoading(false)
            }
        }

        loadStudent()
    }, [id])


    async function handleSubmit(event) {
        event.preventDefault()
        setError('')
        if (!first || !last || !course || !reg || !idno || !email || !date) {
            setError('All fields are required.')
            return
        }

        try {
            setLoading(true)
            const res = await axios.put('http://localhost:8081/update/' + id, { first, last, course, reg, idno, email, date })
            console.log("Response:", res.data)
            navigate('/')
        } catch (err) {
            console.error('Update failed:', err)
            setError('Unable to update student. Please try again.')
        } finally {
            setLoading(false)
        }
    }
    return (
        <div className='d-flex vh-100 blend-bg justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3 card-shell'>
                <form onSubmit={handleSubmit}>
                    {error && <div className='status-banner error'>{error}</div>}
                    <h2>Update Student</h2>
                    {pageLoading && <div className='status-banner success'>Loading student details...</div>}
                    <div className='mb-2'>
                        <label htmlFor=''>First Name</label>
                        <input type='text' placeholder='Enter First_Name' className='form-control' value={first}
                            onChange={e => setFirst(e.target.value)}
                        />
                    </div>
                    <div className='mb-2' >
                    <label htmlFor=''>Last Name</label>
                        <input type='text' placeholder='Enter Last Name' className='form-control' value={last}
                            onChange={e => setLast(e.target.value)}
                        /> 

                    </div>

                    <div  className='mb-2' >
                    <label htmlFor=''> Course</label>
                        <input type='text' placeholder='Enter Course' className='form-control' value={course}
                            onChange={e => setCourse(e.target.value)}
                        />
                    </div>

                    <div  className='mb-2' >
                    <label htmlFor=''>Reg No</label>
                        <input type='text' placeholder='Enter Reg NO' className='form-control'value={reg}
                            onChange={e => setReg(e.target.value)}
                        />  
                    </div>

                    <div className='mb-2' >
                    <label htmlFor=''>ID No</label>
                        <input type='text' placeholder='Enter ID No' className='form-control' value={idno}
                            onChange={e => setIDNo(e.target.value)}
                        />
                    </div>

                    <div className='mb-2'>
                        <label htmlFor=''>Email</label>
                        <input type='email' placeholder='Enter Email' className='form-control' value={email}
                            onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='mb-2'>
                        <label htmlFor=''> Date</label>
                        <input type='date' placeholder='Date of Registration' className='form-control' value={date}
                        onChange={e=>setDate(e.target.value)}
                         />
                    </div>
                    
            
                    <button className='btn btn-success' disabled={loading || pageLoading}>{loading ? 'Updating...' : 'Update'}</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateStudent






