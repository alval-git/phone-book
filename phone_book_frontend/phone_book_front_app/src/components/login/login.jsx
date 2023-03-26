import Modal from "../reusable/Modal";
import axiosInstance from "../axios";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import React from "react";
import "./login.css"


const Login = (props) => {
    const initialFormData = Object.freeze({
        username: '',
        password: ''
    })

    const history = useNavigate()

    const [formData, updateFormData] = useState(initialFormData);

    const handleChange = (e) => {
        e.preventDefault();
        updateFormData({
            ...formData,
            [e.target.name]: e.target.value.trim(),
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        
        axiosInstance
            .post(`token/`, {
                username: formData.username,
                password: formData.password,
            })
            .then((res) => {
                localStorage.setItem('access_token', res.data.access)
                localStorage.setItem('refresh_token', res.data.refresh)
                axiosInstance.defaults.headers['Authorization'] = 'JWT ' + localStorage.getItem('access_token')
                history(0)
            })
    }

    return (
            <Modal active={props.active} setActive={props.setActive}>
                <form className="loginForm" action="/" onSubmit={handleSubmit}>
                    <label className="modalLabel">Имя пользователя</label>
                    <input className="modalInput" onChange={handleChange} id="username" name="username" type="text" />
                    <label className="modalLabel">Пароль</label>
                    <input className="modalInput" onChange={handleChange} id="password" name="password" type="password" />
                    <button className="createButton" value="Submit" type="submit">Войти</button>
                </form>
            </Modal>
    )
}

export default Login