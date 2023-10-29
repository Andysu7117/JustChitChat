import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom/dist'
import './input.css'

import App from './App'
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import People from "./pages/People"
import Error from "./pages/Error"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Profile from './pages/Profile';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        error: <Error />,
        children: [
            {
                index: true,
                element: <Home />
            }, {
                path: '/login',
                element: <Login />
            }, {
                path: '/signup',
                element: <Signup />
            }, {
                path: '/chat',
                element: <Chat />
            }, {
                path: '/people',
                element: <People />
            }, {
                path: '/profile',
                element: <Profile />
            }
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
  