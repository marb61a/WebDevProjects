import axios from "axios";

export const updateprofilePicture = async(url, token) => {
    try {
        const { data } = await axios.put(
            `${process.env.REACT_APP_BACKEND_URL}/updateProfilePicture`, {url}, {headers: {Authorization: `Bearer ${token}`}}
        );

        return "ok";

    } catch (error) {
        return error.response.data.message;
    }
};

export const updateCover = async(url, token) => {
    try {
        const { data } = await axios.put(
            `${process.env.REACT_APP_BACKEND_URL}/updateCover`, {url}, {headers: {Authorization: `Bearer ${token}`}}
        );

        return "ok";

    } catch (error) {
        return error.response.data.message;
    }
};

export const addFriend = async(id, token) => {
    try {
        const { data } = await axios.put(
            `${process.env.REACT_APP_BACKEND_URL}/addFriend/${id}`, {}, {headers: {Authorization: `Bearer ${token}`}}
        );

        return "ok";

    } catch (error) {
        return error.response.data.message;
    }
};

export const cancelRequest = async(id, token) => {
    try {
        const { data } = await axios.put(
            `${process.env.REACT_APP_BACKEND_URL}/cancelRequest/${id}`, {}, {headers: {Authorization: `Bearer ${token}`}}
        );

        return "ok";

    } catch (error) {
        return error.response.data.message;
    }
};
