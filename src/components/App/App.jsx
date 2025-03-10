import { useEffect } from 'react';
import {
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import useStore from '../../zustand/store';
import Nav from '../Nav/Nav';
import HomePage from '../HomePage/HomePage';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import DesignList from '../DesignList';
import DesignForm from '../DesignForm';
import BookingForm from '../BookingForm';
import CustomerPage from '../CustomerPage';
import Admin from '../Admin';

function App() {
  const user = useStore((state) => state.user);
  const fetchUser = useStore((state) => state.fetchUser);
  const fetchOfficeHours = useStore(state => state.fetchOfficeHours);

  useEffect(() => {
    fetchUser();
    fetchOfficeHours();
  }, [user.id]);

  return (
    <>
      <header className="bg-dark text-white">
        <h1>Marwa's Henna</h1>
        <Nav />
      </header>
      <main className="text-white">
        <Routes>
          <Route 
            exact path="/"
            element={
              user.id ? (
                <HomePage /> // Render HomePage for authenticated user.
              ) : (
                <Navigate to="/login" replace /> // Redirect unauthenticated user.
              )
            }
          />
          <Route 
            exact path="/login"
            element={
              user.id ? (
                <Navigate to="/" replace /> // Redirect authenticated user.
              ) : (
                <LoginPage /> // Render LoginPage for unauthenticated user.
              )
            }
          />
          <Route 
            exact path="/registration"
            element={
              user.id ? (
                <Navigate to="/" replace /> // Redirect authenticated user.
              ) : (
                <RegisterPage /> // Render RegisterPage for unauthenticated user.
              )
            }
          />
           <Route 
             path="/designlist"
            element={<DesignList />}
          />
          <Route 
             path="/designform"
            element={<DesignForm />}
          />
          <Route 
             path="/bookingform/:id"
            element={<BookingForm />}
          />
          <Route path="/customer" element={<CustomerPage />} />
          <Route 
             path="/admin"
            element={<Admin/>}
          />
          <Route 
            exact path="/about"
            element={
              <>
                <h2>About Page</h2>
                <p>
                Henna, a timeless form of art, has been practiced for centuries across various cultures.
                This intricate design technique uses a natural paste derived from the Lawsonia inermis plant
                to create beautiful patterns on the skin. Whether it's for weddings, festivals, or personal expression,
                henna designs add elegance and symbolism to special occasions.
                </p>
                <p>
                 The tradition of applying henna is steeped in cultural significance, often representing
                  prosperity, happiness, and blessings. From the delicate swirls of geometric patterns to
                  the bold expressions of floral designs, henna artistry can convey a wide range of meanings
                   and emotions.
                </p>
                <p>
                At Marwa Henna, we are dedicated to preserving the rich heritage of this ancient art while
                creating unique designs tailored to every individual. Our goal is to bring beauty and
                 meaning to every client through the art of henna.
                </p>
                <p>
                   <em> -- From Marwa Adan, Henna Artistry Mastery</em>.
                </p>
              </>
            }
          />
          <Route
            path="*"
            element={
              <h2>404 Page</h2>
            } 
          />
        </Routes>
      </main>
      <footer className="bg-dark text-white text-center py-3">
        <p>Copyright © {new Date().getFullYear()}</p>
      </footer>
    </>
  );
}

export default App;
