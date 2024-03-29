import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Index from './components/IndexPage';
import Register from './components/Register';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <div className="App">
        <Router>
          <Routes>
            <Route path='/' element={<Index />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route path='/dashboard' element={<Dashboard />} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;