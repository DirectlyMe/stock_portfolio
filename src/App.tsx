import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import AuthRobinhood from "./components/AuthRobinhood";
import UserRegister from "./components/UserLogin";

const App: React.FC = () => {
    return (
        <div>
            <UserRegister />
            <AuthRobinhood />
        </div>
    );
};

export default App;
