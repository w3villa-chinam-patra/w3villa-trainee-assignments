function Reply({ message }) {
    return (
        <div className='mr-auto max-w-[500px] text-neutral-800 dark:text-neutral-200 shadow-lg text-sm bg-neutral-200 dark:bg-neutral-800 py-1 rounded-xl rounded-bl-3xl rounded-tl-none dark:invert'>
            <div className='me-4 ms-8'>{message}</div>
            <div className="message-info flex justify-start items-center gap-1 mt-1 ms-4">
                <div className="time text-neutral-400 dark:text-neutral-300 text-xs">02:01</div>
            </div>
        </div>
    )
}

export default Reply