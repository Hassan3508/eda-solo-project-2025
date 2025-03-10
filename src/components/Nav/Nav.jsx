import { NavLink } from 'react-router-dom';
import useStore from '../../zustand/store';
import Dropdown from 'react-bootstrap/Dropdown';
import { useNavigate } from 'react-router-dom';


function Nav() {
  const user = useStore((store) => store.user);
  const logOut = useStore((state) => state.logOut);
  const navigate = useNavigate();
  const logOutFunction = () => {
    logOut();
    navigate('/login');
  }
  return (
    <nav>
      <ul>
      { // User is not logged in, render these links:
        !user.id && (
          <>
          <Dropdown>
          <Dropdown.Toggle variant="dark" id="dropdown-basic" >
            Menu
          </Dropdown.Toggle>
          <Dropdown.Menu variant="dark">
            <Dropdown.Item>
              <NavLink to="/login">Login</NavLink>
            </Dropdown.Item>
            <Dropdown.Item>
              <NavLink to="/registration">Register</NavLink>
            </Dropdown.Item>
            <Dropdown.Item>
              <NavLink to="/about">About</NavLink>
            </Dropdown.Item>
          </Dropdown.Menu>
          </Dropdown>
          </>
        )
      }
       { // User is logged in, render these links:
        user.id && (
          <>
 <Dropdown>
      <Dropdown.Toggle variant="dark" id="dropdown-basic">
       Menu
      </Dropdown.Toggle>
      <Dropdown.Menu variant="dark">
        <Dropdown.Item>
          <NavLink to="/">Home</NavLink></Dropdown.Item>
        <Dropdown.Item>
          <NavLink to="/designList">Designs</NavLink>
        </Dropdown.Item>
        <Dropdown.Item>
          <NavLink to="/customer">Your Appointment</NavLink>
        </Dropdown.Item>

        { // User is logged in, render these links:
        user.is_admin && (
          <>
            
              
            <Dropdown.Item>
              <NavLink to="/design">Add Designs</NavLink>
              </Dropdown.Item>
              <Dropdown.Item>
              <NavLink to="/admin">All Bookings</NavLink>
              </Dropdown.Item>
      
          </>
        )
      }
        <Dropdown.Item>
        <NavLink to="/about">About</NavLink>
        </Dropdown.Item>
        <Dropdown.Item onClick={logOutFunction}>
          Log Out
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
          </>
        )
      }
      {/* Show these links regardless of auth status: */}
        <li>
        </li>
      </ul>
    </nav>
  );










}


export default Nav;
