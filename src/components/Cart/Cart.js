import React, { useContext } from "react";
import styles from './Cart.module.css';
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";

const Cart = (props) => {
    const ctx = useContext(CartContext);

    const cartItems = <ul className={styles['cart-items']}>{
    ctx.items.map((item) => <li>
                        {ctx.name}
                    </li>)}
    </ul>;
    return (
        <Modal onClose={props.onHideCart}>
            {cartItems}
            <div className={styles.total}>
                <span>Total Amount</span>
                <span>$11.11</span>
            </div>
            <div className={styles.actions}>
                <button className={styles['button--alt']} onClick={props.onHideCart}>Close</button>
                <button className={styles.button}>Order</button>
            </div>
        </Modal>
    );
}

export default Cart;
