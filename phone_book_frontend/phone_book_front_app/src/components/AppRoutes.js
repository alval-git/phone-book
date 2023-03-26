import React from "react";
import { Route, Routes} from "react-router-dom";

import EmpAddToDep from "./empCreateForm/empAddToDepForm";
import PhoneBook from "./phoneBook/phoneBook";

const AppRouter = () => {

    return (
            <Routes> 
                <Route path="/create/emp/form" element={<EmpAddToDep/>} /> 
                <Route path="/phone-book/" element={<PhoneBook/>} />
            </Routes>
    )
}

export default AppRouter;
