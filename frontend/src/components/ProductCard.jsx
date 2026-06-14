import { Heart } from "lucide-react";
import { Link } from "react-router-dom";
function ProductCard({ product }) {
  return (
    <div className="card overflow-hidden">

      <div className="h-52 bg-blue-50"></div>

      <div className="p-5">

        <div className="flex justify-between items-start">

          <h3 className="font-semibold text-lg text-[#06153A]">
            {product?.title || "Scientific Calculator"}
          </h3>

          <Heart
            size={20}
            className="cursor-pointer text-gray-400 hover:text-red-500"
          />
        </div>

        <p className="text-blue-700 font-bold mt-2">
          ₹{product?.price || 500}
        </p>

        <p className="text-gray-500 text-sm mt-2">
          {product?.condition || "Good Condition"}
        </p>

        <p className="text-gray-400 text-xs mt-2">
          Posted 2 hours ago
        </p>

      </div>
    </div>
  );
}

export default ProductCard;