import AppRouter from "./components/AppRoutes"
import {BrowserRouter} from "react-router-dom";
import React from "react";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
            {/* <Header/>
            <Navbar/> */}
            <main>
                <AppRouter />
            </main>
            {/* <Footer/> */}
            
        </BrowserRouter>
    </div>
  );
}

export default App;
