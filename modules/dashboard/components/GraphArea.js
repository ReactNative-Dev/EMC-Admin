import React from "react";
import axios from "axios";
import {StyleSheet, Text, View, Platform, ScrollView, Image, ActivityIndicator} from "react-native";
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import {getOrdersDay} from "../actions";
import { AreaChart, YAxis } from 'react-native-svg-charts';
import * as shape from 'd3-shape';

class Graph extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data1: props.data1,
            data: props.data,
        };
    }

    render() {
        return (
            <View>
                { this.props.data1.length > 0 ?
                    <View>
                        <View style={{ height: "70%", flexDirection: 'row', backgroundColor: "#EC1A5C" }}>
                            <YAxis
                                data={ this.props.data1 }
                                svg={{
                                    fill: 'white',
                                    fontSize: 10,
                                }}
                                numberOfTicks={ 5 }
                                formatLabel={ value => `${value}` }
                            />
                            <AreaChart
                                style={styles.chart}
                                data={ this.props.data1 }
                                svg={{ fill: 'rgba(252, 143, 123, 0.5)' }}
                                contentInset={ { top: 20, bottom: 20 } }
                                curve={ shape.curveNatural }
                            />
                        </View>

                        <View style={{flexDirection: 'row', position:"absolute" }}>
                            <Text style={{color: "#FFFFFF", marginLeft: -40, top:50, transform: [{ rotate: '270deg' }]}}>Sales</Text>
                        </View>

                        <View style={{flexDirection: 'row'}}>
                            <Text style={{color: "#FFFFFF", marginLeft: 150, marginTop: 10}}>
                                {this.props.data == 0 && "Hours"}
                                {this.props.data == 1 && "Days"}
                                {this.props.data == 2 && "Days"}
                            </Text>
                        </View>

                        <View style={{ marginLeft: 30,flexDirection: 'row' , top: -10}}>
                            <View style={{ width: 10, height: 10, backgroundColor: '#FC8F7B'}} />
                            <Text style={{color: '#FFE9F0', top: -5, marginLeft: 10}}>Order</Text>
                        </View>
                    </View>
                    :
                    <Text style={{marginRight: 30, marginTop:Platform.OS == "ios" ? 80 : 50, fontSize: 16, textAlign: 'center', color: "#FFFFFF"}}>
                        No Graph to Display
                    </Text>
                }
            </View>


        );
    }
}

export default Graph;

const styles = StyleSheet.create({
    chart: {
        flex: 1,
        borderLeftWidth: 2,
        borderLeftColor: '#FFE9F0',
        borderBottomColor: '#FFE9F0',
        borderBottomWidth: 2,
    }
});
