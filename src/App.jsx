import './App.css';
import {Routes, Route} from 'react-router-dom'
import Home from './components/Home';
import Navbar from './components/NavBar';
import Create from './components/Create'; 
import Contact from './components/Contact';
import Edit from './components/Edit';
import Delete from './components/Delete';

function App() {
  const myWidth =200
  return (
    <div className='App'>
      <Navbar 
      drawerWidth = {myWidth}
      content = {
        <Routes>
          <Route path='' element={<Home/>}/>
          <Route path='/create' element={<Create/>}/>
          <Route path='/edit/:id' element={<Edit/>}/>
          <Route path='/delete/:id' element={<Delete/>}/>
          <Route path='/contact' element={<Contact/>}/>
        </Routes>
      }

 
      
      
            
      />
      
    </div>
  );
}

export default App;