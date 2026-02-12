import React, { useState } from 'react'
import './Register.css'
import { useNavigate } from 'react-router-dom'
import { User } from '../../types/user'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../../store'
import { registerUser } from '../../store/slices/authSlice'

const Register: React.FC = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const dispatch = useDispatch<AppDispatch>()

  const { loading } = useSelector((state: RootState) => state.auth);

  const [error, setError] = useState<string | null>(null)


  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
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
      return "رمز عبور باید حداقل 4 کاراکتر باشد";
    }

    if (password !== confirmPassword) {
      return "رمز عبور و تکرار آن یکسان نیست";
    }

    return null;
  }

  const submitHandler = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault()

    const validation = validate()

    if (validation) {

      setError(validation)
      return
    }

    dispatch(registerUser({
      name: formData.name,
      email: formData.email,
      password: formData.password
    }))
      .unwrap()
      .then(() => navigate("/dashboard"))
      .catch(() => {setError('این ایمیل قبلا ثبت شده است')});

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
        <button disabled={loading} type="submit" className="btn btn-primary">
          {loading ? "Registering..." : "Submit"}
        </button>
      </form>
    </div>
  )
}

export default Register