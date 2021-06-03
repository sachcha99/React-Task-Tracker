import React from 'react'
import PropTypes from 'prop-types'
import { Button } from './Button'
import {useLocation} from 'react-router-dom'

export const Header = ({title,onAdd,showAdd,setShowModal}) => {
    const openModal = () => {
        setShowModal(prev=>!prev)
      }

    const onClick = () =>{
        console.log('click')
    }
    const location =useLocation()

    return (
        <>
            <header className='header'>
                <h1>{title}</h1>

        
                {/* {location.pathname==='/' &&( <Button color={showAdd ? 'red' : 'green'}  text={showAdd ? 'Close' : 'Add'} onClick={onAdd} />)} */}
            </header>
        </>
    )
}

Header.defaultProps={
    title: 'Task Tracker',
}

Header.propTypes ={
    title: PropTypes.string.isRequired,
}

//CSS in JS
// const headingStyle={
//     color:'red',
//     backgroundColor:'black', 
// }