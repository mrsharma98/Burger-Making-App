import React from 'react'
import classes from './Backdrop.module.css'

const backdrop = (props) => (
    props.show ? <div className={classes.Backdrop} onClick={props.clicked}></div> : null
)


export default backdrop;
// this is basically for making the screen disabled kind of when modal opens
