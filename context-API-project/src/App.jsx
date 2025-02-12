import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import { UserProvider } from './context/UserContext'
import Layout from './components/Layout'
import { Route, Routes } from 'react-router-dom'
import BasicDetails from './components/Forms/BasicDetails'
import AddressDetails from './components/Forms/AddressDetails'
import CheckoutForm from './components/Forms/CheckoutForm'
import { ADDRESS_DETAILS_ROUTE, BASIC_DETAILS_FORM_ROUTE, CHECKOUT_FORM_ROUTE } from './routes'

function App() {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    product: [],
    address: "",
    phone: "",
    bank: "",
    bankAccountNumber: "",
    IFSCCode: ""
  })
  return (
    <Routes>
      <Route element={<UserProvider value={[user, setUser]} ><Layout /></UserProvider>}>
        <Route index element={<Home />} />
        <Route path={BASIC_DETAILS_FORM_ROUTE} element={<BasicDetails />} />
        <Route path={ADDRESS_DETAILS_ROUTE} element={<AddressDetails />} />
        <Route path={CHECKOUT_FORM_ROUTE} element={<CheckoutForm />} />
      </Route>
    </Routes>
  )
}

export default App
