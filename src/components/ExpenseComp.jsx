import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchDataFromFirestore } from "../firebase/firebaseDB";
import SignIn from "./SignIn";
import { addData } from "../redux/features/auth-slice";
import { writeExpenses } from "../firebase/firebaseDB";

import { FirstScreen } from "./FirstScreen";
import { PieChart } from "./PieChart";
import LineChart from "./LineChart";
import { CatTotal } from "./CatTotal";
import { TopSpends } from "./TopSpends";

import "../css/ExpenseComp.css";


export const ExpenseComp = () => {
  const [expense, setExpense] = useState([]);
  const [amount, setAmount] = useState([]);
  const [total, setTotal] = useState(0);
  const [category, setCategory] = useState([]);
  const [date, setDate] = useState([]);
  const [user, setUser] = useState(null);
  const [userName, setUserName] = useState("");

  const dispatch = useDispatch();

  const categories = ["Rent", "Outing", "Trip", "Gadgets", "Grocery", "Cafe", "Travel", "Subscription", "Tax"];




  const handleFormSubmit = (e) => {
    e.preventDefault();

    const newItem = e.target.elements[0].value;
    const newAmount = e.target.elements[1].value;
    const newCategory = e.target.elements[2].value;
    const newDate = e.target.elements[3].value;

    if (!newItem || isNaN(newAmount)) {
      return;
    }

    // Update state with new entry data
    setExpense((prev) => [newItem, ...prev]);
    setAmount((prev) => [parseFloat(newAmount), ...prev]);
    setCategory((prev) => [newCategory, ...prev]);
    setDate((prev) => [newDate, ...prev]);
    setTotal(total + parseFloat(newAmount));


    e.target.elements[0].value = "";
    e.target.elements[1].value = "";
    e.target.elements[2].value = "Select";
    e.target.elements[3].value = "";

  };


  const setUserData = (data) => {
    console.log(data)
    setUser(data)
  }

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await fetchDataFromFirestore(dispatch, user.email);
        if (result.length > 0) {
          // Assuming result[0] contains the data you need
          const item = result[0];

          setExpense(item.expenses.spends || []);
          setAmount(item.expenses.cost || []);
          setCategory(item.expenses.category || []);
          setDate(item.expenses.date || []);
          setTotal(item.total || 0);

        }

      } catch (error) {

      }

    }



    fetchData();
  }, [user, amount, dispatch, expense]);

  useEffect(() => {

    dispatch(addData(expense, amount, category, date, total));
    if (user) {

      if (expense.length !== 0) {
        setUserName(user.displayName);
        console.log(userName);
        writeExpenses(expense, amount, category, date, total, user.email);
      }
    }
  }, [expense, amount, category, date, dispatch, total, user]);

  return (
    <div className="expense-comp" >
      {
        user == null ?
          <>
            <nav>
              <div className="logo" >
                Tracker.
              </div>
              <SignIn setUser={setUserData} />
            </nav>
            <FirstScreen />
          </> :
          <>
            <nav>
              <div className="logo" >
                Tracker.
              </div>

              <div className="prompt" >
                Hi, {user.displayName}
              </div>
              <SignIn setUser={setUserData} />
            </nav>

            <div className="main-screen" >
              <div className="box form" >

                <form onSubmit={handleFormSubmit}>
                  <input type='text' placeholder='Enter Item' name='item' />
                  <input type='text' placeholder='Enter Amount' name='amount' />
                  <select name="category" id="category" >
                    <option value="Select" disabled default>Select Category</option>
                    {
                      categories.map((category, idx) => (
                        <option key={idx} value={category}>{category}</option>
                      ))
                    }

                  </select>
                  <input type='date' placeholder='Enter Date' name='date' />
                  <button type='submit' className="add-btn" >Add Expense</button>
                </form>
              </div>

              <div className="box expense-list" >
                <div className="box-head" >
                  All Expenses
                </div>
                <div className="expense-outer" >
                  <div className="expense-element" >
                    <>
                      <span className="expense-head" > Item </span>
                      <span className="expense-head" > Amount </span>
                      <span className="expense-head" > Category </span>
                      <span className="expense-head" > Date </span>
                    </>
                    {expense.map((item, idx) => (
                      <>
                        <span className="expense-line" > {item} </span>
                        <span className="expense-line" > {amount[idx]} </span>
                        <span className="expense-line" > {category[idx]} </span>
                        <span className="expense-line" > {date[idx]} </span>
                      </>

                    ))}
                  </div>
                </div>
              </div>

              <div className="box total-expend" >
                <div className="box-head" >
                  Category-Wise Totals
                </div>
                <CatTotal expense={expense} amount={amount} category={category} />
                <div className="cat-total-units total" >
                  <span className='card-total-head' >Total</span>
                  <span>$ {total}</span>
                </div>
              </div>

              <div className="box pie-chart" >
                <div className="box-head" >
                  Category-Wise Spends
                </div>
                <div className="pie-chart-outer" >
                  <PieChart expense={expense} amount={amount} category={category} />
                </div>
              </div>

              <div className="box bar-graph" >
                <div className="box-head" >
                  Monthly Spends
                </div>
                <div className="pie-chart-outer" >
                  <LineChart amount={amount} date={date} />
                </div>
              </div>
              <div className="box top-spends" >
                <div className="box-head" >
                  Top Spends
                </div>
                <div className="top-spends-outer" >
                  <TopSpends expense={expense} amount={amount} />
                </div>

              </div>
            </div>
          </>
      }


    </div>
  )
}