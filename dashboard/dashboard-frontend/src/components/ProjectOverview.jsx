import React from 'react'
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ProjectOverviewTab from './ProjectOverviewTab';

function ProjectOverview() {
  return (
    <div className='bg-white'>
      <div className="font-bold">
        Project Overview
      </div>
      <div className='max-h-48 flex justify-center items-center'>
        <Doughnut
          data={{
            labels: [],
            datasets: [
              {
                label: "App Design",
                data: [56, 44], // Percent values
                backgroundColor: ["#FF6384", "rgba(0, 0, 0, 0.1)"],
                borderWidth: 4,
                borderRadius: 20,

              },
              {
                label: "API Integration",
                data: [50, 50], // Percent values
                backgroundColor: ["#36A2EB", "rgba(0, 0, 0, 0.1)"],
                borderWidth: 4,
                borderRadius: 20,

              },
              {
                label: "System Design",
                data: [60, 40], // Percent values
                backgroundColor: ["#FFCE56", "rgba(0, 0, 0, 0.1)"],
                borderWidth: 4,
                borderRadius: 20,

              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: true,
            plugins: {
              legend: {
                position: "bottom",
                labels: {
                  color: "#333", // Legend text color
                  usePointStyle: true, // Converts the legend box into a circle
                  pointStyle: "roundRect",
                },
              },
            },
            cutout: "50%",
            layout: {
              padding: 10, // Adjusts padding around the chart
            },
          }}
        />
      </div>
      <div className='project-overview-details'>
        <ProjectOverviewTab title={"App Design"} color={"#FF6384"} />
        <ProjectOverviewTab title={"API Integration"} color={"#36A2EB"} />
        <ProjectOverviewTab title={"System Design"} color={"#FFCE56"} />
      </div>
    </div>
  )
}

export default ProjectOverview