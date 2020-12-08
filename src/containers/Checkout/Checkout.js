import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import { connect } from 'react-redux'

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'
import ContactData from './ContactData/ContactData'

class Checkout extends Component {    

    checkoutCancelledHandler = () => {
        this.props.history.goBack()
    }

    checkoutContinuedHandler = () => {
        this.props.history.replace('/checkout/contact-data')
    }

    render () {
        return (
            <div>
                <CheckoutSummary 
                    ingredients={this.props.ings}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler}    
                />
                {/* <Route path={this.props.match.path + '/contact-data'} component={ContactData}/> */}
                {/* we will not use it as we want to pass the ingredients to this component */}
                <Route 
                    path={this.props.match.path + '/contact-data'} 
                    component={ContactData}
                />

            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients
    }
}

// here we don't want dispatcher as we are not dispatching anything

export default connect(mapStateToProps)(Checkout);