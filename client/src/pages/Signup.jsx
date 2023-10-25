import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { ADD_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';
import logo from '../assets/images/cat_logo.png'

const Signup = () => {
    const [formState, setFormState] = useState({
      username: '',
      email: '',
      password: '',
    });
    const [addUser, { error, data }] = useMutation(ADD_USER);
  
    const handleChange = (event) => {
      const { name, value } = event.target;
  
      setFormState({
        ...formState,
        [name]: value,
      });
    };
  
    const handleFormSubmit = async (event) => {
      event.preventDefault();
      console.log(formState);
  
      try {
        const { data } = await addUser({
            variables: { ...formState }
        });

        console.log("Apollo response data: ", data);

        if (!data || !data.addUser || !data.addUser.token) {
            console.error("Unexpected data structure from addUser mutation:", data);
            return;
        }

        Auth.login(data.addUser.token);
      } catch (e) {
        console.error("Error executing mutation:", e);
    }
  }

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              className="mx-auto h-10 w-auto"
              src={logo}
              alt="Your Company"
            />
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-darkestpink">
              Sign up to an account
            </h2>
          </div>
  
          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form className="space-y-6" onSubmit={handleFormSubmit}>

            <div>
                <label htmlFor="username" className="block text-sm font-medium leading-6 text-darkestpink">
                  Username
                </label>
                <div className="mt-2">
                  <input
                    placeholder="username"
                    id="username"
                    name="username"
                    type="text"
                    autoComplete="username"
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-darkestpink shadow-sm ring-1 ring-inset ring-pink placeholder:text-pink focus:ring-2 focus:ring-inset focus:ring-darkpink sm:text-sm sm:leading-6"
                  />
                </div>
              </div>

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
                  Signup
                </button>
              </div>
            </form>
  
            <p className="mt-10 text-center text-sm text-pink">
              Already a member?{' '}
              <Link to="/Login" className="hover:text-darkpink">Go to Signin</Link>
            </p>
          </div>
        </div>
    )
};

export default Signup;