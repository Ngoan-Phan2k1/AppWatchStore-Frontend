import { StorageService, UserService } from "../services";
import {getToken} from "../Store";
import CartAction from "./CartAction";

const types = {
    SET_IS_APP_LOADING: 'SET_IS_APP_LOADING',
    SET_TOKEN: 'SET_TOKEN',
    //SET_FIRST_TIME_USE: 'SET_FIRST_TIME_USE',
    SET_USER_DATA: 'SET_USER_DATA',
}


const setIsAppLoading = (isAppLoading) => {
    return {
        type: types.SET_IS_APP_LOADING,
        payload: isAppLoading
    }
}

const setToken = (token) => {
    return {
        type: types.SET_TOKEN,
        payload: token
    };
};

const setUserData = (user) => {
    return {
        type: types.SET_USER_DATA,
        payload: user
    };
};


// const setFirstTimeUse = () => {
//     return {
//         type: types.SET_FIRST_TIME_USE,
//         payload: false,
//     }
// }

const appStart = () => {
    return (dispatch, getState) => {
        // StorageService.getFirstTimeUse().then(isFirstTimeUse => {
        //     dispatch({
        //         type: types.SET_FIRST_TIME_USE,
        //         payload: isFirstTimeUse ? false : true
        //     });
        // });
        // StorageService.getToken().then(token => {
        //     if(token){
        //        dispatch({
        //             type: types.SET_TOKEN,
        //             payload: token
        //         }) 
        //     }
            
        // });
        // dispatch({
        //     type: types.SET_IS_APP_LOADING,
        //     payload: false
        // })

        if(getToken()){
            UserService.getUserData().then(userResponse => {
                if(userResponse?.status === 200){
                    dispatch({
                        type: types.SET_USER_DATA,
                        payload: userResponse?.data
                    });
                    dispatch(CartAction.getCartItems());
                    dispatch({
                        type: types.SET_IS_APP_LOADING,
                        payload: false
                    })
                }
            })
        }
        



    };
}

export default {setIsAppLoading, setToken, setUserData, appStart, /* appStart, setFirstTimeUse, */ types};