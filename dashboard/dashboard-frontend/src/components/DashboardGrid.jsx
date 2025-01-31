import React from 'react'
import SmallCards from './SmallCards'
import MonthlyTarget from './MonthlyTarget'
import ProjectStatistics from './ProjectStatistics'
import ProjectSummary from './ProjectSummary'
import ProjectOverview from './ProjectOverview'
import DailyTasks from './DailyTasks'

function DashboardGrid() {
    return (
        <div className='px-4 grid grid-rows-[auto_1fr] overflow-y-auto'>
            <div className='grid grid-cols-4 pb-2 gap-2'>
                <SmallCards title={"Project Dashboard"} text={"Create a dashboard design"}/>
                <SmallCards title={"Create a style guide"} text={"Style guide for the business"}/>
                <SmallCards title={"Create wireframes"} text={"Wireframe for the agency"}/>
                <SmallCards title={"Conduct user research"} text={"Conduct user research"}/>
            </div>
            <div className='grid grid-cols-3 grid-rows-[auto] gap-2 pb-4 items-start'>
                <div className='bg-white rounded-3xl overflow-hidden p-6'>
                    <MonthlyTarget />
                </div>
                <div className='col-span-2 bg-white rounded-3xl overflow-h  idden p-6'>
                    <ProjectStatistics />
                </div>
                <div className='bg-white rounded-3xl overflow-hidden p-6'>
                    <ProjectSummary />
                </div>
                <div className='bg-white rounded-3xl overflow-hidden p-6'>
                    <ProjectOverview />
                </div>
                <div className='bg-white rounded-3xl overflow-hidden p-6'>
                    <DailyTasks />
                </div>
            </div>
        </div>
    )
}

export default DashboardGrid