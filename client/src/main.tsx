import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'


import App from './App.jsx';
// import Home from './pages/Home';  UNCOMMENT IF WE END UP USING THIS
import Signup from './pages/Signup';
import Login from './pages/Login';
import SingleThought from './pages/SingleThought';
import Profile from './pages/Profile';
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
        path: '/profiles/:username',
        element: <Profile />
      }, {
        path: '/me',
        element: <Profile />
      }, {
        path: '/thoughts/:thoughtId',
        element: <SingleThought />
      }, 
    ]
  },
]);

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<RouterProvider router={router} />);
}
