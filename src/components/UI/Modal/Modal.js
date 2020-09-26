import React, { Component } from 'react';

import classes from './Modal.module.css'
import Aux from '../../../hoc/Auxiliary/Auxiliary'
import Backdrop from '../Backdrop/Backdrop'

class Modal extends Component {


    //using this we are restricting the calling of this again and again
    // as it is no needed untill the props.show doesn't changes.
    shouldComponentUpdate(nextProps, nextState) {
        // if (nextProps.show !== this.props.show) {
        //     return true
        // }
        // can be written as..
        return nextProps.show !== this.props.show 
    }

    componentWillUpdate() {
        console.log('[Modal] WillUpdate');
    }


    render() {

        return (
            <Aux>
                <Backdrop show={this.props.show} clicked={this.props.modalClosed}/>
                <div 
                    className={classes.Modal}
                    style={{
                        transform: this.props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: this.props.show ? '1' : '0'
                    }}>  
                    {this.props.children}
                </div>
            </Aux>
            
        )
    }
} 

export default Modal;