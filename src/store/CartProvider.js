import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0
};

// action is dispatched in the code, state is the last state snapshot of the state managed by the reducer.
const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        const updatedItems = state.items.concat(action.item);
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }
    // if (action.type === 'REMOVE') {
    //     return
    // }
    // return new state snapshot.
    return defaultCartState;
};

const CartProvider = props => {
    const [cartState, dispatchCartAction] = useReducer(cartReducer, defaultCartState);

    const addItemToCartHandler = (item) => {
        dispatchCartAction({
            type: 'ADD', item: item
        });
    };

    const removeItemFromCartHandler = (id) => {
        dispatchCartAction({
            type: 'REMOVE', id: id
        });
    };

    const cartContext = {
        items: cartState.items,
        totalAmount: cartState.totalAmount,
        addItem: addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    }

    return (
        <CartContext.Provider value={cartContext}>
            {/* this  alllow us to wrap any component that should get an access to this context with this CartProvider component. */}
            {props.children}
        </CartContext.Provider>
    );
}

export default CartProvider;