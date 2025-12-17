import React, { useContext, useState } from 'react'
import './Register.css'
import AuthContext from '../../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

function Register() {

  const { register } = useContext(AuthContext)
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)


  const inputHandler = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  const validate = () => {
    const { name, email, password, confirmPassword } = formData;

    if (!name || !email || !password || !confirmPassword) {
      return "همه فیلدها الزامی هستند";
    }

    if (!email.includes("@")) {
      return "ایمیل معتبر نیست";
    }

    if (password.length < 4) {
      return "رمز عبور باید حداقل ۶ کاراکتر باشد";
    }

    if (password !== confirmPassword) {
      return "رمز عبور و تکرار آن یکسان نیست";
    }

    return null;
  }

  const submitHandler = (event) => {
    event.preventDefault()

    const validation = validate()

    if (validation) {
      setError(validation)
      return
    }

    setLoading(true)


    const result = register({
      name: formData.name,
      email: formData.email,
      password: formData.password
    })

    if (!result.success) {
      setError(result.message)
      return
    } else {
      return navigate('/dashboard')
    }
  }

  return (
    <div className='registerForm mt-5'>
      {error ? (<p className='text-center text-danger'>{error}</p>) : ''}
      <form className='w-50 mx-auto border-2' onSubmit={submitHandler}>
        <div className="mb-3">
          <label htmlFor="exampleInputName" className="form-label">Name</label>
          <input name='name' value={formData.name} type="text" onChange={inputHandler} className="form-control" id="exampleInputName" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input name='email' value={formData.email} type="email" onChange={inputHandler} className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input name='password' value={formData.password} type="password" onChange={inputHandler} className="form-control" id="exampleInputPassword1" />
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password</label>
          <input name='confirmPassword' value={formData.confirmPassword} type="password" onChange={inputHandler} className="form-control" id="exampleInputPassword1" />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default Register