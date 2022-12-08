
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authenticate } from "../../redux";
const Login = () => {
  const dispatch = useDispatch();
  const {user, loggedIn} = useSelector((state)=>state.auth);

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const username = evt.target.username.value;
    const password = evt.target.password.value;
     dispatch(authenticate(username, password));
  };

  return (
    <>
    <div>This is the login thing</div>
{/*     
    <div className='login'>
      {loggedIn ? (
       <div>Already Logged In</div>
      ) : (
        <div className='loginbodyBox'>
          <div className='loginbody'>
            {auth.error ? (
              <label className='errorLogin'>{`Oops Something went wrong! Please try again!`}</label>
            ) : <div>There is an auth error?</div>}
            <form className='form' onSubmit={handleSubmit}>
              <div className='emailBox'>
                <input
                  className='email'
                  name='username'
                  type='text'
                  placeholder='Email'
                />
              </div>
              <div className='emailBox'>
                <input
                  className='email'
                  name='password'
                  placeholder='Password'
                  type='password'
                />
              </div>
              <div className='emailBox'>
                <button className='signin' name='button1'>
                  Log In
                </button>
              </div>
              <Link className='emailBox' to='/signup'>
                <button className='signup'>Create your account</button>
              </Link>
            </form>
          </div>
          <h1 className='welcome'>Welcome to Percolate</h1>
        </div>
      )}
      <div className='bottomBar'>
        <div id='bottomText'>The home to all your coffee life.</div>
      </div>
      </div> */}
    </>
  );
};
export default Login
