import React from "react";
import { useEffect, useState } from "react";
import axios from "axios"
import CreatePost from "./CreatePost";
import CreateCategory from "./CreateCategory";
import { Link } from "react-router-dom";
function CreateForm(props) {
  const [allData, setAllData] = useState([]);
  const [clicked, setClicked] = useState(false);
  const [categoryClicked, setCategoryClicked] = useState(true);
  const [postClicked, setpostClicked] = useState(false);
  const [show, setShow] = useState(true);
  const [category, setCategory] = useState([]);
  useEffect(() => {
    showAllData();
    setClicked(false);
  }, []);

  function enableCategory() {
    setCategoryClicked(true);
    setpostClicked(false);
    setClicked(false);
  }
  function enablePost() {
    setCategoryClicked(false);
    setpostClicked(true);
    setClicked(false);
  }
  function showAllData() {
    if (categoryClicked) {
      setAllData([]);
      axios.get(process.env.REACT_APP_SHOW_CATEGORY).then((res) => {
        setAllData([...res.data]);
        setClicked(true);
        setpostClicked(false);
      });
    } else if (postClicked) {
      setAllData([]);
      axios.get(process.env.REACT_APP_SHOW_ALL_POST).then((res) => {
        setAllData([...res.data]);
        setClicked(true);
        setCategoryClicked(false);
      });
    }
  }
  function showAddForm() {
    setClicked(false);
  }

 
  return (
    <>
      <div className="flex justify-center mt-10">
        <div class="inline-flex rounded-md shadow-sm" role="group">
          {categoryClicked==true?(
            <button 
            type="button"
            class="py-2 px-4 text-sm font-medium bg-text-white-900 bg-gray-900 rounded-l-lg border border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
            onClick={enableCategory}
          >
            Category
          </button>
          ):
          (
<button 
            type="button"
            class="py-2 px-4 text-sm font-medium text-gray-900 bg-text-gray-900 rounded-l-lg border border-gray-900 hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
            onClick={enableCategory}
          >
            Category
          </button>
          )
          
        }
          
          <button
            type="button"
            class="py-2 px-4 text-sm font-medium text-gray-900 bg-transparent 
            rounded-r-md border border-gray-900 hover:bg-gray-900
            hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700"
            onClick={enablePost}
          >
            Post
          </button>
        </div>
      </div>

      <div class="inline-flex  mt-10">
        <div className="flex">
          <div className="container">
            <div className="flex">
              <div className="w-30 h-30 bg-gray-800 ml-10">
                <ul>
                  <li>
                    <button
                      class="flex items-center py-4 px-6  overflow-hidden text-emerald-400 font-bold tracking-wider font-sans text-lg text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
                      data-mdb-ripple="true"
                      data-mdb-ripple-color="dark"
                      onClick={showAddForm}
                    >
                      Create
                    </button>
                  </li>
                  <li class="relative">
                    <button
                      class="flex items-center py-4 px-6  overflow-hidden text-emerald-400 font-bold tracking-wider font-sans text-lg text-ellipsis whitespace-nowrap rounded hover:text-gray-900 hover:bg-gray-100 transition duration-300 ease-in-out"
                      data-mdb-ripple="true"
                      data-mdb-ripple-color="dark"
                      onClick={showAllData}
                    >
                      Show All
                    </button>
                  </li>
                </ul>
              </div>
              
            </div>
            {categoryClicked && show ? (
             <CreateCategory clicked={clicked} allData={allData} category={category} setCategory={setCategory} currentUser={props.currentUser} showAllData={showAllData}/>
            ) : (
            <CreatePost  clicked={clicked} allData={allData} currentUser={props.currentUser} category={props.category} showAllData={showAllData}/>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateForm;
