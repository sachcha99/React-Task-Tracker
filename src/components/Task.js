
import {FaEdit, FaTimes} from 'react-icons/fa'

export const Task = ({task,onDelete,onToggle}) => {
    return (
        <div className={`task ${task.reminder ?
        'reminder' :''}`}onDoubleClick={() => onToggle(task.id)}>
            <h3>
                  
                {task.text}
                <div className="inner"> 
                <FaEdit className="edit-icon"/>
                <FaTimes onClick={() => onDelete(task.id)} style={{color:'red', cursor:'pointer'}} />
                
                </div>
            </h3>
            <p>{task.day}</p>
        </div>
    )
}
