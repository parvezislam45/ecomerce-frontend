import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";
import { Link } from "react-router-dom";
import MyProductDetails from "./MyProductDetails";

const MyRole = () => {
  const [user] = useAuthState(auth);
  const [posts, setPosts] = useState([]);
  console.log(posts);

  useEffect(() => {
    if (user && user.email) {
      // Check if user object and its email property are not null
      fetch(`http://localhost:7000/product/user/${user.email}`)
        .then((res) => res.json())
        .then((data) => setPosts(data));
    }
  }, [user]);

  return (
    <div>
      
      <Link to="/vendor"><button className="btn btn-outline btn-secondary">Apply For Product</button></Link>

      <h1>Poste Product</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 mx-auto gap-5">
      {posts.map((post) => (
              <MyProductDetails key={post._id} post={post}/>
            ))}
      </div>
     
    </div>
  );
};

export default MyRole;
