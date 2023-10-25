import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom/dist'
import './input.css'

import App from './App'
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Search from "./pages/Search"
import Error from "./pages/Error"
import Login from "./pages/Login"
import Signup from "./pages/Signup"

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
                path: '/search',
                element: <Search />
            }
        ]
    }
])

ReactDOM.createRoot(document.getElementById('root')).render(
    <RouterProvider router={router} />
)
  