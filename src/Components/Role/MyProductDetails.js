import React from 'react';
import { Link } from 'react-router-dom';

const MyProductDetails = ({post}) => {
    const {_id,name,email,price}=post
    return (
        <div>
            <div class="flex flex-col rounded-lg bg-white sm:flex-row">
        <img class="m-2 h-24 w-28 rounded-md border object-cover object-center" src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60" alt="" />
        <div class="flex w-full flex-col px-4 py-4">
          <span class="font-semibold">Nike Air Max Pro 8888 - Super Light</span>
          <span class="float-right text-gray-400">42EU - 8.5US</span>
          <p class="text-lg font-bold">$138.99</p>
        </div>
        <Link to={`/update/${_id}`}>
          <button class="btn btn-xs">Update</button>
        </Link>
      </div>
        </div>
       
    );
};

export default MyProductDetails;