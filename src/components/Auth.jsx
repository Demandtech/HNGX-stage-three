import { Input } from '@nextui-org/react'
import { useState } from 'react'
import { EyeSlashFilledIcon } from '../assets/svgs/EyeSlashFilled'
import { EyeFilledIcon } from '../assets/svgs/EyeFilled'
import PropTypes from 'prop-types'
import { loginUser } from '../redux.jsx/actions'
import { useDispatch } from 'react-redux'

import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  import.meta.env.VITE_APP_SUPABASE_URL,
  import.meta.env.VITE_APP_SUPABASE_ANON_KEY
)

export default function Auth({ signUp, onClose }) {
  const [isVisible, setIsVisible] = useState(false)
  const dispatch = useDispatch()
  const toggleVisibility = () => setIsVisible(!isVisible)
  const [values, setValues] = useState({
    name: '',
    email: 'user@example.com',
    password: '1Password',
  })
  const [errors, setErrors] = useState({
    name: { show: false, msg: '' },
    email: { show: false, msg: '' },
    password: { show: false, msg: '' },
  })
  const [isLoading, setIsloading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))

    setErrors({
      ...errors,
      [name]: { show: false, msg: '' },
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsloading(true)

    if (signUp && !values.name) {
      setIsloading(false)
      setErrors({
        ...errors,
        name: { msg: 'Please enter your name', show: true },
      })
    }

    if (
      !values.email ||
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
    ) {
      setIsloading(false)
      setErrors({
        ...errors,
        email: { msg: 'Please enter a valid email', show: true },
      })
    }

    if (!values.password) {
      setIsloading(false)
      setErrors({
        ...errors,
        password: { show: true, msg: 'Please enter your password' },
      })
    }

    if (values.password && values.email && !signUp) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      })

      if (data && !error) {
        onClose()
        dispatch(loginUser(data))

        const {
          data: { user },
        } = await supabase.auth.getUser()

        dispatch(loginUser(user))
      }
      setIsloading(false)
    }

    if (values.password && values.email && values.name && signUp) {
      //SIGN UP
      const { user, error } = await supabase.auth.signUp(values)

      console.log(user, error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-5'>
      {signUp && (
        <Input
          onChange={handleChange}
          value={values.name}
          type='name'
          label='Name'
          placeholder='Enter your name'
          isInvalid={errors.name.show}
          errorMessage={errors.name.msg}
          name='name'
        />
      )}
      <Input
        onChange={handleChange}
        type='text'
        label='Email'
        placeholder='Enter your email'
        isInvalid={errors.email.show}
        errorMessage={errors.email.msg}
        name='email'
        value={values.email}
      />
      <Input
        onChange={handleChange}
        type={isVisible ? 'text' : 'password'}
        label='password'
        placeholder='Enter your password'
        isInvalid={errors.password.show}
        errorMessage={errors.password.msg}
        name='password'
        value={values.password}
        endContent={
          <button
            className='focus:outline-none'
            type='button'
            onClick={toggleVisibility}
          >
            {isVisible ? (
              <EyeSlashFilledIcon className='text-2xl text-default-400 pointer-events-none' />
            ) : (
              <EyeFilledIcon className='text-2xl text-default-400 pointer-events-none' />
            )}
          </button>
        }
      />
      <button
        type='submit'
        className='btn text-white rounded-sm py-1.5 bg-black hover:bg-red hover:opacity-50 transition transition-background duration-500'
      >
        {isLoading ? 'Loading...' : ' Submit'}
      </button>
    </form>
  )
}

Auth.propTypes = {
  signUp: PropTypes.bool,
  onClose: PropTypes.func,
}
