import React, { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
    items: [],
    totalAmount: 0
};

// action is dispatched in the code, state is the last state snapshot of the state managed by the reducer.
const cartReducer = (state, action) => {
    if (action.type === 'ADD') {
        const updatedTotalAmount = state.totalAmount + action.item.price * action.item.amount;

        // To check if the item is already part of the cart by using js function 'findIndex'. this function takes a function as an argumnet which shd return true if that is the item we are looking for otherwise false. this function will be executed for the every item in an array. 
        const existingCartItemIndex = state.items.findIndex((item) =>
            item.id === action.item.id
            // the item we were currently looking in that array has the same id as the item were adding with this action which was dispatched. it will then give us index of that item if it exists.
        );

        // this is an existing cart item that we got with the help of accessing an index.
        const existingCartItem = state.items[existingCartItemIndex];
        let updatedItems;

        if (existingCartItem) { // if item exists
            const updatedItem = {
                ...existingCartItem,
                amount: existingCartItem.amount + action.item.amount
            };
            // new array with existing items
            updatedItems = [...state.items];

            // overriding the old item with the new item. 
            updatedItems[existingCartItemIndex] = updatedItem;
        } else {
            // if item is added for the first time.
            updatedItems = state.items.concat(action.item);
        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }
    if (action.type === 'REMOVE') {

        // to check an existing item. 
        const existingCartItemIndex = state.items.findIndex((item) =>
            item.id === action.id
        );
        const existingItem = state.items[existingCartItemIndex];
        // if we remove the item entirely from the array or decrease the amount in the cart, we simply remove one item of that type. so, the total amount decreases by the price of one single item.
        const updatedTotalAmount = state.totalAmount - existingItem.price;
        let updatedItems;
        if (existingItem.amount === 1) {
            // if it is the last item of that type in the cart which we want to remove. then we will remove the entire item from the array.
            // we pass a function to filter method which executes for every item in the array and that function receives the item, and if it returns true here, we keep the item in the newly returned array. if it returns false, we get rid of it. so here we will keep all items but wanna remove the item with that id which we get on action, that is the item we want to get rid of. 
            updatedItems = state.items.filter(item => item.id !== action.id); // with this check, we make sure that the all items where the item id is not equal to the action id are kept becoz this returns true and hence the items are kept. bt the one item where the id item is equal to the action id which is to be the removed id. for that one item, we return false here and then we remove that item from the newly generated array. So, that gives the new array where item with this id is not the part anymore.  
        }
        else {
            // if amount is bigger than 1 then we want to keep the item in the cart but decrease the amount.
            const updatedItem = {
                ...existingItem,
                amount: existingItem.amount - 1
            };
            // new array with existing items
            updatedItems = [...state.items];

            // overriding the old item with the new item. 
            updatedItems[existingCartItemIndex] = updatedItem;

        }

        return {
            items: updatedItems,
            totalAmount: updatedTotalAmount
        };
    }

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