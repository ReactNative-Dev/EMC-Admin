import React, {Component} from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {MapView} from 'expo';
import {getLocation} from "../actions";
import {createOpenLink} from 'react-native-open-maps';
import {currencySymbol} from "../../../common/utils";
class ShippingDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            coordinates: null,
            mapReady: false
        };
    }

    static getDerivedStateFromProps(props) {
        if (props.coordinates) {
            return {coordinates: props.coordinates};
        }
        return null;
    }

    componentDidMount() {
        const address = this.props.order.extension_attributes.shipping_assignments[0].shipping.address.street[0].replace("#", "") + ', ' +
            this.props.order.extension_attributes.shipping_assignments[0].shipping.address.region + ', ' +
            this.props.order.extension_attributes.shipping_assignments[0].shipping.address.city + ', ' +
            this.props.order.extension_attributes.shipping_assignments[0].shipping.address.postcode + ', ' +
            this.props.order.extension_attributes.shipping_assignments[0].shipping.address.country_id;

        this.props.getLocation(address);
    }

    _onMapLayout() {
        this.setState({
            mapReady: true
        });
    }

    render() {
        const coordinates = this.state.coordinates;
        const mapReady = this.state.mapReady;

        return (
            <View style={{flexDirection: 'column'}}>
                <View style={{flexDirection: 'row', flex: 1}}>
                    <View style={{flexDirection: 'column', flex: 1, alignItems: 'flex-end'}}>
                        <Text style={styles.orderTextDark}>Name </Text>
                        <Text style={styles.orderTextDark}>Method </Text>
                        <Text style={styles.orderTextDark}>Charge </Text>
                        <Text style={styles.orderTextDark}>Telephone </Text>
                        <Text style={styles.orderTextDark}>Address </Text>
                    </View>

                    <View>
                        <Text style={styles.orderTextLight}> : </Text>
                        <Text style={styles.orderTextLight}> : </Text>
                        <Text style={styles.orderTextLight}> : </Text>
                        <Text style={styles.orderTextLight}> : </Text>
                        <Text style={styles.orderTextLight}> : </Text>
                    </View>

                    <View style={{flexDirection: 'column', flex: 2}}>
                        <Text style={styles.orderTextLight}>
                            {this.props.order.billing_address.firstname + ' ' + this.props.order.billing_address.lastname}
                        </Text>
                        <Text style={styles.orderTextLight}> {this.props.order.payment.additional_information[0]}</Text>
                        <Text style={styles.orderTextLight}>
                        {currencySymbol(this.props.order.order_currency_code)} {this.props.order.shipping_amount}
                        </Text>
                        <Text style={styles.orderTextLight}>
                            {this.props.order.extension_attributes.shipping_assignments[0].shipping.address.telephone}
                        </Text>
                        <Text style={styles.orderTextLight}>
                            {this.props.order.extension_attributes.shipping_assignments[0].shipping.address.street[0] + ', ' +
                            this.props.order.extension_attributes.shipping_assignments[0].shipping.address.region + ', ' +
                            this.props.order.extension_attributes.shipping_assignments[0].shipping.address.city + ', ' +
                            this.props.order.extension_attributes.shipping_assignments[0].shipping.address.postcode + ', ' +
                            this.props.order.extension_attributes.shipping_assignments[0].shipping.address.country_id}
                        </Text>
                    </View>
                </View>
                <View>
                    <MapView
                        onLayout={this._onMapLayout.bind(this)}
                        region={{
                            latitude: coordinates ? coordinates.lat : 0,
                            longitude: coordinates ? coordinates.lng : 0,
                            latitudeDelta: 0.1,
                            longitudeDelta: 0.1,
                        }}
                        initialRegion={{
                            latitude: 0,
                            longitude: 0,
                            latitudeDelta: 10,
                            longitudeDelta: 10,
                        }}
                        ref={(ref) => this.mapView = ref}
                        style={{height: 250, width: '100%', marginTop: 25}}>
                        {coordinates && mapReady
                            ? <MapView.Marker
                                coordinate={{
                                    latitude: coordinates.lat,
                                    longitude: coordinates.lng
                                }}/>
                            : null}
                    </MapView>
                    {coordinates
                        ? <View style={{position: 'absolute', right: 0}}>
                            <TouchableOpacity
                                onPress={createOpenLink({latitude: coordinates.lat, longitude: coordinates.lng})}>
                                <Image
                                    style={{}}
                                    source={require("../../../assets/images/sales/map.png")}
                                    resizeMode="contain"/>
                            </TouchableOpacity>
                        </View>
                        : null
                    }
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    coordinates: state.sales.location.coordinates,
    isLoading: state.sales.action.isLoading,
});

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        getLocation
    }, dispatch);
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ShippingDetails);

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
        margin: 3,
        textAlign: 'left'
    },
});
