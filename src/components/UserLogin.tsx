import React, { useState, FC } from "react";
import { connect } from "react-redux";
import { Input, Button } from "semantic-ui-react";
import { registerUser } from "../Redux/userAuthActions";
import { Store } from "redux";

const styles = {
    userRegister: {
        margin: "20px"
    }
};

interface IProps {
    registerUser: (
        username: string,
        password: string,
        confirmPass: string
    ) => Promise<void>;
    errors: string[];
}

const UserRegister: FC<IProps> = ({ errors, registerUser }) => {
    const [username, setUsername] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPass, setConfirmPass] = useState<string>("");

    return (
        <>
        { errors ? (
           <ul>
               { errors.map(err => (
                   <li>{err}</li>
               )) }
           </ul>
        ) : null }
        <div style={styles.userRegister}>
            <Input
                type="text"
                value={username}
                placeholder="username"
                onChange={e => setUsername(e.target.value)}
            />
            <Input
                type="text"
                value={password}
                placeholder="password"
                onChange={e => setPassword(e.target.value)}
            />
            <Input
                type="text"
                value={confirmPass}
                placeholder="confirm password"
                onChange={e => setConfirmPass(e.target.value)}
            />
            <Button
                onClick={() => registerUser(username, password, confirmPass)}
            >
                Sign in
            </Button>
        </div>
        </>
    );
};

//@ts-ignore
const mapStateToProps = (state: Store) => {
    //@ts-ignore
    const { errors } = state.userAuth;
    return {
        errors
    };
};

export default connect(
    mapStateToProps,
    { registerUser }
)(UserRegister);
