
const reducer = (state, action) => {

    if(action.type === "LOADING"){
        return{...state, loading: true};
    };
    if(action.type === "DISPLAY_ITEMS"){
        return{state, cart: action.payload, loading: false}
    }

    if(action.type === "CLEAR_CART"){
        return {...state, cart: []}
    };
    if(action.type === "REMOVE"){
        return {...state, cart: state.cart.filter((item) => item.id !== action.payload)}
    };
    if(action.type === "INCREASE_AMOUNT"){
        let tempCart = state.cart.map((item)=>{
            if(item.id === action.payload){
                return {...item,amount:item.amount + 1}
            }
            return item;
        })
        return {...state, cart: tempCart}
    };
    if(action.type === "DECREASE_AMOUNT"){
        let tempCart = state.cart.map((item)=>{
            if(item.id === action.payload){
                return {...item,amount:item.amount - 1}
            }
            return item;
        }).filter((item)=> item.amount !== 0);
        return {...state, cart: tempCart}
    };
    if(action.type === "GET_TOTAL"){
        let { total, amount } = state.cart.reduce((cartTotal, cartItem)=>{
            const {price, amount} = cartItem;
            const itemTotal = price * amount;

            cartTotal.total += itemTotal;
            cartTotal.amount += amount;
            return cartTotal;
        },{
            total: 0,
            amount: 0,
        })
        total = parseFloat(total.toFixed(2));
        return {...state,total,amount};
    };

    throw new Error('no matching action type in reducer');
};

export default reducer;