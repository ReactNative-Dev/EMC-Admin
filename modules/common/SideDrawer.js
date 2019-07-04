import React, {Component} from 'react';
import {Image, ImageBackground, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {NavigationActions} from "react-navigation";
import {deleteData, retrieveData, storeData} from "../../common/utils";

class SideDrawer extends Component {
    goToSales(data) {
        const navigateAction = NavigationActions.navigate({
            routeName: 'Sales',
            params: data,
            action: NavigationActions.navigate({routeName: 'Sales', params: data})
        });
        this.props.navigation.dispatch(navigateAction);
    }

    logoutClick(navigation) {
        storeData("isLogout", "true");
        navigation.navigate('Logout')
    }

    render() {
        const {activeItemKey, navigation} = this.props;
        const activeBg = require('../../assets/images/drawer/drawer_active_bg.png');
        return (
            <View>
                <ImageBackground source={require('../../assets/images/drawer/drawer_bg.jpg')}
                                 style={{width: '100%', height: '100%'}}>
                    <View style={{flexDirection: 'column', marginTop: 100}}>
                        <TouchableOpacity onPress={() => navigation.navigate('Dashboard')}>
                            <View style={styles.item}>
                                {activeItemKey === 'Dashboard' ?
                                    <Image source={activeBg} style={styles.activeBg}/> : null}
                                <Image source={require('../../assets/images/drawer/dashboard.png')}
                                       resizeMode={'contain'}
                                       style={styles.image}/>
                                <Text style={styles.label}> Dashboard </Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.goToSales({duration: null})}>
                            <View style={styles.item}>
                                {activeItemKey === 'Sales' ?
                                    <Image source={activeBg} style={styles.activeBg}/> : null}
                                <Image source={require('../../assets/images/drawer/dashboard.png')}
                                       resizeMode={'contain'}
                                       style={styles.image}/>
                                <Text style={styles.label}> Sales </Text>
                            </View>
                        </TouchableOpacity>
                        {/* <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
                            <View style={styles.item}>
                                {activeItemKey === 'Settings' ?
                                    <Image source={activeBg} style={styles.activeBg}/> : null}
                                <Image source={require('../../assets/images/drawer/settings.png')}
                                       resizeMode={'contain'}
                                       style={styles.image}/>
                                <Text style={styles.label}> Settings </Text>
                            </View>
                        </TouchableOpacity> */}
                        {/* <TouchableOpacity onPress={() => navigation.navigate('Help')}>
                            <View style={styles.item}>
                                {activeItemKey === 'Help' ?
                                    <Image source={activeBg} style={styles.activeBg}/> : null}
                                <Image source={require('../../assets/images/drawer/help.png')} resizeMode={'contain'}
                                       style={styles.image}/>
                                <Text style={styles.label}> Help </Text>
                            </View>
                        </TouchableOpacity> */}
                        {/* <TouchableOpacity onPress={() => navigation.navigate('About')}>
                            <View style={styles.item}>
                                {activeItemKey === 'About' ?
                                    <Image source={activeBg} style={styles.activeBg}/> : null}
                                <Image source={require('../../assets/images/drawer/about.png')} resizeMode={'contain'}
                                       style={styles.image}/>
                                <Text style={styles.label}> About Us </Text>
                            </View>
                        </TouchableOpacity> */}
                        <TouchableOpacity onPress={() => this.logoutClick(navigation)}>
                            <View style={styles.item}>
                                {activeItemKey === 'Logout' ?
                                    <Image source={activeBg} style={styles.activeBg}/> : null}
                                <Image source={require('../../assets/images/drawer/logout.png')} resizeMode={'contain'}
                                       style={styles.image}/>
                                <Text style={styles.label}> Logout </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

export default SideDrawer;

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        paddingVertical: 15
    },
    image: {
        width: 20,
        marginHorizontal: 20
    },
    label: {
        fontFamily: 'proxima-nova-regular',
        color: '#FFFFFF',
        fontSize: 20,
        fontWeight: '300'
    },
    activeBg: {
        position: 'absolute',
        top: 5
    }
});
