import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useForm } from "react-hook-form";
import auth from "../../firebase.init";
import { useNavigate } from "react-router-dom";

const Vendor = () => {
  const [submitting, setSubmitting] = useState(false);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [image3, setImage3] = useState(null);
  const [image4, setImage4] = useState(null);

  const handleImage1Change = (event) => {
    setImage1(event.target.files[0]);
  };

  const handleImage2Change = (event) => {
    setImage2(event.target.files[0]);
  };
  const handleImage3Change = (event) => {
    setImage3(event.target.files[0]);
  };
  const handleImage4Change = (event) => {
    setImage4(event.target.files[0]);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setSubmitting(true);

    const formData = new FormData();
    formData.append("userName", event.target.userName.value);
    formData.append("name", event.target.name.value);
    formData.append("email", user ? user.email || "" : "");
    formData.append("description", event.target.description.value);
    formData.append("category", event.target.category.value);
    formData.append("price", event.target.price.value);
    formData.append("images", image1);
    formData.append("images", image2);
    formData.append("images", image3);
    formData.append("images", image4);

    formData.append("status", "pending");

    fetch("http://localhost:7000/product", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        console.log(result);
        setSubmitting(false);
        navigate("/myRole");
      })
      .catch((error) => {
        console.error("Error:", error);
        setSubmitting(false);
      });
  };
  return (
    <div>
      <div class="min-h-screen flex justify-center items-center">
        <div class="lg:w-2/5 md:w-1/2 w-2/3">
          <form
            onSubmit={onSubmit}
            class="bg-white p-10 rounded-lg shadow-lg min-w-full"
          >
            <h1 class="text-center h-10 w-full bg-orange-600 text-lg text-white font-bold font-sans">
              প্রোডাক্ট আবেদন ফর্ম
            </h1>
            <div>
              <label
                class="text-gray-800 font-semibold block my-3 text-md"
                for="আপনার নাম"
              >
                আপনার নাম
              </label>
              <input
                class="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
                type="text"
                name="userName"
                placeholder="আপনার নাম লিখুন"
              />
            </div>
            <div>
              <label className="text-gray-800 font-semibold block my-3 text-md">
                Email
              </label>
              <input
                className="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
                type="email"
                name="email"
                value={user ? user.email || "" : ""}
                readOnly
              />
            </div>
            <div>
              <label
                class="text-gray-800 font-semibold block my-3 text-md"
                for="আপনার নাম"
              >
                প্রোডাক্ট নাম
              </label>
              <input
                class="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
                type="text"
                name="name"
                id="name"
                placeholder="আপনার নাম লিখুন"
              />
            </div>
            <div>
              <label
                class="text-gray-800 font-semibold block my-3 text-md"
                for="আপনার নাম"
              >
                Description
              </label>
              <textarea
                class="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
                placeholder="বিবরণ"
                type="text"
                name="description"
              ></textarea>
            </div>
            <div>
              <label
                class="text-gray-800 font-semibold block my-3 text-md"
                for="Price"
              >
                Price
              </label>
              <input
                class="w-full bg-gray-100 px-4 py-2 rounded-lg focus:outline-none"
                type="text"
                name="price"
                placeholder="Price"
              />
            </div>
            <select name="category" className="select w-full max-w-xs">
              <option disabled selected>
                প্রোডাক্ট ক্যাটাগরি সিলেক্ট করুন
              </option>
              <option>থ্রি-পিস</option>
              <option>Mobile Accessories</option>
              <option>চশমা</option>
              <option>ঘড়ি</option>
              <option>স্মার্ট ফোন</option>
              <option>টি-শার্ট</option>
              <option>জুতা</option>
              <option>শাড়ি</option>
              <option>শার্ট</option>
              <option>ল্যাপটপ</option>
              <option>পেন্ট</option>
              <option>ইলেকট্রনিক্স</option>
              <option>কিডস</option>
              <option>ডেস্কটপ</option>
              <option> কসমেটিক্স</option>
              <option>গিফট</option>
            </select>

            <div>
              <label
                class="text-gray-800 font-semibold block my-3 text-md"
                for="কয়েকটি প্রডাক্ট এর নাম "
              >
                প্রোডাক্ট সেম্পল ছবি ১
              </label>
              <input
                class="block w-full mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                id="default_size"
                type="file"
                onChange={handleImage1Change}
              />
            </div>
            <div>
              <label
                class="text-gray-800 font-semibold block my-3 text-md"
                for="কয়েকটি প্রডাক্ট এর নাম "
              >
                প্রোডাক্ট সেম্পল ছবি ২
              </label>
              <input
                class="block w-full mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                id="default_size"
                type="file"
                onChange={handleImage2Change}
              />
            </div>
            <div>
              <label
                class="text-gray-800 font-semibold block my-3 text-md"
                for="কয়েকটি প্রডাক্ট এর নাম "
              >
                প্রোডাক্ট সেম্পল ছবি 3
              </label>
              <input
                class="block w-full mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                id="default_size"
                type="file"
                onChange={handleImage3Change}
              />
            </div>
            <div>
              <label
                class="text-gray-800 font-semibold block my-3 text-md"
                for="কয়েকটি প্রডাক্ট এর নাম "
              >
                প্রোডাক্ট সেম্পল ছবি 4
              </label>
              <input
                class="block w-full mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                id="default_size"
                type="file"
                onChange={handleImage4Change}
              />
            </div>

            <button
              type="submit"
              class="w-full mt-6 bg-orange-600 rounded-lg px-4 py-2 text-lg text-white tracking-wide font-semibold font-sans"
              disabled={submitting}
            >
              {submitting ? "Submitting..." : "আবেদন করুন"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Vendor;
