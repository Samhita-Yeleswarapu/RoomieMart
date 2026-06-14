import { useState } from "react";
import { createRental } from "../api/rentalApi";

function CreateRental() {
  const [formData, setFormData] =
    useState({
      productId: "",
      rentalPrice: "",
      durationDays: "",
    });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        await createRental(
          formData
        );

        alert(
          "Rental Created"
        );

        setFormData({
          productId: "",
          rentalPrice: "",
          durationDays: "",
        });
      } catch (err) {
        console.log(err);
      }
    };

  return (
    <div className="max-w-3xl mx-auto py-12">

      <div className="card p-8">

        <h1 className="text-3xl font-bold text-[#06153A] mb-6">
          Create Rental
        </h1>

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-4"
        >

          <input
            name="productId"
            placeholder="Product ID"
            value={
              formData.productId
            }
            onChange={
              handleChange
            }
            className="w-full border p-3 rounded-xl"
          />

          <input
            name="rentalPrice"
            placeholder="Rental Price"
            value={
              formData.rentalPrice
            }
            onChange={
              handleChange
            }
            className="w-full border p-3 rounded-xl"
          />

          <input
            name="durationDays"
            placeholder="Duration"
            value={
              formData.durationDays
            }
            onChange={
              handleChange
            }
            className="w-full border p-3 rounded-xl"
          />

          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl">
            Create Rental
          </button>

        </form>

      </div>

    </div>
  );
}

export default CreateRental;