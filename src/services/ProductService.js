import axios from "axios";
import {getToken} from "../Store";

const getProdutcsNotFilter = async () => {
    try{
        let produtcs = await axios.get('http://10.0.2.2:8000/v2/product/notFilter');


        if (produtcs?.status === 200){
            return {
                status: true,
                message: `Warehouse data fetched`,
                data: produtcs?.data,
            };
        }
        else{
            return {
                status: false,
                message: `Products data not found`,
            };
        }

    }catch(error) {
        return {
            status: false,
            message: "Produtcs data not found",
        }
    }
}


const getOneProduct = async (id) => {
    try{
        let product = await axios.get(`http://10.0.2.2:8000/v2/product/${id}`);


        if (product?.status === 200){
            return {
                status: true,
                message: `Product find successfully`,
                data: product?.data,
            };
        }
        else{
            return {
                status: false,
                message: `Product data not found`,
            };
        }

    }catch(error) {
        return {
            status: false,
            message: "Produtcs data not found",
        }
    }
}

export default {getProdutcsNotFilter, getOneProduct};