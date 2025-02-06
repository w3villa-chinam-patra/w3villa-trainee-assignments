import { Route, Routes } from 'react-router'
import './App.css'
import DashboardSection from './dashboard/DashboardSection'
import SideBar from './components/SideBar'
import DashboardGrid from './dashboard/DashboardGrid'
import Calendar from './components/Calendar'
import Tickets from './components/Tickets'
import Projects from './components/Projects'
import { FIRST_FORM_ROUTE, PROJECT_TABLE_ROUTE, USER_TABLE_ROUTE } from './routes'
import Form from './forms/Form'
import { useState } from 'react'
import ProjectTable from './tables/ProjectTable'
import UserTable from './tables/UserTable'

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className='dashboard-container grid lg:grid-cols-[250px_auto] h-screen font-[Nunito]'>
      <Routes>
        <Route path='/' element={
          <>
            <SideBar sidebarState={[isSidebarOpen, setIsSidebarOpen]} />
            <div className="dashboard-section-container h-screen">
              <DashboardSection sidebarState={[isSidebarOpen, setIsSidebarOpen]} />
            </div>
          </>
        }>
          <Route index element={<DashboardGrid />} />
          <Route path='calendar' element={<Calendar />} />
          <Route path='tickets' element={<Tickets />} />
          <Route path='projects' element={<Projects />} />
          <Route path={FIRST_FORM_ROUTE} element={<Form />} />
          <Route path={PROJECT_TABLE_ROUTE} element={<ProjectTable />} />
          <Route path={USER_TABLE_ROUTE} element={<UserTable />} />
        </Route>
      </Routes>

    </div>
  )
}

export default App
