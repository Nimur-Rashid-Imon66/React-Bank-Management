import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './Components/Home.jsx'
import AddUser from './Components/AddUser.jsx'
import AddIncome from './Components/AddIncome.jsx'
import ShowUserInfo from './Components/ShowUserInfo.jsx'
import TransferMoney from './Components/TransferMoney.jsx'
import WithdrawMoney from './Components/WithdrawMoney.jsx'


  

const router = createBrowserRouter([
  {
    path: '/',
    element: <App></App>,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/addUser',
        element: <AddUser />
      },
      {
        path: '/addIncom',
        element: <AddIncome />
      },
      {
        path: '/showUser',
        element: <ShowUserInfo />
      },
      {
        path: '/transferMoney',
        element: <TransferMoney />
      },
      {
        path: '/withDrawMoney',
        element: <WithdrawMoney />
      },
  
    ]
  }

  ])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
