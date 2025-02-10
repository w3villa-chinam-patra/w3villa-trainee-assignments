import { useEffect, useState } from 'react';
import { CiSearch } from "react-icons/ci";
import PaginationBox from '../components/PaginationBox';
import { TbLoader3 } from "react-icons/tb";
import { RxCross2 } from "react-icons/rx";

function UserTable() {
    const MAX_ROWS_PER_PAGE = 4;
    let numberOfPages = 1;
    const [isLoading, setIsLoading] = useState(true);
    const [searchValue, setSearchValue] = useState("");
    const [pagination, setPagination] = useState(1);
    const [displayData, setDisplayData] = useState(null);
    const [editedRow, setEditedRow] = useState({ id: null, name: null, username: null, email: null, phone: null, website: null });
    const [newProject, setNewProject] = useState({ id: "", name: "", username: "", email: "", phone: "", website: "" });
    const [addUserModalIsOpen, setAddUserModalIsOpen] = useState(false);

    // fetching the data from the API
    useEffect(() => {
        const API_URL = "https://jsonplaceholder.typicode.com/users"
        try {
            (async () => {
                const response = await fetch(API_URL);
                const data = await response.json();
                setDisplayData(data);
                setIsLoading(false);
                numberOfPages = data.length / MAX_ROWS_PER_PAGE;
            })();
        } catch (error) {

        }
    }, [])

    // sets the searchValue state with the input search value of user.
    const onChangeHandler = (event) => {
        setSearchValue(event.currentTarget.value);
        setPagination(1);
    }

    // delete handler starts here
    const deleteHandler = (event) => {
        const id = event.currentTarget.parentElement.dataset.index;
        const newDisplayData = displayData.filter((obj) => obj.id.toString() !== id);
        const length = newDisplayData.length;

        // fix of the pagination when data of last page is entirely deleted
        if (length === MAX_ROWS_PER_PAGE * (pagination - 1))
            setPagination(pagination - 1);

        setDisplayData(newDisplayData);
    }
    // delete handler ends here

    // edit handler starts here
    const editHandler = (event) => {
        const id = event.currentTarget.parentElement.dataset.index;
        const [tableData] = displayData.filter((obj) => obj.id.toString() === id);
        setEditedRow(tableData);
    }
    const editOperationHandler = (event, key) => {
        const value = event.currentTarget.value;
        setEditedRow((prev) => ({ ...prev, [key]: value }));
    }
    // edit handler ends here

    // save handler starts here
    const saveHandler = () => {
        const resultantTableData = displayData.map((obj) => {
            if (obj.id === editedRow.id) {
                return editedRow;
            } else {
                return obj;
            }
        })
        setDisplayData(resultantTableData);
        setEditedRow({ id: null, name: null, username: null, email: null, phone: null, website: null })
    }
    // save handler ends here

    // add project handler starts here
    const onChangeUtilityFunction = (event, key) => {
        setNewProject({ ...newProject, [key]: event.target.value });
    }
    const addProjectHandler = () => {
        if (newProject.projectId === "" || newProject.projectName === "") return;
        setDisplayData([newProject, ...displayData]);
        setNewProject({ id: "", name: "", username: "", email: "", phone: "", website: "" });
        setAddUserModalIsOpen((prev) => !prev)
    }
    // add project handler ends here

    // cancel button handler starts here
    const cancelHandler = () => {
        setEditedRow({ id: null, name: null, username: null, email: null, phone: null, website: null });
    }
    // cancel button handler ends here

    // closeModalHandler starts here
    const closeModalHandler = (event) => {
        if (event.currentTarget === event.target) {
            setAddUserModalIsOpen(!addUserModalIsOpen); 
        }
    }
    // closeModalHandler ends here

    return (
        <section className='overflow-y-auto px-2 md:px-4 pb-2'>
            <div className="wrapper">
                <div className="card-container p-3 md:p-4 bg-white rounded-3xl ">

                    {/* search box and add user button starts here */}
                    <div className="search-box-add-user-button-container my-4 flex flex-col md:flex-row justify-center items-center gap-4">
                        <div className='search-box bg-neutral-200 my-2 flex-3/4 w-full rounded-3xl px-4 py-2 gap-2 flex items-center'>
                            <CiSearch className="text-3xl" />
                            <input type="text" className="w-full outline-none" placeholder="Search Projects..." onChange={onChangeHandler} />
                        </div>
                        <button onClick={() => setAddUserModalIsOpen((prev) => !prev)} className="add-user border-2 rounded-4xl flex-1/4 px-6 py-2 border-teal-500 text-teal-700 bg-teal-200 hover:bg-teal-500 hover:text-white cursor-pointer text-nowrap text-sm md:text-base">Add User</button>
                    </div>
                    {/* search box and add user button ends here */}

                    {/* add user option modal starts here */}
                    <div onClick={closeModalHandler} className={`${addUserModalIsOpen ? "block" : "hidden"} absolute z-10 add-user-option-modal-container left-0 top-0 flex justify-center items-center backdrop-blur-xs w-screen h-screen`}>
                        <div className=" add-project-wrapper border border-neutral-400 rounded-2xl mx-2 p-2 bg-white">
                            <div className='bg-neutral-100 p-4 rounded-2xl flex flex-col gap-4 items-center justify-center'>

                                {/* cross icon */}
                                <RxCross2 className='ml-auto text-2xl cursor-pointer hover:bg-neutral-200 p-1 rounded-full' onClick={() => setAddUserModalIsOpen((prev) => !prev)} />

                                {/* add user modal */}
                                <div className="field-container grid md:grid-cols-2 gap-1 gap-x-2">
                                    <div className='field-container w-full'>
                                        <label className='text-sm' htmlFor="project-id">Enter ID</label>
                                        <input
                                            onChange={(event) => onChangeUtilityFunction(event, "id")}
                                            className='bg-white w-full border border-slate-400 outline-none rounded-md p-1' id='project-id' type="text"
                                            value={newProject.id}
                                        />
                                    </div>
                                    <div className='field-container w-full'>
                                        <label className='text-sm' htmlFor="project-name">Enter Name</label>
                                        <input
                                            onChange={(event) => onChangeUtilityFunction(event, "name")}
                                            className='bg-white w-full border border-slate-400 outline-none rounded-md p-1' id='project-name' type="text"
                                            value={newProject.name}
                                        />
                                    </div>
                                    <div className='field-container w-full'>
                                        <label className='text-sm' htmlFor="project-name">Enter username</label>
                                        <input
                                            onChange={(event) => onChangeUtilityFunction(event, "username")}
                                            className='bg-white w-full border border-slate-400 outline-none rounded-md p-1' id='project-name' type="text"
                                            value={newProject.username}
                                        />
                                    </div>
                                    <div className='field-container w-full'>
                                        <label className='text-sm' htmlFor="project-name">Enter email</label>
                                        <input
                                            onChange={(event) => onChangeUtilityFunction(event, "email")}
                                            className='bg-white w-full border border-slate-400 outline-none rounded-md p-1' id='project-name' type="text"
                                            value={newProject.email}
                                        />
                                    </div>
                                    <div className='field-container w-full'>
                                        <label className='text-sm' htmlFor="project-name">Enter Phone</label>
                                        <input
                                            onChange={(event) => onChangeUtilityFunction(event, "phone")}
                                            className='bg-white w-full border border-slate-400 outline-none rounded-md p-1' id='project-name' type="text"
                                            value={newProject.phone}
                                        />
                                    </div>
                                    <div className='field-container w-full'>
                                        <label className='text-sm' htmlFor="project-name">Enter Website</label>
                                        <input
                                            onChange={(event) => onChangeUtilityFunction(event, "website")}
                                            className='bg-white w-full border border-slate-400 outline-none rounded-md p-1' id='project-name' type="text"
                                            value={newProject.website}
                                        />
                                    </div>
                                </div>
                                <button onClick={addProjectHandler} className="delete border-2 rounded-4xl px-2 md:px-4 py-2 border-teal-500 text-teal-700 bg-teal-200 hover:bg-teal-500 hover:text-white cursor-pointer text-nowrap text-sm md:text-base">Add User</button>
                            </div>
                        </div>
                    </div>
                    {/* add user option modal ends here */}

                    {
                        isLoading
                            ?
                            <div className="loader-container flex justify-center items-center text-5xl p-12 text-neutral-300">
                                <TbLoader3 className='animate-spin' />
                            </div>
                            :
                            <div className="user-table-container p-2  border border-slate-400 rounded-3xl overflow-x-auto">
                                <table className='w-full text-center text-gray-800 text-xs md:text-sm'>
                                    <thead>
                                        <tr className='bg-amber-200 overflow-hidden text-sm md:text-xl font-sans text-neutral-800'>
                                            <th className='p-2 w-12 py-4 md:p-4 first:rounded-tl-2xl'>ID</th>
                                            <th className='p-2 py-4 md:p-4'>Name</th>
                                            <th className='p-2 py-4 md:p-4'>Username</th>
                                            <th className='p-2 py-4 md:p-4'>Email</th>
                                            <th className='p-2 py-4 md:p-4'>Phone</th>
                                            <th className='p-2 py-4 md:p-4'>Website</th>
                                            <th className='p-2 py-4 md:p-4 last:rounded-tr-2xl'>Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {

                                            (() => {
                                                const filteredData = displayData.filter((obj) => obj.name.toLowerCase().includes(searchValue.toLowerCase())) //search feature

                                                // no project available case
                                                if (filteredData.length === 0) {
                                                    numberOfPages = 1;
                                                    return <tr className='border-t border-slate-300 bg-neutral-100'>
                                                        <td className='p-4 text-center text-neutral-600 first:rounded-b-2xl' colSpan={7}>No User Found !</td>
                                                    </tr>
                                                }

                                                return filteredData.map((row, i, filteredData) => {
                                                    if (i === 0) numberOfPages = Math.ceil(filteredData.length / MAX_ROWS_PER_PAGE);
                                                    const firstRowIndex = (pagination - 1) * MAX_ROWS_PER_PAGE + 1;
                                                    const lastRowIndex = pagination * MAX_ROWS_PER_PAGE;
                                                    if (firstRowIndex - 1 <= i && lastRowIndex > i) {
                                                        return <tr key={i} className={`border-t border-slate-300 ${i % 2 ? "bg-neutral-200" : "bg-neutral-100"}`}>
                                                            <td className={`py-2 text-center text-neutral-900 font-semibold text-sm md:text-base ${lastRowIndex - 1 === i || filteredData.length - 1 === i ? "first:rounded-bl-2xl" : ""}`}>{i + 1}</td>
                                                            <td>
                                                                <textarea
                                                                    type="text"
                                                                    className={`w-fit sm:w-full resize-none px-1 py-3 rounded-md project-name-container outline-none text-center ${editedRow.id !== null && editedRow.id === row.id ? "underline underline-offset-6 animate-pulse" : ""}`}
                                                                    disabled={editedRow.id !== null && editedRow.id === row.id ? false : true}
                                                                    value={editedRow.id !== null && editedRow.id === row.id ? editedRow.name : row.name}
                                                                    onChange={(event) => editOperationHandler(event, "name")}
                                                                />
                                                            </td>
                                                            <td>
                                                                <textarea
                                                                    type="text"
                                                                    className={`w-fit sm:w-full resize-none px-1 py-3 rounded-md project-name-container outline-none text-center ${editedRow.id !== null && editedRow.id === row.id ? "underline underline-offset-6 animate-pulse" : ""}`}
                                                                    disabled={editedRow.id !== null && editedRow.id === row.id ? false : true}
                                                                    value={editedRow.id !== null && editedRow.id === row.id ? editedRow.username : row.username}
                                                                    onChange={(event) => editOperationHandler(event, "username")}
                                                                />
                                                            </td>
                                                            <td>
                                                                <textarea
                                                                    type="text"
                                                                    className={`w-fit sm:w-full resize-none px-1 py-3 rounded-md project-name-container outline-none text-center ${editedRow.id !== null && editedRow.id === row.id ? "underline underline-offset-6 animate-pulse" : ""}`}
                                                                    disabled={editedRow.id !== null && editedRow.id === row.id ? false : true}
                                                                    value={editedRow.id !== null && editedRow.id === row.id ? editedRow.email : row.email}
                                                                    onChange={(event) => editOperationHandler(event, "email")}
                                                                />
                                                            </td>
                                                            <td>
                                                                <textarea
                                                                    type="text"
                                                                    className={`w-fit sm:w-full resize-none px-1 py-3 rounded-md project-name-container outline-none text-center ${editedRow.id !== null && editedRow.id === row.id ? "underline underline-offset-6 animate-pulse" : ""}`}
                                                                    disabled={editedRow.id !== null && editedRow.id === row.id ? false : true}
                                                                    value={editedRow.id !== null && editedRow.id === row.id ? editedRow.phone : row.phone}
                                                                    onChange={(event) => editOperationHandler(event, "phone")}
                                                                />
                                                            </td>
                                                            <td>
                                                                <textarea
                                                                    type="text"
                                                                    className={`w-fit sm:w-full resize-none px-1 py-3 rounded-md project-name-container outline-none text-center ${editedRow.id !== null && editedRow.id === row.id ? "underline underline-offset-6 animate-pulse" : ""}`}
                                                                    disabled={editedRow.id !== null && editedRow.id === row.id ? false : true}
                                                                    value={editedRow.id !== null && editedRow.id === row.id ? editedRow.website : row.website}
                                                                    onChange={(event) => editOperationHandler(event, "website")}
                                                                />
                                                            </td>

                                                            <td className={`${lastRowIndex - 1 === i || filteredData.length - 1 === i ? "last:rounded-br-2xl" : ""}`}>
                                                                <div data-index={row.id} className="action-container grid justify-center items-center text-xs md:text-sm gap-2 m-2 md:p-2">
                                                                    <div data-index={row.id} className="edit-save-container m-auto md:w-16">
                                                                        {
                                                                            editedRow.id === row.id
                                                                                ?
                                                                                <button onClick={saveHandler} className="save w-full text-center border-2 rounded-4xl px-2 py-1 border-lime-500 text-lime-700 bg-lime-200 hover:bg-lime-500 hover:text-white cursor-pointer">Save</button>
                                                                                :
                                                                                <button onClick={editHandler} className="edit w-full text-center border-2 rounded-4xl px-2 py-1 border-purple-500 text-purple-700 bg-purple-200 hover:bg-purple-500 hover:text-white cursor-pointer">Edit</button>
                                                                        }
                                                                    </div>
                                                                    {
                                                                        editedRow.id === row.id
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
                            </div>}
                    {
                        numberOfPages !== 1
                            ?
                            <div className="pagination flex justify-center my-2">
                                <div className="pagination-container flex flex-wrap border border-gray-300 bg-gray-100 rounded-md overflow-hidden">
                                    <PaginationBox pagination={pagination} setPagination={setPagination} text={"<<"} isArrow={true} />
                                    {Array.from({ length: numberOfPages }, (_, i) => {
                                        return <PaginationBox pagination={pagination} setPagination={setPagination} key={i} text={i + 1} />
                                    })}
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

export default UserTable