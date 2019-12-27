/** @jsx jsx */
import React, { useState, FC } from "react";
import { css, jsx } from "@emotion/core";
import { connect } from "react-redux";
import { Icon, Modal, Tab } from "semantic-ui-react";
import AddAccount from "./AddAccount";
import AddStock from "./AddStock";

interface IProps {
    shouldShow: boolean
}

const panes = [
    { menuItem: "Add Account", render: () => <Tab.Pane inverted><AddAccount/></Tab.Pane> },
    { menuItem: "Add Stock", render: () => <Tab.Pane inverted><AddStock /></Tab.Pane> }
];

const AddModal: FC<IProps> = () => {
    return (
        <Modal trigger={<Icon css={styles.addButton} name="add" color="blue" size="huge" />} blurring closeIcon>
            <Tab menu={{ inverted: true, attached: true, }} panes={panes} />
        </Modal>
    );
};

const styles = {
    addButton: css`
        position: fixed;
        bottom: 50px;
        right: 50px;
        cursor: pointer;

        &:hover {
            transform: scale(1.05);
            transition: transform ease-out 0.05s;
        }
    `
};

//@ts-ignore
const mapStateToProps = (state: any, ownProps: any) => {
    const { didAuthorize } = state.userAuth;
    return {
        didAuthorize
    };
};

export default connect(mapStateToProps)(AddModal);