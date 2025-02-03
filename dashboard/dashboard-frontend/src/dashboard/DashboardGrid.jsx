import React from 'react'
import SmallCards from '../components/SmallCards'
import MonthlyTarget from '../components/MonthlyTarget'
import ProjectStatistics from '../components/ProjectStatistics'
import ProjectSummary from '../components/ProjectSummary'
import ProjectOverview from '../components/ProjectOverview'
import DailyTasks from '../components/DailyTasks'

function DashboardGrid() {
    return (
        <div className='px-4 grid grid-rows-[auto_1fr]'>
            <div className='grid sm:grid-cols-2 md:grid-cols-4 pb-2 gap-2'>
                <SmallCards title={"Project Dashboard"} text={"Create a dashboard design"} />
                <SmallCards title={"Create a style guide"} text={"Style guide for the business"} />
                <SmallCards title={"Create wireframe"} text={"Wireframe for the agency"} />
                <SmallCards title={"Conduct user research"} text={"Conduct user research"} />
            </div>
            <div className='grid md:grid-cols-3 grid-rows-[auto] gap-2 pb-4 items-start'>
                <div className='bg-white rounded-3xl overflow-hidden p-6'>
                    <MonthlyTarget />
                </div>
                <div className='md:col-span-2 bg-white rounded-3xl overflow-hidden p-6'>
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