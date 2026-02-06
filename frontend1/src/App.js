
//import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import CreateStudent from './CreateStudent'
import Student from './student'
import UpdateStudent  from './UpdateStudent';
import Login from './Login'
import Signup from './Signup'



function App() {
 
return (
    <div className="App">
      <BrowserRouter>

        <Routes>
          <Route path='/' element={<Student />} />
          <Route path='/create' element={<CreateStudent />} />
          <Route path='/update/:id' element={<UpdateStudent />} />
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;

