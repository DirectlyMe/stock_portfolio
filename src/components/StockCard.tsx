/** @jsx jsx */
import React, { useState, FC, useEffect } from "react";
import { css, jsx } from "@emotion/core";
import { connect } from "react-redux";
import { GoogleCharts } from "google-charts";
import { Segment, Image, Header, Input, Button } from "semantic-ui-react";
import { ResponsiveLine } from "@nivo/line";
import StockGraphLine from "./StockGraphLine";
import { Link } from "react-router-dom";

interface IProps {}

//Load the charts library with a callback





const StockCard: FC<IProps> = () => {
    useEffect(() => {});



    return (
        <div css={styles.StockCard}>
            <Link to={`/stockdetail/${1}`}>
                <Header>Some Stock</Header>
            </Link>
        </div>
    );
};

const styles = {
    StockCard: css`
        width: 30vw;
        color: white;
        background-color: #1b1b1d;
        box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, 0.5);
        border-radius: 5px;
        border: 1px solid #0e0d0d;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 500;
    `,
};

export default StockCard;
