import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {setCurrency} from "../../../common/utils";

export const BasicDetails = props => {
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
        <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'column', flex: 1, alignItems: 'flex-end'}}>
                <Text style={styles.orderTextDark}>Name </Text>
                <Text style={styles.orderTextDark}>Email </Text>
                <Text style={styles.orderTextDark}>Item Count </Text>
                <Text style={styles.orderTextDark}>Grand Total </Text>
                <Text style={styles.orderTextDark}>Order Date </Text>
                <Text style={styles.orderTextDark}>Status </Text>
            </View>
            <View>
                <Text style={styles.orderTextLight}> : </Text>
                <Text style={styles.orderTextLight}> : </Text>
                <Text style={styles.orderTextLight}> : </Text>
                <Text style={styles.orderTextLight}> : </Text>
                <Text style={styles.orderTextLight}> : </Text>
                <Text style={styles.orderTextLight}> : </Text>
            </View>
            <View style={{flexDirection: 'column', flex: 2}}>
                <Text
                    style={styles.orderTextLight}> {order.customer_firstname + ' ' + order.customer_lastname}</Text>
                <Text style={styles.orderTextLight}>{order.customer_email}</Text>
                <Text style={styles.orderTextLight}>{order.total_item_count}</Text>
                <View>{setCurrency(order.order_currency_code, order.grand_total)}</View>
                <Text style={styles.orderTextLight}>{order.created_at}</Text>
                <Text style={[styles.orderTextLight, {color: getStatusColors(order.status)}]}>{Capitalize(order.status)}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    orderTextDark: {
        fontFamily: 'proxima-nova-regular',
        paddingVertical: 5,
        fontSize: 14,
        color: '#000000',
        margin: 3
    },
    orderTextLight: {
        fontFamily: 'proxima-nova-regular',
        paddingVertical: 5,
        fontSize: 14,
        color: '#A09E9E',
        margin: 3
    },
});
