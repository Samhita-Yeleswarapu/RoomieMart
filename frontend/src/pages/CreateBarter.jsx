import { useState } from "react";
import { createBarter } from "../api/barterApi";

function CreateBarter() {
  const [formData, setFormData] =
    useState({
      requestedProductId: "",
      offeredProductId: "",
    });

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      await createBarter(
        formData
      );

      alert(
        "Barter Request Sent"
      );
    };

  return (
    <div className="max-w-3xl mx-auto py-12">

      <div className="card p-8">

        <h1 className="text-3xl font-bold text-[#06153A] mb-6">
          Create Barter
        </h1>

        <form
          onSubmit={
            handleSubmit
          }
          className="space-y-4"
        >

          <input
            placeholder="Requested Product ID"
            className="w-full border p-3 rounded-xl"
            onChange={(e) =>
              setFormData({
                ...formData,
                requestedProductId:
                  e.target.value,
              })
            }
          />

          <input
            placeholder="Your Product ID"
            className="w-full border p-3 rounded-xl"
            onChange={(e) =>
              setFormData({
                ...formData,
                offeredProductId:
                  e.target.value,
              })
            }
          />

          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl">
            Send Request
          </button>

        </form>

      </div>

    </div>
  );
}

export default CreateBarter;