"use client";
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import ExpenseForm from "./ExpenseForm"; // Import the ExpenseForm component
import ExpenseTable from "./ExpenseTable";
import TotalExpense from "./TotalExpense";
import TopThreeDates from "./TopThreeDates";
import CategoricalSums from "./CategorySum";
import CategoricalPieChart from "./CategoricalPieChart";
import Last30DaysExpensesLineChart from "./Last30DaysExpensesLineChart";

function ExpenseExtract() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editableId, setEditableId] = useState(null);
  const [editedValues, setEditedValues] = useState({});
  const tableRef = useRef(null); // Reference to the table element
  const [totals, setTotals] = useState({
    total: null,
    last7Days: null,
    last30Days: null,
    last365Days: null,
  });
  const [topDates, setTopDates] = useState([]);
  const [categoricalSums, setCategoricalSums] = useState([])
  const [last30DatesExpenses, setLast30DatesExpenses] = useState([])

  useEffect(() => {
    axios
      .get("http://localhost:8000/myapp/expenses/")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });

    fetchTotals();
    fetchTopThreeDates();
  }, []);

  const fetchTotals = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/myapp/total-expense/"
      );
      const { total, last_7_days, last_30_days, last_365_days, categorical_sums, last_30_dates_expenses } = response.data;
      setTotals({
        total: total,
        last7Days: last_7_days,
        last30Days: last_30_days,
        last365Days: last_365_days
      });
      setCategoricalSums(categorical_sums)
      setLast30DatesExpenses(last_30_dates_expenses)
      console.log(response.data)
    } catch (error) {
      console.error("An error occurred while fetching totals:", error);
    }
  };

  const fetchTopThreeDates = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/myapp/top-three-dates/"
      );
      setTopDates(response.data.top_dates);
    } catch (error) {
      console.error("An error occurred while fetching top dates:", error);
    }
  };
  
  const handleEdit = (id) => {
    setEditableId(id);
    setEditedValues(data.find((item) => item.id === id));
  };

  const handleSave = async (id) => {
    try {
      const response = await axios.put(
        `http://localhost:8000/myapp/expenses/${id}/`,
        editedValues
      );
      setEditableId(null);
      // Update the data state with the updated expense
      setData((prevData) =>
        prevData.map((item) => (item.id === id ? response.data : item))
      );
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred. Please check the console for more details.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      try {
        await axios.delete(`http://localhost:8000/myapp/expenses/${id}/`);
        setData(data.filter((item) => item.id !== id));
      } catch (error) {
        console.error("An error occurred:", error);
        alert("An error occurred. Please check the console for more details.");
      }
    }
  };

  const addNewExpense = async (expense) => {
    try {
      const response = await axios.post(
        "http://localhost:8000/myapp/expenses/",
        expense
      );
      setData([...data, response.data]);
      // Scroll to the bottom of the table to show the new entry
      if (tableRef.current) {
        tableRef.current.scrollTop = tableRef.current.scrollHeight;
      }
      fetchTotals();
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred. Please check the console for more details.");
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="w-full h-full bg-gray-100 px-8 pb-8 flex flex-col items-center">
      <div className="w-full">
        <ExpenseForm addNewExpense={addNewExpense} />
      </div>
      <div className="overflow-y-auto w-full h-[60vh]" ref={tableRef}>
        <ExpenseTable
          data={data}
          editableId={editableId}
          editedValues={editedValues}
          handleEdit={handleEdit}
          handleSave={handleSave}
          handleChange={handleChange}
          handleDeleteClick={handleDeleteClick}
        />
      </div>

      <TotalExpense
        total={totals.total}
        last7Days={totals.last7Days}
        last30Days={totals.last30Days}
        last365Days={totals.last365Days}
      />

      <div className="overflow-y-auto w-full">
        <TopThreeDates topDates={topDates} />
      </div>
      <div className="overflow-y-auto w-full">
        <CategoricalSums categoricalSums={categoricalSums}/>
      </div>
      <div>
        <CategoricalPieChart categoricalSums={categoricalSums}/>
      </div>
      {/* <div>
        <Last30DaysExpensesLineChart last30DatesExpenses={last30DatesExpenses}/>
      </div> */}
    </div>
  );
}

export default ExpenseExtract;
