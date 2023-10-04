import React from 'react';
import CanvasJSReact from '@canvasjs/react-charts';
import "../css/LineChart.css";

const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const LineChart = (props) => {
    const amountArr = props.amount;
    const dateArr = props.date;

    const monthTotals = {};

    dateArr.forEach((dateString, index) => {
        const amount = amountArr[index];
        const date = new Date(dateString);

        const year = date.getFullYear();
        const month = date.getMonth();

        const monthKey = `${year}-${month}`;

        if (monthTotals[monthKey]) {
            monthTotals[monthKey] += amount;
        } else {
            monthTotals[monthKey] = amount;
        }
    });

    const sortedMonthKeys = Object.keys(monthTotals).sort();

    const dataArr = sortedMonthKeys.map(monthKey => {
        const [year, month] = monthKey.split('-');
        return {
            x: new Date(Number(year), Number(month), 1),
            y: monthTotals[monthKey]
        };
    }
    )

    const options = {
        animationEnabled: true,

        // title: {
        //     text: "Monthly Sales - 2017"
        // },
        axisX: {
            valueFormatString: "MMM",
        },
        axisY: {
            // title: "Sales (in USD)",
            prefix: "$"
        },
        width: 450,
        height: 280,
        backgroundColor: "#ededed",
        data: [{
            yValueFormatString: "$#,###",
            xValueFormatString: "MMMM",
            type: "spline",
            dataPoints: dataArr,
        }]
    }

    return (
        <div className='line-graph-comp' >
            <CanvasJSChart options={options} />
        </div>
    );
};

export default LineChart;
