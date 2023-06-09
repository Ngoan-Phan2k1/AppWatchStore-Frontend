import {UserService} from "../services";

const types = {
    
    GET_CART_ITEMS: "GET_CART_ITEMS",
    SET_IS_LOADING: "SET_IS_LOADING",
}

const addCart = (product, location) => {

    //console.log("PRODUCT: ", product);
    return (dispatch) => {
        dispatch({
            type: types.SET_IS_LOADING,
            payload: true,
        })
        UserService.addToCart(product, location).then(cartResponse => {

            //console.log("Cart Res: ", cartResponse?.data?.cart)

            dispatch({
                type: types.GET_CART_ITEMS,
                payload: cartResponse?.data?.cart
            });
            dispatch({
                type: types.SET_IS_LOADING,
                payload: false,
            })
        }).catch(() => {
            dispatch({
                type: types.SET_IS_LOADING,
                payload: false,
            })
        })
        
    }
}


const removeCart = (product, location) => {
    return (dispatch) => {
        dispatch({
            type: types.SET_IS_LOADING,
            payload: true,
        })
        UserService.removeFromCart(product, location).then(cartResponse => {

            //console.log("Cart res: ", cartResponse?.data?.cart)

            dispatch({
                type: types.GET_CART_ITEMS,
                payload: cartResponse?.data?.cart
            });
            dispatch({
                type: types.SET_IS_LOADING,
                payload: false,
            })
        }).catch(() => {
            dispatch({
                type: types.SET_IS_LOADING,
                payload: false,
            })
        })
        
    }
}


const getCartItems = () => {
    return (dispatch) => {
        dispatch({
            type: types.SET_IS_LOADING,
            payload: true,
        })
        UserService.getUserData().then(cartResponse => {

            // console.log("CART RESPONSE: ", cartResponse?.data?.cart)

            dispatch({
                type: types.GET_CART_ITEMS,
                payload: cartResponse?.data?.cart
            });
            dispatch({
                type: types.SET_IS_LOADING,
                payload: false,
            })
        }).catch(() => {
            dispatch({
                type: types.SET_IS_LOADING,
                payload: false,
            })
        })
        
    }
}

export default {types, addCart, removeCart, getCartItems};