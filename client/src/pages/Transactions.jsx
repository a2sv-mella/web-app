import { useEffect, useState } from "react";
import { useDashboardContext } from "./DashboardLayout";
import customFetch from "../utils/customFetch.js";
import { useLoaderData } from "react-router-dom";


export const loader = async () => {
  try {

    const { data } = await customFetch.get("/transactions");
    return data;
  } catch (error) {
    return redirect("/");
  }
};

const Transactions = () => {
  const data = useLoaderData();

  if (!data || data.length === 0) {
    return <h1 className="text-center text-gray-600 text-5xl">No transactions found.</h1>;
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-4">Transactions</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
          <thead>
            <tr>
              <th className="table-header">Status</th>
              <th className="table-header">Email</th>
              <th className="table-header">Amount</th>
              <th className="table-header">Currency</th>
              <th className="table-header">Product ID</th>
              <th className="table-header">TX Ref</th>
              <th className="table-header">Payment Type</th>
            </tr>
          </thead>
          <tbody>
            {data.map((transaction,index) => (
              <tr key={index} className="hover:bg-gray-50">
                <td className={`table-cell ${transaction.status ? 'status-completed' : 'status-pending'}`}>
                  {transaction.status ? "Completed" : "Pending"}
                </td>
                <td className="table-cell">
                  {transaction.email}
                </td>
                <td className="table-cell">
                  {transaction.amount}
                </td>
                <td className="table-cell">
                  {transaction.currency}
                </td>
                <td className="table-cell">
                  {transaction.product_id}
                </td>
                <td className="table-cell">
                  {transaction.tx_ref}
                </td>
                <td className="table-cell">
                  {transaction.payment_type}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Transactions;