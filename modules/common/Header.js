import React, {Component} from 'react';
import {Image, ImageBackground, Platform, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {DrawerActions} from "react-navigation";
import {Constants} from 'expo';

class Header extends Component {
    render() {
        const {navigation, title, rightComponent, hideMenu} = this.props;
        return (
            <View>
                <ImageBackground source={require('../../assets/images/header/header.png')}
                                 style={styles.header}>
                    <View style={{flexDirection: 'row'}}>
                        {hideMenu ? null :
                            <TouchableOpacity onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
                                              style={styles.menuView}>
                                <Image source={require('../../assets/images/header/menu.png')} resizeMode={'contain'}
                                       style={{width: 20, height: 20}}/>
                            </TouchableOpacity>
                        }
                        <View style={styles.titleView}>
                            <Text style={styles.title}>{title}</Text>
                        </View>
                        <View style={styles.rightView}>
                            {rightComponent}
                        </View>
                    </View>
                </ImageBackground>
            </View>
        );
    }
}

export default Header;

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: 60,
    },
    menuView: {
        width: 50,
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: 0,
        zIndex: 999,
    },
    titleView: {
        height: 70,
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1
    },
    title: {
        color: '#fff',
        fontFamily: 'proxima-nova-semibold',
        fontSize: 20,
    },
    rightView: {
        height: 70,
        justifyContent: 'center',
        position: 'absolute',
        right: 0
    }
});
