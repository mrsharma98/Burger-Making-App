import React, { Component } from "react";
import Aux from '../../hoc/Auxiliary/Auxiliary'
import Burger from '../../components/Burger/Burger'
import BuildControls from '../../components/Burger/BuildControls/BuildControls'
import Modal from '../../components/UI/Modal/Modal'
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary'
import Spinner from '../../components/UI/Spinner/Spinner'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'

import axios from '../../axios-orders'

// we typical used constant which we want to use as global
// contants in all capital characters
const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,       // Base Price
        purchaseable: false,     // this is for the odernow button 
        // if false then button will be hidden
        purchasing: false,       // for Order Now
        loading: false,
        error: false
    }

    // for fetching ingredients from firebase
    componentDidMount() {
        console.log(this.props);
        axios.get('https://react-my-burger-dd60a.firebaseio.com/ingredients.json')
            .then(response => {
                this.setState({ ingredients: response.data })
            })
            .catch(error => {
                this.setState({ error: true })
            })
    }

    // to update the order button
    // to be active or inactive
    updatePurchaseState (ingredients) {

        const sum = Object.keys(ingredients)
                    .map(igKey => {
                        return ingredients[igKey]
                    })
                    .reduce((sum, el) => {
                        return sum + el
                    }, 0)

        this.setState({ purchaseable: sum > 0 })
    }



    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]
        const updatedCount = oldCount + 1

        const updatedIngredients = {
            ...this.state.ingredients
        }
        // making a new ingredients object using spread for updating the old ingredient object.

        updatedIngredients[type] = updatedCount
        // setting the ingredient type to the updated count

        // updating the totalprice with the addition of the ingredient price of the type we have selected.
        const priceAddition = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice + priceAddition

        // setting the state 
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        })

        this.updatePurchaseState(updatedIngredients);

    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type]

        if (oldCount <= 0) {
            return 
        }
        const updatedCount = oldCount - 1

        const updatedIngredients = {
            ...this.state.ingredients
        }

        updatedIngredients[type] = updatedCount

        const priceDeduction = INGREDIENT_PRICES[type]
        const oldPrice = this.state.totalPrice
        const newPrice = oldPrice - priceDeduction

        // setting the state 
        this.setState({
            ingredients: updatedIngredients,
            totalPrice: newPrice
        })
        
        this.updatePurchaseState(updatedIngredients);

    }

    // For Order Now
    purchaseHandler = () => {
        this.setState({ purchasing: true })
    }

    // when we click somewhere outside the modal
    // the modal will close
    purchaseCancelHandler = () => {
        this.setState({ purchasing: false })
    }

    purchaseContinueHandler = () => {
        // alert("You continue!")

        const queryParams = []
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
            // console.log('encoded ' + encodeURIComponent(i));
        }

        queryParams.push('price=' + this.state.totalPrice)

        const queryString = queryParams.join('&');


        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        })

    }

    render() {

        const disabledInfo = {
            ...this.state.ingredients
        }
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
            // this will get true or false value.

        }


        // Order Summary
        let orderSummary = null

        // for the ingredients adding spinner till the time t doesn't loads
        let burger = this.state.error ? <p>Ingredients can't be loaded</p> : <Spinner />

        if (this.state.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls 
                        ingredientAdded={this.addIngredientHandler} 
                        ingredientRemoved={this.removeIngredientHandler}
                        disabled={disabledInfo}
                        purchaseable={this.state.purchaseable}
                        ordered={this.purchaseHandler}
                        price={this.state.totalPrice}
                    />
                </Aux>
            )
            orderSummary = <OrderSummary 
                            ingredients={this.state.ingredients}
                            price={this.state.totalPrice}
                            purchaseCancelled={this.purchaseCancelHandler}
                            purchaseContinued={this.purchaseContinueHandler}
                            />
        }

        // spinner
        if (this.state.loading) {
            orderSummary = <Spinner />
        }


        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                {orderSummary}
                </Modal>
                {burger}
                          
            </Aux>
        )
    }
}


export default withErrorHandler(BurgerBuilder, axios);