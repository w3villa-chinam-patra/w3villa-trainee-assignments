import { useEffect, useState } from 'react';
import { data } from '../data/data';
import { CiSearch } from "react-icons/ci";
import PaginationBox from '../components/PaginationBox';

function Table() {
    const MAX_ROWS_PER_PAGE = 4;
    let numberOfPages = data.length / MAX_ROWS_PER_PAGE;
    const [searchValue, setSearchValue] = useState("");
    const [pagination, setPagination] = useState(1);
    const [displayData, setDisplayData] = useState(data);
    const [editedRow, setEditedRow] = useState({ projectId: null, projectName: null, status: null });
    const [newProject, setNewProject] = useState({ projectId: "", projectName: "", status: "" });

    // fetching the data from the API
    // useEffect(() => {
    //     const API_URL = "https://jsonplaceholder.typicode.com/users"
    //     try {
    //         (async () => {
    //             const response = await fetch(API_URL);
    //             const data = await response.json();
    //             console.log(data);
    //         })();
    //     } catch (error) {

    //     }
    // }, [])

    // sets the searchValue state with the input search value of user.
    const onChangeHandler = (event) => {
        setSearchValue(event.currentTarget.value);
        setPagination(1);
    }

    // delete handler starts here
    const deleteHandler = (event) => {
        const projectID = event.currentTarget.parentElement.dataset.index;
        const newDisplayData = displayData.filter((obj) => obj.projectId.toString() !== projectID);
        const length = newDisplayData.length;

        // fix of the pagination when data of last page is entirely deleted
        if (length === MAX_ROWS_PER_PAGE * (pagination - 1))
            setPagination(pagination - 1);

        setDisplayData(newDisplayData);
    }
    // delete handler ends here

    // edit handler starts here
    const editHandler = (event) => {
        const projectID = event.currentTarget.parentElement.dataset.index;
        const [tableData] = displayData.filter((obj) => obj.projectId.toString() === projectID);
        setEditedRow(() => {
            return { projectId: tableData.projectId, projectName: tableData.projectName, status: tableData.status }
        });
    }
    const editOperationHandler = (event, projectID) => {
        const value = event.currentTarget.value;
        setEditedRow((prev) => ({ ...prev, projectName: value }));
    }
    // edit handler ends here

    // save handler starts here
    const saveHandler = () => {
        const resultantTableData = displayData.map((obj) => {
            if (obj.projectId === editedRow.projectId) {
                return { ...obj, projectName: editedRow.projectName, status: editedRow.status };
            } else {
                return obj;
            }
        })
        setDisplayData(resultantTableData);
        setEditedRow({ projectId: null, value: null })
    }
    // save handler ends here

    // add project handler starts here
    const onChangeUtilityFunction = (event, key) => {
        setNewProject({ ...newProject, [key]: event.target.value });
    }
    const addProjectHandler = () => {
        if (newProject.projectId === "" || newProject.projectName === "") return;
        setDisplayData([newProject, ...displayData]);
        setNewProject({ projectId: "", projectName: "", status: "" });
    }
    // add project handler ends here

    // cancel button handler starts here
    const cancelHandler = () => {
        setEditedRow({ projectId: null, projectName: null, status: null });
    }
    // cancel button handler ends here


    return (
        <section className='overflow-y-auto px-2 md:px-4 pb-2'>
            <div className="wrapper">
                <div className="card-container p-3 md:p-4 bg-white rounded-3xl ">

                    {/* search box starts here */}
                    <div className='search-box bg-neutral-200 my-4 rounded-3xl px-4 py-2 gap-2 flex items-center'>
                        <CiSearch className="text-3xl" />
                        <input type="text" className="w-full outline-none" placeholder="Search Projects..." onChange={onChangeHandler} />
                    </div>
                    {/* search box ends here */}

                    {/* add project option starts here */}
                    <div className="add-project-wrapper border  border-neutral-400 rounded-2xl p-2 w-full my-4">
                        <div className='bg-neutral-100 p-4 rounded-2xl flex flex-col md:flex-row gap-4 items-center justify-center'>
                            <div className='field-container w-full'>
                                <label className='text-sm' htmlFor="project-id">Enter Project ID</label>
                                <input
                                    onChange={(event) => onChangeUtilityFunction(event, "projectId")}
                                    className='bg-white w-full border border-slate-400 outline-none rounded-md p-1' id='project-id' type="text"
                                    value={newProject.projectId}
                                />
                            </div>
                            <div className='field-container w-full'>
                                <label className='text-sm' htmlFor="project-name">Enter Project Name</label>
                                <input
                                    onChange={(event) => onChangeUtilityFunction(event, "projectName")}
                                    className='bg-white w-full border border-slate-400 outline-none rounded-md p-1' id='project-name' type="text"
                                    value={newProject.projectName}
                                />
                            </div>
                            <div className='field-container w-full'>
                                <label className='text-sm' htmlFor="project-status">Select Project Status</label>
                                <div className='flex flex-row  rounded-md gap-1 m-2 justify-between'>
                                    <div onClick={() => (setNewProject({ ...newProject, status: "In Progress" }))} className={`w-fit py-1 px-1 md:px-4 rounded-sm text-gray-950 text-center text-xs md:text-base bg-[#f7813188] hover:cursor-pointer text-nowrap ${newProject.status === "In Progress" ? "border-3 border-[#f78131]" : ""}`}>
                                        In Progress
                                    </div>
                                    <div onClick={() => (setNewProject({ ...newProject, status: "Pending" }))} className={`w-fit py-1 px-1 md:px-4 rounded-sm text-gray-950 text-center text-xs md:text-base bg-[#f7000488] hover:cursor-pointer text-nowrap ${newProject.status === "Pending" ? "border-3 border-[#f70004]" : ""}`}>
                                        Pending
                                    </div>
                                    <div onClick={() => (setNewProject({ ...newProject, status: "Completed" }))} className={`w-fit py-1 px-1 md:px-4 rounded-sm text-gray-950 text-center text-xs md:text-base bg-[#4ecf2388] hover:cursor-pointer text-nowrap ${newProject.status === "Completed" ? "border-3 border-[#4ecf23]" : ""}`}>
                                        Completed
                                    </div>
                                </div>
                            </div>
                            <button onClick={addProjectHandler} className="delete border-2 rounded-4xl px-2 md:px-4 py-2 border-teal-500 text-teal-700 bg-teal-200 hover:bg-teal-500 hover:text-white cursor-pointer text-nowrap">Add Project</button>
                        </div>
                    </div>
                    {/* add project option ends here */}

                    <div className="table-container p-2 border border-slate-400 rounded-3xl">
                        <table className='w-full table-auto'>
                            <thead>
                                <tr className='bg-amber-200 overflow-hidden text-sm md:text-xl'>
                                    <th className='p-2 py-4 md:p-4 max-w-20 first:rounded-tl-2xl'>Project ID</th>
                                    <th className='p-2 py-4 md:p-4'>Project Name</th>
                                    <th className='p-2 py-4 md:p-4'>Status</th>
                                    <th className='p-2 py-4 md:p-4 last:rounded-tr-2xl'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    (() => {
                                        const filteredData = displayData.filter((obj) => obj.projectName.toLowerCase().includes(searchValue.toLowerCase())) //search feature

                                        // no project available case
                                        if (filteredData.length === 0) {
                                            numberOfPages = 1;
                                            return <tr className='border-t border-slate-300 bg-neutral-100'>
                                                <td className='p-4 text-center text-neutral-600 first:rounded-b-2xl' colSpan={4}>No Projects Found !</td>
                                            </tr>
                                        }

                                        return filteredData.map((row, i, filteredData) => {
                                            if (i === 0) numberOfPages = Math.ceil(filteredData.length / MAX_ROWS_PER_PAGE);
                                            const firstRowIndex = (pagination - 1) * MAX_ROWS_PER_PAGE + 1;
                                            const lastRowIndex = pagination * MAX_ROWS_PER_PAGE;
                                            if (firstRowIndex - 1 <= i && lastRowIndex > i) {
                                                return <tr key={i} className={`border-t border-slate-300 ${i % 2 ? "bg-neutral-200" : "bg-neutral-100"}`}>
                                                    <td className={`p-2 text-center text-neutral-900 font-semibold text-sm md:text-base ${lastRowIndex - 1 === i || filteredData.length - 1 === i ? "first:rounded-bl-2xl" : ""}`}>{row.projectId}</td>
                                                    <td className='p-2 text-center text-gray-800 text-xs md:text-base'>
                                                        <input
                                                            type="text"
                                                            className={`w-full py-1 rounded-md project-name-container outline-none text-center ${editedRow.projectId !== null && editedRow.projectId === row.projectId ? "underline underline-offset-6 animate-pulse" : ""}`}
                                                            disabled={editedRow.projectId !== null && editedRow.projectId === row.projectId ? false : true}
                                                            value={editedRow.projectId !== null && editedRow.projectId === row.projectId ? editedRow.projectName : row.projectName}
                                                            onChange={(event) => editOperationHandler(event, row.projectId)}
                                                        />
                                                    </td>
                                                    <td className={`md:p-2`} >
                                                        {
                                                            editedRow.projectId === row.projectId
                                                                ?
                                                                <div className='w-fit m-auto flex flex-col rounded-md gap-1 justify-between items-center my-2'>
                                                                    <div onClick={() => (setEditedRow({ ...editedRow, status: "In Progress" }))} className={`w-fit py-1 px-1 md:px-4 rounded-sm text-gray-950 text-center text-xs md:text-base bg-[#f7813188] hover:cursor-pointer text-nowrap ${editedRow.status === "In Progress" ? "border-3 border-[#f78131]" : ""}`}>
                                                                        In Progress
                                                                    </div>
                                                                    <div onClick={() => (setEditedRow({ ...editedRow, status: "Pending" }))} className={`w-fit py-1 px-1 md:px-4 rounded-sm text-gray-950 text-center text-xs md:text-base bg-[#f7000488] hover:cursor-pointer text-nowrap ${editedRow.status === "Pending" ? "border-3 border-[#f70004]" : ""}`}>
                                                                        Pending
                                                                    </div>
                                                                    <div onClick={() => (setEditedRow({ ...editedRow, status: "Completed" }))} className={`w-fit py-1 px-1 md:px-4 rounded-sm text-gray-950 text-center text-xs md:text-base bg-[#4ecf2388] hover:cursor-pointer text-nowrap ${editedRow.status === "Completed" ? "border-3 border-[#4ecf23]" : ""}`}>
                                                                        Completed
                                                                    </div>
                                                                </div>
                                                                :
                                                                <div className='w-fit m-auto py-1 px-1 md:px-4 rounded-sm text-gray-950 text-center text-xs md:text-base' style={{
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
                                                        }
                                                    </td>
                                                    <td className={`${lastRowIndex - 1 === i || filteredData.length - 1 === i ? "last:rounded-br-2xl" : ""}`}>
                                                        <div data-index={row.projectId} className="action-container flex flex-wrap justify-center items-center text-xs md:text-base gap-2 m-1 md:py-2">
                                                            <div data-index={row.projectId} className="edit-save-container md:w-16">
                                                                {
                                                                    editedRow.projectId === row.projectId
                                                                        ?
                                                                        <button onClick={saveHandler} className="save w-full text-center border-2 rounded-4xl px-2 py-1 border-lime-500 text-lime-700 bg-lime-200 hover:bg-lime-500 hover:text-white cursor-pointer">Save</button>
                                                                        :
                                                                        <button onClick={editHandler} className="edit w-full text-center border-2 rounded-4xl px-2 py-1 border-purple-500 text-purple-700 bg-purple-200 hover:bg-purple-500 hover:text-white cursor-pointer">Edit</button>
                                                                }
                                                            </div>
                                                            {
                                                                editedRow.projectId === row.projectId
                                                                    ?
                                                                    <button onClick={cancelHandler} className="delete border-2 rounded-4xl px-2 md:px-4 py-1 border-blue-500 text-blue-700 bg-blue-200 hover:bg-blue-500 hover:text-white cursor-pointer">Cancel</button>
                                                                    :
                                                                    <button onClick={deleteHandler} className="delete border-2 rounded-4xl px-2 md:px-4 py-1 border-red-500 text-red-700 bg-red-200 hover:bg-red-500 hover:text-white cursor-pointer">Delete</button>
                                                            }
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
                                <div className="pagination-container flex flex-wrap border border-gray-300 bg-gray-100 rounded-md overflow-hidden">
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