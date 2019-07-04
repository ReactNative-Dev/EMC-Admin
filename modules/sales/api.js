import axios from "axios";
import {retrieveData} from "../../common/utils";
import {GET_ORDER, ORDER_ACTION, ORDERS, ORDERS_ACTION} from "../../common/endpoints";
import format from 'date-fns/format';
import subDays from 'date-fns/sub_days';
import {GOOGLE_PLACES_API_KEY} from "../../common/constants";

export const getOrders$$ = async (page) => {
    let token = await retrieveData("token");
    let user = await retrieveData("user");
    let hostUrl = JSON.parse(user).hostUrl;
    let storeId = await retrieveData("storeId");
    let orderId = await retrieveData("orderId");
    let date = await retrieveData("date");
    let status = await retrieveData("status");
    let createdTo = format(new Date(), "YYYY-MM-DD HH:mm:ss");
    let createdFromDay = format(subDays(new Date(), 1), "YYYY-MM-DD HH:mm:ss");
    let createdFromWeek = format(subDays(new Date(), 7), "YYYY-MM-DD HH:mm:ss");
    let createdFromMonth = format(subDays(new Date(), 30), "YYYY-MM-DD HH:mm:ss");
    let params = [];
    let createdFrom = "";

    if (date == "today") {
        createdFrom = createdFromDay;
    } else if (date == "week") {
        createdFrom = createdFromWeek;
    } else if (date == "month") {
        createdFrom = createdFromMonth;
    }

    if ((date == "all") && (status == "all")) {
        if (orderId) {
            params = [
                `searchCriteria[filter_groups][0][filters][0][field]=store_id`,
                `searchCriteria[filter_groups][0][filters][0][value]=${storeId}`,
                `searchCriteria[filter_groups][1][filters][0][field]=increment_id`,
                `searchCriteria[filter_groups][1][filters][0][value]=%${orderId}%`,
                `searchCriteria[filter_groups][1][filters][0][condition_type]=like`
            ].join('&');
        } else {
            params = [
                `searchCriteria[filter_groups][0][filters][0][field]=store_id`,
                `searchCriteria[filter_groups][0][filters][0][value]=${storeId}`,
                `searchCriteria[currentPage]=${page}&searchCriteria[pageSize]=10`
            ].join('&');
        }
    } else if ((date != "all") && (status == "all")) {
        if (orderId) {
            params = [
                `searchCriteria[filter_groups][0][filters][0][field]=store_id`,
                `searchCriteria[filter_groups][0][filters][0][value]=${storeId}`,
                `searchCriteria[filter_groups][1][filters][0][field]=created_at`,
                `searchCriteria[filter_groups][1][filters][0][value]=${createdFrom}`,
                `searchCriteria[filter_groups][1][filters][0][condition_type]=from`,
                `searchCriteria[filter_groups][2][filters][0][field]=created_at`,
                `searchCriteria[filter_groups][2][filters][0][value]=${createdTo}`,
                `searchCriteria[filter_groups][2][filters][0][condition_type]=to`,
                `searchCriteria[filter_groups][3][filters][0][field]=increment_id`,
                `searchCriteria[filter_groups][3][filters][0][value]=%${orderId}%`,
                `searchCriteria[filter_groups][3][filters][0][condition_type]=like`
            ].join('&');
        } else {
            params = [
                `searchCriteria[filter_groups][0][filters][0][field]=store_id`,
                `searchCriteria[filter_groups][0][filters][0][value]=${storeId}`,
                `searchCriteria[filter_groups][1][filters][0][field]=created_at`,
                `searchCriteria[filter_groups][1][filters][0][value]=${createdFrom}`,
                `searchCriteria[filter_groups][1][filters][0][condition_type]=from`,
                `searchCriteria[filter_groups][2][filters][0][field]=created_at`,
                `searchCriteria[filter_groups][2][filters][0][value]=${createdTo}`,
                `searchCriteria[filter_groups][2][filters][0][condition_type]=to`,
            ].join('&');
        }
    } else if ((date == "all") && (status != "all")) {
        if (orderId) {
            params = [
                `searchCriteria[filter_groups][0][filters][0][field]=store_id`,
                `searchCriteria[filter_groups][0][filters][0][value]=1`,
                `searchCriteria[filter_groups][1][filters][0][field]=status`,
                `searchCriteria[filter_groups][1][filters][0][value]=${status}`,
                `searchCriteria[filter_groups][2][filters][0][field]=increment_id`,
                `searchCriteria[filter_groups][2][filters][0][value]=%${orderId}%`,
                `searchCriteria[filter_groups][2][filters][0][condition_type]=like`
            ].join('&');
        } else {
            params = [
                `searchCriteria[filter_groups][0][filters][0][field]=store_id`,
                `searchCriteria[filter_groups][0][filters][0][value]=1`,
                `searchCriteria[filter_groups][1][filters][0][field]=status`,
                `searchCriteria[filter_groups][1][filters][0][value]=${status}`,
            ].join('&');
        }
    } else {
        if (orderId) {
            params = [
                `searchCriteria[filter_groups][0][filters][0][field]=store_id`,
                `searchCriteria[filter_groups][0][filters][0][value]=${storeId}`,
                `searchCriteria[filter_groups][1][filters][0][field]=created_at`,
                `searchCriteria[filter_groups][1][filters][0][value]=${createdFrom}`,
                `searchCriteria[filter_groups][1][filters][0][condition_type]=from`,
                `searchCriteria[filter_groups][2][filters][0][field]=created_at`,
                `searchCriteria[filter_groups][2][filters][0][value]=${createdTo}`,
                `searchCriteria[filter_groups][2][filters][0][condition_type]=to`,
                `searchCriteria[filter_groups][3][filters][0][field]=status`,
                `searchCriteria[filter_groups][3][filters][0][value]=${status}`,
                `searchCriteria[filter_groups][4][filters][0][field]=increment_id`,
                `searchCriteria[filter_groups][4][filters][0][value]=%${orderId}%`,
                `searchCriteria[filter_groups][4][filters][0][condition_type]=like`
            ].join('&');
        } else {
            params = [
                `searchCriteria[filter_groups][0][filters][0][field]=store_id`,
                `searchCriteria[filter_groups][0][filters][0][value]=${storeId}`,
                `searchCriteria[filter_groups][1][filters][0][field]=created_at`,
                `searchCriteria[filter_groups][1][filters][0][value]=${createdFrom}`,
                `searchCriteria[filter_groups][1][filters][0][condition_type]=from`,
                `searchCriteria[filter_groups][2][filters][0][field]=created_at`,
                `searchCriteria[filter_groups][2][filters][0][value]=${createdTo}`,
                `searchCriteria[filter_groups][2][filters][0][condition_type]=to`,
                `searchCriteria[filter_groups][3][filters][0][field]=status`,
                `searchCriteria[filter_groups][3][filters][0][value]=${status}`,
            ].join('&');
        }
    }

    return axios({
        method: "GET",
        url: hostUrl + ORDERS + `?${params}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        }
    }).then(response => response.data);
};

export const dateDayFilter$$ = async (date) => {
    let token = await retrieveData("token");
    let user = await retrieveData("user");
    let hostUrl = JSON.parse(user).hostUrl;
    let storeId = await retrieveData("storeId");
    let createdTo = format(new Date(), "YYYY-MM-DD HH:mm:ss");
    let createdFrom = format(subDays(new Date(), 1), "YYYY-MM-DD HH:mm:ss");

    let params = [
        `searchCriteria[filter_groups][0][filters][0][field]=store_id`,
        `searchCriteria[filter_groups][0][filters][0][value]=${storeId}`,
        `searchCriteria[filter_groups][1][filters][0][field]=created_at`,
        `searchCriteria[filter_groups][1][filters][0][value]=${createdFrom}`,
        `searchCriteria[filter_groups][1][filters][0][condition_type]=from`,
        `searchCriteria[filter_groups][2][filters][0][field]=created_at`,
        `searchCriteria[filter_groups][2][filters][0][value]=${createdTo}`,
        `searchCriteria[filter_groups][2][filters][0][condition_type]=to`
    ].join('&');

    return axios({
        method: "GET",
        url: hostUrl + ORDERS + `?${params}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        }
    }).then(response => response.data);
}

export const dateWeekFilter$$ = async (date) => {
    let token = await retrieveData("token");
    let user = await retrieveData("user");
    let hostUrl = JSON.parse(user).hostUrl;
    let storeId = await retrieveData("storeId");
    let createdTo = format(new Date(), "YYYY-MM-DD HH:mm:ss");
    let createdFrom = format(subDays(new Date(), 7), "YYYY-MM-DD HH:mm:ss");

    let params = [
        `searchCriteria[filter_groups][0][filters][0][field]=store_id`,
        `searchCriteria[filter_groups][0][filters][0][value]=${storeId}`,
        `searchCriteria[filter_groups][1][filters][0][field]=created_at`,
        `searchCriteria[filter_groups][1][filters][0][value]=${createdFrom}`,
        `searchCriteria[filter_groups][1][filters][0][condition_type]=from`,
        `searchCriteria[filter_groups][2][filters][0][field]=created_at`,
        `searchCriteria[filter_groups][2][filters][0][value]=${createdTo}`,
        `searchCriteria[filter_groups][2][filters][0][condition_type]=to`
    ].join('&');

    return axios({
        method: "GET",
        url: hostUrl + ORDERS + `?${params}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        }
    }).then(response => response.data);
}

export const dateMonthFilter$$ = async (date) => {
    let token = await retrieveData("token");
    let user = await retrieveData("user");
    let hostUrl = JSON.parse(user).hostUrl;
    let storeId = await retrieveData("storeId");
    let createdTo = format(new Date(), "YYYY-MM-DD HH:mm:ss");
    let createdFrom = format(subDays(new Date(), 30), "YYYY-MM-DD HH:mm:ss");

    let params = [
        `searchCriteria[filter_groups][0][filters][0][field]=store_id`,
        `searchCriteria[filter_groups][0][filters][0][value]=${storeId}`,
        `searchCriteria[filter_groups][1][filters][0][field]=created_at`,
        `searchCriteria[filter_groups][1][filters][0][value]=${createdFrom}`,
        `searchCriteria[filter_groups][1][filters][0][condition_type]=from`,
        `searchCriteria[filter_groups][2][filters][0][field]=created_at`,
        `searchCriteria[filter_groups][2][filters][0][value]=${createdTo}`,
        `searchCriteria[filter_groups][2][filters][0][condition_type]=to`
    ].join('&');

    return axios({
        method: "GET",
        url: hostUrl + ORDERS + `?${params}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        }
    }).then(response => response.data);
}

export const getOrder$$ = async (id) => {
    let token = await retrieveData("token");
    let user = await retrieveData("user");
    let hostUrl = JSON.parse(user).hostUrl;

    return axios({
        method: "GET",
        url: hostUrl + GET_ORDER + `${id}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        }
    }).then(response => response.data);
};

export const holdOrder$$ = async (order) => {
    let token = await retrieveData("token");
    let user = await retrieveData("user");
    let hostUrl = JSON.parse(user).hostUrl;
    let orderId = order.entity_id;

    return axios({
        method: "POST",
        url: hostUrl + ORDERS_ACTION + `${orderId}/hold`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        }
    }).then(response => response.data);
};

export const unholdOrder$$ = async (order) => {
    let token = await retrieveData("token");
    let user = await retrieveData("user");
    let hostUrl = JSON.parse(user).hostUrl;
    let orderId = order.entity_id;

    return axios({
        method: "POST",
        url: hostUrl + ORDERS_ACTION + `${orderId}/unhold`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        }
    }).then(response => response.data);
};

export const emailOrderStatus$$ = async (order) => {
    let token = await retrieveData("token");
    let user = await retrieveData("user");
    let hostUrl = JSON.parse(user).hostUrl;
    let orderId = order.entity_id;

    return axios({
        method: "POST",
        url: hostUrl + ORDERS_ACTION + `${orderId}/emails`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        }
    }).then(response => response.data);
};

export const cancelOrder$$ = async (order) => {
    let token = await retrieveData("token");
    let user = await retrieveData("user");
    let hostUrl = JSON.parse(user).hostUrl;
    let orderId = order.entity_id;

    return axios({
        method: "POST",
        url: hostUrl + ORDERS_ACTION + `${orderId}/cancel`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        }
    }).then(response => response.data);
};

export const getOrderStatus$$ = async (order) => {
    let token = await retrieveData("token");
    let user = await retrieveData("user");
    let hostUrl = JSON.parse(user).hostUrl;
    let orderId = order.entity_id;

    return axios({
        method: "GET",
        url: hostUrl + ORDER_ACTION + `${orderId}/statuses`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        }
    }).then(response => response.data);
};

export const getOrderComments$$ = async (order) => {
    let token = await retrieveData("token");
    let user = await retrieveData("user");
    let hostUrl = JSON.parse(user).hostUrl;
    let orderId = order.entity_id;

    return axios({
        method: "GET",
        url: hostUrl + ORDER_ACTION + `${orderId}/comments`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        }
    }).then(response => response.data);
};

export const postOrderComment$$ = async (order) => {
    let token = await retrieveData("token");
    let user = await retrieveData("user");
    let hostUrl = JSON.parse(user).hostUrl;
    let orderId = order.entity_id;

    return axios({
        method: "POST",
        url: hostUrl + ORDER_ACTION + `${orderId}/comments`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        }
    }).then(response => response.data);
};

export const shipOrder$$ = async (order) => {
    let token = await retrieveData("token");
    let user = await retrieveData("user");
    let hostUrl = JSON.parse(user).hostUrl;
    let orderId = order.entity_id;
    let items = [];
    order.items.map((item) => {
        items.push({
            "extension_attributes": {},
            "order_item_id": item.item_id,
            "qty": item.qty_ordered
        });
    });

    let data = {
        "items": items,
        "notify": true,
        "appendComment": true,
        "comment": {
            "extension_attributes": {},
            "comment": "string",
            "is_visible_on_front": 0
        },
        "tracks": [
            {
                "extension_attributes": {},
                "track_number": "string",
                "title": "string",
                "carrier_code": "string"
            }
        ],
        "packages": [
            {
                "extension_attributes": {}
            }
        ],
        "arguments": {
            "extension_attributes": {
                "shipping_label": "string",
                "ext_shipment_id": "string",
                "ext_location_id": "string",
                "ext_tracking_url": "string",
                "ext_tracking_reference": "string"
            }
        }
    };
    return axios({
        method: "POST",
        url: hostUrl + ORDER_ACTION + `${orderId}/ship`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        data: data
    }).then(response => response.data);
};

export const invoiceOrder$$ = async (order) => {
    let token = await retrieveData("token");
    let user = await retrieveData("user");
    let hostUrl = JSON.parse(user).hostUrl;
    let orderId = order.entity_id;
    let items = [];

    order.items.map((item) => {
        items.push({
            "extension_attributes": {},
            "order_item_id": item.item_id,
            "qty": item.qty_ordered
        });
    });

    let data = {
        "capture": true,
        "items": items,
        "notify": true,
        "appendComment": true,
        "comment": {
            "extension_attributes": {},
            "comment": "string",
            "is_visible_on_front": 0
        },
        "arguments": {
            "extension_attributes": {}
        }
    };

    return axios({
        method: "POST",
        url: hostUrl + ORDER_ACTION + `${orderId}/invoice`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        },
        data: data
    }).then(response => response.data);
};

export const getLocation$$ = async (address) => {
    let token = await retrieveData("token");

    return axios({
        method: "GET",
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${GOOGLE_PLACES_API_KEY}`,
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        }
    }).then(response => response.data);
};
