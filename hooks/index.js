import { useState, useEffect, useContext } from 'react';
import jwt_decode from 'jwt-decode';

import { UserContext } from '@/providers/UserProvider';
import { PlaceContext } from '@/providers/PlaceProvider';

// import { getItemFromLocalStorage, setItemsInLocalStorage, removeItemFromLocalStorage } from '@/utils';
import { getItemFromLocalStorage, setItemsInLocalStorage, removeItemFromLocalStorage } from '@/config/index';
// import axiosInstance from '@/utils/axios';
import { apiInstance } from "@/config/axios.config.js"
import { ROOMAPI } from "@/API/client/Booking/PhongThue.js";
import { SIGNUPUSERAPI } from '@/API/client/user/RegisterUser';
import { SIGNINUSERAPI } from '@/API/client/user/LoginUser';





// USER
export const useAuth = () => {
    return useContext(UserContext)
}

export const useProvideAuth = () => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const storedUser = getItemFromLocalStorage('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false)
    }, [])

    const register = async (formData) => {
        const { name, email, password } = formData;

        try {
            // const { data } = await axiosInstance.post('user/register', {
            //     name,
            //     email,
            //     password,
            // });
            const data = await SIGNUPUSERAPI.AddUserApi(formData);
            if (data.user && data.token) {
                setUser(data.user)
                // save user and token in local storage
                setItemsInLocalStorage('user', data.user)
                setItemsInLocalStorage('token', data.token)
            }
            return { success: true, message: 'Registration successfull' }
        } catch (error) {

            // const { message } = error.response.data
            const message = error.response.content

            return { success: false, message }
        }
    }

    const login = async (formData) => {
        // const { email, password } = formData;

        try {
            const { data } = await SIGNINUSERAPI.LoginUserApi(formData);

            if (data.content.user && data.content.token) {
                setUser(data.user)
                // save user and token in local storage
                setItemsInLocalStorage('user', data.content.user)
                setItemsInLocalStorage('token', data.content.token)
            }
            return { success: true, message: 'Login successfull' }
        } catch (error) {
            const { message } = error.response.data.content
            console.log("message: ", message.response.data.content);
            return { success: false, message }
        }
    }

    const googleLogin = async (credential) => {
        const decoded = jwt_decode(credential);
        try {
            const { data } = await axiosInstance.post('user/google/login', {
                name: `${decoded.given_name} ${decoded.family_name}`,
                email: decoded.email,
            });
            if (data.user && data.token) {
                setUser(data.user)
                // save user and token in local storage
                setItemsInLocalStorage('user', data.user)
                setItemsInLocalStorage('token', data.token)
            }
            return { success: true, message: 'Login successfull' }
        } catch (error) {
            return { success: false, message: error.message }
        }
    }

    const logout = async () => {
        debugger
        try {
            const { data } = await axiosInstance.get('/user/logout');
            if (data.success) {
                setUser(null);

                // Clear user data and token from localStorage when logging out
                removeItemFromLocalStorage('user');
                removeItemFromLocalStorage('token');
            }
            return { success: true, message: 'Logout successfull' }
        } catch (error) {
            console.log(error)
            return { success: false, message: 'Something went wrong!' }
        }
    }

    const uploadPicture = async (picture) => {
        try {
            const formData = new FormData()
            formData.append('picture', picture)
            const { data } = await axiosInstance.post('/user/upload-picture', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            })
            return data
        } catch (error) {
            console.log(error)
        }
    }

    const updateUser = async (userDetails) => {
        const { name, password, picture } = userDetails;
        const email = JSON.parse(getItemFromLocalStorage('user')).email
        try {
            const { data } = await axiosInstance.put('/user/update-user', {
                name, password, email, picture
            })
            return data;
        } catch (error) {
            console.log(error)
        }
    }


    return {
        user,
        setUser,
        register,
        login,
        googleLogin,
        logout,
        loading,
        uploadPicture,
        updateUser
    }
}


// PLACES
export const usePlaces = () => {
    return useContext(PlaceContext)
}

export const useProvidePlaces = () => {
    const [places, setPlaces] = useState([]);
    const [loading, setLoading] = useState(true);

    const getPlaces = async () => {
        // const { data } = await axiosInstance.get('/places');
        const data = await ROOMAPI.getRoomApi();
        // console.log("data: ", data.content);
        setPlaces(data.content);
        setLoading(false);
    };

    useEffect(() => {
        getPlaces();
    }, [])

    return {
        places,
        setPlaces,
        loading,
        setLoading
    }
}