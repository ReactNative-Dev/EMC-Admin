import React, {Component} from "react";
import {ActivityIndicator, Image, Platform, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import {getOrdersWeek} from "../actions";
import { AnimatedGaugeProgress, GaugeProgress } from 'react-native-simple-gauge';
import {NavigationActions} from "react-navigation";
import {currencySymbol} from "../../../common/utils";

class Week extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoading: false,
            total: 0,
            totalSales: 0
        };
    }

    componentDidMount() {
        this.props.getOrdersWeek();
    }

    static getDerivedStateFromProps(props) {
        const items = props.items;
        const isLoading = props.isLoading;
        const total = props.total;
        const totalSales = props.totalSales;
        return {
            items,
            isLoading,
            total,
            totalSales
        };
    }

    goToSales(data) {
        const navigateAction = NavigationActions.navigate({
            routeName: 'Sales',
            params: data,
            action: NavigationActions.navigate({routeName: 'Sales', params: data})
        });
        this.props.navigation.dispatch(navigateAction);
    }

    render() {
        const order_per_day = parseFloat(this.state.total / 7).toFixed(2);
        const sale_per_day = parseFloat(this.state.totalSales / 7).toFixed(2);
        const fill_order = (order_per_day && this.state.total) ? (order_per_day / this.state.total)*100 : 0;
        const fill_sale = (sale_per_day && this.state.totalSales) ? (sale_per_day / this.state.totalSales)*100 : 0;

        if (this.state.isLoading) {
            return (
                <View style={[styles.container, {justifyContent: 'center'}]}>
                    <ActivityIndicator size='large'/>
                </View>
            )
        }
        return (
            <View style={styles.container}>
                <View style={{flexDirection: 'row', width:"100%"}}>
                    <View style={styles.progressBar}>
                        <AnimatedGaugeProgress
                            size={150}
                            width={12}
                            fill={fill_order}
                            rotation={90}
                            cropDegree={100}
                            tintColor="#EC1A5C"
                            delay={0}
                            backgroundColor="#AAB7B8"
                            stroke={[2, 2]} //For a equaly dashed line
                            strokeCap="circle" />
                                <View style={styles.textView}>
                                    <Text style={styles.text}>Avg.</Text>
                                    <Text style={[styles.text, {marginLeft: 5}]}>Order Value</Text>
                                    {sale_per_day > 0 && <Text  style={[styles.val, {padding: 5}]}> {currencySymbol(this.props.items[0].base_currency)} {sale_per_day}</Text>}
        {sale_per_day == 0 && <Text  style={[styles.val, {padding: 5}]}> {sale_per_day}</Text>}
                                    <Image source={require('../../../assets/images/dashboard/percentage_cirlce.png')}
                                        resizeMode={'contain'}
                                        style={{width: 90,height: 10, marginLeft: 8, justifyContent: 'center',alignItems: 'center'}}/>
                                    <Text style={[styles.text, {marginRight: 15}]}> DAY </Text>
                                </View>
                     </View>

                     <View style={styles.progressBar}>
                          <AnimatedGaugeProgress
                                size={150}
                                width={12}
                                fill={fill_sale}
                                rotation={90}
                                cropDegree={100}
                                tintColor="#EC1A5C"
                                delay={0}
                                backgroundColor="#AAB7B8"
                                stroke={[2, 2]} //For a equaly dashed line
                                strokeCap="circle" />
                                    <View style={styles.textView}>
                                        <Text style={styles.text}>Avg. Orders</Text>
                                        <Text style={[styles.val, {padding: 5}]}>{order_per_day}</Text>
                                        <Image source={require('../../../assets/images/dashboard/percentage_cirlce.png')}
                                            resizeMode={'contain'}
                                            style={{width: 90,height: 20, marginLeft: 8, justifyContent: 'center',alignSelf: 'center'}}/>
                                        <Text style={[styles.text, {marginRight: 15}]}> DAY </Text>
                                    </View>
                      </View>
                </View>

                <View style={{flexDirection: 'row', position: 'absolute', bottom: 0, borderTopWidth:2, height: 100, width: "100%", borderColor: "#AAB7B8"}}>
                    <View style={styles.bottomText}>
                        <Text style={{color: "#AAB7B8"}}>No.Of Customers</Text>
                        <Image source={require('../../../assets/images/dashboard/customer.png')}
                           resizeMode={'contain'}
                           style={{width: 100, height: 5, justifyContent: 'center',alignSelf: 'center'}}/>
                        <View style={{alignItems: 'center', justifyContent: 'center', margin:10}}>
                            <Text>{this.props.online_customers}</Text>
                        </View>
                    </View>

                    <View style={[styles.bottomText, {borderTopWidth: 0}, {borderBottomWidth: 0}, {borderWidth: 2}]}>
                        <TouchableOpacity onPress={() => this.goToSales({duration: 'week'})}>
                            <Text style={{color: "#AAB7B8"}}>No.of Orders</Text>
                            <Image source={require('../../../assets/images/dashboard/order.png')}
                               resizeMode={'contain'}
                               style={{width: 100, height: 5, justifyContent: 'center',alignSelf: 'center'}}/>
                            <View style={{alignItems: 'center', justifyContent: 'center',padding:3, margin:10}}>
                                <Text>{this.props.total}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.bottomText}>
                        <TouchableOpacity onPress={() => this.goToSales({duration: 'week'})}>
                            <Text style={{color: "#AAB7B8"}}>Total Sales</Text>
                            <Image source={require('../../../assets/images/dashboard/sales.png')}
                               resizeMode={'contain'}
                               style={{width: 100, height: 5, justifyContent: 'center',alignSelf: 'center'}}/>
                            <View style={{alignItems: 'center', justifyContent: 'center',padding:3, margin:10}}>
                            {this.props.totalSales > 0 && <Text> {currencySymbol(this.props.items[0].base_currency)} {this.props.totalSales}</Text>}
    {this.props.totalSales == 0 && <Text> {this.props.totalSales}</Text>}
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        items: state.dashboard.orders.itemsWeek,
        isLoading: state.dashboard.orders.isLoadingWeek,
        total: state.dashboard.orders.totalWeek,
        totalSales: state.dashboard.orders.totalSalesWeek,
        online_customers: state.dashboard.orders.online_customers
    };
};

const mapDispatchToProps = dispatch => {
    return bindActionCreators(
        {
            getOrdersWeek
        },
        dispatch
    );
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Week);

const styles = StyleSheet.create({
  container: {
        backgroundColor: "#FFFFFF",
        height: "100%",
        flex: 1,
        padding: 10,
        marginTop: 10
    },
    textView: {
        position: 'absolute',
        top: 30,
        left: 35,
        width: 100,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        flexWrap: 'wrap',
        marginLeft:5
    },
    text: {
        flexDirection: 'row',
        fontSize: 13,
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'proxima-nova-regular',
        color: "#B1B1B1"
    },
    val: {
        flexDirection: 'row',
        fontSize: 20,
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'proxima-nova-regular',
        color: "#000000"
    },
    bottomText:{
        flexDirection: 'column',
        padding:3,
        width: "34%",
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: "#AAB7B8"
    },
    progressBar:{
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: "50%",
        marginTop: 20,
    }
});
