import React, {Component} from "react";
import {StatusBar, StyleSheet, View} from "react-native";
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Header from "../../common/Header";

class Settings extends Component {
    render() {
        return (
            <KeyboardAwareScrollView style={styles.container} enableOnAndroid={true}>
                <View style={styles.innerContainer}>
                    <StatusBar
                        backgroundColor="#EC1A5C"
                        barStyle="light-content"/>
                    <Header navigation={this.props.navigation} title={'SETTINGS'}/>

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
)(Settings);

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        height: "100%"
    },
    innerContainer: {
        flexDirection: 'column'
    },
});
