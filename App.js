import React from "react";
import Navigators from "./src/navigators";
import 'react-native-gesture-handler';
import {store} from './src/Store'
import {Provider} from 'react-redux'

export default () => (
    <Provider store={store}>
        <Navigators/>


    </Provider>
    
)