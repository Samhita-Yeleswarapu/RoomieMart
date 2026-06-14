import {
  useEffect,
  useState,
} from "react";

import {
  getRentals,
} from "../api/rentalApi";

function Rentals() {
  const [rentals, setRentals] =
    useState([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    fetchRentals();
  }, []);

  const fetchRentals =
    async () => {
      try {
        const data =
          await getRentals();

        setRentals(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading Rentals...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-8 py-12">

      <h1 className="text-4xl font-bold text-[#06153A] mb-10">
        Rentals
      </h1>

      {rentals.length === 0 ? (
        <div className="bg-white border rounded-3xl p-12 text-center">
          <h2 className="text-2xl font-semibold">
            No Rentals Available
          </h2>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">

          {rentals.map(
            (rental) => (
              <div
                key={rental._id}
                className="bg-white border rounded-3xl overflow-hidden shadow-sm"
              >

                <img
                  src={
                    rental.productId
                      ?.images?.[0] ||
                    "https://placehold.co/600x400"
                  }
                  alt=""
                  className="h-56 w-full object-cover"
                />

                <div className="p-6">

                  <h2 className="text-xl font-semibold">
                    {
                      rental
                        .productId
                        ?.title
                    }
                  </h2>

                  <p className="text-blue-700 text-2xl font-bold mt-3">
                    ₹
                    {
                      rental.rentalPrice
                    }
                  </p>

                  <p className="text-gray-500 mt-2">
                    Duration:
                    {" "}
                    {
                      rental.durationDays
                    }
                    {" "}
                    days
                  </p>

                  <p className="text-gray-500">
                    Owner:
                    {" "}
                    {
                      rental.ownerId
                        ?.username
                    }
                  </p>

                  <button
                    className="mt-5 w-full bg-blue-600 text-white py-2 rounded-xl"
                  >
                    Rent Now
                  </button>

                </div>

              </div>
            )
          )}

        </div>
      )}

    </div>
  );
}

export default Rentals;