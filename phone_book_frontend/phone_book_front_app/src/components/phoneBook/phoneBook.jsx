import { useEffect, useMemo, useState } from "react"
import React from "react"
import EmployeeService from "../../API/EmployeeService"
import OrgService from "../../API/organisationsService"
import DepartmentInOrgService from "../../API/departmentService"
import Login from "../login/login"
import "./phoneBook.css"
import isAuthenticated from "../../utils/isAuthenticated"
const PhoneBook = () => {
    const [empInOrgDep, setEmpInOrgDep] = useState([])
    const [organisations, setOrganisations] = useState([])
    const [depsInOrgs, setDepsInOrgs] = useState([])
    const [searchText, setSearchText] = useState('')
    const [modalActive, setModalActive] = useState(false)
    const [isAuth, setIsAuth] = useState(isAuthenticated())

    let searchedOrgs = []
    const  fetchPhoneItems = async () => {
        const response = await EmployeeService.getEmployeesInOrgDep()
        setEmpInOrgDep(response)
    }

    const fetchOrganisations = async () => {
        const response = await OrgService.getAllOrganisations()
        setOrganisations(response)
        searchedOrgs = [... response]

    }

    const fetchDepsInOrgs  = async () => {
        const response = await DepartmentInOrgService.getAllDepartmentsInOrgs()
        setDepsInOrgs(response)
    }

    useEffect(() => {fetchPhoneItems()}, [])
    useEffect(() => {fetchOrganisations()}, [])
    useEffect(() => {fetchDepsInOrgs()}, [])
    
    searchedOrgs =  useMemo( () => {
        if (searchText.length > 0)
        {
            const searchQuery = searchText.split()
            const filteredByOrgs =  organisations.filter((org) =>
                                                org.name_of_organisation.toLowerCase().includes(searchText.toLowerCase()))
            const filteredByDeps = depsInOrgs.filter((dep) => 
                                                dep.department.name_of_department.toLowerCase().includes(searchText.toLowerCase()))
            const filteredByEmp = empInOrgDep.filter((emp) => 
                                                emp.employee.surname.toLowerCase().includes(searchText.toLowerCase()) ||
                                                emp.employee.name.toLowerCase().includes(searchText.toLowerCase()) ||
                                                emp.employee.second_name.toLowerCase().includes(searchText.toLowerCase())                     
                                                )
            
            let searchResult = []
            if (filteredByOrgs.length > 0){
                filteredByOrgs.map( (org) => { searchResult.push(org)})
            }
            
            if (filteredByDeps.length > 0 ){
                filteredByDeps.map((dep) => { searchResult.push(dep.organisation) })
                              
               
            }
            if (filteredByEmp.length > 0) {
                filteredByEmp.map((emp) => { searchResult.push(emp.organisation_department.organisation) })
              
            }

            // убирает повторяющиеся организации
            const finalSearchResult = [
                ...new Map(searchResult.map(obj => [`${obj.id}`, obj]))
                .values()
              ];

                          
            return finalSearchResult
             
        }
        else
        {
            return organisations
        }  
                     
    }, [searchText, searchedOrgs])

    const handleSearchChange =  (e) => {
        e.preventDefault()
        setSearchText(e.target.value)
    }
  
    return (
            <div className="phoneBookPage">
                <div className="navigation">
                    { isAuth == true ? 
                    <>
                    <a className="navLink" onClick={ ()=> {localStorage.clear(); setIsAuth(isAuthenticated())}  }>Выйти</a>
                    <a href="/create/emp/form/" className="navLink">Админка</a> 
                    </>
                    :
                    <a  className="navLink" onClick={() => setModalActive(true)}>Войти</a>            
                    }
                    
                </div>
                <div className="searchWrapper">
                    <input type="text" placeholder="Поиск организации по названию, отделу или работнику" className="searchInput" onChange={handleSearchChange} />
                </div>
                { searchedOrgs.length > 0 &&
                    <div className="organisationsWrapper">
                        <div className="organisations">
                            {searchedOrgs.map((org,index) => 
                                <div className="organisation" key={index}>
                                    <p className="orgName">{org.name_of_organisation} </p>
                                    <div className="orgInfo">
                                        <div>      
                                            <label>адресс</label>                        
                                            <p>{org.additional_info.address}</p>
                                        </div> 
                                        <div>
                                            <label>амтс код</label>
                                            <p>{org.additional_info.amts_code}</p>
                                        </div>
                                        <div>
                                            <label>почтовый индекс</label>
                                            <p>{org.additional_info.post_code}</p>
                                        </div>       
                                    </div>
                                    <div className="orgDeps">
                                        {depsInOrgs.filter((dep) => dep.organisation.id == org.id).map((department, index)=>
                                            <div className="orgDepWrapper" key={index}>
                                                <div className="orgDep">
                                                    <p>{department.department.name_of_department}</p>
                                                    <div className="employeeWrapper">
                                                        {empInOrgDep.filter((emp) => emp.organisation_department.id == department.id).map((emp, index) =>
                                                            <div className="employee" key={index}>
                                                                <div className="empInfo">
                                                                    <p>{emp.employee.surname} {emp.employee.name} {emp.employee.second_name}</p>
                                                                    <p>{emp.employee.mob_phone}</p>
                                                                    <p>{emp.employee.landline}</p>
                                                                    <p>{emp.employee.email}</p>
                                                                </div>
                                                                
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                }
                <Login   
                active={modalActive}
                setActive={setModalActive}
                />
            </div>
            
                            
                
              
        )
    }
   
   
        


export default PhoneBook