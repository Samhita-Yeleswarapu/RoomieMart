// src/pages/Dashboard.jsx

import { useEffect, useState } from "react";
import { getProducts } from "../api/productApi";

function Dashboard() {
  const [products,setProducts] =
    useState([]);

  useEffect(()=>{
    fetchData();
  },[]);

  const fetchData =
    async ()=>{
      const data =
        await getProducts();

      setProducts(data);
    };

  return (
    <div className="max-w-7xl mx-auto py-12 px-8">

      <h1 className="text-4xl font-bold text-[#06153A] mb-10">
        Dashboard
      </h1>

      <div className="grid md:grid-cols-3 gap-8">

        <div className="bg-blue-50 rounded-3xl p-8">
          <h2 className="text-3xl font-bold">
            {products.length}
          </h2>
          <p>Total Products</p>
        </div>

        <div className="bg-green-50 rounded-3xl p-8">
          <h2 className="text-3xl font-bold">
            Active
          </h2>
          <p>Marketplace Running</p>
        </div>

        <div className="bg-pink-50 rounded-3xl p-8">
          <h2 className="text-3xl font-bold">
            RoomieMart
          </h2>
          <p>Campus Marketplace</p>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;