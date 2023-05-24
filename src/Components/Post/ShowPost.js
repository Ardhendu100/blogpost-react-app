import React from "react";
import { Link, useNavigate } from "react-router-dom";

function ShowPost(props) {
let navigate=useNavigate();
    function viewPost(id){
        navigate('/post')
        console.log(props.currentuser.id)
  
    }
  return (
    <>
      {props.clicked == false ? (
        <div className="container px-6">
          <div className=" flex">
            <div className="mt-20 ml-96" >
              {props.showPostById.map((elem) => (
                <div class="max-w-sm rounded overflow-hidden shadow-lg">
                  <img
                    class="w-full"
                    src={"http://localhost:8000/" + elem.image}
                  />
                  <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2">{elem.title}</div>
                  </div>
                  
                  <Link to={"/post/"+elem.id}>
                  <button
                    class="w-full  bg-gray-800 hover:bg-blue-700 text-white 
                    font-bold py-2 px-4 border border-blue-700 rounded mb-0"
                    onClick={() => viewPost(elem.id)}>
                    View Post
                  </button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="container px-6 mt-5">
          <div class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-5">
            {props.allPost &&
              props.allPost.map((elem) => (
                <div class="max-w-sm rounded overflow-hidden shadow-lg">
                  <img
                    class="w-full h-22"
                    src={"http://localhost:8000/" + elem.image}
                  />
                  <div class="px-6 py-4">
                    <div class="font-bold text-xl mb-2">{elem.title}</div>
                  </div>
<Link to={"/post/"+elem.id}>
                  <button
                    class="w-full bg-gray-800 hover:bg-blue-700 text-white font-bold py-2 
                        px-4 border border-blue-700 rounded mb-0"
            
                  >
                    View Post
                  </button>
                  </Link>
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  );
}

export default ShowPost;
