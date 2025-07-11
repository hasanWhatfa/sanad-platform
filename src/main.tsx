import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home/Home'
import Root from './components/Root/Root'
import About from './pages/About/About'
import Login from './pages/Login/Login'
import ServicesPage from './pages/ServicesPage/ServicesPage'
import Articles from './pages/Articles/Articles'
import Library from './pages/Library/Library'
import ContactUs from './pages/ContactUs/ContactUs'
import ArticlePage from './pages/ArticlePage/ArticlePage'
import Doctors from './pages/Doctors/Doctors'
import DoctorPage from './pages/Doctors/DoctorPage'
import AboutUsChild from './pages/About/AboutUsChild'
import FaqAll from './pages/FaqAll/FaqAll'
import TestPage from './pages/TestPage/TestPage'
import GamePage from './pages/GamePage/GamePage'
import QuestionsPage from './pages/QuestionsPage/QuestionsPage'
const routes = createBrowserRouter(
  [
    {
      path:'/',
      element:<Root />,
      children:[
        {
          path:'',
          element:<Home />
        },
        {
          path:'about',
          element:<About />,
          children:[
            {
              path:'doctors',
              element:<Doctors />,
            }
            ,
            {
              path:'',
              element:<AboutUsChild />
            },
            {
              path:'faqAll',
              element:<FaqAll />
            }
          ]
        },
        {
          path:'doctor/:id',
          element:<DoctorPage />
        }
        ,
        {
          path:'login',
          element:<Login />
        },
        {
          path:'services',
          element:<ServicesPage />
        },
        {
          path:'test/:id',
          element:<TestPage />
        },
        {
          path:'articles',
          element:<Articles />,
        },
        {
          path:'article/:id',
          element:<ArticlePage />
        },
        {
          path:'questionsPage/:id',
          element:<QuestionsPage />
        }
        ,
        {
          path:'library',
          element:<Library />
        },
        {
          path:'contactus',
          element:<ContactUs />
        },
        {
          path:'interactiveGames',
          element:<GamePage/>
        }
      ]
    }
  ]
)
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider  router={routes} />
  </StrictMode>
)
