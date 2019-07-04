import React, {Component} from "react";
import {
    ActivityIndicator,
    Image,
    Platform,
    StatusBar,
    StyleSheet,
    Text,
    TextInput,
    ToastAndroid,
    TouchableOpacity,
    View,
    AsyncStorage
} from "react-native";
import {CheckBox} from 'react-native-elements';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {adminLogin} from "../actions";
import {deleteData, retrieveData, storeData} from "../../../common/utils";
import {NavigationActions, StackActions} from "react-navigation";
import {Notifications, Permissions} from 'expo';
import RNPickerSelect from 'react-native-picker-select';

class Login extends Component {

    state = {
        username:"",
        password:"",
        hostUrl:"",
        urlTest: "",
        isUsernameValid: false,
        isPasswordValid: false,
        isUrlValid: false,
        remember: false,
        fcmToken: "",
        deviceType: Platform.OS == "ios" ? "iOS" : "android",
        appId: Platform.OS == "ios" ? 2 : 1,
        checkingLogin: true,
        prefix: "http://",
        url: [
            {
                label: 'https://',
                value: 'https://',
            }
        ],
    };


    componentDidMount = async () => {
        let user = await retrieveData("user");
        if (user != undefined){
            this.setState({
                username: JSON.parse(user).username,
                password: JSON.parse(user).password,
                hostUrl: JSON.parse(user).hostUrl,
                isUsernameValid: true,
               isPasswordValid: true,
               isUrlValid: true
            });
        }

        let token = await retrieveData("token");
        if (token !== undefined) {
            let storeId = await retrieveData("storeId");
            if (storeId !== undefined) {
                const resetAction = StackActions.reset({
                    key: null,
                    index: 0,
                    actions: [NavigationActions.navigate({routeName: 'Home'})],
                });
                this.props.navigation.dispatch(resetAction);
            } else {
                const resetAction = StackActions.reset({
                    key: null,
                    index: 0,
                    actions: [NavigationActions.navigate({routeName: 'Stores'})],
                });
                this.props.navigation.dispatch(resetAction);
            }
        } else {
            let fcmToken = await this.getPushNotificationToken();
            console.log("Device Type:" + this.state.deviceType);
            console.log("App ID:" + this.state.appId);
            console.log("FCM Token: " + fcmToken);
            storeData("fcmToken", fcmToken);
            let user = await retrieveData("user");
            if (user)
                this.setState({
                    ...JSON.parse(user), checkingLogin: false, fcmToken: fcmToken
                });
            else
                this.setState({checkingLogin: false, fcmToken: fcmToken});
        }
    };

    static getDerivedStateFromProps(props) {
        if (props.userData && props.userData.token) {
            AsyncStorage.getItem('isLogout', (err, isLogout) => {
                if (isLogout != undefined){
                    if (isLogout == "false"){
                        storeData("token", props.userData.token).then(() => {
                            const resetAction = StackActions.reset({
                                key: null,
                                index: 0,
                                actions: [NavigationActions.navigate({routeName: 'Stores'})],
                            });
                            props.navigation.dispatch(resetAction);
                        });
                    }
                }
              });
        }
        return null;
    }

    urlChange = (value) => {
        this.setState({prefix: value});
    };

    getPushNotificationToken = async () => {
        const {status: existingStatus} = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
        );
        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            return;
        }

        let token = await Notifications.getExpoPushTokenAsync();
        return token;
    };

    validateUsername = () => {
        const usernameRegex = /^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/;
        if(this.state.username !== undefined){
            if (usernameRegex.test(this.state.username)) {
                return true;
            } else {
                return false;
            }
        }
        return false;
    };

    validatePassword = () => {
        if(this.state.password !== undefined){
            if (this.state.password.length < 6) {
                return false;
            } else {
                return true;
            }
        }
        return false;
    };

    // validateUrl = () => {
    //     const urlPrefix = /^([a-zA-Z0-9]+(\.[a-zA-Z0-9]+)+.*)$/

    //     if (urlPrefix.test(this.state.hostUrl)) {
    //         const host_url = this.state.prefix.concat(this.state.hostUrl);
    //         this.setState({hostUrl: host_url});
    //         return true;
    //     } else {
    //         return false;
    //     }
    // };

    validateUrl = () => {
        if(this.state.hostUrl !== undefined){
            const regexp =  /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
            if (regexp.test(this.state.hostUrl)){
                return true;
            } else{
                return false;
            }
        }
        return false;
    }

    onFieldValueChanged = (field, value) => {
        this.setState({
            [field]: value
        });
    };

    onLogin = () => {
        storeData("isLogout", "false");
        if (this.props.isLoading) return;
        const userVal = this.validateUsername();
        const passwordVal = this.validatePassword();
        const urlVal = this.validateUrl();
        if (userVal && passwordVal && urlVal) {
            if (this.state.remember)
                storeData("user", JSON.stringify({
                    "username": this.state.username,
                    "password": this.state.password,
                    // "hostUrl": this.state.prefix.concat(this.state.hostUrl)
                    "hostUrl": this.state.prefix.concat(this.state.hostUrl)
                })).then(() => {
                    this.props.adminLogin({
                        username: this.state.username,
                        password: this.state.password,
                        fcm_token: this.state.fcmToken,
                        device_type: this.state.deviceType,
                        app_id: this.state.appId
                    });
                });
                
            else
                deleteData("user").then(() => {
                    storeData("user", JSON.stringify({
                        hostUrl: this.state.prefix.concat(this.state.hostUrl)
                    })).then(() => {
                        this.props.adminLogin({
                            username: this.state.username,
                            password: this.state.password,
                            fcm_token: this.state.fcmToken,
                            device_type: this.state.deviceType,
                            app_id: this.state.appId
                        });
                    });
                });

        } else {
            ToastAndroid.show("Please enter a valid input", ToastAndroid.SHORT);
        }
    };

    render() {

        return (
        
            
             <KeyboardAwareScrollView style={styles.container} enableOnAndroid={true}
                                     keyboardShouldPersistTaps={'handled'}>
             { this.state.checkingLogin ? <View style={styles.loginForm}><ActivityIndicator size="large" color="#0C75D6"/></View>        
                : <View style={styles.innerContainer}>
                    <StatusBar
                        backgroundColor="#EC1A5C"
                        barStyle="light-content"/>
                    <View style={{alignItems: 'center', justifyContent: 'center', maxHeight: 240}}>
                        <Image
                            source={require("../../../assets/images/login/logo_cover.png")}
                            resizeMode="cover"
                            style={styles.headerImage}/>
                    </View>
                    
                        <View style={styles.loginForm}>
                            <View>
                                <Text style={styles.formLabel}>USERNAME</Text>
                                <TextInput style={styles.formInput}
                                           autoCapitalize="none"
                                           placeholder="johndoe@gmail.com"
                                           placeholderTextColor="#D1D1D1"
                                           underlineColorAndroid="#D1D1D1"
                                           onChangeText={value =>
                                               this.onFieldValueChanged("username", value)
                                           }
                                           value={this.state.username}/>
                            </View>
                            <View>
                                <Text style={styles.formLabel}>PASSWORD</Text>
                                <TextInput style={styles.formInput}
                                           placeholder="*********"
                                           placeholderTextColor="#D1D1D1"
                                           underlineColorAndroid="#D1D1D1"
                                           autoCapitalize="none"
                                           secureTextEntry={true}
                                           onChangeText={value =>
                                               this.onFieldValueChanged("password", value)
                                           }
                                           value={this.state.password}/>
                            </View>
                            <View>
                                <Text style={styles.formLabel}>HOST URL</Text>
                                <View style={{flexDirection: 'row', width: "100%"}}>
                                    <View style={{width: "25%"}}>
                                        <RNPickerSelect
                                            placeholder={{label: 'http://',value: "http://"}}
                                            items={this.state.url}
                                            onValueChange={(value) => this.urlChange(value)}
                                            style={{ ...pickerSelectStyles }}
                                        />
                                    </View>

                                    <View style={{width:"75%"}}>
                                        <TextInput style={styles.formInput}
                                               autoCapitalize="none"
                                               placeholder="Enter your host URL"
                                               placeholderTextColor="#D1D1D1"
                                               underlineColorAndroid="#D1D1D1"
                                               onChangeText={value =>
                                                   this.onFieldValueChanged("hostUrl", value)}
                                               value={this.state.hostUrl}/>
                                    </View>
                                </View>
                            </View>
                            <View>
                                <CheckBox
                                    uncheckedColor="#0C75D6"
                                    checkedColor="#0C75D6"
                                    containerStyle={{backgroundColor: 'transparent', borderWidth: 0, marginLeft: -10}}
                                    textStyle={{fontFamily: 'proxima-nova-semibold', color: '#474747',}}
                                    title='Remember Me'
                                    checked={this.state.remember}
                                    onPress={() => this.setState({remember: !this.state.remember})}/>
                            </View>
                            <View>
                                <TouchableOpacity onPress={this.onLogin}>
                                    <View style={styles.loginButton}>
                                        {this.props.isLoading ?
                                            <ActivityIndicator size="small" color="#ffffff"/>
                                            : <Text style={styles.loginButtonText}>LOGIN</Text>}
                                    </View>
                                </TouchableOpacity>
                            </View>
                        </View>
                </View>}
            </KeyboardAwareScrollView>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        adminLogin
    }, dispatch);
};

const mapStateToProps = state => ({
    userData: state.login.user.data,
    isLoading: state.login.user.isLoading,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        height: "100%"
    },
    innerContainer: {
        flexDirection: 'column'
    },
    headerImage: {
        width: '100%',
        alignSelf: 'center'
    },
    loginForm: {
        flexDirection: 'column',
        padding: 20
    },
    formLabel: {
        fontFamily: 'proxima-nova-semibold',
        color: '#474747',
        marginTop: 10
    },
    formInput: {
        fontFamily: 'proxima-nova-semibold',
        height: 40,
        color: '#979797'
    },
    loginButton: {
        marginTop: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3,
        backgroundColor: '#2B323A',
        padding: 20,
        borderRadius: 2
    },
    loginButtonText: {
        fontFamily: 'proxima-nova-semibold',
        fontSize: 16,
        color: '#FFFFFF',
        textAlign: 'center',
    },
    loader: {
        width: 130,
        height: 130,
        left: 100
    },
    ImageStyle: {
        position: 'absolute',
        bottom: 20,
        right: 20
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        height: 40,
        color: '#979797',
        paddingTop: 13,
        paddingBottom: 12,
        backgroundColor: '#ffffff',
    },
    inputAndroid:{
        height: 35,
        color: '#979797',
        paddingTop: 13,
        paddingBottom: 12,
        backgroundColor: '#ffffff',
    },
});
