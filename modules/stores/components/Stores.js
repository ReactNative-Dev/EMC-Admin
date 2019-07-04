import React, {Component} from "react";
import {ActivityIndicator, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {Icon} from 'react-native-elements';
import {RadioButton, RadioGroup} from 'react-native-flexi-radio-button'
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {availableStores} from "../actions";
import {storeData} from "../../../common/utils";
import {NavigationActions, StackActions} from 'react-navigation';
import {AndroidBackHandler} from 'react-navigation-backhandler';
import Header from "../../common/Header";

class Stores extends Component {
    state = {
        storeList: [],
        storeId: null,
        storeName: null
    };

    static getDerivedStateFromProps(props) {
        if (props.storeList) {
            const storeList = props.storeList;
            return {storeList};
        }
        return null;
    }

    componentDidMount() {
        this.props.availableStores();
    }

    onSelectStore = async () => {
        await storeData("storeId", this.state.storeId.toString());
        await storeData("storeName", this.state.storeName);

        const resetAction = StackActions.reset({
            key: null,
            index: 0,
            actions: [NavigationActions.navigate({routeName: 'Home'})],
        });
        this.props.navigation.dispatch(resetAction);
    };

    onSelect(index, value) {
        this.setState({storeId: value, storeName: this.state.storeList[index].name});
    }

    onBackButtonPressAndroid = () => {
        return false;
    };

    render() {
        return (
            <AndroidBackHandler onBackPress={this.onBackButtonPressAndroid}>
                <View style={styles.container} enableOnAndroid={true}>
                    <View style={styles.innerContainer}>
                        <StatusBar
                            backgroundColor="#EC1A5C"
                            barStyle="light-content"/>
                        <Header navigation={this.props.navigation} title={'STORES'} hideMenu={true}/>
                        {this.props.isLoading
                            ? <View style={{flex: 1, justifyContent: 'center'}}>
                                <ActivityIndicator size="large"/>
                            </View>
                            : <ScrollView>
                                <View style={styles.radioButton}>
                                    <Text style={styles.textLabel}>LIST OF STORES</Text>
                                    <RadioGroup
                                        size={24}
                                        thickness={2}
                                        color='#AAB7B8'
                                        style={styles.radioButtonSelect}
                                        onSelect={(index, value) => this.onSelect(index, value)}>
                                        {
                                            this.state.storeList.map((item, index) => (
                                                <RadioButton key={'store_' + item.id} value={item.id}
                                                             style={{alignItems: 'center'}}>
                                                    <Text style={styles.radioButtonText}>{item.name}</Text>
                                                </RadioButton>
                                            ))
                                        }
                                    </RadioGroup>
                                </View>
                            </ScrollView>
                        }
                    </View>
                    <View style={{position: 'absolute', bottom: 20, right: 20}}>
                        <TouchableOpacity onPress={this.onSelectStore}>
                            <View style={styles.nextButton}>
                                <Icon name='arrow-right' type='material-community' color='#FFFFFF' size={40}/>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </AndroidBackHandler>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        availableStores
    }, dispatch);
};

const mapStateToProps = state => ({
    storeList: state.stores.available.data,
    isLoading: state.stores.available.isLoading,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Stores);

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        height: "100%",
    },
    innerContainer: {
        flexDirection: 'column',
        height: "100%",
    },
    radioButton: {
        flexDirection: 'column',
        padding: 40,
    },
    textLabel: {
        fontFamily: 'proxima-nova-semibold',
        color: '#474747',
        marginTop: 10,
        fontSize: 15,
    },
    radioButtonSelect: {
        marginTop: 20,
    },
    radioButtonText: {
        color: '#AAB7B8',
        fontSize: 18,
        padding: 5,
        fontFamily: 'proxima-nova-semibold',
    },
    imageArrow: {
        width: 30,
        height: 30,
        top: 0,
        right: 0,
    },
    loader: {
        width: 130,
        height: 130,
        marginTop: 240,
        alignSelf: 'center'
    },
    nextButton: {
        backgroundColor: '#2B323A',
        width: 60,
        height: 60,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 60
    }
});
