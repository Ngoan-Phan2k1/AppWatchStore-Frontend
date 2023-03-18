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

const addToCart = async (product) => {
    //const [cart, setCart] = useState([]);
    //const [user, setUser] = useState(null);
    // console.log("PRODUCT: ", product);

    try{

        let userResponse = await axios.get('http://10.0.2.2:8000/v1/user/infor', {
            headers: {token: `Bearer ${getToken()}`}
        })

        let cart_res = userResponse?.data.cart;


        const check = cart_res.every(item => {
            return item._id !== product._id;
        })

        let cartRespone;


        if(check) {


            cartRespone = await axios.patch('http://10.0.2.2:8000/v1/user/addCart', {cart: [...cart_res, {...product, quantity: 1}] }, {
                headers: {token: `Bearer ${getToken()}`}
            })

            
        }
        else{

            cart_res.forEach(item => {
                if(item._id === product._id){
                    
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



const removeFromCart = async (product) => {
    //const [cart, setCart] = useState([]);
    //const [user, setUser] = useState(null);


    try{


        let userResponse = await axios.get('http://10.0.2.2:8000/v1/user/infor', {
            headers: {token: `Bearer ${getToken()}`}
        })

        let cartData = userResponse?.data?.cart;


        
        cartData.forEach((item, index) => {
            if(item._id === product._id){
                //cartData.splice(index, 1)

                item.quantity === 1 ? cartData.splice(index, 1) : item.quantity -= 1
            }
        })




        //console.log("CART SPLICE: ", cart);

       
        let cartRespone = await axios.patch('http://10.0.2.2:8000/v1/user/addCart', {cart: [...cartData] }, {
            headers: {token: `Bearer ${getToken()}`}
        })         
        

        
        // let cartRespone = await axios.patch('http://10.0.2.2:8000/v1/user/addCart', {cart: [...cart, {...product, quantity: 1}] }, {
        //     headers: {token: `Bearer ${getToken}`}
        // })

        //const user = getUserData();
        //console.log("User: ");
        return cartRespone;

    } catch(error) {
        return {
            status: false,
            message: "Item remove from cart failed",
        }
    }
}



export default {getUserData, addToCart, removeFromCart};