import axios from "axios";
import {retrieveData} from "../../common/utils";
import {AVAILABLE_STORES} from "../../common/endpoints";

export const availableStores$$ = async () => {
    let user = await retrieveData("user");
    let hostUrl = JSON.parse(user).hostUrl;

    return retrieveData("token")
        .then(token =>
            axios({
                method: "GET",
                url: hostUrl + AVAILABLE_STORES,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer " + token
                }
            })
        )
        .then(response => response.data);
};
