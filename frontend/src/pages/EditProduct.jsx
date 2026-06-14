import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  getProduct,
  updateProduct,
} from "../api/productApi";

function EditProduct() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(true);

  const [saving, setSaving] =
    useState(false);

  const [product, setProduct] =
    useState({
      title: "",
      description: "",
      originalPrice: "",
      sellingPrice: "",
      category: "",
      condition: "Good",
      location: "",
    });

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct =
    async () => {
      try {
        const data =
          await getProduct(id);

        setProduct({
          title:
            data.title || "",

          description:
            data.description ||
            "",

          originalPrice:
            data.originalPrice ||
            "",

          sellingPrice:
            data.sellingPrice ||
            "",

          category:
            data.category ||
            "",

          condition:
            data.condition ||
            "Good",

          location:
            data.location ||
            "",
        });
      } catch (error) {
        console.log(error);
        alert(
          "Failed to load product"
        );
      } finally {
        setLoading(false);
      }
    };

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        setSaving(true);

        await updateProduct(
          id,
          product
        );

        alert(
          "Product updated successfully"
        );

        navigate(
          "/my-listings"
        );
      } catch (error) {
        console.log(error);

        alert(
          "Failed to update product"
        );
      } finally {
        setSaving(false);
      }
    };

  if (loading) {
    return (
      <div className="text-center py-20">
        Loading Product...
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-8 py-12">

      <div className="bg-white rounded-3xl shadow-md p-8">

        <h1 className="text-4xl font-bold text-[#06153A] mb-8">
          Edit Product
        </h1>

        <form
          onSubmit={handleSubmit}
        >

          <input
            type="text"
            name="title"
            placeholder="Product Name"
            value={product.title}
            onChange={
              handleChange
            }
            className="w-full border p-3 rounded-xl mb-4"
            required
          />

          <select
            name="category"
            value={
              product.category
            }
            onChange={
              handleChange
            }
            className="w-full border p-3 rounded-xl mb-4"
            required
          >
            <option value="">
              Select Category
            </option>

            <option>
              Books
            </option>

            <option>
              Electronics
            </option>

            <option>
              Furniture
            </option>

            <option>
              Cycles
            </option>

            <option>
              Hostel Essentials
            </option>
          </select>

          <select
            name="condition"
            value={
              product.condition
            }
            onChange={
              handleChange
            }
            className="w-full border p-3 rounded-xl mb-4"
          >
            <option value="New">
              New
            </option>

            <option value="Like New">
              Like New
            </option>

            <option value="Good">
              Good
            </option>

            <option value="Fair">
              Fair
            </option>

            <option value="Used">
              Used
            </option>
          </select>

          <textarea
            rows="5"
            name="description"
            placeholder="Description"
            value={
              product.description
            }
            onChange={
              handleChange
            }
            className="w-full border p-3 rounded-xl mb-4"
            required
          />

          <input
            type="number"
            name="originalPrice"
            placeholder="Original Price"
            value={
              product.originalPrice
            }
            onChange={
              handleChange
            }
            className="w-full border p-3 rounded-xl mb-4"
          />

          <input
            type="number"
            name="sellingPrice"
            placeholder="Selling Price"
            value={
              product.sellingPrice
            }
            onChange={
              handleChange
            }
            className="w-full border p-3 rounded-xl mb-4"
            required
          />

          <input
            type="text"
            name="location"
            placeholder="Location"
            value={
              product.location
            }
            onChange={
              handleChange
            }
            className="w-full border p-3 rounded-xl mb-6"
          />

          <div className="flex gap-4">

            <button
              type="submit"
              disabled={saving}
              className="bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700"
            >
              {saving
                ? "Saving..."
                : "Update Product"}
            </button>

            <button
              type="button"
              onClick={() =>
                navigate(
                  "/my-listings"
                )
              }
              className="border px-6 py-3 rounded-xl"
            >
              Cancel
            </button>

          </div>

        </form>

      </div>

    </div>
  );
}

export default EditProduct;