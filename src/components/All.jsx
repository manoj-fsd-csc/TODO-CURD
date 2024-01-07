import React, { useState, useEffect } from "react";
import Card from "./Card";
import Edittodo from "./Edittodo";

function All({ data, setData, completed, setCompleted }) {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [option, setOption] = useState(null);
    const [filtered, setFiltered] = useState([]);

    useEffect(() => {
        if (completed === 'All') {
            setFiltered(data);
        } else {
            const filtered = data.filter((task) =>
                completed === 'Completed' ? task.status : !task.status
            );
            setFiltered(filtered);
        }
    }, [data, completed]);

    const handleDrop = (selectedStatus) => {
        setCompleted(selectedStatus);
    };

    const getStatusColor = (status) => {
        return status === completed ? 'btn-success' : 'btn-danger';
    };

    const handleClick = () => {
        if (option) {
            setData((prevTodos) =>
                prevTodos.map((t) => t.id === option.id ? { ...t, title, description } : t
                )
            );
            setOption(null);
        } else {
            const id = data.length ? data[data.length - 1].id + 1 : 1;
            const newArray = [...data, { id, title, description, status: completed === 'Completed' },];
            setData(newArray);
        }

        setTitle('');
        setDescription('');
        setCompleted('All');
    };

    const defaultStatus = 'All';

    const handleDropdownClick = (e) => {
        e.stopPropagation();
    };




    return <>
        <h3>My Todo</h3>

        <div className="row">
            <div className="col">
                <input type="text" className="form-control"  placeholder="Todo Name" value={title} onChange={(e) => { setTitle(e.target.value) }} />
            </div>
            <div className="col">
                <input type="text" className="form-control" placeholder="Todo Description" value={description} onChange={(e) => { setDescription(e.target.value) }} />
            </div>
            <div className="col">
                <button type="button" className="btn btn-info" onClick={handleClick}>Add Todo</button>
            </div>
        </div>
        <div className='row-text'>
            <div className="row-span">
                <span className="todos">My Todos</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <span className="status">Status Filter :</span>&nbsp;&nbsp;
                

                <div className="btn-group" onClick={handleDropdownClick}>
                    <button
                        className={`btn btn-sm dropdown-toggle ${getStatusColor(defaultStatus)}`}
                        data-bs-toggle="dropdown"
                        aria-expanded="false">
                        {completed}
                    </button>
                    <ul className="dropdown-menu">
                        <li className="btn btn-sm" onClick={() => handleDrop(defaultStatus)}>
                                {defaultStatus}
                        </li>
                        <li  className="btn btn-sm" onClick={() => handleDrop('Completed')}>
                                Completed
                        </li>
                        <li className="btn btn-sm" onClick={() => handleDrop('Not Completed')}>
                                Not Completed
                        </li>
                    </ul>
                </div>
            </div>
        </div >

        {/* return card */}

        <div className="container">
            <div className="row row-cols-1 row-cols-md-3 g-4">
                {filtered.map((e, i) => (
                    <Card data={e} setData={setData} completed={completed} setCompleted={setCompleted} key={i} onEdit={() => {
                        setOption(e);
                        setTitle(e.title);
                        setDescription(e.description);
                    }}
                    />
                ))}
            </div>
        </div >

        {/* return edittodo */}
        {
            option && (
                <Edittodo title={title} setTitle={setTitle} description={description} setDescription={setDescription} onClick={handleClick} />
            )
        }

    </>
}

export default All;