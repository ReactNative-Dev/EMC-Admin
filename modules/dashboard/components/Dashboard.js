import React, {Component} from "react";
import {Animated, Image, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {TabView} from "react-native-tab-view";
import Day from "./Day";
import Week from "./Week";
import Month from "./Month";
import {retrieveData, storeData} from "../../../common/utils";
import Header from "../../common/Header";
import {Notifications} from 'expo';
import GraphArea from "./GraphArea";
import Graph from "./Graph";

import {getOrdersDay, getOrdersMonth, getOrdersWeek} from "../actions";

class Dashboard extends Component {

    state = {
        index: 0,
        count: 0,
        routes: [
            {key: "day", title: "LAST 24 HRS"},
            {key: "week", title: "LAST 7 DAYS"},
            {key: "month", title: "LAST 30 DAYS"}
        ],
        storeName: "",
        line_data_week: [],
        line_data_day: [],
        line_data_month: [],
        area_data_week: [],
        area_data_day: [],
        area_data_month: [],
        line_sale_day: [],
        line_sale_week: [],
        line_sale_month: [],
        graph: true,
    };

    componentDidMount() {
        retrieveData("storeName").then((storeName) => {
            this.setState({storeName: storeName});
        });

        retrieveData("fcmToken").then((fcmToken) => {
            console.log("Stored FCM Token: " + fcmToken);
        });

        this._notificationSubscription = Notifications.addListener(this._handleNotification);
        this.props.getOrdersDay();
        this.props.getOrdersWeek();
        this.props.getOrdersMonth();
    }

    static getDerivedStateFromProps(props) {
        const order_data_day = props.order_data_day;
        const order_data_week = props.order_data_week;
        const order_data_month = props.order_data_month;
        const totalSales_day = parseFloat(props.totalSales_day / 24).toFixed(2);
        const totalSales_week = parseFloat(props.totalSales_week / 7).toFixed(2);
        const totalSales_month = parseFloat(props.totalSales_month / 30).toFixed(2);

        return {
            order_data_day,
            order_data_week,
            order_data_month,
            totalSales_day,
            totalSales_week,
            totalSales_month
        };
    }

    _handleNotification = (notification) => {
        console.log("Push Notification: ", notification);
    };

    _handleIndexChange = index => {
        this.setState({index});
    };

    _renderTabBar = props => {
        const inputRange = props.navigationState.routes.map((x, i) => i);
        return (
            <View style={styles.tabBar}>
                {props.navigationState.routes.map((route, i) => {
                    const color = props.position.interpolate({
                        inputRange,
                        outputRange: inputRange.map(
                            inputIndex => (inputIndex === i ? "#EC1A5C" : "#FFFFFF")
                        )
                    });
                    const elevation = props.position.interpolate({
                        inputRange,
                        outputRange: inputRange.map(
                            inputIndex => (inputIndex === i ? 2 : 0)
                        )
                    });
                    const shadowColor = props.position.interpolate({
                        inputRange,
                        outputRange: inputRange.map(
                            inputIndex => (inputIndex === i ? "#000" : "#fff")
                        )
                    });
                    return (
                        <TouchableOpacity
                            key={route.key}
                            onPress={() => this.setState({index: i})}>
                            <Animated.Text
                                style={[{color}, {elevation}, {shadowColor}, styles.tabTitle]}>
                                {route.title}
                            </Animated.Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        );
    };

    _renderScene = ({route}) => {
        switch (route.key) {
            case "day": {
                this.state.line_data_day = [];
                this.state.area_data_day = [];
                this.state.line_sale_day = [];
                if(this.state.order_data_day ) {
                    this.state.order_data_day.map((order, i) => {
                        this.state.line_data_day.push({x: order.created_at.split(" ")[0], y: Math.round(parseFloat(order.amount))})
                        this.state.line_sale_day.push({x: order.created_at.split(" ")[0], y: parseFloat(this.state.totalSales_day)})
                        this.state.area_data_day.push(Math.round(parseFloat(order.amount)))
                    });
                }
                return <Day navigation={this.props.navigation}/>;
            }
            case "week": {
                this.state.line_data_week = [];
                this.state.area_data_week = [];
                this.state.line_sale_week = [];
                if(this.state.order_data_week) {
                    this.state.order_data_week.map((order, i) => {
                        this.state.line_data_week.push({x: order.created_at.split(" ")[0], y: Math.round(parseFloat(order.amount))})
                        this.state.line_sale_week.push({x: order.created_at.split(" ")[0], y: parseFloat(this.state.totalSales_week)})
                        this.state.area_data_week.push(Math.round(parseFloat(order.amount)))
                    });
                }
                return <Week navigation={this.props.navigation}/>;
            }
            case "month": {
                this.state.line_data_month = [];
                this.state.area_data_month = [];
                this.state.line_sale_month = [];
                if(this.state.order_data_month) {
                    this.state.order_data_month.map((order, i) => {
                        this.state.line_data_month.push({x: order.created_at.split(" ")[0], y: Math.round(parseFloat(order.amount))})
                        this.state.line_sale_month.push({x: order.created_at.split(" ")[0], y: parseFloat(this.state.totalSales_month)})
                        this.state.area_data_month.push(Math.round(parseFloat(order.amount)))
                    });
                }
                return <Month navigation={this.props.navigation}/>;
            }
            default:
                return null;
        }
    };

    graphDisplay = (value) => {
        this.setState({graph: value});
    }

    render() {
        if (this.state.order_data_day && this.state.index == 0 && this.state.count==0){
            this.state.line_data_day = [];
            this.state.area_data_day = [];
            this.state.line_sale_day = [];
            if(this.state.order_data_day ) {
                this.state.order_data_day.map((order, i) => {
                    this.state.line_data_day.push({x: order.created_at.split(" ")[0], y: Math.round(parseFloat(order.amount))})
                    this.state.line_sale_day.push({x: order.created_at.split(" ")[0], y: parseFloat(this.state.totalSales_day)})
                    this.state.area_data_day.push(Math.round(parseFloat(order.amount)))
                });
            }

          this.state.count += 1;
        }
        return (
            <View style={styles.container} enableOnAndroid={true}>
                <View style={styles.innerContainer}>
                    <StatusBar
                        backgroundColor="#EC1A5C"
                        barStyle="light-content"/>
                    <Header navigation={this.props.navigation} title={'DASHBOARD'} rightComponent={
                        <View style={{flexDirection: 'row'}}>
                            <TouchableOpacity style={styles.headerButton}>
                                <Image source={require('../../../assets/images/header/notification.png')}
                                       resizeMode={'contain'}
                                       style={{width: 20, height: 20}}/>
                            </TouchableOpacity>
                        </View>
                    }/>

                    <View style={{ backgroundColor: '#EC1A5C', height: "35%" }}>
                        <View style={{flexDirection: "row", marginTop: 20,}}>
                            <View style={styles.storeText}>
                                <Text style={{fontFamily: 'proxima-nova-regular',fontSize: 14,color: '#FFFFFF'}}>
                                    STORE:{this.state.storeName}
                                </Text>
                            </View>
                            <View style={styles.graphList}>
                                <TouchableOpacity onPress={() => this.graphDisplay(!this.state.graph)}>
                                    {this.state.graph ?
                                        <Text style={{fontFamily: 'proxima-nova-regular',fontSize: 14,color: '#FFFFFF'}}>
                                            Line Graph
                                        </Text> :
                                        <Text style={{fontFamily: 'proxima-nova-regular',fontSize: 14,color: '#FFFFFF'}}>
                                            Area Graph
                                        </Text>
                                    }
                                </TouchableOpacity>

                            </View>
                        </View>

                        {this.state.graph ?
                            <View>
                                <View style={styles.axis}>
                                    {this.state.index == 0 && <GraphArea data1={this.state.area_data_day} data={0}/>}
                                    {this.state.index == 1 && <GraphArea data1={this.state.area_data_week}  data={1}/>}
                                    {this.state.index == 2 && <GraphArea data1={this.state.area_data_month}  data={2}/>}
                                </View>
                            </View>
                            :
                            <View style={{ marginRight: 70 }}>
                                <View style={{flexDirection: 'row',marginLeft: 20, marginTop: 20}}>
                                    {this.state.index == 0 && <Graph data1={this.state.line_data_day} data2={this.state.line_sale_day} data={0}/>}
                                    {this.state.index == 1 && <Graph data1={this.state.line_data_week} data2={this.state.line_sale_week} data={1}/>}
                                    {this.state.index == 2 && <Graph data1={this.state.line_data_month} data2={this.state.line_sale_month} data={2}/>}
                                </View>
                            </View>
                        }
                    </View>

                    <TabView
                        useNativeDriver={true}
                        scrollEnabled={true}
                        style={{flex: 1, backgroundColor: '#FFFFFF', height: 100}}
                        navigationState={this.state}
                        renderScene={this._renderScene}
                        renderTabBar={this._renderTabBar}
                        onIndexChange={this._handleIndexChange}
                    />
                </View>
            </View>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        getOrdersDay,
        getOrdersWeek,
        getOrdersMonth
    }, dispatch);
};

const mapStateToProps = state => ({
    order_data_day: state.dashboard.orders.orderDataDay,
    order_data_week: state.dashboard.orders.orderDataWeek,
    order_data_month: state.dashboard.orders.orderDataMonth,
    totalSales_day: state.dashboard.orders.totalSalesDay,
    totalSales_week: state.dashboard.orders.totalSalesWeek,
    totalSales_month: state.dashboard.orders.totalSalesMonth,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFFFFF",
    },
    innerContainer: {
        flexDirection: 'column',
        flex: 1
    },
    headerButton: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
    tabBar: {
        flexDirection: "row",
        alignSelf: "center",
        paddingHorizontal: 15,
        backgroundColor: "#2B323A",
    },
    tabTitle: {
        fontFamily: "proxima-nova-regular",
        fontSize: 14,
        paddingVertical: 15,
        paddingHorizontal: 15,
        marginRight: 10,
    },
    storeText:{
        flexDirection: 'column',
        padding: 5,
        alignSelf: 'flex-start',
        borderRadius: 50,
        backgroundColor: "#7B0C30",
        marginLeft:50
    },
    graphList:{
        flexDirection: 'column',
        padding: 5,
        alignSelf: 'flex-start',
        borderRadius: 50,
        backgroundColor: "#7B0C30",
        marginLeft:Platform.OS == "ios" ? 130 : 100
    },
    legned: {
        backgroundColor: '#EC1A5C',
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: 15
    },
    axis: {
        marginLeft: 50,
        marginRight: 30,
        marginBottom: 30,
        marginTop: 20,
    }

});
