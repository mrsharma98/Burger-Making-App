import React from 'react'

import Aux from '../../../hoc/Auxiliary'

const orderSummary = (props) => {

    const ingredientSummary = Object.keys(props.ingredients)
        .map(igKey =>{
        return (
            <li key={igKey}>
                <span style={{textTransform: 'capitalize'}}>
                    {igKey}
                </span>
                : {props.ingredients[igKey]}
            </li>)
        // like<li>Salad : 1</li>
        })

    return (
        <Aux>
            <h3>Your Order</h3>
            <p>A Delicious burder with the following ingredients:</p>
            <ul>
                {ingredientSummary}
            </ul>
            <p>Continue to Checkout?</p>
        </Aux>
    )
}

export default orderSummary;