import React, { useContext, useState } from 'react'
import './Login.css'
import AuthContext from '../../contexts/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

function Login() {

  const { login } = useContext(AuthContext)
  const navigate = useNavigate()
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [error, setError] = useState(null)

  const emailHandler = (event) => {
    setEmail(event.target.value)
  }

  const passwordHandler = (event) => {
    setPassword(event.target.value)
  }

  const clearInputs = () => {
    setEmail('')
    setPassword('')
  }

  const submitHandler = (event) => {
    event.preventDefault()

    const result = login(email, password)

    if (result) {
      return navigate('/dashboard')
    } else {
      setError(' تا بحال ثبت نام نکرده اید ! | ایمیل یا رمزعبور اشتباه است')
    }
    clearInputs()
  }

  return (
    <div className='loginForm my-5'>
      {error ? <p className='text-center text-danger'>{error}</p> : ''}
      <form className='w-50 mx-auto border-2' onSubmit={submitHandler}>
        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Email address</label>
          <input value={email} type="email" onChange={emailHandler} class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Password</label>
          <input value={password} type="password" onChange={passwordHandler} class="form-control" id="exampleInputPassword1" />
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
      <div className='d-flex justify-content-center mt-3'>
        <Link className='text-decoration-none' to='/register'>ثبت نام</Link>
        <p className='ms-2'>آیا هنوز ثبت نام نکرده اید ؟</p>
      </div>
    </div>
  )
}

export default Login