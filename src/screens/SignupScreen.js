import React, {useState} from "react";
import { View, Text, StyleSheet, StatusBar, TextInput, TouchableOpacity, Image } from "react-native";
import { Separator } from "../components";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import { Colors, Fonts, Images } from "../contants";
import { Display } from "../utils";
import { AuthenticationService } from "../services";
import LottieView from "lottie-react-native";
import axios from "axios";

const SignupScreen = ({navigation}) => {
    const [isPaswordShow, setIsPaswordShow] = useState(false);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);



    const register = async () => {
        let user = {
            username,
            email,
            password,
        }
        setIsLoading(true);

        AuthenticationService.register(user).then(response => {
            //console.log("response: ", response);
            setIsLoading(false);
            if(!response?.status){
                setErrorMessage(response?.message)
            }
        })



        //navigation.navigate('RegisterPhone')
    };

    return (
        <View style={styles.container}>
            <StatusBar 
                barStyle="dark-content"
                backgroundColor={Colors.DEFAULT_WHITE} 
                translucent
            />
            <Separator height={StatusBar.currentHeight}/>
            <View style={styles.headerContainer}>
                <Ionicons 
                    name="chevron-back-outline" 
                    size={30} 
                    onPress={() => navigation.goBack()}
                    color='black'
                />
                <Text style={styles.headerTitle}>Sign Up</Text>
            </View>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.content}>Enter your username and password, and enjoy ordering watch</Text>
            <View style={styles.inputContainer}>
                <View style={styles.inputSubContainer}>
                    <Feather 
                        name="user" 
                        size={22} 
                        color={Colors.DEFAULT_GREY}
                        style={{marginRight: 10}}
                    />
                    <TextInput 
                        placeholder="Username" 
                        placeholderTextColor={Colors.DEFAULT_GREY}
                        selectionColor={Colors.DEFAULT_GREY}
                        style={styles.inputText}
                        onChangeText={(text) => setUsername(text)}
                    />
                </View>
            </View>
            <Separator height={15}/>
            <View style={styles.inputContainer}>
                <View style={styles.inputSubContainer}>
                    <Feather 
                        name="mail" 
                        size={22} 
                        color={Colors.DEFAULT_GREY}
                        style={{marginRight: 10}}
                    />
                    <TextInput 
                        placeholder="Email" 
                        placeholderTextColor={Colors.DEFAULT_GREY}
                        selectionColor={Colors.DEFAULT_GREY}
                        style={styles.inputText}
                        onChangeText={(text) => setEmail(text)}
                    />
                </View>
            </View>
            <Separator height={15}/>
            <View style={styles.inputContainer}>
                <View style={styles.inputSubContainer}>
                    
                    <Feather
                        name="lock" 
                        size={22} 
                        color={Colors.DEFAULT_GREY}
                        style={{marginRight: 10}}
                    />
                    <TextInput
                        secureTextEntry={isPaswordShow ? false : true}
                        placeholder="Password" 
                        placeholderTextColor={Colors.DEFAULT_GREY}
                        selectionColor={Colors.DEFAULT_GREY}
                        style={styles.inputText}
                        onChangeText={(text) => setPassword(text)}
                    />
                    <Feather
                        name={isPaswordShow ? "eye" : "eye-off" }
                        size={22} 
                        color={Colors.DEFAULT_GREY}
                        style={{marginRight: 10}}
                        onPress={() => setIsPaswordShow(!isPaswordShow)}
                    />
                </View>
            </View>

            <Text style={styles.errorMessage}>{errorMessage}</Text>

            <TouchableOpacity 
                style={styles.signinButton} 
                onPress={() => register()}>
                
                {isLoading ? (
                    <LottieView
                        source={Images.LOADING}
                        autoPlay
                    />
                    ) :
                    <Text style={styles.signinButtonText}>Create Account</Text>

                }
                
                
            </TouchableOpacity>

            <Text style={styles.orText}>OR</Text>
            <TouchableOpacity style={styles.facebookButton} >
                <View style={styles.socialButtonContainer}>
                    <View style={styles.signinButtonLogoContainer}>
                        <Image source={Images.FACEBOOK} style={styles.signinButtonLogo}/>
                    </View>
                    <Text style={styles.socialSigninButtonText}>Connect with Facebook</Text>
                </View>
            </TouchableOpacity >
            <TouchableOpacity style={styles.googleButton} >
                <View style={styles.socialButtonContainer}>
                    <View style={styles.signinButtonLogoContainer}>
                        <Image source={Images.GOOGLE} style={styles.signinButtonLogo}/>
                    </View>
                    <Text style={styles.socialSigninButtonText}>Connect with Google</Text>
                </View>
            </TouchableOpacity>
        </View>
        
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.DEFAULT_WHITE, 
    },
    headerContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingVertical: 10,
        paddingHorizontal: 20,
        color: 'black'
    },
    headerTitle: {
        fontSize: 20,
        fontFamily: Fonts.POPPINS_MEDIUM,
        color: 'black',
        lineHeight: 20 * 1.4,
        width: Display.setWidth(80),
        textAlign: 'center',
    },
    title: {
        fontSize: 20,
        fontFamily: Fonts.POPPINS_MEDIUM,
        color: 'black',
        lineHeight: 20 * 1.4,
        marginTop: 50,
        marginBottom: 10,
        marginHorizontal: 20,
    },
    content: {
        fontSize: 20,
        fontFamily: Fonts.POPPINS_MEDIUM,
        marginTop: 10,
        marginBottom: 20,
        color: 'black',
        marginHorizontal: 20,
    },
    inputContainer: {
        color: 'black',
        backgroundColor: Colors.LIGHT_GREY,
        paddingHorizontal: 10,
        marginHorizontal: 20,
        borderRadius: 8,
        borderWidth: 0.5,
        borderColor: Colors.LIGHT_GREY2,
        justifyContent: "center",
    },
    inputSubContainer: {
        flexDirection: "row",
        alignItems: "center",
        color: 'black',
    },
    inputText:{
        fontSize: 18,
        textAlignVertical: "center",
        padding: 0,
        height: Display.setHeight(6),
        color: Colors.DEFAULT_BLACK,
        flex: 1,
    },
    signinButton: {
        backgroundColor: Colors.DEFAULT_GREEN,
        borderRadius: 8,
        marginHorizontal: 20,
        height: Display.setHeight(6),
        justifyContent: "center",
        alignItems: "center",
        marginTop: 20,
    },
    signinButtonText: {
        fontSize: 18,
        lineHeight: 18 * 1.4,
        color: Colors.DEFAULT_WHITE,
        fontFamily: Fonts.POPPINS_MEDIUM,   
    },
    orText: {
        fontSize: 15,
        lineHeight: 15 * 1.4,
        color: Colors.DEFAULT_BLACK,
        fontFamily: Fonts.POPPINS_MEDIUM,
        marginLeft: 5,
        alignSelf: "center",
        marginTop: 20,
    },
    facebookButton: {
        backgroundColor: Colors.FABEBOOK_BLUE,
        paddingVertical: 15,
        marginHorizontal: 20,
        borderRadius: 8,
        marginVertical: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    googleButton: {
        backgroundColor: Colors.GOOGLE_BLUE,
        paddingVertical: 15,
        marginHorizontal: 20,
        borderRadius: 8,
        justifyContent: "center",
        alignItems: "center",
    },
    signinButtonLogo: {
        height: 18,
        width: 18,
    },
    signinButtonLogoContainer:{
        backgroundColor: Colors.DEFAULT_WHITE,
        padding: 2,
        borderRadius: 3,
        position: "absolute",
        left: 25
    },
    socialButtonContainer: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
    },
    socialSigninButtonText: {
        color: Colors.DEFAULT_WHITE,
        fontSize: 13,
        lineHeight: 13 * 1.4,
        fontFamily: Fonts.POPPINS_MEDIUM,
    },
    errorMessage: {
        fontSize: 10,
        lineHeight: 10 * 1.4,
        color: Colors.DEFAULT_RED,
        fontFamily: Fonts.POPPINS_MEDIUM,
        marginHorizontal: 20,
        marginTop: 5,
    }


});


export default SignupScreen;