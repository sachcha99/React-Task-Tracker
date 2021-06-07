
import {useState,useEffect} from 'react';
import{BrowserRouter as Router,Route} from 'react-router-dom'
import { About } from './components/About';
import { AddTask } from './components/AddTask';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Modal } from './components/Modal';
import { Tasks } from './components/Tasks';
import { UpdateModal } from './components/UpdateModal';
import {Spinner}  from 'react-bootstrap';

function App() {

const[showModal,setShowModal] = useState(false)
const [edData,setEd] = useState(null)

const[loading,setLoading]= useState(true)



const openModal = async () => {
  
  setShowModal(prev=>!prev)
}



  const[showAddTask, setShowAddTask] = useState(false)

  const [tasks,setTasks] = useState([])
 


  useEffect(() =>{
    
    const getTasks = async() =>{
      
      const tasksFromServer= await fetchTasks()
      setTasks(tasksFromServer)
      setLoading(false)
      
     
    }
    getTasks()
   
   
    
  })

  //Fetch Tasks
  const fetchTasks =async ()=>{
    
    const res = await fetch('https://tasktrack-back.herokuapp.com/tasks')
    const data = await res.json()
    
    return data
    
   
  }

   //Fetch Task
   const fetchTask =async (id)=>{
    const res = await fetch(`https://tasktrack-back.herokuapp.com/tasks/${id}`)
    const data = await res.json()

    return data
    
    
  }


  //Add Task
  const addTask= async (task)=>{
console.log(task)
    const res  = await fetch('https://tasktrack-back.herokuapp.com/tasks',{
      method: 'POST',
      headers: {
        'Content-type' : 'application/json'
      },
      body:JSON.stringify(task)

    })

    const data= await res.json()
    setTasks([...tasks,data])
    // setLoading(false)
    
    

  // const id = Math.floor(Math.random()*10000)+1
  
  // const newTask = {id,...task}
  // setTasks([...tasks,newTask])
    }

  //Delete Task
  const deleteTask = async (id) => {
   

    await fetch(`https://tasktrack-back.herokuapp.com/tasks/${id}`,{
      method: 'DELETE',
    })

    setTasks(tasks.filter((task)=> task.id !== id))
    setLoading(false)
    
  }

  //Toggle Reminder
  const toggleReminder =async (id) =>{
    
    const taskToToggle = await fetchTask(id)
    console.log(taskToToggle)
    const updTask = { ... taskToToggle,
    reminder: !taskToToggle.reminder}

    const res = await fetch(`https://tasktrack-back.herokuapp.com/tasks/${id}`,{
      method: 'PUT',
      headers: {'Content-type' : 'application/json',},
      body:JSON.stringify(updTask),
    })

    const data = await res.json()

    setTasks(tasks.map((task)=> task.id===id 
    ?
    {...task,reminder:!task.reminder} 
    :task ))
    setLoading(false)
    
   
  }

  //Edit Task
  const editTask = async (id) => {
     
    // for(let i=0;i<tasks.length;i++)
    // {
    //   if(tasks[i].id==id){
    //     console.log(tasks[i])
    //     setEd(tasks[i])
        
    //   }
    // }
    //console.log(tasks)
    //const data = await fetchTask(id)
   
    //console.log(edData)


    setEd(id)
    openModal()
    
         
    
  }

  //UpdateTask
  const updateTask =async (task) =>{
   
    const id= task.id

    const taskToEdit = await fetchTask(id)
    console.log(taskToEdit)
    console.log(task)
    const updateTask = { ... taskToEdit,
    text: task.text,day: task.day,reminder: task.reminder,
  
   }

   
   const res = await fetch(`https://tasktrack-back.herokuapp.com/tasks/${id}`,{
      method: 'PUT',
      headers: {'Content-type' : 'application/json',},
      body:JSON.stringify(updateTask),
    })

    const data = await res.json()

    setTasks(tasks.map((task)=> task.id===id 
    ?
    {...task,reminder:task.reminder,day:task.day,text:task.text} 
    :task ))
    // setLoading(false)
    
  }



  return (
    <Router>
      
      <Modal onAdd={addTask} tasks={tasks} setEd={setEd} edData={edData} updateTask={updateTask} onEdit={editTask} showModal={showModal} setShowModal={setShowModal} setLoading={setLoading}/>
       
      <div className="container">
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
        <div className="add-new">
          <button  className="btn btn-add" onClick={openModal}>Add New Task</button> 
          {loading ? <Spinner animation="border"/> : ''}
        </div>
        
        <Route
          path='/'
          exact
          render={(props)=> (
            <> 
            {showAddTask && <AddTask  onAdd={addTask}/>}
            
                    {tasks.length>0 ?(
                      
                    <Tasks  setLoading={setLoading} loading={loading} tasks={tasks} onEdit={editTask} onDelete={deleteTask} onToggle={toggleReminder}/>)
                    
                    :(
                      
                      'No Tasks To Show'
                    ) }
            </>
          )}
        />
        <Route path='/about' component={About}/>
        <Footer/> 
      </div>
    </Router>
  );
}

export default App;

