import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Profile from './pages/Profile.js';

import ErrorPage from './pages/Error';
import Hangman from './pages/Hangman.js';
// import Leaderboard from './pages/Leaderboard.js'; UNCOMMENT WHEN READY 

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Hangman />
      }, {
        path: '/leadeboard', 
        // element: <Leaderboard /> UNCOMMENT WHEN READY  
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
      }, {
        path: '/me',
        element: <Profile />
      },
    ]
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
