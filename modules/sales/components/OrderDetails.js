import React, {Component} from "react";
import {Image, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import Collapsible from 'react-native-collapsible';
import {BasicDetails} from "./BasicDetails";
import {BillingDetails} from "./BillingDetails";
import ShippingDetails from "./ShippingDetails";
import {ProductDetails} from "./ProductDetails";
import Header from "../../common/Header";
import {FloatingAction} from "react-native-floating-action";
import {
    cancelOrder,
    emailOrderStatus,
    getOrder,
    getOrderComments,
    getOrderStatus,
    holdOrder,
    invoiceOrder,
    postOrderComment,
    shipOrder,
    unholdOrder
} from "../actions";
import _ from 'lodash';

class OrderDetails extends Component {

    constructor(props) {
        super(props);
        this.state = {
            basicDetailsCollapsed: false,
            billingDetailsCollapsed: true,
            shippingDetailsCollapsed: true,
            productDetailsCollapsed: true,
            currentAction: null,
            order: null,
            orderStatus: '',
            fetchOrder: false
        };
    }

    componentDidMount() {
        const order = this.props.navigation.getParam("order", null);
        this.setState({order: order, orderStatus: order.status});
    }

    static getDerivedStateFromProps(props, state) {
        if (state.currentAction !== null) {
            props.getOrder(state.order.entity_id);
            return ({currentAction: null, fetchOrder: true});
        }

        if (state.order !== null && state.fetchOrder === true) {
            let index = _.findIndex(props.items, {'entity_id': state.order.entity_id});
            if (index !== -1) {
                return ({order: props.items[index], orderStatus: props.items[index].status, fetchOrder: false});
            }
        }

        return null;
    }

    actionSelected(name) {
        let order = this.state.order;
        this.setState({currentAction: name});
        switch (name) {
            case 'shipping':
                this.props.shipOrder(order);
                break;
            case 'invoice':
                this.props.invoiceOrder(order);
                break;
            case 'cancel':
                this.props.cancelOrder(order);
                break;
            case 'hold':
                this.props.holdOrder(order);
                break;
            case 'unhold':
                this.props.unholdOrder(order);
                break;
            case 'email':
                this.props.emailOrderStatus(order);
                break;
            case 'print':
                break;
        }
    }

    getActions(status) {
        let actions = [];
        switch (status) {
            case 'pending':
                actions = [{
                    text: 'Shipping',
                    icon: require('../../../assets/images/sales/shipping.png'),
                    name: 'shipping',
                    color: '#EC1A5C'
                }, {
                    text: 'Invoice',
                    icon: require('../../../assets/images/sales/invoice.png'),
                    name: 'invoice',
                    color: '#EC1A5C'
                }, {
                    text: 'Cancel',
                    icon: require('../../../assets/images/sales/cancel.png'),
                    name: 'cancel',
                    color: '#EC1A5C'
                }, {
                    text: 'Hold',
                    icon: require('../../../assets/images/sales/hold.png'),
                    name: 'hold',
                    color: '#EC1A5C'
                }, {
                    text: 'Email',
                    icon: require('../../../assets/images/sales/email.png'),
                    name: 'email',
                    color: '#EC1A5C'
                }, {
                    text: 'Print',
                    icon: require('../../../assets/images/sales/print.png'),
                    name: 'print',
                    color: '#EC1A5C'
                }];
                break;
            case 'processing':
                actions = [{
                    text: 'Shipping',
                    icon: require('../../../assets/images/sales/shipping.png'),
                    name: 'shipping',
                    color: '#EC1A5C'
                }, {
                    text: 'Cancel',
                    icon: require('../../../assets/images/sales/cancel.png'),
                    name: 'cancel',
                    color: '#EC1A5C'
                }, {
                    text: 'Hold',
                    icon: require('../../../assets/images/sales/hold.png'),
                    name: 'hold',
                    color: '#EC1A5C'
                }, {
                    text: 'Email',
                    icon: require('../../../assets/images/sales/email.png'),
                    name: 'email',
                    color: '#EC1A5C'
                }, {
                    text: 'Print',
                    icon: require('../../../assets/images/sales/print.png'),
                    name: 'print',
                    color: '#EC1A5C'
                }];
                break;
            case 'complete':
                actions = [{
                    text: 'Email',
                    icon: require('../../../assets/images/sales/email.png'),
                    name: 'email',
                    color: '#EC1A5C'
                }, {
                    text: 'Print',
                    icon: require('../../../assets/images/sales/print.png'),
                    name: 'print',
                    color: '#EC1A5C'
                }];
                break;
            case 'cancel':
                actions = [{
                    text: 'Print',
                    icon: require('../../../assets/images/sales/print.png'),
                    name: 'print',
                    color: '#EC1A5C'
                }];
                break;
            case 'holded':
                actions = [{
                    text: 'Unhold',
                    icon: require('../../../assets/images/sales/hold.png'),
                    name: 'unhold',
                    color: '#EC1A5C'
                }, {
                    text: 'Print',
                    icon: require('../../../assets/images/sales/print.png'),
                    name: 'print',
                    color: '#EC1A5C'
                }];
                break;
            default:
                actions = [{
                    text: 'Print',
                    icon: require('../../../assets/images/sales/print.png'),
                    name: 'print',
                    color: '#EC1A5C'
                }];
                break;
        }
        return actions;
    }

    render() {
        return (
            <View style={styles.container} enableOnAndroid={true}>
                <StatusBar
                    backgroundColor="#EC1A5C"
                    barStyle="light-content"/>
                <Header navigation={this.props.navigation} title={'ORDER DETAILS'}/>
                {this.state.order
                    ? <ScrollView>
                        <View style={styles.orderContainer}>
                            <TouchableOpacity
                                onPress={() => this.setState({
                                    basicDetailsCollapsed: !this.state.basicDetailsCollapsed,
                                    billingDetailsCollapsed: true,
                                    shippingDetailsCollapsed: true,
                                    productDetailsCollapsed: true
                                })}>
                                <View
                                    style={styles.orderHeader}>
                                    <Text style={styles.orderTextHeading}>Order ID: {this.state.order.entity_id}</Text>
                                    {this.state.basicDetailsCollapsed ?
                                        <Image style={{marginTop: 15}}
                                               source={require("../../../assets/images/sales/arrow_right.png")}
                                               resizeMode="contain"/> :
                                        <Image style={{marginTop: 20}}
                                               source={require("../../../assets/images/sales/arrow_down.png")}
                                               resizeMode="contain"/>
                                    }
                                </View>
                            </TouchableOpacity>
                            <Collapsible collapsed={this.state.basicDetailsCollapsed}>
                                <View>
                                    <BasicDetails order={this.state.order}/>
                                </View>
                            </Collapsible>
                        </View>
                        <View style={styles.orderContainer}>
                            <TouchableOpacity
                                onPress={() => this.setState({
                                    basicDetailsCollapsed: true,
                                    billingDetailsCollapsed: !this.state.billingDetailsCollapsed,
                                    shippingDetailsCollapsed: true,
                                    productDetailsCollapsed: true
                                })}>

                                <View
                                    style={styles.orderHeader}>
                                    <Text style={styles.orderTextHeading}>Billing Details</Text>
                                    {this.state.billingDetailsCollapsed ?
                                        <Image style={{marginTop: 15}}
                                               source={require("../../../assets/images/sales/arrow_right.png")}
                                               resizeMode="contain"/> :
                                        <Image style={{marginTop: 20}}
                                               source={require("../../../assets/images/sales/arrow_down.png")}
                                               resizeMode="contain"/>
                                    }
                                </View>
                            </TouchableOpacity>
                            <Collapsible collapsed={this.state.billingDetailsCollapsed}>
                                <View>
                                    <BillingDetails order={this.state.order}/>
                                </View>
                            </Collapsible>
                        </View>
                        <View style={styles.orderContainer}>
                            <TouchableOpacity
                                onPress={() => this.setState({
                                    basicDetailsCollapsed: true,
                                    shippingDetailsCollapsed: !this.state.shippingDetailsCollapsed,
                                    productDetailsCollapsed: true,
                                    billingDetailsCollapsed: true
                                })}>
                                <View
                                    style={styles.orderHeader}>
                                    <Text style={styles.orderTextHeading}>Shipping Details</Text>
                                    {this.state.shippingDetailsCollapsed ?
                                        <Image style={{marginTop: 15}}
                                               source={require("../../../assets/images/sales/arrow_right.png")}
                                               resizeMode="contain"/> :
                                        <Image style={{marginTop: 20}}
                                               source={require("../../../assets/images/sales/arrow_down.png")}
                                               resizeMode="contain"/>
                                    }
                                </View>
                            </TouchableOpacity>
                            <Collapsible collapsed={this.state.shippingDetailsCollapsed}>
                                <View>
                                    <ShippingDetails order={this.state.order}/>
                                </View>
                            </Collapsible>
                        </View>
                        <View style={styles.orderContainer}>
                            <TouchableOpacity
                                onPress={() => this.setState({
                                    basicDetailsCollapsed: true,
                                    productDetailsCollapsed: !this.state.productDetailsCollapsed,
                                    billingDetailsCollapsed: true,
                                    shippingDetailsCollapsed: true
                                })}>
                                <View
                                    style={styles.orderHeader}>
                                    <Text style={styles.orderTextHeading}>
                                        Product Details {this.state.order.items.length} Item(s)
                                    </Text>
                                    {this.state.productDetailsCollapsed ?
                                        <Image style={{marginTop: 15}}
                                               source={require("../../../assets/images/sales/arrow_right.png")}
                                               resizeMode="contain"/> :
                                        <Image style={{marginTop: 20}}
                                               source={require("../../../assets/images/sales/arrow_down.png")}
                                               resizeMode="contain"/>
                                    }
                                </View>
                            </TouchableOpacity>
                            <Collapsible collapsed={this.state.productDetailsCollapsed}>
                                <View>
                                    <ProductDetails order={this.state.order}/>
                                </View>
                            </Collapsible>
                        </View>
                    </ScrollView>
                    : null}
                <View style={{position: 'absolute', bottom: 30, left: 30}}>
                    <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                        <View style={styles.nextButton}>
                            <Image source={require("../../../assets/images/sales/back.png")}
                       resizeMode="contain"/>
                        </View>
                    </TouchableOpacity>
                </View>
                {this.state.order
                    ? <FloatingAction
                        actions={this.getActions(this.state.orderStatus)}
                        color='#EC1A5C'
                        onPressItem={this.actionSelected.bind(this)}/>
                    : null}
            </View>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        holdOrder,
        unholdOrder,
        emailOrderStatus,
        cancelOrder,
        getOrderStatus,
        getOrderComments,
        postOrderComment,
        shipOrder,
        invoiceOrder,
        getOrder
    }, dispatch);
};

const mapStateToProps = state => ({
    isLoading: state.sales.action.isLoading,
    actionResponse: state.sales.action.actionResponse,
    items: state.sales.orders.items,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(OrderDetails);

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F4F6F6",
        height: "100%"
    },
    orderContainer: {
        marginHorizontal: 15,
        marginVertical: 5,
        flexDirection: 'column',
        borderWidth: 2,
        borderColor: '#F1EFEF',
        borderRadius: 5,
        shadowColor: "#000000",
        shadowOpacity: 0.22,
        shadowRadius: 1,
        shadowOffset: {
            height: 1,
            width: 0
        }
    },
    orderHeader: {
        backgroundColor: '#FFFFFF',
        flexDirection: 'row',
        paddingRight: 10,
        borderWidth: 0,
        borderBottomWidth: 1,
        borderColor: '#F1EFEF',
    },
    orderTextHeading: {
        fontFamily: 'proxima-nova-semibold',
        paddingVertical: 5,
        fontSize: 14,
        color: '#EC1A5C',
        fontWeight: "bold",
        margin: 8,
        flex: 1
    },
    orderText: {
        fontFamily: 'proxima-nova-regular',
        paddingVertical: 5,
        fontSize: 14,
        color: '#A09E9E',
        margin: 3
    },
    orderBody: {
        flexDirection: 'row',
        paddingVertical: 5,
        paddingHorizontal: 15
    },
    nextButton: {
        backgroundColor: '#EC1A5C',
        width: 55,
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 55
    },
    floatingItem: {
        flexDirection: 'row'
    },
    floatingText: {
        fontFamily: 'proxima-nova-regular',
        fontSize: 14,
    },
    floatingIcon: {
        backgroundColor: '#EC1A5C'
    }
});
