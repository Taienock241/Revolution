import React, { useEffect, useState } from "react";
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import './App.css'

function Student() {
  const [student, setStudent] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const fetchStudents = async () => {
    setLoading(true)
    setError("")
    try {
      const res = await axios.get('http://localhost:8081/')
      const payload = res?.data?.data
      const safeData = Array.isArray(payload) ? payload : []
      setStudent(safeData)
    } catch (err) {
      console.error("Failed to load students:", err)
      setStudent([])
      setError("Unable to load students. Check if backend is running on port 8081.")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchStudents()
  }, [])

 // axios.defaults.withCredentials = true

  const handleDelete = async (id) => {
    try {
      await axios.delete('http://localhost:8081/student/' + id)
      setStudent((prev) => prev.filter((item) => item.ID !== id))
    } catch (err) {
      console.error("Delete failed:", err)
      setError("Delete failed. Please try again.")
    }
  }
  const navigate = useNavigate()
  useEffect(() => {
    axios.get('http://localhost:8082')
      .then(res => {
        if (!res?.data?.valid) {
          navigate('/login')
        }
      })
      .catch(err => {
        console.error("Auth check failed:", err)
        navigate('/login')
      })
  }, [navigate])

  return (
    <div className='d-flex vh-100 blend-bg justify-content-center align-items-center'>
      <div className='page-shell bg-white card-shell p-3'>
        {error && <div className='status-banner error'>{error}</div>}
        <Link to='/create' className='btn btn-success'>Add +</Link>
        <div className='table-wrap mt-3'>
        <table className='table table-bordered table-striped'>
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
            {loading && (
              <tr>
                <td colSpan='8' className='loading-row'>Loading students...</td>
              </tr>
            )}
            {!loading && Array.isArray(student) && student.length === 0 && (
              <tr>
                <td colSpan='8' className='loading-row'>No students found.</td>
              </tr>
            )}
            {!loading && Array.isArray(student) && student.map((data, i) => (
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
              ))}
          </tbody>
        
        </table>
        </div>
        <div className='d-flex justify-content-between'>
        <Link to='/create' className='btn btn-success bg-primary'>Add New</Link>
        <button className='btn btn-secondary' onClick={fetchStudents}>Refresh</button>


        </div>
      </div>
    </div>
  )
}

export default Student