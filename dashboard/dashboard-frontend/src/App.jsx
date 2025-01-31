import { Route, Routes } from 'react-router'
import './App.css'
import DashboardSection from './components/DashboardSection'
import SideBar from './components/SideBar'
import DashboardGrid from './components/DashboardGrid'
import Calendar from './components/Calendar'
import Tickets from './components/Tickets'
import Projects from './components/Projects'
import { FIRST_FORM_ROUTE, TABLE_ROUTE } from './routes'
import Form from './forms/Form'
import Table from './table/Table'

function App() {

  return (
    <div className='dashboard-container grid grid-cols-[250px_auto] h-screen font-[Nunito]'>
      <Routes>
        <Route path='/' element={
          <>
            <SideBar />
            <DashboardSection />
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
