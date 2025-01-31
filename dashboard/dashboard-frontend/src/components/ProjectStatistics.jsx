import { Chart as ChartJS } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
function ProjectStatistics() {
    return (
        <div className='bg-white h-full w-full'>
            <div className="font-bold">
                Project Statistics
            </div>
            <div className="flex-wrapper flex items-center justify-center h-full">
                <div className="w-full flex justify-center items-center">
                    <Bar
                        className="h-52"
                        data={{
                            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
                            datasets: [
                                {
                                    label: "Working Hours",
                                    data: [300, 360, 390, 400, 450, 380, 400, 380, 420, 395, 480, 480],
                                    backgroundColor: "#ff6e00",
                                    borderRadius: 20,
                                    borderWidth: 2,
                                    borderColor: "transparent"
                                },
                                {
                                    label: "Project",
                                    data: [90, 80, 100, 120, 80, 150, 140, 130, 180, 70, 80, 100],
                                    backgroundColor: "gray",
                                    borderRadius: 20,
                                    borderWidth: 2,
                                    borderColor: "transparent"
                                },
                            ]
                        }}
                        options={{
                            responsive: true,
                            maintainAspectRatio: false, // Ensures chart resizes correctly
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
                            scales: {
                                x: {
                                    categoryPercentage: 0.3, // Makes bars thinner
                                    barPercentage: 0.5, // Further reduces width
                                },
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    )
}

export default ProjectStatistics