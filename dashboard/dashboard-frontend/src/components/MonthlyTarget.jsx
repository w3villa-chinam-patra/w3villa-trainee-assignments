import React from 'react'
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

function MonthlyTarget() {

    return (
        <div className='bg-white flex flex-col'>
            <div className='font-bold'>
                Monthly Target
            </div>
            <div className='w-full flex-1 flex justify-center items-center'>
                <Doughnut
                    className='max-h-52'
                    data={{
                        labels: ["Pending Projects", "Done Projects", "New Projects"],
                        datasets: [
                            {
                                data: [44, 46, 25], // Percent values
                                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                                hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
                                borderWidth: 5,
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
                        cutout: "70%",
                    }}
                />
            </div>
        </div>
    )
}

export default MonthlyTarget