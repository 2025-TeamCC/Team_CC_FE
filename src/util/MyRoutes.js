import {Route, Routes} from "react-router-dom";
import RandingPage from "../Pages/RandingPage/RandingPage";
import WorkspacePage from "../Pages/WorkspacePage/WorkspacePage";
import Layout from "./Layout/Layout";
import Login from "../Pages/SingPage/LoginPage/LoginPage";
import RegisterPage from "../Pages/SingPage/RegisterPage/RegisterPage";

function MyRoutes() {
    return (
        <Routes>
            <Route element={<Layout />}>
                <Route path="/" element={<RandingPage />}/>
                <Route path="/workspace" element={<WorkspacePage />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element = {<RegisterPage/>}/>
            </Route>
        </Routes>
    )
}

export default MyRoutes;