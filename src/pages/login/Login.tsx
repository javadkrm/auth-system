import './Login.css'
import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from '../../store'
import { loginUser } from '../../store/slices/authSlice'
import { User } from '../../types/user'
import { LoginFormData } from '../../types/auth'

interface Props { }


const Login: React.FC<Props> = () => {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const { loading, error } = useSelector((state: RootState) => state.auth);

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)
  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)

  const submitHandler = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    dispatch(loginUser({ email, password }))
      .unwrap()
      .then(() => navigate("/dashboard"))
      .catch(() => {});

  }

  return (
    <div className='loginForm my-5'>
      {error ? <p className='text-center text-danger'>{error}</p> : null}
      <form className='w-50 mx-auto border-2' onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input value={email} type="email" onChange={emailHandler} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input value={password} type="password" onChange={passwordHandler} className="form-control" id="exampleInputPassword1" />
        </div>
        <button disabled={loading} type='submit' className="btn btn-primary">
          {loading ? "Logging in..." : "Submit"}
        </button>
      </form>
      <div className='d-flex justify-content-center mt-3'>
        <Link className='text-decoration-none' to='/register'>ثبت نام</Link>


        <p className='ms-2'>آیا هنوز ثبت نام نکرده اید ؟</p>
      </div>
    </div>
  )
}

export default Login
