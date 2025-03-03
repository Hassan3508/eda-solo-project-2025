import { NavLink } from 'react-router-dom';
import useStore from '../../zustand/store';


function Nav() {
  const user = useStore((store) => store.user);

  return (
    <nav>
      <ul>
      { // User is not logged in, render these links:
        !user.id && (
          <>
            <li>
              <NavLink to="/login">Login</NavLink>
            </li>
            <li>
              <NavLink to="/registration">Register</NavLink>
            </li>
          </>
        )
      }
      { // User is logged in, render these links:
        user.id && (
          <>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/designlist">Designs</NavLink>
              </li>
          </>
        )
      }
      { // User is logged in, render these links:
        user.is_admin && (
          <>
            
              <li>
             
              <NavLink to="/design">Add Designs</NavLink>
            </li>
          </>
        )
      }
      {/* Show these links regardless of auth status: */}
        <li>
          <NavLink to="/about">About</NavLink>
        </li>
        <li>
          <NavLink to="/bookingForm">Appointment</NavLink>
        </li>
        <li>
          <NavLink to="/customerpage">Your Appointment</NavLink>
        </li>
        {user.is_admin && <li>
              <NavLink to="/admin">All Bookings</NavLink>
           </li>}
      </ul>
    </nav>
  );
}


export default Nav;
