import {AsyncStorage} from "react-native";
import {PROD_URL, TEST_URL} from "./constants";
import React from "react";
import {Text, StyleSheet} from "react-native";

//Save data to AsyncStorage
export const storeData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        alert(error);
    }
};

//Fetch data from AsyncStorage
export const retrieveData = async key => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            return value;
        } else {
            return undefined;
        }
    } catch (error) {
        alert(error);
        return undefined;
    }
};

//Delete data from AsyncStorage
export const deleteData = async key => {
    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        alert(error);
    }
};

export const actionCreator = type => payload => ({type, payload});

//Build API endpoints
export const makeURL = endPoint => {
    if (__DEV__) {
        return `${TEST_URL}${endPoint}`;
    }
    return `${PROD_URL}${endPoint}`;
};

//Handle API responses
export const handleResponse = (response, successHandler, failureHandler) => {
    if (response) {
        return successHandler(response);
    } else {
        return failureHandler(response);
    }
};

export const setCurrency = (cur, grand_total) =>  {
    switch (cur) {
      case "USD":
        return <Text style={styles.orderTextLight}>&#36; {grand_total}</Text>;
      case "INR":
        return <Text style={styles.orderTextLight}>&#8377; {grand_total}</Text>
      case "EUR":
        return <Text style={styles.orderTextLight}>&#8364; {grand_total}</Text>;
      case "AED":
        return <Text style={styles.orderTextLight}>AED {grand_total}</Text>
      default:
        return null;
    }
};

export const currencySymbol = (cur) => {
  switch (cur) {
    case "USD":
      return <Text>&#36;</Text>;
    case "INR":
      return <Text>&#8377;</Text>
    case "EUR":
      return <Text>&#8364;</Text>;
    case "AED":
      return <Text>AED</Text>
    default:
      return null;
  }
}

const styles = StyleSheet.create({
    orderTextLight: {
        fontFamily: 'proxima-nova-regular',
        paddingVertical: 5,
        fontSize: 14,
        color: '#A09E9E',
        margin: 3,
        textAlign: 'left'
    },
});