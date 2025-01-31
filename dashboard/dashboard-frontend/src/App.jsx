import { Route, Routes } from 'react-router'
import './App.css'
import DashboardSection from './components/DashboardSection'
import SideBar from './components/SideBar'

function App() {

  return (
    <div className='dashboard-container grid grid-cols-[220px_auto] h-screen font-[Nunito]'>
      <SideBar />
      <DashboardSection />
    </div>
  )
}

export default App
