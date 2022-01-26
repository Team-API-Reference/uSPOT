import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function useAuth(code) {
    const [accessToken, setAccessToken] = useState();
    const [refreshToken, setrefreshToken] = useState();
    const [expiresIn, setExpiresIn] = useState();

    // const getToken = ((code) => {
    useEffect(() => {
        axios
        .post('http://localhost:3000/api/auth', {
            code,
        })
        .then(res => {
            console.log(res)
            setAccessToken(res.data.accessToken)
            setrefreshToken(res.data.refreshToken)
            setExpiresIn(res.data.expiresIn)
            window.history.pushState({}, null, '/')
        })
        // .catch(() => {
        //     window.location = "/"
        // })
    }, [code])
    // getToken();
    useEffect(() => {
        if (!refreshToken || !expiresIn) return
        const interval = setInterval(() => {
        axios
        .post('http://localhost:3000/api/refresh', {
            refreshToken,
        })
        .then(res => {
            setAccessToken(res.data.accessToken)
            setExpiresIn(res.data.expiresIn)
            window.history.pushState({}, null, '/')
        })
        // .catch(() => {
        //     window.location = "/"
        // })
    }, (expiresIn - 60) * 1000)
        return () => clearTimeout(interval)
    }, [refreshToken, expiresIn])

    return accessToken;
}