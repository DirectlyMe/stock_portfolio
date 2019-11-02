/** @jsx jsx */
import React, { FC } from "react";
import { jsx, css } from "@emotion/core";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { Button, Icon, Menu, Label, Popup } from "semantic-ui-react";
import { logoutUser } from "../Redux/userAuthActions";
import { clearUserAccounts } from "../Redux/userAccountsActions";
import { clearAccountTypes } from "../Redux/accountTypesActions";

interface IProps {
    username: string;
    didAuthorize: boolean;
    logoutUser: () => void;
    clearUserAccounts: () => void;
    clearAccountTypes: () => void;
}

const Navbar: FC<IProps> = ({ username, didAuthorize, logoutUser, clearUserAccounts, clearAccountTypes }) => {
    function initiateLogout() {
        clearUserAccounts();
        clearAccountTypes();
        logoutUser();
    }

    console.log("Did authorize", didAuthorize);
    return (
        <Menu css={styles.navbar} fixed="top">
            <Menu.Item>
                <Icon name="bars" />
            </Menu.Item>
            {!didAuthorize ? (
                <Menu.Menu position="right">
                    <Menu.Item>
                        <Button inverted color="blue">
                            <NavLink to="/login">Log in</NavLink>
                        </Button>
                    </Menu.Item>
                    <Menu.Item>
                        <Button inverted color="green">
                            <NavLink to="/register">Register</NavLink>
                        </Button>
                    </Menu.Item>
                </Menu.Menu>
            ) : (
                <Menu.Menu position="right">
                    <Menu.Item>
                        <Popup trigger={<Label>{username}</Label>} hoverable position="left center">
                            <Button onClick={() => initiateLogout()}>Logout</Button>
                        </Popup>
                    </Menu.Item>
                </Menu.Menu>
            )}
        </Menu>
    );
};

const styles = {
    navbar : css`
        height: 4vh;

        hamburgerMenu {
            background-color: white;
            color: white;
        }
    `,
};

const mapStateToProps = (state: any) => {
    const { username, didAuthorize } = state.userAuth;
    return {
        username,
        didAuthorize,
    };
};

export default connect(mapStateToProps, { logoutUser, clearUserAccounts, clearAccountTypes })(Navbar);
