import axios from "axios";
import {getToken} from "../Store";

const getWarehouses = async () => {
    try{
        let warehouses = await axios.get('http://10.0.2.2:8000/v1/warehouse');


        if (warehouses?.status === 200){
            return {
                status: true,
                message: `Warehouse data fetched`,
                data: warehouses?.data,
            };
        }
        else{
            return {
                status: false,
                message: `Warehouse data not found`,
            };
        }

    }catch(error) {
        return {
            status: false,
            message: "Warehouse data not found",
        }
    }
}

const getOneWarehouses = async (warehouseId) => {
    try{
        let warehouses = await axios.get(`http://10.0.2.2:8000/v1/warehouse/${warehouseId}`);


        if (warehouses?.status === 200){
            return {
                status: true,
                message: `Warehouse data fetched`,
                data: warehouses?.data,
            };
        }
        else{
            return {
                status: false,
                message: `Warehouse data not found`,
            };
        }

    }catch(error) {
        return {
            status: false,
            message: "Warehouse data not found",
        }
    }
}




export default {getWarehouses, getOneWarehouses};