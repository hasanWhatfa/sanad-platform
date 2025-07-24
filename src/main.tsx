import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './pages/Home/Home'
import Root from './components/Root/Root'
import About from './pages/About/About'
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
import { AuthModalProvider } from './context/AuthModalContext'
import PatientDashboard from './pages/Dashboards/PatientDashboard/PatientDashboard'
import DoctorDashborad from './pages/Dashboards/DoctorDashboard/DoctorDashborad'
import AdminDashboard from './pages/Dashboards/AdminDashboard/AdminDashboard'
import PatientDashTopNav from './pages/Dashboards/PatientDashboard/PatientDashTopNav'
import PatientDashMainPage from './pages/Dashboards/PatientDashboard/PatientDashMainPage'
import DoctorDashTopNav from './pages/Dashboards/DoctorDashboard/DoctorDashTopNav'
import DoctorDashMainPage from './pages/Dashboards/DoctorDashboard/DoctorDashMainPage'
import EditPatientData from './pages/Dashboards/PatientDashboard/EditPatientData/EditPatientData'
import PatientSessions from './pages/Dashboards/PatientDashboard/PatientSessions/PatientSessions'
import PatientRate from './pages/Dashboards/PatientDashboard/PatientRate/PatientRate'
import TestPatient from './pages/Dashboards/PatientDashboard/TestPatient/TestPatient'
import DoctorPatiens from './pages/Dashboards/DoctorDashboard/DoctorPatiens/DoctorPatiens'
import DoctorSessions from './pages/Dashboards/DoctorDashboard/DoctorSessions/DoctorSessions'
import AdminDashTopNav from './pages/Dashboards/AdminDashboard/AdminDashTopNav'
import AdminDashMainPage from './pages/Dashboards/AdminDashboard/AdminDashMainPage'
import MoneyPage from './pages/Dashboards/AdminDashboard/MoneyPage/MoneyPage'
import AdminShowData from './pages/Dashboards/AdminDashboard/AdminShowData/AdminShowData'
import ManageDoctorsPage from './pages/Dashboards/AdminDashboard/ManageDoctorsPage/ManageDoctorsPage'

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
    },
    {
      path:'/patient-dash',
      element:<PatientDashboard />,
      children:[
        {
          path:'',
          element:<PatientDashTopNav />,
          children:[
            {
              index:true,
              element:<PatientDashMainPage />
            },
            {
              path:'edit-patient-data',
              element:<EditPatientData />
            },
            {
              path:'my-sessions',
              element:<PatientSessions />
            },
            {
              path:'patient-rate',
              element:<PatientRate />
            },
            {
              path:'patient-tests',
              element:<TestPatient />
            }
          ]
        }
      ]
    },
    {
      path:'/doctor-dash',
      element:<DoctorDashborad />,
      children:[
        {
          path:'',
          element:<DoctorDashTopNav />,
          children:[
            {
              index : true,
              element:<DoctorDashMainPage />
            },
            {
              path:'doctor-patients',
              element:<DoctorPatiens />
            },
            {
              path:'doctor-sessions',
              element:<DoctorSessions />
            }
          ]
        }
      ]
    },
    {
      path:'/admin-dash',
      element:<AdminDashboard />,
      children:[
        {
          path:'',
          element:<AdminDashTopNav />,
          children:[
            {
              index:true,
              element:<AdminDashMainPage />
            },
            {
              path:'moneyManage',
              element:<MoneyPage />
            },
            {
              path:'usersInfo',
              element:<AdminShowData />
            },
            {
              path:'manage-doctors',
              element:<ManageDoctorsPage />
            }
          ]
        }
      ]
    }
  ]
)
createRoot(document.getElementById('root')!).render(
  <StrictMode>
   <AuthModalProvider>
     <RouterProvider router={routes} />
   </AuthModalProvider>
  </StrictMode>
)
