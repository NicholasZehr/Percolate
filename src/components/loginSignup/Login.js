
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { authenticateUser } from "../../redux";
import { toggleLoading } from "../../redux/authSlice";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const { user, loggedIn, error} = useSelector((state)=> state.auth);
  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const username = evt.target.username.value;
    const password = evt.target.password.value;
    dispatch(authenticateUser({ username, password }))
      .then(() => {
        if (loggedIn) {
          navigate('/')
        }
      })
  }
  useEffect(() => {
    if (loggedIn) {
      navigate('/')
    }
  })
  return (
    <>    
    <div className='login'>
      {loggedIn ? (
       <div>Already Logged In</div>
      ) : (
        <div className='loginbodyBox'>
          <div className='loginbody'>
            {error ? (
              <label className='errorLogin'>{`Oops Something went wrong! Please try again!`}</label>
            ) : null}
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
      </div>
    </>
  );
};
export default Login;
