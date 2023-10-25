import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';
import logo from "../assets/images/cat_logo.png"

function Login(props) {
    const [formState, setFormState] = useState({ email: '', password: '' });
    const [login, { error }] = useMutation(LOGIN_USER);
  
    const handleFormSubmit = async (event) => {
      event.preventDefault();
      try {
        const mutationResponse = await login({
          variables: { email: formState.email, password: formState.password },
        });
        const token = mutationResponse.data.login.token;
        Auth.login(token);
      } catch (e) {
        console.log(e);
      }
    };
  
    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormState({
        ...formState,
        [name]: value,
      });
    };

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src={logo}
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-darkestpink">
              Sign in to your account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleFormSubmit}>
              <div>
                <label htmlFor="email" className="block text-sm font-medium leading-6 text-darkestpink">
                  Email address
                </label>
                <div className="mt-2">
                  <input
                    placeholder="youremail@test.com"
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-darkestpink shadow-sm ring-1 ring-inset ring-pink placeholder:text-pink focus:ring-2 focus:ring-inset focus:ring-darkpink sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium leading-6 text-darkestpink">
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    placeholder="******"
                    id="password"
                    name="password"
                    type="password"
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-darkestpink shadow-sm ring-1 ring-inset ring-pink placeholder:text-pink focus:ring-2 focus:ring-inset focus:ring-darkpink sm:text-sm sm:leading-6"
                  />
                </div>
              </div>
  
              <div>
                <button
                  type="submit"
                  className="flex w-full justify-center rounded-md bg-lightestpink px-3 py-1.5 text-sm font-semibold leading-6 text-darkestpink shadow-sm hover:bg-pink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-pink"
                >
                  Sign in
                </button>
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm text-pink">
              Not a member?{' '}
              <Link to="/signup" className="hover:text-darkpink">Go to Signup</Link>
            </p>
          </div>
        </div>
    )
  }

  export default Login;