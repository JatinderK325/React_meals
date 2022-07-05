import React, {useContext} from 'react';
import CartIcon from '../Cart/CartIcon';
import styles from './HeaderCartButton.module.css';
import CartContext from '../../store/cart-context';

const HeaderCartButton = (props) => {

    // by using 'useContext' here, the 'HeaderCartButton' will be re-evaluated by react whenever the context changes. It will do changes when we do updated in the 'CartProvider' component.
    const ctx = useContext(CartContext);

    // reduce method tranforms array of data into a single value. it takes two arguments. first, the function which is called for you and second is starting value. the first argument that is function then takes two arguments automatically by js(which is calling that function for every item in that array on which you are calling reduce.). first is 'currentNumber'(value carried on across execution, initially it is 0 as below bt after the first time this function has been executed, it will be the result that you return in the previous execution ) and second is 'item' at which it is currently having a look.

    const numberOfCartItems = ctx.items.reduce((currentNumber, item) => {
        return currentNumber + item.amount;
    }, 0);

    return(
        <button className={styles.button} onClick={props.onClick}>
            <span className={styles.icon}>
                <CartIcon></CartIcon>
            </span>
            <span>Your Cart</span>
            <span className={styles.badge}>
                {numberOfCartItems}
            </span>
        </button>
    );
}

export default HeaderCartButton;
