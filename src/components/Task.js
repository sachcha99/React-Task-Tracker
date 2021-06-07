
import {FaEdit, FaTimes} from 'react-icons/fa'
import * as ReactBootStrap from 'react-bootstrap';
import { useEffect } from 'react';


export const Task = ({setLoading,loading,task,onDelete,onToggle,onEdit}) => {
    if(task!=null){
        //setLoading(false)
    }
 const deleteButton = ()=>{
            setLoading(true);
            onDelete(task.id)
        }
        
    return (
        
       

        <div className={`task ${task.reminder ?
            'reminder' : ''}`} onDoubleClick={() => onToggle(task.id)}>
            <h3>

                {task.text }
                <div className="inner">
                    <FaEdit onClick={() => { onEdit(task.id) }} className="edit-icon" />
                    <FaTimes onClick={deleteButton} style={{ color: 'red', cursor: 'pointer' }} />

                </div>
            </h3>
            <p>{task.day}</p>
        </div>
    )
}
