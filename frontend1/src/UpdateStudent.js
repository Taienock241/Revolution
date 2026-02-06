import React, {  useState } from "react"
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
       const[date,setDate]= useState([])
    const navigate = useNavigate();


    function handleSubmit(event) {
        event.preventDefault()
        console.log("Submitting:", { first,last, course,reg,idno, email,date });
        axios.put('http://localhost:8081/update/' + id, { first,last, course,reg,idno, email,date })
            .then(res => {
                // console.log(res)
                console.log("Response:", res.data);
                navigate('/')
            }).catch(err => console.log(err))
    }
    return (
        <div className='d-flex vh-100 blend-bg justify-content-center align-items-center'>
            <div className='w-50 bg-white rounded p-3'>
                <form onSubmit={handleSubmit}>
                    <h2>Update Student</h2>
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
                    <button className='btn btn-success'>Update</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateStudent






