import DashboardHeader from './DashboardHeader'
import DashboardGrid from './DashboardGrid'
import { Outlet, Route, Routes } from 'react-router'
import PublicRoute from './PublicRoute'

function DashboardSection() {
  return (
    <div className='bg-slate-200 grid grid-rows-[auto_1fr] h-screen'>
      <DashboardHeader />
      <Outlet />
    </div>
  )
}

export default DashboardSection