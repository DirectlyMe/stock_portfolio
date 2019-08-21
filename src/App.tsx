import React from "react";
import { Switch, Route } from "react-router-dom";
import "./App.scss";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import Layout from "./components/Layout";
import RegisterPage from "./pages/RegisterPage";
import PrivateRoute from "./components/PrivateRoute";

const App: React.FC = () => {
    return (
        <Layout>
            <Switch>
                <PrivateRoute path="/" exact component={Home} />
                <Route path="/login" component={LoginPage} />
                <Route path="/register" component={RegisterPage} />
            </Switch>
        </Layout>
    );
};

export default App;
