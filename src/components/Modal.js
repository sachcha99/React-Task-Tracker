import React from 'react'
import {useRef,useState,useEffect} from 'react'
import {FaTimes} from 'react-icons/fa'

export const Modal = ({edData,showModal,setShowModal,onAdd,setEd,tasks,updateTask}) => {
      

     
        const [id,setId] = useState('')
        const [text,setText] = useState('')
        const[day,setDay] = useState('')
        const[reminder,setReminder] = useState(false)


        useEffect(() => {
            
                if(edData!=null){

                    for(let i=0;i<tasks.length;i++)
                    {
                      if(tasks[i].id===edData){
                        console.log(tasks[i])
                        
                        setId(tasks[i].id)
                        setText(tasks[i].text)
                        setDay(tasks[i].day)
                        setReminder(tasks[i].reminder)
                      }
                    }
        
                }   
               
          },[edData!=null]);
        
        const closeModal = () =>{
            

            setEd(null)
            setShowModal(prev=>!prev)
            setText('')
            setDay('')
            setReminder(false)

        }
    
        
     const handleText= (e) =>{
        setText(e.target.value)
        
     }   
        
    const onSubmitForm = (e) =>{
        e.preventDefault()

        if(edData==null){
            if (!text){
                alert('Please add a task')
                
            }
            
            onAdd({text,day,reminder})

        }else {
            updateTask({id,text,day,reminder})
        }
        setEd(null)
        setId('')
        setText('')
        setDay('')
        setReminder(false)

        setShowModal(prev=>!prev)
        
       
    }
    return (
        <>
            {showModal? 
                <div className="background">
                    <div className="ModalWrapper" >
                       

                        <div className="ModalContent">
                            <h2 className="modalTitle">{edData==null? 'Add New Task':'Update Task'}</h2>
                        <form className="add-form"  onSubmit={onSubmitForm}>
                            <div className="form-control">
                                <label htmlFor="">Task</label>
                                <input type="text"  placeholder="Add Task" name="" id=""   value={text} onChange={handleText}/>
                            </div>
                            <div className="form-control ">
                                <label htmlFor="">Date & Time</label>
                          



                                <input type="text" placeholder="Add Date and Time" name="" id="" value={day} onChange={(e) => setDay(e.target.value)}/>
                            </div>
                            <div className="form-control form-control-check">
                                <label htmlFor="">Set Reminder</label>
                                <input type="checkbox" checked={reminder} name="" id="" value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)}/>
                            </div>
                         
                            <input className="btn btn-block" type="submit" value="Save Task" />
                            
                            
                        </form  >

                        </div>
                       
                        <div className="CloseModalButton" onClick={closeModal}>
                            <FaTimes/>
                        </div>

                    </div>


                </div>
                
                
                
            : null}
        </>
    )
}
