import { useState } from "react";
import { createDemand } from "../api/demandApi";

function CreateDemand() {

  const [title,
    setTitle] =
    useState("");

  const [budget,
    setBudget] =
    useState("");

  const submitDemand =
    async (e) => {
      e.preventDefault();

      await createDemand({
        title,
        budget,
      });

      alert(
        "Demand Posted"
      );
    };

  return (
    <div className="max-w-3xl mx-auto py-12">

      <div className="card p-8">

        <h1 className="text-3xl font-bold mb-6">
          Post Demand
        </h1>

        <form
          onSubmit={
            submitDemand
          }
        >

          <input
            placeholder="Need..."
            value={title}
            onChange={(e) =>
              setTitle(
                e.target.value
              )
            }
            className="w-full border p-3 rounded-xl mb-4"
          />

          <input
            placeholder="Budget"
            value={budget}
            onChange={(e) =>
              setBudget(
                e.target.value
              )
            }
            className="w-full border p-3 rounded-xl mb-4"
          />

          <button className="bg-blue-600 text-white px-6 py-3 rounded-xl">
            Post Demand
          </button>

        </form>

      </div>

    </div>
  );
}

export default CreateDemand;