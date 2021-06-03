import React from 'react'
import {useState} from 'react'
import {FaTimes} from 'react-icons/fa'

export const Modal = ({showModal,setShowModal,onAdd}) => {

    const [text,setText] = useState('')
    const[day,setDay] = useState('')
    const[reminder,setReminder] = useState(false)


    const onSubmit = (e) =>{
        e.preventDefault()

        if (!text){
            alert('Please add a task')
            return
        }
        onAdd({text,day,reminder})

        setText('')
        setDay('')
        setReminder(false)

        setShowModal(prev=>!prev)

    }
    return (
        <>
            {showModal? 
                <div className="background">
                    <div className="ModalWrapper" showModal={showModal}>

                        <div className="ModalContent">

                        <form className="add-form" onSubmit={onSubmit}>
                            <div className="form-control">
                                <label htmlFor="">Task</label>
                                <input type="text" placeholder="Add Task" name="" id=""  value={text} onChange={(e) => setText(e.target.value)}/>
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
                        <div className="CloseModalButton" onClick={() => setShowModal(prev=>!prev)}>
                            <FaTimes/>
                        </div>
                    </div>


                </div>
                
                
                
            : null}
        </>
    )
}
