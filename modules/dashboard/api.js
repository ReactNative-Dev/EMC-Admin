import axios from "axios";
import {retrieveData} from "../../common/utils";
import {DASHBOARD} from "../../common/endpoints";
import subDays from 'date-fns/sub_days';
import format from 'date-fns/format';

export const getOrdersDay$$ = async (page) => {
    let token = await retrieveData("token");
    let user = await retrieveData("user");
    let hostUrl = JSON.parse(user).hostUrl;
    let storeId = await retrieveData("storeId");
    let createdTo = format(new Date(), "YYYY-MM-DD HH:mm:ss");
    let createdFrom = format(subDays(new Date(), 1), "YYYY-MM-DD HH:mm:ss");

    return axios({
        method: "POST",
        url: hostUrl + DASHBOARD,
        params: {
          "store_id": storeId,
          "to_date": createdTo,
          "from_date": createdFrom
        },
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        }
    }).then(response => response.data);
};

export const getOrdersWeek$$ = async (page) => {
    let token = await retrieveData("token");
    let user = await retrieveData("user");
    let hostUrl = JSON.parse(user).hostUrl;
    let storeId = await retrieveData("storeId");
    let createdTo = format(new Date(), "YYYY-MM-DD HH:mm:ss");
    let createdFrom = format(subDays(new Date(), 7), "YYYY-MM-DD HH:mm:ss");

    return axios({
        method: "POST",
        url: hostUrl + DASHBOARD,
        params: {
          "store_id": storeId,
          "to_date": createdTo,
          "from_date": createdFrom
        },
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        }
    }).then(response => response.data);
};

export const getOrdersMonth$$ = async (page) => {
    let token = await retrieveData("token");
    let user = await retrieveData("user");
    let hostUrl = JSON.parse(user).hostUrl;
    let storeId = await retrieveData("storeId");
    let createdTo = format(new Date(), "YYYY-MM-DD HH:mm:ss");
    let createdFrom = format(subDays(new Date(), 30), "YYYY-MM-DD HH:mm:ss");

    return axios({
        method: "POST",
        url: hostUrl + DASHBOARD,
        params: {
          "store_id": storeId,
          "to_date": createdTo,
          "from_date": createdFrom
        },
        headers: {
            "Authorization": "Bearer " + token,
            "Content-Type": "application/json"
        }
    }).then(response => response.data);
};
