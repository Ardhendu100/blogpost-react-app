import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import ShowPost from "../Post/ShowPost";
import { Link } from "react-router-dom";
function AllPost(props) {
  const [data, setData] = useState([]);
  const [allPost, setAllPost] = useState([]);
  const [showPostById, setShowPostById] = useState([]);
  const [clicked,setClicked]=useState(true)
 let currentUser=JSON.parse(props.currentUser)

  function getdata() {
    axios.get(process.env.REACT_APP_SHOW_CATEGORY).then((res) => {
      setData([...res.data]);
     
    });
  }


  function getAllPost() {
    axios.get(process.env.REACT_APP_SHOW_ALL_POST).then((result) => {
      setAllPost([...result.data]);
      // console.log(allPost);
     setClicked(true)
    });
  }

  //showPostByCategory
  function showPostByCategory(categoryId) {
    // console.log(categoryId)
    axios
      .get(process.env.REACT_APP_SHOW_POST + categoryId)
      .then((res) => {
        let result = res.data;
        setShowPostById([...result]);
        setClicked(false)
      });
  }
  useEffect(() => {
    getdata();
    getAllPost()
  }, []);
  
  return (
    <>
      <div className="flex">
        <div className="w-60 h-screen bg-gray-800">
          <ul class="relative">
            <li class="relative">

              <Link to="/">
                <button
                  class="flex items-center py-4 px-6  overflow-hidden text-emerald-400 font-bold tracking-wider font-sans text-lg text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
                  data-mdb-ripple="true"
                  data-mdb-ripple-color="dark"
                  onClick={getAllPost}
                >
                  All Category
                </button>
              </Link>
            </li>
            {data &&
              data.map((elem) => (
                <li class="relative">
                  <button
                    class="flex items-center  py-4 px-6 h-12 overflow-hidden 
      text-emerald-400 font-bold tracking-wider 
      font-sans text-lg text-ellipsis whitespace-nowrap rounded
       hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="dark"
                    onClick={() => showPostByCategory(elem.id)}
                  >
                    {elem.name}
                  </button>
                </li>
              ))}
          </ul>
        </div>
        <ShowPost clicked={clicked} setClicked={setClicked} showPostById={showPostById}
        allPost={allPost}  data={data} currentUser={currentUser}
        />









      </div>
    </>
  );
}

export default AllPost;
