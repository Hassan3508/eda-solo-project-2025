import useStore from '../../zustand/store'


function HomePage() {
  const user = useStore((state) => state.user);
  const logOut = useStore((state) => state.logOut);

  return (
    <>
      <h2>Home Page</h2>
      <p>Welcome, {user.username}</p>
      <p>Your ID is: {user.id}</p>
      <p>We're here to make your henna experience unforgettable.</p> 
      <button className="btn btn-dark mt-3" onClick={logOut}>Log Out</button>
    </>
  );
}


export default HomePage;
