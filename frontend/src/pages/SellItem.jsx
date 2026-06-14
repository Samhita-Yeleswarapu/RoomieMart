import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { createProduct } from "../api/productApi";

import {
  generateDescription,
  getPriceSuggestion,
} from "../api/aiApi";

function SellItem() {
  const navigate = useNavigate();

  const [loading, setLoading] =
    useState(false);

  const [aiDescLoading, setAiDescLoading] =
    useState(false);

  const [aiPriceLoading, setAiPriceLoading] =
    useState(false);

  const [product, setProduct] =
    useState({
      title: "",
      description: "",
      originalPrice: "",
      price: "",
      category: "",
      condition: "Good",

      listingType: "sale",

      rentalPrice: "",
      rentalDuration: "",
    });

  const [images, setImages] =
    useState([]);

  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleImages = (e) => {
    setImages([...e.target.files]);
  };

  const handleAiDescription =
    async () => {
      if (!product.title) {
        alert(
          "Please enter a product name first"
        );
        return;
      }

      try {
        setAiDescLoading(true);

        const data =
          await generateDescription({
            title:
              product.title,
            condition:
              product.condition,
          });

        setProduct({
          ...product,
          description:
            data.description,
        });
      } catch (err) {
        console.log(err);

        alert(
          "Unable to generate description"
        );
      } finally {
        setAiDescLoading(false);
      }
    };

  const handleAiPrice =
    async () => {
      if (
        !product.category ||
        !product.condition ||
        !product.originalPrice
      ) {
        alert(
          "Please fill Category, Condition and Original Price first"
        );
        return;
      }

      try {
        setAiPriceLoading(true);

        const data =
          await getPriceSuggestion({
            category:
              product.category,
            condition:
              product.condition,
            originalPrice:
              Number(
                product.originalPrice
              ),
          });

        setProduct({
          ...product,
          price:
            data.suggestedPrice,
        });

        alert(
          `Suggested Price: ₹${data.suggestedPrice}`
        );
      } catch (err) {
        console.log(err);

        alert(
          "Unable to get AI price suggestion"
        );
      } finally {
        setAiPriceLoading(false);
      }
    };

  const handleSubmit =
    async (e) => {
      e.preventDefault();

      try {
        setLoading(true);

        const formData =
          new FormData();

        formData.append(
          "title",
          product.title
        );

        formData.append(
          "description",
          product.description
        );

        formData.append(
          "originalPrice",
          product.originalPrice
        );

        formData.append(
          "sellingPrice",
          product.price
        );

        formData.append(
          "category",
          product.category
        );

        formData.append(
          "condition",
          product.condition
        );

        formData.append(
          "listingType",
          product.listingType
        );

        if (
          product.listingType ===
          "rent"
        ) {
          formData.append(
            "rentalPrice",
            product.rentalPrice
          );

          formData.append(
            "rentalDuration",
            product.rentalDuration
          );
        }

        images.forEach(
          (image) => {
            formData.append(
              "images",
              image
            );
          }
        );

        await createProduct(
          formData
        );

        alert(
          "Product Listed Successfully"
        );

        navigate("/browse");
      } catch (err) {
        console.log(err);

        alert(
          "Unable to create listing"
        );
      } finally {
        setLoading(false);
      }
    };

  return (
    <div className="max-w-5xl mx-auto px-8 py-12">
      <div className="card p-8">

        <h1 className="text-4xl font-bold text-[#06153A] mb-8">
          List Your Item
        </h1>

        <form
          onSubmit={
            handleSubmit
          }
        >

          <input
            name="title"
            placeholder="Product Name"
            value={
              product.title
            }
            onChange={
              handleChange
            }
            className="w-full border p-3 rounded-xl mb-4"
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
          >
            <option value="">
              Select Category
            </option>

            <option value="Books">
              Books
            </option>

            <option value="Electronics">
              Electronics
            </option>

            <option value="Furniture">
              Furniture
            </option>

            <option value="Cycles">
              Cycles
            </option>

            <option value="Hostel Essentials">
              Hostel Essentials
            </option>
          </select>

          <label className="block text-sm font-medium text-gray-600 mb-1">
            Listing Type
          </label>

          <select
            name="listingType"
            value={
              product.listingType
            }
            onChange={
              handleChange
            }
            className="w-full border p-3 rounded-xl mb-4"
          >
            <option value="sale">
              For Sale
            </option>

            <option value="rent">
              For Rent
            </option>
          </select>

          <label className="block text-sm font-medium text-gray-600 mb-1">
            Condition
          </label>

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

          <div className="flex gap-3 mb-4">

            <button
              type="button"
              onClick={
                handleAiDescription
              }
              disabled={
                aiDescLoading
              }
              className="px-4 py-2 border rounded-lg"
            >
              {aiDescLoading
                ? "Generating..."
                : "AI Description"}
            </button>

            <button
              type="button"
              onClick={
                handleAiPrice
              }
              disabled={
                aiPriceLoading
              }
              className="px-4 py-2 border rounded-lg"
            >
              {aiPriceLoading
                ? "Calculating..."
                : "AI Price"}
            </button>

          </div>

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

          {product.listingType ===
            "sale" && (
            <input
              type="number"
              name="price"
              placeholder="Selling Price"
              value={
                product.price
              }
              onChange={
                handleChange
              }
              className="w-full border p-3 rounded-xl mb-4"
            />
          )}

          {product.listingType ===
            "rent" && (
            <>
              <input
                type="number"
                name="rentalPrice"
                placeholder="Rental Price Per Day"
                value={
                  product.rentalPrice
                }
                onChange={
                  handleChange
                }
                className="w-full border p-3 rounded-xl mb-4"
              />

              <input
                type="number"
                name="rentalDuration"
                placeholder="Maximum Rental Days"
                value={
                  product.rentalDuration
                }
                onChange={
                  handleChange
                }
                className="w-full border p-3 rounded-xl mb-4"
              />
            </>
          )}

          <input
            type="file"
            multiple
            onChange={
              handleImages
            }
            className="mb-6"
          />

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-3 rounded-xl"
          >
            {loading
              ? "Publishing..."
              : "Publish Listing"}
          </button>

        </form>

      </div>
    </div>
  );
}

export default SellItem;