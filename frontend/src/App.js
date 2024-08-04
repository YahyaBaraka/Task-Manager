import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext';
import { useEffect } from 'react';


import Navbar from './components/Navbar'
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import MyHome from './pages/MyHome';
import Modal from 'react-modal';

function App() {
  const { user } = useAuthContext();
  useEffect(() => {
    Modal.setAppElement('#root');
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route 
              path="/"
              element={user ? <MyHome /> : <Navigate to="/login" />}
            />
            <Route 
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route 
              path="/signup"
              element={!user ? <SignUp /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;