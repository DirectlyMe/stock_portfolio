import React from "react";
import logo from "./logo.svg";
import "./App.scss";
import AuthRobinhood from "./components/AuthRobinhood";

const App: React.FC = () => {
    return (
        <div>
            <AuthRobinhood />
        </div>
    );
};

export default App;
