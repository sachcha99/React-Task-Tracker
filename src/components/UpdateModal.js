import React from 'react'
import {useState} from 'react'
import {FaTimes} from 'react-icons/fa'

export const UpdateModal = ({updateTask,edData,showUpdateModal,setShowUpdateModal}) => {

    
    
    console.log(edData)

    const id = edData.id    
    const Ttext= edData.text
    const Tday = edData.day
    const Treminder = edData.reminder

    const [text,setText] = useState(Ttext)
    const[day,setDay] = useState(Tday)
    const[reminder,setReminder] = useState(Treminder)


    const onSubmit = (e) =>{
        e.preventDefault()

        if (!text){
            alert('Please update task')
            return
        }
        
        updateTask({id,text,day,reminder})
        setText('')
        setDay('')
        setReminder(false)

       setShowUpdateModal(prev=>!prev)

    }
    return (
        <>
            {showUpdateModal? 
                <div className="background">
                    <div className="ModalWrapper">

                        <div className="ModalContent">

                        <form className="add-form" onSubmit={onSubmit}>
                            <div className="form-control">
                                <label htmlFor="">Task</label>
                                <input type="text" placeholder="Add Task" name="" id=""  value={text} onChange={(e) => setText(e.target.value)}/>
                            </div>
                            <div className="form-control ">
                                <label htmlFor="">Date & Time </label>
                                <input type="text" placeholder="Add Date and Time" name="" id="" value={day} onChange={(e) => setDay(e.target.value)}/>
                            </div>
                            <div className="form-control form-control-check">
                                <label htmlFor="">Set Reminder</label>
                                <input type="checkbox" checked={reminder} name="" id="" value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)}/>
                            </div>

                            <input className="btn btn-block" type="submit" value="Save Task" />
                        </form  >

                        </div>
                        <div className="CloseModalButton" onClick={() => setShowUpdateModal(prev=>!prev)}>
                            <FaTimes/>
                        </div>
                    </div>


                </div>
                
                
                
            : null}
        </>
    )
}
