import React from "react";
import Modal from "../reusable/Modal";
import { useEffect, useState } from "react";
import axiosInstance from "../axios";
import { useNavigate } from "react-router-dom";
import "./empCreateModal.css"


const EmpCreateModal = (props) => {

    const initialFormData = Object.freeze({
        name: '',
        surname: '',
        second_name: '',
        landline: '',
        mob_phone: '',
        email: ''
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
            .post(`api/employee/`, {
                name: formData.name,
                surname: formData.surname,
                second_name: formData.second_name,
                landline: formData.landline,
                mob_phone: formData.mob_phone,
                email: formData.email
            })
            .then((res) => {
                history(0)
            })
    }


    return (
        <Modal active={props.active} setActive={props.setActive}>
            <form className="employeeCreateModal" action="/" onSubmit={handleSubmit}>
                <label className="modalLabel">Фамилия</label>
                <input className="modalInput" onChange={handleChange} id="surname" name="surname" type="text" />
                <label className="modalLabel">Имя</label>
                <input className="modalInput" onChange={handleChange} id="name" name="name" type="text" />
                <label className="modalLabel">Отчество</label>
                <input className="modalInput" onChange={handleChange} id="second_name" name="second_name" type="text" />
                <label className="modalLabel">Стационарный телефон</label>
                <input className="modalInput" onChange={handleChange} id="landline" name="landline" type="text" />
                <label className="modalLabel">Мобильный телефон</label>
                <input className="modalInput" onChange={handleChange} id="mob_phone" name="mob_phone" type="text" />
                <label className="modalLabel">Эмеил</label>
                <input className="modalInput" onChange={handleChange} id="email" name="email" type="email" />
                <button className="createButton" value="Submit"   type="submit">Создать</button>
            </form>
        </Modal>
    )
}

export default EmpCreateModal