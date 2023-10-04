import React from 'react';
import "../css/TopSpends.css";

export const TopSpends = (props) => {
    const expenseArr = props.expense;
    const amountArr = props.amount;

    const expensesWithAmounts = expenseArr.map((expense, index) => ({
        expense: expense,
        amount: amountArr[index]
    }));

    const sortedExpenses = expensesWithAmounts.sort((a, b) => b.amount - a.amount);

    const topExpenses = sortedExpenses.slice(0, 4);

    return (
        <div className='top-spends-comp'>
            {topExpenses.map((expenseObj, index) => (
                <div key={index} className='cat-total-units'>
                    <span className='card-total-head' >{expenseObj.expense}</span>
                    <span> $ {expenseObj.amount}</span>
                </div>
            ))}
        </div >
    );
}
