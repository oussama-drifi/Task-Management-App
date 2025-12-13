import './overview.css'

const Overview = () => {
    return (
        <section className="overview">
            <div className="greet">
                <h1>Hello mr <span>Oussama Drifi</span></h1>
            </div>
            <div className="stats">
                <div className="total-tasks">
                    <span>
                        <span className='icon'><i className="bi bi-list-ul"></i></span>
                        <span>Total Tasks</span>
                    </span>
                    <span>26 Tasks</span>
                </div>
                <div className="todo">
                    <span>
                        <span className='icon'><i className="bi bi-hourglass"></i></span>
                        <span>Todo</span>
                    </span>
                    <span>26 Tasks</span>
                </div>
                <div className="in-progress">
                    <span>
                        <span className='icon'><i className="bi bi-lightning"></i></span>
                        <span>in progress</span>
                    </span>
                    <span>26 Tasks</span>
                </div>
                <div className="canceled">
                    <span>
                        <span className='icon'><i className="bi bi-x-lg"></i></span>
                        <span>Canceled</span>
                    </span>
                    <span>26 Tasks</span>
                </div>
                <div className="done">
                    <span>
                        <span className='icon'><i className="bi bi-check2"></i></span>
                        <span>Done</span>
                    </span>
                    <span>26 Tasks</span>
                </div>
            </div>
        </section>
    )
}

export default Overview