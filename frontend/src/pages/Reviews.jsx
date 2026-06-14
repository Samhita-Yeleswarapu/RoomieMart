// src/components/Reviews.jsx

import { useEffect, useState } from "react";
import {
  addReview,
  getReviews,
} from "../api/reviewApi";

function Reviews({
  productId,
}) {
  const [reviews, setReviews] =
    useState([]);

  const [comment, setComment] =
    useState("");

  const [rating, setRating] =
    useState(5);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews =
    async () => {
      const data =
        await getReviews(
          productId
        );

      setReviews(data);
    };

  const handleSubmit =
    async () => {
      await addReview({
        productId,
        rating,
        comment,
      });

      setComment("");

      fetchReviews();
    };

  return (
    <div className="mt-12">

      <h2 className="text-2xl font-bold mb-5">
        Reviews
      </h2>

      <div className="border rounded-2xl p-5 mb-6">

        <textarea
          value={comment}
          onChange={(e) =>
            setComment(
              e.target.value
            )
          }
          className="w-full border rounded-xl p-3"
          placeholder="Write review..."
        />

        <button
          onClick={
            handleSubmit
          }
          className="mt-4 bg-blue-600 text-white px-5 py-2 rounded-xl"
        >
          Submit
        </button>

      </div>

      {reviews.map(
        (review) => (
          <div
            key={review._id}
            className="border rounded-xl p-4 mb-3"
          >
            <p>
              ⭐
              {
                review.rating
              }
            </p>

            <p>
              {
                review.comment
              }
            </p>
          </div>
        )
      )}

    </div>
  );
}

export default Reviews;