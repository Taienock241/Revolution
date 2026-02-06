import React, { useEffect, useState } from "react";
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import './App.css'

function Student() {
  const [student, setStudent] = useState([])

  useEffect(() => {
    axios.get('http://localhost:8081/')

      .then(res => setStudent(res.data))
      .catch(err => console.log(err))
  }, [])

 // axios.defaults.withCredentials = true

  const handleDelete = async (id) => {
    try {
      await axios.delete('http://localhost:8081/student/' + id)
     // window.location.reload()
    } catch (err) {
      console.log(err);
    }
  }
  const navigate = useNavigate()
  useEffect(()=>{
    axios.get('http://localhost:8082')
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
    <div className='d-flex vh-100 blend-bg justify-content-center align-items-center'>
      <div className='w-80 bg-white rounded p-3'>
        <Link to='/create' className='btn btn-success'>Add +</Link>
        <table className='table table-bordered table-striped mt-3'>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Course Name</th>
              <th>Registration Number</th>
              <th>Identity Number</th>
              <th>Email</th>
              <th><b>Date Of Registration</b></th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              student.map((data, i) => (
                <tr key={i}>
                  <td>{data.First}</td>
                  <td>{data.Last}</td>
                  <td>{data.Course}</td>
                  <td>{data.Reg}</td>
                  <td>{data.IDNo}</td>
                  <td>{data.Email}</td>
                  <td>{data.Date}</td>

                  <td>
                    <Link to={`update/${data.ID}`} className='btn btn-primary'>Update</Link>
                    <button className='btn btn-danger ms-2' onClick={e => handleDelete(data.ID)}>Delete</button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        
        </table>
        <div className='d-flex justify-content-between'>
        <Link to='/create' className='btn btn-success bg-primary'>Previous</Link>
        <Link to='/create' className='btn btn-success bg-danger'>Next</Link>


        </div>
      </div>
    </div>
  )
}

export default Student