import React, {Component} from "react";
import {FlatList, Image, Platform, StatusBar, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {Icon, SearchBar} from "react-native-elements";
import RNPickerSelect from 'react-native-picker-select';
import {dateDayFilter, dateMonthFilter, dateWeekFilter, getOrders} from "../actions";
import {OrderItem} from "./OrderItem";
import {storeData} from "../../../common/utils";
import Header from "../../common/Header";
import {NavigationEvents} from 'react-navigation';

class Sales extends Component {
    constructor(props) {
        super(props);
        this.state = {
            filterExpanded: false,
            changeStatus: "",
            changeDate: "",
            changeOrderId: "",
            duration: null,
            date: [
                {
                    label: 'Today',
                    value: 'today',
                },
                {
                    label: 'This Week',
                    value: 'week',
                },
                {
                    label: 'This Month',
                    value: 'month',
                },
            ],
            status: [
                {
                    label: 'Cancel',
                    value: 'canceled',
                },
                {
                    label: 'Closed',
                    value: 'closed',
                },
                {
                    label: 'Complete',
                    value: 'complete',
                },
                {
                    label: 'On Hold',
                    value: 'holded',
                },
                {
                    label: 'Pending',
                    value: 'pending',
                },
                {
                    label: 'Pending Payment',
                    value: 'pending_payment',
                },
                {
                    label: 'Payment Review',
                    value: 'payment_review',
                },
                {
                    label: 'Processing',
                    value: 'processing',
                }
            ],
        };
    }

    static getDerivedStateFromProps(props) {
        return null;
    }

    componentDidMount = async () => {
        await storeData("status", "all");
        await storeData("date", "all");
        await storeData("orderId", "");
        const duration = this.props.navigation.getParam('duration', null);
        console.log("Duration: ", duration);
        this.setState({duration: duration});
        // this.props.getOrders(1);
        // this.props.dateDayFilter();
        // this.props.dateWeekFilter();
        // this.props.dateMonthFilter();
    };

    componentDidUpdate() {
    }

    toggleFilter = () => {
        this.setState({filterExpanded: !this.state.filterExpanded});
    };

    onFieldValueChanged = async (value) => {
        this.setState({changeOrderId: value});
        await storeData("orderId", value);
    };

    statusChange = async (value) => {
        this.setState({changeStatus: value});
        await storeData("status", value);
    };

    dateChange = async (date_value) => {
        this.setState({changeDate: date_value});
        await storeData("date", date_value);
    };

    searchFilter = () => {
        this.props.getOrders(1);
    };

    _fetchNextPage = ({distanceFromEnd}) => {
        let count = this.props.criteria.current_page * this.props.criteria.page_size;
        console.log(this.props.total, count)
        if (this.props.total <= 10) {
            this.props.getOrders(1);
        } else if (this.props.total !== count && this.props.total >= count) {
            this.props.getOrders(this.props.criteria.current_page + 1);
        }
    }

    _keyExtractor = (item, index) => "order_" + item.entity_id;

    _handleRefresh = () => {
        this.props.getOrders(1);
    };

    _ListEmptyView = () => {
        return (
            <View style={{marginTop: '50%'}}>
                <Icon name='cart-off' type='material-community'/>
                <Text style={{textAlign: 'center'}}> Sorry, No Order Found!</Text>
            </View>
        );
    };

    getOrders() {
        console.log("Component in focus. Getting orders");
        this.props.getOrders(1);
        this.props.dateDayFilter();
        this.props.dateWeekFilter();
        this.props.dateMonthFilter();
    }

    render() {
        return (
            <View style={styles.container}>
                <StatusBar
                    backgroundColor="#EC1A5C"
                    barStyle="light-content"/>
                <NavigationEvents onDidFocus={() => this.getOrders()}/>
                <Header navigation={this.props.navigation} title={'SALES'} rightComponent={
                    <View style={{flexDirection: 'row'}}>
                        <TouchableOpacity style={styles.headerButton} onPress={() => this.toggleFilter()}>
                            <Image source={require('../../../assets/images/header/filter.png')}
                                   resizeMode={'contain'}
                                   style={{width: 20, height: 20}}/>
                        </TouchableOpacity>
                    </View>
                }/>
                <View style={{flex: 1}}>
                    {this.state.filterExpanded ?
                        <View>
                            <SearchBar
                                placeholder="Search by Order ID"
                                searchIcon={<Image
                                    source={require("../../../assets/images/sales/search.png")}
                                    resizeMode="contain"/>}
                                inputStyle={{backgroundColor: '#FFFFFF', fontSize: 18, color: 'black'}}
                                containerStyle={{
                                    backgroundColor: '#FFFFFF',
                                    marginHorizontal: 15,
                                    borderWidth: 0,
                                    borderTopWidth: 0,
                                    borderBottomWidth: 0,
                                    borderColor: '#F1EFEF',
                                }}
                                maxLength={9}
                                onChangeText={value =>
                                    this.onFieldValueChanged(value)
                                }
                            />
                            <View style={{flexDirection: 'row', backgroundColor: '#2B323A', marginHorizontal: 15}}>
                                <View style={styles.pickerHeaderText}>
                                    <Text style={styles.pickerText}>By Status : </Text>
                                </View>
                                <View style={styles.innerContainer}>
                                    <RNPickerSelect
                                        placeholder={{label: 'All', value: "all"}}
                                        items={this.state.status}
                                        onValueChange={(value) => this.statusChange(value)}
                                        style={{...pickerSelectStyles}}
                                    />
                                </View>
                            </View>

                            <View style={{
                                flexDirection: 'row',
                                backgroundColor: '#2B323A',
                                marginHorizontal: 15,
                                marginTop: 5
                            }}>
                                <View style={styles.pickerHeaderText}>
                                    <Text style={styles.pickerText}>By Date : </Text>
                                </View>
                                <View style={styles.innerContainer}>
                                    <RNPickerSelect
                                        placeholder={{label: 'All', value: "all"}}
                                        items={this.state.date}
                                        onValueChange={(value) => this.dateChange(value)}
                                        style={{...pickerSelectStyles}}
                                    />
                                </View>
                            </View>

                            <View style={{
                                flexDirection: 'row',
                                backgroundColor: '#2B323A',
                                marginHorizontal: 15,
                                marginTop: 5,
                                height: 50
                            }}>
                                <View style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flex: 1,
                                    flexDirection: 'row'
                                }}>
                                    <TouchableOpacity onPress={() => this.searchFilter()}>
                                        <Icon name='check' type='material-community' size={36} color="#fff"/>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                        : null
                    }
                    {this.state.duration == "day" &&
                    <FlatList
                        style={{flex: 1}}
                        refreshing={this.props.isLoading}
                        ListEmptyComponent={this.props.isLoading ? null : this._ListEmptyView}
                        onRefresh={this._handleRefresh}
                        data={this.props.itemsday.sort((a, b) => a.created_at < b.created_at ? 1 : -1)}
                        keyExtractor={this._keyExtractor}
                        onEndReachedThreshold={0.5}
                        onEndReached={this._fetchNextPage}
                        renderItem={({item}) => (
                            <OrderItem
                                order={item}
                                navigation={this.props.navigation}/>
                        )}
                    />
                    }
                    {this.state.duration == "week" &&
                    <FlatList
                        style={{flex: 1}}
                        refreshing={this.props.isLoading}
                        ListEmptyComponent={this.props.isLoading ? null : this._ListEmptyView}
                        onRefresh={this._handleRefresh}
                        data={this.props.itemsweek.sort((a, b) => a.created_at < b.created_at ? 1 : -1)}
                        keyExtractor={this._keyExtractor}
                        onEndReachedThreshold={0.5}
                        onEndReached={this._fetchNextPage}
                        renderItem={({item}) => (
                            <OrderItem
                                order={item}
                                navigation={this.props.navigation}/>
                        )}
                    />
                    }
                    {this.state.duration == "month" &&
                    <FlatList
                        style={{flex: 1}}
                        refreshing={this.props.isLoading}
                        ListEmptyComponent={this.props.isLoading ? null : this._ListEmptyView}
                        onRefresh={this._handleRefresh}
                        data={this.props.itemsmonth.sort((a, b) => a.created_at < b.created_at ? 1 : -1)}
                        keyExtractor={this._keyExtractor}
                        onEndReachedThreshold={0.5}
                        onEndReached={this._fetchNextPage}
                        renderItem={({item}) => (
                            <OrderItem
                                order={item}
                                navigation={this.props.navigation}/>
                        )}
                    />
                    }
                    {this.state.duration == null &&
                    <FlatList
                        style={{flex: 1}}
                        refreshing={this.props.isLoading}
                        ListEmptyComponent={this.props.isLoading ? null : this._ListEmptyView}
                        onRefresh={this._handleRefresh}
                        data={this.props.items.sort((a, b) => a.created_at < b.created_at ? 1 : -1)}
                        keyExtractor={this._keyExtractor}
                        onEndReachedThreshold={0.5}
                        onEndReached={this._fetchNextPage}
                        renderItem={({item}) => (
                            <OrderItem
                                order={item}
                                navigation={this.props.navigation}/>
                        )}
                    />
                    }
                </View>
            </View>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        getOrders,
        dateDayFilter,
        dateWeekFilter,
        dateMonthFilter
    }, dispatch);
};

const mapStateToProps = state => ({
    items: state.sales.orders.items,
    criteria: state.sales.orders.criteria,
    isLoading: state.sales.orders.isLoading,
    total: state.sales.orders.total,
    itemsday: state.sales.orders.itemsDay,
    itemsweek: state.sales.orders.itemsWeek,
    itemsmonth: state.sales.orders.itemsMonth,
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Sales);

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F4F6F6",
        height: "100%"
    },
    innerContainer: {
        justifyContent: 'center',
        flexDirection: 'column',
        width: Platform.OS == "ios" ? 290 : 220
    },
    pickerHeaderText: {
        justifyContent: 'center',
        flexDirection: 'column'
    },
    pickerText: {
        textAlign: 'left',
        color: 'white',
        margin: 5,
    },
    headerButton: {
        width: 50,
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        paddingTop: 13,
        paddingBottom: 12,
        backgroundColor: '#2B323A',
        color: 'white',
    },
    inputAndroid: {
        paddingTop: 13,
        paddingBottom: 12,
        backgroundColor: '#2B323A',
        color: 'white',
    },
});
