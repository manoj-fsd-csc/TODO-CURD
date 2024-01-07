import React from 'react'


function Card({ data, setData, onEdit }) {

    const Delete = () => {
        setData((prevTodo) => prevTodo.filter((item) => item.id !== data.id));
    };

    const setDataStatus = (status) => {
        setData((prevTodos) =>
            prevTodos.map((t) =>
                t.id === data.id ? { ...t, status } : t
            )
        );

        const dropdownButton = document.getElementById(`dropdownButton-${data.id}`);
        if (dropdownButton) {
            dropdownButton.click();
        }
    };

    const getButtonColor = (status) => {
        return status ? 'btn-success' : 'btn-danger';
    };



    return <>
        
            <div className='col'>
                <div className="card">
                    <div className="card-body">
                        <p className='card-title'>Name : {data.title} </p>
                        <p className='card-text'>Description : {data.description} </p>
                        <span className='select'>Status : </span>&nbsp;
                        <span>
                            <div className="btn-group" role="group">
                                <button id={`dropdownButton-${data.id}`} className={`btn btn-secondary btn-sm dropdown-toggle ${getButtonColor(data.status)}`} data-bs-toggle="dropdown" aria-expanded="false">
                                    {data.status ? 'Completed' : 'Not Completed'}
                                </button>
                                <ul className="dropdown-menu">
                                    <li className={`dropdown-item ${getButtonColor(true)}`} onClick={() => setDataStatus(true)}>
                                        Completed
                                    </li>
                                    <li className={`dropdown-item ${getButtonColor(false)}`} onClick={() => setDataStatus(false)}>
                                        Not Completed
                                    </li>
                                </ul>
                            </div>
                        </span>
                        <br />
                        <br />
                        <button className="btn btn-success btn-sm w-auto" onClick={onEdit}>Edit</button>
                        &nbsp;&nbsp;
                        <button className="btn btn-danger btn-sm w-auto" onClick={Delete}>Delete</button>
                    </div>
                </div>
            </div>
       

    </>
}

export default Card