

function isAuthenticated(){
    if (localStorage.getItem('access_token')){
        return true
    }else{
        return false
    }
}

export default isAuthenticated