import axios from "axios";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
function CreateCategory(props) {
  let currentUser = JSON.parse(props.currentUser);

  async function addCategory(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", props.category);
    console.log(formData);
    let currentUser = JSON.parse(props.currentUser);
    // console.log(currentUser);
    let result = await fetch(
     process.env.REACT_APP_CREATE_CATEGORY+ currentUser.id,
      {
        method: "POST",
        body: formData,
      }
    );
    result = await result.json();
  console.log(result)
    if(result.error){
      alert(result.error)
    }
   
    props.setCategory([]);
  }


async function deleteCategory(id){

  // axios.delete("http://127.0.0.1:8000/api/delete_category/"+id).then((res)=>{

  // })
  let result = await fetch(process.env.REACT_APP_DELETE_CATEGORY+id, {
    method: "DELETE",
  });
  window.confirm("Do you really want to delete this Category?")
  result = await result.json();
  console.log(result)
  if(result.Error){
    alert(result.Error)
  }
  showAllCategory();

}
function showAllCategory(){
  props.showAllData();
}

  return (
    <div className="flex justify-center ">
      {props.clicked == true ? (
        <div className="flex justify-center">
          <div class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 gap-5">
            {props.allData.map((elem) => (
              <div>
                <div
                  className="container py-6 mx-10 bg-red-300 hover:bg-gray-900
            hover:text-white focus:z-10"
                >
                  <div class="font-bold text-xl mb-2 ml-5">{elem.name}</div>
                  {elem.user_id == currentUser.id ? (
                    <div className="flex justify-center">
                      <button class="h-10 px-5 m-2 text-red-100 transition-colors 
                      duration-150 bg-red-700 rounded-lg focus:shadow-outline
                       hover:bg-red-800" onClick={(e)=>deleteCategory(elem.id)}>
                        Delete
                      </button>
                      <Link to={"/category/" + elem.id}>
                        <button class="h-10 px-5 m-2 text-blue-100 transition-colors duration-150 bg-blue-600 rounded-lg focus:shadow-outline hover:bg-blue-700">
                          View
                        </button>
                      </Link>
                    </div>
                  ) : (
                    <div className="flex justify-center">
                      <Link to={"/category/" + elem.id}>
                        <button class="h-10 px-5 m-2 text-blue-100 transition-colors duration-150 bg-blue-600 rounded-lg focus:shadow-outline hover:bg-blue-700">
                          View
                        </button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        
        <div className="flex justify-center">
          <div className="container py-6 mx-10">
            <div className="flex justify-center ML-5">
              <div class="flex justify-center mb-3 xl:w-80 ml-10">
                <input
                  type="text"
                  class="
form-control
block
w-full
px-3
py-1.5
text-base
font-normal
text-gray-700
bg-white bg-clip-padding
border border-solid border-gray-300
rounded
transition
ease-in-out
m-0
focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none
"
                  id="exampleFormControlInput1"
                  placeholder="Create a category"
                  value={props.category}
                  onChange={(e) => props.setCategory(e.target.value)}
                />
              </div>

              <div class="flex space-x-2 justify-center">
                <button
                  type="button"
                  onClick={(e) => addCategory(e)}
                  class="inline-block px-6 h-9 ml-2 py-2.5 bg-blue-600
text-white font-medium text-xs leading-tight uppercase 
rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 
focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 
active:shadow-lg transition duration-150 ease-in-out"
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CreateCategory;
