import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
    const { id } = useParams();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [discount, setDiscount] = useState("");
    const navigate = useNavigate();
  
    useEffect(() => {
      const fetchProduct = async () => {
        try {
          const response = await axios.get(`http://localhost:7000/product/${id}`);
          const productData = response.data;
          setName(productData.name);
          setDescription(productData.description);
          setPrice(productData.price);
          setCategory(productData.category);
        } catch (error) {
          console.error("Error fetching product:", error);
        }
      };
      fetchProduct();
    }, [id]);
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      if (name) formData.append("name", name);
      if (description) formData.append("description", description);
      if (price) formData.append("price", price);
      if (category) formData.append("category", category);
      if (discount) formData.append("discount", discount);
  
      try {
        const response = await axios.put(
          `http://localhost:7000/product/${id}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Product updated successfully:", response.data);
        navigate("/all");
        alert("Product updated successfully");
      } catch (error) {
        console.error("Error updating product:", error);
      }
    };
  return (
    <div>
      <div className="flex items-center justify-center p-12">
        <div className="mx-auto w-full max-w-[550px]">
          <form onSubmit={handleSubmit}>
            <label
              htmlFor="name"
              className="mb-3 block text-base font-medium text-black"
            >
              Name:
              <input
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
            <label
              htmlFor="name"
              className="mb-3 block text-base font-medium text-black"
            >
              Description:
              <textarea
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </label>
            <label
              htmlFor="name"
              className="mb-3 block text-base font-medium text-black"
            >
              Price:
              <input
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </label>
            <label
              htmlFor="name"
              className="mb-3 block text-base font-medium text-black"
            >
              Category:
              <input
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </label>

            <label
              htmlFor="discount"
              className="mb-3 block text-base font-medium text-black"
            >
              Discount (%):
              <select
                className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              >
                <option value="">No Discount</option>
                <option value="5">5%</option>
                <option value="10">10%</option>
                <option value="20">20%</option>
              </select>
            </label>

            <button
              className="hover:shadow-form rounded-md bg-[#6A64F1] py-3 px-8 text-base font-semibold text-white outline-none"
              type="submit"
            >
              Update Product
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Update;
