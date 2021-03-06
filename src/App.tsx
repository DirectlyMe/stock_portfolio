import React from "react";
import { Switch, Route } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./App.scss";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import Layout from "./components/Layout";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoute from "./components/PrivateRoute";
import AccountDetail from "./pages/AccountDetail";

const App: React.FC = () => {
    return (
        <Layout>
            <Switch>
                <PrivateRoute path="/" exact component={Home} />
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
                <PrivateRoute path="/stockdetail/:id" component={AccountDetail} />
                <ToastContainer />
            </Switch>
        </Layout>
    );
};

export default App;
