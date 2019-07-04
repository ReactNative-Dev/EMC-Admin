import axios from "axios";
import {retrieveData} from "../../common/utils";
import {ADMIN_LOGIN} from "../../common/endpoints";

export const adminLogin$$ = async (payload) => {
    let user = await retrieveData("user");
    let hostUrl = JSON.parse(user).hostUrl;

    return axios({
        method: "POST",
        url: hostUrl + ADMIN_LOGIN,
        data: payload
    }).then(response => response.data);
};
