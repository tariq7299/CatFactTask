import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './pages/Login/Login';
import AuthProvider from './hooks/AuthProvider';
import PrivateRoute from './pages/PrivateRoute/PrivateRoute';
import Home from './pages/Home/Home';
import AlertProvider from './hooks/AlertProvider';

// TASK #4 : Manage app state using Context API and CRUD operations
// Add Authentication using React Context API
function App() {
  return (
    <>
      <BrowserRouter>
        <AlertProvider>
          <AuthProvider>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route element={<PrivateRoute />}>
                <Route path="/" element={<Home />}></Route>
              </Route>
            </Routes>
          </AuthProvider>
        </AlertProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
