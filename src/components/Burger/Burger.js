import React from 'react'
import classes from './Burger.module.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'


const burger = (props) => {
    // now we are getting ingredient object as props
    // we need to convert it into an array
    let transformedIngredient = Object.keys(props.ingredients)
        .map(igKey => {
            return [...Array(props.ingredients[igKey])].map((_, i) => {
                return <BurgerIngredient key={igKey + i} type={igKey}/>
            })
        })
        .reduce((arr, el) => {
            return arr.concat(el)
        }, [])

    // Object :- default JS object it has a keys method
    // which extracts the keys of the given object
    // Basically it gives an array of the keys. 
    // ['salad', 'bacon', 'cheese', 'meet']

    // _ -> avoiding the first argument.
    // for reduce:- takes arr(prev value), el(current value)
    // at the end it also takes a initial value. (here we r passing an empty array.)

    console.log(transformedIngredient);

    if (transformedIngredient.length === 0) {
        transformedIngredient = <p className={classes.p}>Please start adding ingredients!</p>
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top" />
            {transformedIngredient}
            <BurgerIngredient type="bread-bottom" />
        </div>
    );
}

export default burger;