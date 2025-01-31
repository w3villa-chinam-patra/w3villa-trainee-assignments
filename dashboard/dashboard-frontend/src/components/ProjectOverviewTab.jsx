function ProjectOverviewTab({ title, color }) {
    return (
        <div className='project-overview-tab flex gap-2 items-center my-2'>
            <div className="p-1 w-4 h-4 rounded-full flex items-center justify-center" style={{ backgroundColor: `${color}40` }}>
                <div className='w-full h-full rounded-full' style={{ backgroundColor: `${color}` }}></div>
            </div>
            <div className="overview-info text-sm gap-2 font-semibold text-gray-800">
                {title}
                <div className="text text-xs flex items-center gap-1" style={{ color: `${color}` }}>
                    16 Total Projects
                    <div className="dot w-1 h-1 rounded-full shrink-0" style={{ backgroundColor: `${color}` }}></div>
                    3 Members
                </div>
            </div>
        </div>
    )
}

export default ProjectOverviewTab