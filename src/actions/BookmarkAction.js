import {UserService} from "../services";

const types = {
    
    GET_BOOKMARKS: "GET_BOOKMARKS",
    SET_IS_LOADING: "SET_IS_LOADING",
}

const addBookmark = (product, location) => {

    //console.log("PRODUCT: ", product);
    return (dispatch) => {
        dispatch({
            type: types.SET_IS_LOADING,
            payload: true,
        })
        UserService.addBookmark(product, location).then(bookmarkRes => {

            //console.log("Bookmark Res: ", bookmarkRes?.data?.bookmark)

            dispatch({
                type: types.GET_BOOKMARKS,
                payload: bookmarkRes?.data?.bookmark
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


const removeBookmark = (product, location) => {
    return (dispatch) => {
        dispatch({
            type: types.SET_IS_LOADING,
            payload: true,
        })
        UserService.removeBookmark(product, location).then(bookmarkRes => {

            //console.log("Bookmark res: ", bookmarkRes?.data?.bookmark)

            dispatch({
                type: types.GET_BOOKMARKS,
                payload: bookmarkRes?.data?.bookmark
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


const getBookmarks = () => {
    return (dispatch) => {
        dispatch({
            type: types.SET_IS_LOADING,
            payload: true,
        })
        UserService.getBookmarks().then(bookmarkRes => {


            dispatch({
                type: types.GET_BOOKMARKS,
                payload: bookmarkRes
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

export default {types, addBookmark, removeBookmark, getBookmarks};