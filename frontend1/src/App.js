
//import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import './index.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CreateStudent from './CreateStudent'
import Student from './student'
import UpdateStudent  from './UpdateStudent';
import Login from './Login'
import Signup from './Signup'
import axios from 'axios'
import { Link } from 'react-router-dom'



function App() {
axios.defaults.withCredentials = true
 
return (
    <div className="App">
      <BrowserRouter>
        <header className='site-header'>
          <div className='container shell-flex'>
            <Link to='/' className='brand-link'>
              <span className='brand-mark'>SC</span>
              <span className='brand-text'>Student Central</span>
            </Link>
            <nav className='site-nav'>
              <Link to='/' className='nav-link'>Students</Link>
              <Link to='/create' className='nav-link'>Add Student</Link>
              <Link to='/login' className='nav-link'>Login</Link>
              <Link to='/signup' className='nav-link nav-cta'>Signup</Link>
            </nav>
          </div>
        </header>

        <main className='site-main'>

        <Routes>
          <Route path='/' element={<Student />} />
          <Route path='/create' element={<CreateStudent />} />
          <Route path='/update/:id' element={<UpdateStudent />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />


        </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}

export default App;

