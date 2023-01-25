import React, { useContext } from "react";
import styles from './Cart.module.css';
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
//
const Cart = (props) => {
    const ctx = useContext(CartContext);

    const totalAmount = `$${ctx.totalAmount.toFixed(2)}`;
    const hasItems = ctx.items.length > 0;

    const cartItemRemoveHandler = id => {
        ctx.removeItem(id);
    };

    const cartItemAddHandler = (item) => {
        ctx.addItem({ ...item, amount: 1});
    };

    const cartItems = <ul className={styles['cart-items']}>{
        ctx.items.map(item => <CartItem
            id={item.id}
            key={item.id}
            name={item.name}
            amount={item.amount}
            price={item.price}
            // bind(null, item.id) ensures that the id to be added or removed item is passed to remove handler. bind preconfigure the function for future execution and allows us to preconfigure the argument that function will receive when it being executed. means we get assure that while execution of this function we are getting these arguments respectively.
            onRemove={cartItemRemoveHandler.bind(null, item.id)}
            onAdd={cartItemAddHandler.bind(null, item)}
        />)}
    </ul>;
    return (
        <Modal onClose={props.onHideCart}>
            {cartItems}
            <div className={styles.total}>
                <span>Total Amount</span>
                <span>{totalAmount}</span>
            </div>
            <div className={styles.actions}>
                <button className={styles['button--alt']} onClick={props.onHideCart}>Close</button>
                {hasItems && <button className={styles.button}>Order</button>}
            </div>
        </Modal>
    );
}

export default Cart;
