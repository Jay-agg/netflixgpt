import React from 'react'
import { signOut } from "firebase/auth";
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';





const Header = () => {
  const user = useSelector((store) => store.user);
  const navigate = useNavigate();
  const handleSignOut = () =>{
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate("/");
    }).catch((error) => {
      // An error happened.
    });
  }
  return (
    <div className='absolute px-8 py-4 bg-gradient-to-br from-black w-full h-full z-10 flex justify-between'>
      <img className='h-24 px-20'
      src='https://cdn.cookielaw.org/logos/dd6b162f-1a32-456a-9cfe-897231c7763c/4345ea78-053c-46d2-b11e-09adaef973dc/Netflix_Logo_PMS.png' alt='logo'></img>
       {auth.currentUser &&
        <div className='flex flex-col align-middle'>
          <img className=' h-12 w-12 ml-2 flex'
            alt='usericon'
            src={auth.currentUser?.photoURL} />
          <button className='text-white flex' onClick={handleSignOut}>
            (sign out)
          </button>
        </div>
}
    </div>
    
  )
}

export default Header