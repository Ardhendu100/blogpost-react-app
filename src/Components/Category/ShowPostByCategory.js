import React from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useState, useEffect } from "react";
function ShowPostByCategory(props) {
    const [showPost, setShowPost] = useState([]);
      //showPostByCategory
  function showPostByCategory() {
    console.log(props.id)
    axios
      .get(process.env.REACT_APP_SHOW_POST+props.id)
      .then((res) => {
        let result = res.data;
        setShowPost([...result]);
      
      });
      
  }
  useEffect(() => {
    showPostByCategory();
  }, []);
  console.log(showPost)
  return (
    <>
    {
       showPost.map((elem)=>{
           
       }) 
    }
       <div className="container mx-auto px-6">
          <div className="flex">
            <div class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
              {showPost.map((elem) => (
                <div class="max-w-sm rounded overflow-hidden shadow-lg bg-white">
                  <img
                    class="w-full"
                    src={"http://localhost:8000/" + elem.image}
                  />
                  <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2">{elem.title}</div>
                  </div>
                  <Link to={"/post/"+elem.id}>
                  <button
                    class="w-full bg-gray-800 hover:bg-blue-700 text-white 
                    font-bold py-2 px-4 border border-blue-700 rounded mb-0"
                    // onClick={() => viewPost(elem.id)}
                    >
                    View Post
                  </button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
    
    </>
  )
}

export default ShowPostByCategory