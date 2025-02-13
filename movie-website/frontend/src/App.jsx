import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './components/Layout'
import { HOME_ROUTE } from './routes'
import Home from './components/home/Home'

function App() {

  return (
    <Routes >
      <Route element={<Layout />}>
        <Route path={HOME_ROUTE} element={<Home />} />
      </Route>
    </Routes>
  )
}

export default App
