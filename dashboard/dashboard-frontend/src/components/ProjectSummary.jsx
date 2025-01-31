import React from 'react'
import ProjectSummaryCard from './ProjectSummaryCard';
import { LuUserPen } from "react-icons/lu";
import { PiUsersThree } from "react-icons/pi";
import { LuCalendarRange } from "react-icons/lu";
import { FaRegCheckCircle } from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";

function ProjectSummary() {
  return (
    <div className='bg-white'>
      <div className="font-bold">
        Project Summary
      </div>
      <div className="project-summary-card-container my-2">
        <ProjectSummaryCard
          items={
            [
              { icon: <LuUserPen />, title: "Tiddo App", text: "19 Members", color: "#f0631d" },
              { icon: <PiUsersThree />, title: "Homie SAAS Application", text: "24 Members", color: "#0609c7" }
            ]
          } />
        <ProjectSummaryCard
          items={
            [
              { icon: <LuCalendarRange />, title: "In Progress", text: "22 Projects", color: "#f0631d" },
              { icon: <FaRegCheckCircle />, title: "Completed", text: "10 Projects", color: "#20f011" },
              { icon: <MdOutlinePendingActions />, title: "Pending", text: "6 Projects", color: "#b406d6" }
            ]
          }
        />
      </div>
    </div>
  )
}

export default ProjectSummary