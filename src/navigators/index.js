import React, {useEffect} from "react";
import { NavigationContainer } from "@react-navigation/native";
import {createStackNavigator} from '@react-navigation/stack';
import {
    SplashScreen, 
    WelcomeScreen, 
    SigninScreen, 
    SignupScreen,
    ForgotPasswordScreen,
    ResgisterPhoneScreen,
    VerificationScreen,
    HomeScreen,
    WarehouseScreen,
    ProductScreen,

} from '../screens';
import HomeTabs from "./BottomTabs";
import {useSelector, useDispatch, connect} from 'react-redux';
import { GeneralAction } from "../actions";

const Stack = createStackNavigator()

const Navigators = ({token}) => {

    // const {isAppLoading, token, isFirstTimeUse} = useSelector(
    //     state => state?.generalState
    // );

   // console.log("token: ", token);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(GeneralAction.appStart())
    }, [token])



    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                {
                    !token ? (
                        <>
                            <Stack.Screen name="Splash" component={SplashScreen}/>          
                            <Stack.Screen name="Welcome" component={WelcomeScreen}/>             
                            <Stack.Screen name="Signin" component={SigninScreen}/>
                            <Stack.Screen name="Signup" component={SignupScreen}/>
                            <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen}/>
                            <Stack.Screen name="RegisterPhone" component={ResgisterPhoneScreen}/>
                            <Stack.Screen name="Verification" component={VerificationScreen}/>
                        </>
                        
                    ): (
                        <>
                            <Stack.Screen name="HomeTabs" component={HomeTabs}/>
                            {/* <Stack.Screen name="Home" component={HomeScreen}/> */}
                            <Stack.Screen name="Warehouse" component={WarehouseScreen}/>
                            <Stack.Screen name="Product" component={ProductScreen}/>
                        </>
                        
                        )
                }
                
            </Stack.Navigator>
        </NavigationContainer>
    )
};

const mapStateToProps = state => {
    return {
        token: state.generalState.token,
    };
};



export default connect(mapStateToProps)(Navigators);
