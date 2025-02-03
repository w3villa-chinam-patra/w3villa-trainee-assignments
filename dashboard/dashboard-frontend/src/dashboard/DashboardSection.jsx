import DashboardHeader from './DashboardHeader'
import { Outlet } from 'react-router'

function DashboardSection({sidebarState}) {
  return (
    <div className='bg-slate-200 grid grid-rows-[auto_1fr] h-screen'>
      <DashboardHeader sidebarState={sidebarState} />
      <div className="outlet-wrapper flex justify-center items-start overflow-y-auto">
        <div className="outlet-wrapper w-7xl">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
export default DashboardSection