
import {useState,useEffect} from 'react';
import{BrowserRouter as Router,Route} from 'react-router-dom'
import { About } from './components/About';
import { AddTask } from './components/AddTask';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { Modal } from './components/Modal';
import { Tasks } from './components/Tasks';



function App() {
const[showModal,setShowModal] = useState(false)

const openModal = () => {
  setShowModal(prev=>!prev)
}

  const[showAddTask, setShowAddTask] = useState(false)

  const [tasks,setTasks] = useState([])

  useEffect(() =>{
    const getTasks = async() =>{
      const tasksFromServer= await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  },[])

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

    const res  = await fetch('https://tasktrack-back.herokuapp.com/tasks',{
      method: 'POST',
      headers: {
        'Content-type' : 'application/json'
      },
      body:JSON.stringify(task)

    })

    const data= await res.json()
    setTasks([...tasks,data])

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
  }

  //Toggle Reminder
  const toggleReminder =async (id) =>{

    const taskToToggle = await fetchTask(id)
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
  }

  return (
    <Router>
      
        <Modal onAdd={addTask} showModal={showModal} setShowModal={setShowModal}/>
      <div className="container">
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask}/>
        <div className="add-new">
          <button  className="btn btn-add" onClick={openModal}>Add New Task</button>
        </div>
        
        <Route
          path='/'
          exact
          render={(props)=> (
            <> 
            {showAddTask && <AddTask  onAdd={addTask}/>}
                    {tasks.length>0 ?(
                    <Tasks tasks={tasks} onDelete={deleteTask} onToggle={toggleReminder}/>)
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

