import React from 'react'

import classes from './Button.module.css'

const button = (props) => (
    <button
        disabled={props.disabled}
        className={[classes.Button, classes[props.btnType]].join(' ')}
        // we are using [] bcz we have to give multiple classes and dynamically
        // then joining and making them a string separated by a wide space
        onClick={props.clicked}>{props.children}</button>
)

export default button;