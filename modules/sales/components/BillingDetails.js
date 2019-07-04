import React from "react";
import {StyleSheet, Text, View} from "react-native";

export const BillingDetails = props => {
    const {order} = props;

    return (
        <View style={{flexDirection: 'row'}}>
            <View style={{flexDirection: 'column', flex: 1, alignItems: 'flex-end'}}>
                <Text style={styles.orderTextDark}>Method </Text>
                <Text style={styles.orderTextDark}>Name </Text>
                <Text style={styles.orderTextDark}>Street </Text>
                <Text style={styles.orderTextDark}>City </Text>
                <Text style={styles.orderTextDark}>Region </Text>
                <Text style={styles.orderTextDark}>Postcode </Text>
                <Text style={styles.orderTextDark}>Country </Text>
                <Text style={styles.orderTextDark}>Telephone </Text>
            </View>
            <View>
                <Text style={styles.orderTextLight}> : </Text>
                <Text style={styles.orderTextLight}> : </Text>
                <Text style={styles.orderTextLight}> : </Text>
                <Text style={styles.orderTextLight}> : </Text>
                <Text style={styles.orderTextLight}> : </Text>
                <Text style={styles.orderTextLight}> : </Text>
                <Text style={styles.orderTextLight}> : </Text>
                <Text style={styles.orderTextLight}> : </Text>
            </View>
            <View style={{flexDirection: 'column', flex: 2}}>
                <Text style={styles.orderTextLight}>{order.payment.additional_information[0]}</Text>
                <Text
                    style={styles.orderTextLight}>{order.billing_address.firstname + ' ' + order.billing_address.lastname}</Text>
                <Text style={styles.orderTextLight}>{order.billing_address.street[0]}</Text>
                <Text style={styles.orderTextLight}>{order.billing_address.city}</Text>
                <Text style={styles.orderTextLight}>{order.billing_address.region}</Text>
                <Text style={styles.orderTextLight}>{order.billing_address.postcode}</Text>
                <Text style={styles.orderTextLight}>{order.billing_address.country_id}</Text>
                <Text style={styles.orderTextLight}>{order.billing_address.telephone}</Text>
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
