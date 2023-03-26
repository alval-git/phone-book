import axiosInstance from "../components/axios"

export default class EmployeeService {
    static async getAllEmployees(){
        try {
            const response = await axiosInstance.get('/api/employee/')
            console.log(response)
            return response.data
        }catch (e){
            console.log(e)
        }
    }

    static async getEmployeesInOrgDep(){
        try {
            const response =  await axiosInstance.get('/api/employee-in-department')
            return response.data
        }catch (e){
            console.log(e)
        }
    }
}