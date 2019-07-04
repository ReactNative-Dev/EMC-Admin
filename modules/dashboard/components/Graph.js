import React from "react";
import axios from "axios";
import {StyleSheet, View, Text, Platform} from "react-native";
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import {getOrdersDay} from "../actions";
import * as shape from 'd3-shape';
import PureChart from 'react-native-pure-chart';


class Graph extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            data1: props.data1,
            data2: props.data2,
            data: props.data,
        };
    }

    render() {
        let sampleData = [
            {
                seriesName: 'series1',
                data: this.props.data1,
                color: '#FC8F7B'
            },
            {
                seriesName: 'series2',
                data: this.props.data2,
                color: '#FFFF00'
            }
        ]

        console.log(sampleData, "**********************")

        return (
            <View>
                { (this.props.data1.length > 0 && this.props.data2.length > 0) ?
                    <View>
                        <PureChart
                            data={sampleData}
                            type='line'
                            backgroundColor="#EC1A5C"
                            height={80}
                        />

                        <View style={{flexDirection: 'row', position:"absolute"}}>
                            <Text style={{color: "#FFFFFF", marginLeft: -15, top:50, transform: [{ rotate: '270deg' }]}}>Sales</Text>
                        </View>

                        <View style={{flexDirection: 'row', marginLeft: 120, marginBottom: Platform.OS == "ios" ? 40 : 50}}>
                            <Text style={{color: "#FFFFFF"}}>
                            {this.props.data == 0 && "Hours"}
                            {this.props.data == 1 && "Days"}
                            {this.props.data == 2 && "Days"}
                            </Text>
                        </View>

                        <View style={{ marginLeft: 80,flexDirection: 'row', top: Platform.OS == "ios" ? -30 : -50}}>
                            <View style={{ width: 10, height: 10, backgroundColor: '#FC8F7B'}} />
                            <Text style={{color: '#FFE9F0', top: -5, marginLeft: 10}}>Order</Text>
                            <View style={{ marginLeft: 20, width: 10, height: 10, backgroundColor: '#FFFF00'}} />
                           <Text style={{color: '#FFE9F0', top: -5, marginLeft: 10}}>Avg Order</Text>
                        </View>
                    </View>
                  :

                  <Text style={{marginLeft: 100, marginTop:Platform.OS == "ios" ? 80 : 50, fontSize: 16, textAlign: 'center', color: "#FFFFFF"}}>
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
