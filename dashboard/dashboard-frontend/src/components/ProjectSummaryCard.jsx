
function ProjectSummaryCard({ items }) {
    return (
        <div className='project-summary-card-container my-4 p-2 rounded-3xl gap-2 border border-gray-200'>
            {
                items.map((item, i) => {
                    return <div key={i} className="tile-container flex justify-between items-center p-2">
                        <div className="flex items-center gap-2">
                            <div className="icon w-8 h-8 rounded-full flex items-center justify-center" style={{ color: `${item.color}`, backgroundColor: `${item.color}30` }}>
                                {item.icon}
                            </div>
                            <div className="info">
                                <div className="title text-sm font-semibold">{item.title}</div>
                                <div className="members text-xs text-gray-800">{item.text}</div>
                            </div>
                        </div>
                        <div>
                            &gt;
                        </div>
                    </div>
                })
            }
        </div>
    )
}

export default ProjectSummaryCard