import DailyTasksCard from "./DailyTasksCard";

function DailyTasks() {
  return (
    <div className='bg-white'>
      <div className="font-bold">
        Daily Tasks
      </div>
      <div className="daily-tasks-container">
        <DailyTasksCard title={"Tiddo Mobile App Web Version"} text={"We've to design a dashboard for DevignEdge Design Agency."} number={2} />
        <DailyTasksCard title={"Scrum Call Discussion"} text={"We've to design a dashboard for DevinEdge Design Agency."} number={8} />
      </div>
    </div>
  )
}

export default DailyTasks