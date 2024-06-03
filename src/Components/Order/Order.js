import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import auth from "../../firebase.init";
import { useForm } from "react-hook-form";
import { useAuthState } from "react-firebase-hooks/auth";
import UseItems from "../../Hook/UseItems";
import { toast } from "react-toastify";

const Order = () => {
const [user] = useAuthState(auth);
const { id } = useParams();
const items = UseItems(id);
const { register, handleSubmit } = useForm();
const navigate = useNavigate();

const onSubmit = (data, event) => {
  const formData = {
    ...data,
    userName: data.userName,
    productName: items.name,
    email: data.email,
    quantity: data.quantity,
    price: items.price,
    image: items.image,
  };

  const url = `http://localhost:7000/order`;
  console.log(url);
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      toast("Add to Cart Successfully");
      navigate("/myOrder");
      event.target.reset();
    });
};

  return (
    <div>
    {items ? (
      <div class="flex min-h-screen items-center justify-center bg-white dark:bg-gray-950 p-12">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div class="max-w-sm rounded-3xl bg-gradient-to-b from-sky-300 to-purple-500 p-px dark:from-gray-800 dark:to-transparent">
            <div class="rounded-[calc(1.5rem-1px)] bg-white px-10 p-12 dark:bg-gray-900">
              <h1 className="text-2xl font-bold">Give Your Order Details</h1>
              <div class="mt-8 space-y-8">
                <div class="space-y-6">
                  <input
                    class="w-full bg-transparent text-gray-600 dark:text-white dark:border-gray-700 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-600 invalid:border-red-500 dark:placeholder-gray-300"
                    placeholder="Your Name"
                    type="text"
                    name="userName"
                    {...register("userName", {})}
                  />
                  <input
                    className="w-full bg-transparent text-gray-600 dark:text-white dark:border-gray-700 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-600 invalid:border-red-500 dark:placeholder-gray-300"
                    placeholder="Your Email"
                    type="email"
                    name="email"
                    value={user?.email || ""}
                    readOnly
                    {...register("email", {})}
                  />

                  <input
                    className="w-full bg-transparent text-gray-600 dark:text-white dark:border-gray-700 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-600 invalid:border-red-500 dark:placeholder-gray-300"
                    placeholder="Product Name"
                    name="productName"
                    type="text"
                    defaultValue={items.name || ""}
                    readOnly
                    {...register("productName", {})}
                  />
                  <input
                    className="w-full bg-transparent text-gray-600 dark:text-white dark:border-gray-700 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-600 invalid:border-red-500 dark:placeholder-gray-300"
                    placeholder="Price"
                    name="price"
                    type="text"
                    defaultValue={items.price || ""}
                    readOnly
                    {...register("price", {})}
                  />

                  <input
                    class="w-full bg-transparent text-gray-600 dark:text-white dark:border-gray-700 rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-600 invalid:border-red-500 dark:placeholder-gray-300"
                    placeholder="Quantity"
                    type="text"
                    name="quantity"
                    {...register("quantity", {})}
                  />
                </div>

                <button class="h-9 px-3 w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 focus:bg-blue-700 transition duration-500 rounded-md text-white">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    ) : (
      <div>Loading...</div>
    )}
  </div>
  );
};

export default Order;
