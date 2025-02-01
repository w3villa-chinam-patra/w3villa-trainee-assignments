import { useState } from 'react';
import { data } from '../data/data';
import { CiSearch } from "react-icons/ci";
import PaginationBox from '../components/PaginationBox';

function Table() {
    const MAX_ROWS_PER_PAGE = 4;
    let numberOfPages = data.length / MAX_ROWS_PER_PAGE;
    const [searchValue, setSearchValue] = useState("");
    const [pagination, setPagination] = useState(1);

    // sets the searchValue state with the input search value of user.
    const onChangeHandler = (event) => {
        setSearchValue(event.currentTarget.value);
    }

    return (
        <section className='overflow-y-auto px-4 pb-2'>
            <div className="wrapper">
                <div className="card-container p-4 bg-white rounded-3xl ">
                    <div className='search-box bg-slate-200 my-4 rounded-3xl px-4 py-2 gap-2 flex items-center'>
                        <CiSearch className="text-3xl" />
                        <input type="text" className="w-full outline-none" placeholder="Search Projects..." onChange={onChangeHandler} />
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
                                {
                                    (() => {
                                        const filteredData = data.filter((obj) => obj.projectName.toLowerCase().includes(searchValue.toLowerCase())) //search feature

                                        // no project awailable case
                                        if (filteredData.length === 0) {
                                            numberOfPages = 1;
                                            return <tr className='border-t border-slate-300 bg-neutral-100'>
                                                {console.log("no row")}
                                                <td className='p-4 text-center text-neutral-600 first:rounded-b-2xl' colSpan={3}>No Projects Found !</td>
                                            </tr>
                                        }

                                        return filteredData.map((row, i, filteredData) => {
                                            if (i === 0) numberOfPages = Math.ceil(filteredData.length / MAX_ROWS_PER_PAGE);
                                            const firstRowIndex = (pagination - 1) * MAX_ROWS_PER_PAGE + 1;
                                            const lastRowIndex = pagination * MAX_ROWS_PER_PAGE;
                                            if (firstRowIndex - 1 <= i && lastRowIndex > i) {
                                                return <tr key={i} className={`border-t border-slate-300 ${i % 2 ? "bg-neutral-200" : "bg-neutral-100"}`}>
                                                    <td className={`p-2 text-center text-neutral-900 font-semibold ${lastRowIndex - 1 === i ? "first:rounded-bl-2xl" : ""}`}>{row.projectId}</td>
                                                    <td className='p-2 text-center text-gray-800'>{row.projectName}</td>
                                                    <td className={`p-2 ${lastRowIndex - 1 === i ? "last:rounded-br-2xl" : ""}`} >
                                                        <div className='w-fit m-auto py-1 px-4 rounded-sm text-gray-950' style={{
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
                                            }

                                        });
                                    })()

                                }
                            </tbody>
                        </table>
                    </div>
                    {
                        numberOfPages !== 1
                            ?
                            <div className="pagination flex justify-center my-2">
                                <div className="pagination-container flex border border-gray-300 bg-gray-100 rounded-md overflow-hidden">
                                    <PaginationBox pagination={pagination} setPagination={setPagination} text={"<<"} isArrow={true} />
                                    {Array.from({ length: numberOfPages }, (_, i) => <PaginationBox pagination={pagination} setPagination={setPagination} key={i} text={i + 1} />)}
                                    <PaginationBox numberOfPages={numberOfPages} pagination={pagination} setPagination={setPagination} text={">>"} isArrow={true} />
                                </div>
                            </div>
                            :
                            ""
                    }
                </div>
            </div>
        </section>
    )
}

export default Table