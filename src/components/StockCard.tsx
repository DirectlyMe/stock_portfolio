/** @jsx jsx */
import React, { useState, FC, useEffect } from "react";
import { css, jsx } from "@emotion/core";
import { connect } from "react-redux";
import { GoogleCharts } from "google-charts";
import { Segment, Image, Header, Input, Button } from "semantic-ui-react";

interface IProps {

}

//Load the charts library with a callback


const StockCard: FC<IProps> = () => {

    const request = {
        symbol: "ITX",
        desired_date: "12/31/2019",
        values: ['price', 'volume', 'peak_day']
    };

    GoogleCharts.load(drawChart);
 
    function drawChart() {
        // Standard google charts functionality is available as GoogleCharts.api after load
        const data = GoogleCharts.api.visualization.arrayToDataTable([
            ['Chart thing', 'Chart amount'],
            ['Lorem ipsum', 60],
            ['Dolor sit', 22],
            ['Sit amet', 18]
        ]);
        const pie_1_chart = new GoogleCharts.api.visualization.PieChart(document.getElementById('chart1'));
        pie_1_chart.draw(data);
    }

    return (
        <div css={styles.StockCard}>
            <Header inverted >testing</Header>
        </div>
    );
};

const styles = {
    StockCard: css`
        width: 50vw;
        color: white;
        background-color: #1b1b1d;
        box-shadow: 0px 1px 1px 1px rgba(0, 0, 0, .5);
        border-radius: 5px;
        border: 1px solid #0e0d0d;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    `,
};

export default StockCard;