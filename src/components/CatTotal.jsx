import React from 'react';
import "../css/CatTotal.css";

export const CatTotal = (props) => {
    const expenseArr = props.expense;
    const amountArr = props.amount;
    const categoryArr = props.category;

    const categoryTotals = {};

    expenseArr.forEach((category, index) => {
        const categoryName = categoryArr[index];
        const amount = amountArr[index];

        if (categoryTotals[categoryName]) {
            categoryTotals[categoryName] += amount;
        } else {
            categoryTotals[categoryName] = amount;
        }
    });

    const dataArr = Object.entries(categoryTotals).map(([category, total]) => ({
        y: total,
        label: category,
    }));

    return (
        <div className='cat-total'>
            {
                dataArr.map(({ label, y }) => (
                    <div key={label} className='cat-total-units' >
                        <span className='card-total-head' >{label}</span>
                        <span>$ {y}</span>
                    </div>
                ))
            }
        </div>
    );
}
