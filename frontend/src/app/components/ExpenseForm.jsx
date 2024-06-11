"use client";
import React, { useState } from "react";
import axios from "axios";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";

function ExpenseForm({ addNewExpense }) {
  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      var now = new Date();
      now = now.toLocaleDateString;
      const newExpense = {
        name: name,
        cost: cost,
        category: category
      };
      addNewExpense(newExpense);
      console.log(newExpense);
      setName("");
      setCost("");
      setCategory("");
      alert("Expense submitted successfully");
    } catch (error) {
      console.error("An error occurred:", error);
      alert("An error occurred. Please check the console for more details.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full mx-auto bg-white px-8 pt-4 pb-6 rounded-lg shadow-md mb-8"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <InputField
          label="Name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <InputField
          label="Cost"
          type="number"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
        />
        <InputField
          label="Category"
          type="text"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <SubmitButton />
      </div>
    </form>
  );
}

export default ExpenseForm;
