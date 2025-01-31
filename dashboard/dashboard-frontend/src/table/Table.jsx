import { useState } from 'react';
import { data } from '../data/data';
import { CiSearch } from "react-icons/ci";

function Table() {
    const MAX_ROWS_PER_PAGE = 5;
    const [page, setPage] = useState(1);
    return (
        <section className='overflow-y-auto'>
            <div className="wrapper">
                <div className="card-container p-4 bg-white rounded-3xl ">
                    <div className='bg-slate-200 mb-2 rounded-3xl px-4 py-2 gap-2 flex items-center'>
                        <CiSearch className="text-3xl" />
                        <input type="text" className="w-full outline-none" placeholder="Search Projects..." />
                    </div>
                    <div className="table-container p-2 border border-slate-400 rounded-3xl">
                        <table className='w-full table-auto'>
                            <thead>
                                <tr className='bg-amber-200 overflow-hidden'>
                                    <th className='text-xl p-4 max-w-20 first:rounded-tl-2xl'>Project ID</th>
                                    <th className='text-xl p-4'>Project Name</th>
                                    <th className='text-xl p-4 last:rounded-tr-2xl'>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((row, i) => {
                                    return <tr key={i} className={`border-t border-slate-300 ${i % 2 ? "bg-neutral-200" : "bg-neutral-100"}`}>
                                        <td className={`p-2 text-center text-neutral-900 font-semibold ${data.length - 1 === i ? "first:rounded-bl-2xl" : ""}`}>{row.projectId}</td>
                                        <td className='p-2 text-center text-gray-800'>{row.projectName}</td>
                                        <td className={`p-2${data.length - 1 === i ? "last:rounded-br-2xl" : ""}`} >
                                            <div className='w-fit m-auto py-1 px-4 rounded-lg text-gray-950' style={{
                                                backgroundColor: `${(() => {
                                                    if (row.status === "In Progress")
                                                        return "#f7813188"
                                                    else if (row.status === "Pending")
                                                        return "#f7000488"
                                                    else if (row.status === "Completed")
                                                        return "#4ecf2388"
                                                })()}`
                                            }}>
                                                {row.status}
                                            </div>
                                        </td>
                                    </tr>
                                })}
                            </tbody>

                        </table>
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Table