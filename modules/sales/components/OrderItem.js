import React from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import format from "date-fns/format";
import Moment from 'moment';
import {setCurrency} from "../../../common/utils";

export const OrderItem = props => {
    const {order} = props;
    const getStatusColors = (status) => {
        switch (status) {
            case "pending":
                return "#4C44F1";
            case "canceled":
                return "#F94934";
            case "processing":
                return "#F7BB0C";
            case "holded":
                return "#F7BB0C";
            case "complete":
                return "#22AC4C";
            case "closed":
                return "#AC2278";
            case "pending_payment":
                return "#11BFE6";
            case "payment_review":
                return "#AC2278";
            default:
                return "#000000";
        }
    };

    const Capitalize = (str) =>{
        const word = str.replace("_", " ")
        return word.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
    }

    return (
        <TouchableOpacity onPress={() => props.navigation.navigate('OrderDetails', {order: order})}>
            <View style={styles.orderContainer}>
                <View style={styles.orderHeader}>
                    <View style={{flex: 1}}>
                        <Text style={styles.orderDate}>{Moment(order.created_at).format("YYYY-MM-DD")}</Text>
                    </View>
                </View>
                <View style={styles.orderBody}>
                    <View style={{flexDirection: 'column', flex: 2}}>
                        <Text style={[styles.orderText, {color: '#000000'}]}>#{order.increment_id}</Text>
                        <Text style={styles.orderText}>
                            {order.customer_firstname + '' + order.customer_lastname}
                        </Text>
                        <Text
                            style={[styles.orderText, {color: getStatusColors(order.status)}]}>
                            Status: {Capitalize(order.status)}
                        </Text>
                    </View>
                    <View style={{flexDirection: 'column', flex: 2}}>
                        <Text style={styles.orderText}>
                            {setCurrency(order.base_currency_code, order.base_grand_total)}
                        </Text>
                        <Text style={styles.orderText}>
                            Item Count: {order.total_item_count}</Text>
                        <Text style={styles.orderText}>
                            {Moment(order.created_at).format("HH:mm A")}
                        </Text>
                    </View>
                    <View style={{alignItems: 'flex-end', justifyContent: 'center', paddingRight: 10}}>
                        <Image
                            source={require("../../../assets/images/sales/arrow_right.png")}
                            resizeMode="contain"/>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    orderContainer: {
        backgroundColor: "#FFFFFF",
        marginHorizontal: 15,
        marginVertical: 5,
        borderWidth: 2,
        borderColor: '#F1EFEF',
        flexDirection: 'column',
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
        borderWidth: 0,
        borderBottomWidth: 1,
        borderColor: '#F1EFEF',
    },
    orderDate: {
        fontFamily: 'proxima-nova-semibold',
        fontSize: 12,
        color: '#EC1A5C',
        flex: 1,
        paddingHorizontal: 15,
        paddingVertical: 8
    },
    orderText: {
        fontFamily: 'proxima-nova-regular',
        paddingVertical: 5,
        fontSize: 12,
        color: '#6D808C'
    },
    orderBody: {
        flexDirection: 'row',
        paddingVertical: 5,
        paddingHorizontal: 15
    }
});
