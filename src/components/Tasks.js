import { useEffect } from "react"
import { Task } from "./Task"


export const Tasks = ( {setLoading,loading,tasks,onDelete,onToggle,onEdit}) => {
    
    useEffect(() =>{
      
        setLoading(false)
          
        },[tasks])   
     
    return (
        <>  
           {tasks.map((task) => (
               <Task key={task.id} setLoading={setLoading} loading={loading} task={task} onEdit={onEdit} onDelete={onDelete} onToggle={onToggle}/>
           ))} 
        </>
    )
}
