import { Route, Routes } from 'react-router'
import './App.css'
import DashboardSection from './dashboard/DashboardSection'
import SideBar from './components/SideBar'
import DashboardGrid from './dashboard/DashboardGrid'
import Calendar from './components/Calendar'
import Tickets from './components/Tickets'
import Projects from './components/Projects'
import { FIRST_FORM_ROUTE, TABLE_ROUTE } from './routes'
import Form from './forms/Form'
import Table from './table/Table'
import { useState } from 'react'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className='dashboard-container grid lg:grid-cols-[250px_auto] h-screen font-[Nunito]'>
      <Routes>
        <Route path='/' element={
          <>
            <SideBar sidebarState={[isSidebarOpen, setIsSidebarOpen]}/>
            <div className="dashboard-section-container h-screen">
              <DashboardSection sidebarState={[isSidebarOpen, setIsSidebarOpen]}/>
            </div>
          </>
        }>
          <Route index element={<DashboardGrid />} />
          <Route path='calendar' element={<Calendar />} />
          <Route path='tickets' element={<Tickets />} />
          <Route path='projects' element={<Projects />} />
          <Route path={FIRST_FORM_ROUTE} element={<Form />} />
          <Route path={TABLE_ROUTE} element={<Table />} />
        </Route>
      </Routes>

    </div>
  )
}

export default App
