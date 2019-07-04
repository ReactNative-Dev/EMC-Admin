import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {currencySymbol} from "../../../common/utils";

export const ProductDetails = props => {
    const {order} = props;

    let renderItems = () => {
        let renderedItems = [];

        order.items.map((item) => {
            renderedItems = renderedItems.concat(
                <View style={styles.item}
                      key={"item_" + item.item_id}>
                    <View style={{flexDirection: 'column', flex: 1, alignItems: 'flex-end'}}>
                        <Text style={styles.orderTextDark}>Name </Text>
                        <Text style={styles.orderTextDark}>SKU </Text>
                        <Text style={styles.orderTextDark}>Qty Ordered </Text>
                        <Text style={styles.orderTextDark}>Price </Text>
                        <Text style={styles.orderTextDark}>Total </Text>
                        <Text style={styles.orderTextDark}>Attribute </Text>
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
                        <Text style={styles.orderTextLight}>{item.name}</Text>
                        <Text style={styles.orderTextLight}>{item.sku}</Text>
                        <Text style={styles.orderTextLight}>{item.qty_ordered}</Text>
                        <Text style={styles.orderTextLight}>{currencySymbol(order.order_currency_code)} {item.price}</Text>
                        <Text style={styles.orderTextLight}>{currencySymbol(order.order_currency_code)} {item.base_price}</Text>
                        <Text style={styles.orderTextLight}>N/A</Text>
                    </View>
                </View>
            )
        });

        return renderedItems;
    };

    return (
        <View style={{flexDirection: 'column'}}>
            {renderItems()}
        </View>
    );
};

const styles = StyleSheet.create({
    item: {
        flexDirection: 'row',
        borderBottomColor: '#CCC',
        borderBottomWidth: 1
    },
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
