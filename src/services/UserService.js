import axios from "axios";
import {getToken, getUser} from "../Store";
import React, {useState} from "react";

const getUserData = async () => {


    //console.log(getToken());

    try{
        let userResponse = await axios.get('http://10.0.2.2:8000/v1/user/infor', {
            headers: {token: `Bearer ${getToken()}`}
        })


        return userResponse;

    }catch(error) {
        return {
            status: false,
            message: "User data not found",
        }
    }
}

const addToCart = async (product, location) => {
    //const [cart, setCart] = useState([]);
    //const [user, setUser] = useState(null);
    // console.log("PRODUCT: ", product);

    try{

        let userResponse = await axios.get('http://10.0.2.2:8000/v1/user/infor', {
            headers: {token: `Bearer ${getToken()}`}
        })

        let cart_res = userResponse?.data.cart;


        const check = cart_res.every(item => {
            return item._id !== product._id || item.location._id !== location._id;
        })

        let cartRespone;


        if(check) {


            cartRespone = await axios.patch('http://10.0.2.2:8000/v1/user/addCart', {cart: [...cart_res, {...product, quantity: 1, location: location}] }, {
                headers: {token: `Bearer ${getToken()}`}
            })

            
        }
        else{

            cart_res.forEach(item => {
                if(item._id === product._id && item.location._id === location._id){
                    
                    item.quantity += 1
                    // if(item.quantity > 2) {
                    //     item.quantity -= 1;
                    //     alert("Bạn tạm ko thể mua thêm sản phẩm này");
                    // }
                    
                }
            })

            cartRespone = await axios.patch('http://10.0.2.2:8000/v1/user/addCart', {cart: [...cart_res] }, {
                    headers: {token: `Bearer ${getToken()}`}
            }) 
        }
        //console.log("Cart Res: ", cartRespone)

        return cartRespone;

    } catch(error) {
        return {
            status: false,
            message: "Item added to cart failed",
        }
    }
}



const removeFromCart = async (product, location) => {
    //const [cart, setCart] = useState([]);
    //const [user, setUser] = useState(null);


    try{


        let userResponse = await axios.get('http://10.0.2.2:8000/v1/user/infor', {
            headers: {token: `Bearer ${getToken()}`}
        })

        let cartData = userResponse?.data?.cart;


        
        cartData.forEach((item, index) => {
            if(item._id === product._id && item.location?._id === location._id){
                //cartData.splice(index, 1)
                item.quantity === 1 ? cartData.splice(index, 1) : item.quantity -= 1
            }
        })


       
        let cartRespone = await axios.patch('http://10.0.2.2:8000/v1/user/addCart', {cart: [...cartData] }, {
            headers: {token: `Bearer ${getToken()}`}
        })         
        
        return cartRespone;

    } catch(error) {
        return {
            status: false,
            message: "Item remove from cart failed",
        }
    }
}


const getBookmarks = async () => {
    try{

        let userResponse = await axios.get('http://10.0.2.2:8000/v1/user/infor', {
            headers: {token: `Bearer ${getToken()}`}
        })

        let bookmarksData = userResponse?.data?.bookmark;
        
        return bookmarksData;

    } catch(error) {
        return {
            status: false,
            message: "Bookmark data not found",
        }
    }
}

const addBookmark = async (product, location) => {
    try{

        let userResponse = await axios.get('http://10.0.2.2:8000/v1/user/infor', {
            headers: {token: `Bearer ${getToken()}`}
        })

        let bookmarksData = userResponse?.data?.bookmark;
        let bookmarkRespone = await axios.patch('http://10.0.2.2:8000/v1/user/addBookmark', {bookmark: [...bookmarksData, {...product, location: location}] }, {
            headers: {token: `Bearer ${getToken()}`}
        })

        return bookmarkRespone;

    } catch(error) {
        return {
            status: false,
            message: "Bookmark added failed",
        }
    }
}


const removeBookmark = async (product, location) => {
    try{

        let userResponse = await axios.get('http://10.0.2.2:8000/v1/user/infor', {
            headers: {token: `Bearer ${getToken()}`}
        })

        let bookmarksData = userResponse?.data?.bookmark;


        bookmarksData.forEach((item, index) => {
            if(item._id === product._id && item.location?._id === location._id){
                //cartData.splice(index, 1)
                bookmarksData.splice(index, 1)
            }
        })

        let bookmarkRespone = await axios.patch('http://10.0.2.2:8000/v1/user/addBookmark', {bookmark: [...bookmarksData] }, {
            headers: {token: `Bearer ${getToken()}`}
        })

        return bookmarkRespone;

    } catch(error) {
        return {
            status: false,
            message: "Bookmark remove failed",
        }
    }
}



export default {
    getUserData, 
    addToCart, 
    removeFromCart, 
    addBookmark, 
    removeBookmark, 
    getBookmarks
};