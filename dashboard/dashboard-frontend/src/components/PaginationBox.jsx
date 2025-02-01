import { useEffect, useRef } from "react";

function PaginationBox({ numberOfPages, pagination, setPagination, text, isArrow }) {

    const paginationRef = useRef()

    useEffect(() => {
        if (!isArrow) {
            if (parseInt(paginationRef.current.textContent) === pagination) {
                paginationRef.current.style.backgroundColor = "oklch(0.872 0.01 258.338)";
            } else {
                paginationRef.current.style.backgroundColor = "white"
            }
        }
    }, [pagination])

    const onClickHandler = (event) => {
        if (!isArrow)
            setPagination(parseInt(event.currentTarget.textContent));
        else if (event.currentTarget.textContent === "<<")
            setPagination((prev) => prev - 1 <= 0 ? 1 : prev - 1);
        else if (event.currentTarget.textContent === ">>")
            setPagination((prev) => prev + 1 > numberOfPages ? prev : prev + 1);
    }

    return (
        <div ref={paginationRef} onClick={onClickHandler} className={`flex select-none justify-center cursor-pointer ${isArrow ? "" : "hover:bg-gray-300"}  items-center w-10 h-10 border-3 rounded-lg border-gray-100 ${isArrow ? "bg-gray-100" : "bg-white"}`}>
            {text}
        </div>
    )
}

export default PaginationBox