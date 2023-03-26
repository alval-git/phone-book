import axiosInstance from "../components/axios"

export default class OrgService {
    static async getAllOrganisations(){
        try {
            const response = await axiosInstance.get('/api/organisations/')
            console.log(response)
            return response.data
        }catch (e){
            console.log(e)
        }
    }

}