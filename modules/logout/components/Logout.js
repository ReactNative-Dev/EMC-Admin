import React, {Component} from "react";
import {StatusBar, StyleSheet, View} from "react-native";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {deleteData} from "../../../common/utils";
import {NavigationActions, StackActions} from 'react-navigation';

class Logout extends Component {
    state = {};

    componentDidMount = async () => {
        await deleteData("token");
        await deleteData("storeId");
        await deleteData("date");
        await deleteData("status");

        const resetAction = StackActions.reset({
            key: null,
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'Login'})],
        });
        this.props.navigation.dispatch(resetAction);
    };

    render() {
        return (
            <KeyboardAwareScrollView style={styles.container} enableOnAndroid={true}>
                <View style={styles.innerContainer}>
                    <StatusBar
                        backgroundColor="#EC1A5C"
                        barStyle="light-content"/>
                </View>
            </KeyboardAwareScrollView>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({}, dispatch);
};

const mapStateToProps = state => ({});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Logout);

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        height: "100%"
    },
    innerContainer: {
        flexDirection: 'column'
    },
});
