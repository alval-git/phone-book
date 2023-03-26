import axiosInstance from "../components/axios"

export default class DepartmentInOrgService {
    static async getAllDepartmentsInOrgs(){
        try {
            const response = await axiosInstance.get('/api/organisation/departments/')
            console.log(response)
            return response.data
        }catch (e){
            console.log(e)
        }
    }

    static async getAllDepartments(){
        try {
            const response = await axiosInstance.get('/api/departments/')
            console.log(response)
            return response.data
        }catch (e){
            console.log(e)
        }
    }

    

}

