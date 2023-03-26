import { useEffect, useState } from 'react'
import DepartmentInOrgService from '../../API/departmentService'
import EmployeeService from '../../API/EmployeeService'
import OrgService  from '../../API/organisationsService'
import EmpCreateModal from './empCreateModal'
import React from 'react'
import axiosInstance from '../axios'
import { useNavigate } from 'react-router-dom'
import "./empAddToDepForm.css"

const EmpAddToDep = () => {
    const [organisations, setOrganisations] = useState([])
    const [allOrgDepartments, setAllOrgDepartments] = useState([])
    const [employee, setEmployee] = useState([])
    const [departmentsByOrg, setDepartmentsByOrg] = useState([])
    const [selectedOrg, setSelectedOrg] = useState()
    const [selectedDep, setSelectedDep] = useState()
    const [selectedEmp, setSelectedEmp] = useState()
    const [modalActive, setModalActive] = useState(false)
    const history = useNavigate()


    async function fetchOrganisations(){
        const postResponse = await OrgService.getAllOrganisations()
        setOrganisations(postResponse)
    }

    async function fetchOrgDepartments(){
        const postResponse = await DepartmentInOrgService.getAllDepartmentsInOrgs()
        setAllOrgDepartments(postResponse)
    }

    async function fetchEmployee(){
        const postResponse = await EmployeeService.getAllEmployees()
        setEmployee(postResponse)
    }

    const findAndSetDeps = (orgId) => {
        const departments = allOrgDepartments.filter((value,index) => allOrgDepartments[index].organisation.id == orgId)
        setDepartmentsByOrg(departments)
        if (departments.length > 0){
            const selDepId = departments[0].id
            setSelectedDep(selDepId)
        }else{
            setSelectedDep(undefined)
        }
    }

   
    useEffect( ()=>{ fetchOrganisations() }, [])

    useEffect( ()=>{ fetchOrgDepartments() }, [])

    useEffect( () =>{ fetchEmployee()}, [])

    useEffect(()=>{ 
        if (organisations.length > 0){
            const orgId = organisations[0].id
            setSelectedOrg(orgId)
            findAndSetDeps(orgId)         
        }
               
    }, [organisations])

    useEffect(()=>{ 
        if (employee.length > 0){
            const empId = employee[0].id
            setSelectedEmp(empId)             
        }
               
    }, [employee])



    const orgSelhandleChange = (e) => {
        e.preventDefault()
        setSelectedOrg(e.target.value)
        findAndSetDeps(e.target.value)
         
    }

    const depSelhandleChange = (e) => {
        
        setSelectedDep(e.target.value)
    }

    const empSelhandleChange = (e) => {
        setSelectedEmp(e.target.value)
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        console.log(selectedDep, selectedEmp)
        axiosInstance
            .post(`api/employee-in-department/`, {
                organisation_department: selectedDep,
                employee: selectedEmp,
            })
            .then((res) => {
                history(0)
            })
    }

    return (
        <div className="empAddToDepWrapper">
            <div className="empAddToDep">
                <h3>Создание и добавление сотрудника в отдел</h3>
                <form className="empAddToDepForm" onSubmit={handleSubmit}>
                    <select className="orgSelect" value={selectedOrg} onChange={orgSelhandleChange}>
                        {organisations.map( (organisation, index)=>
                            <option  value={organisation.id} key={index}>{organisation.name_of_organisation}</option>
                        )}
                    </select>
                    <select className="depSelect" value={selectedDep} onChange={depSelhandleChange} >
                        {departmentsByOrg.map( (dep, index)=>
                            <option  value={dep.id} key={index}>{dep.department.name_of_department}</option>      
                        )}             
                    </select>
                    <select className="EmpSelect" value={selectedEmp} onChange={empSelhandleChange}>
                        {employee.map( (emp, index)=>
                            <option  value={emp.id} key={index}>{ emp.surname +  ' ' + emp.name + ' ' + emp.second_name }</option>      
                        )} 
                                
                    </select>
                    <button value="Submit"   type="submit">Добавить</button>
                </form>
                <button onClick={()=>setModalActive(true)}>Создать работника</button>
            </div>
            <EmpCreateModal   
                active={modalActive}
                setActive={setModalActive}
            />
            
        </div>
    )
}

export default EmpAddToDep