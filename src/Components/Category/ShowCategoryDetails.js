import React from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import ShowPostByCategory from "./ShowPostByCategory";
function ShowCategoryDetails() {
  const { id } = useParams();
  const [category_Details, setCategory_Details] = useState([]);
const [category,setcategory]=useState([])
  const categoryDetails = async() => {
    console.log(id)
    await axios
      .get(process.env.REACT_APP_SHOW_CATEGORY_DETAILS+id)
      .then((res) => {
        setCategory_Details(res.data);
      });
  };

  // console.log(category_Details)
  // async function categoryDetails(){

  //   await axios
  //   .get("http://127.0.0.1:8000/api/show_category_details/" + id)
  //   .then((res) => {

  //     let result=res.data
  //     console.log(result)
  //     setCategory_Details([result]);
  //     // console.log(postDetails[0].post_details.id);
  //     console.log(category_Details)

  //   });
  // }

  useEffect(() => {
    categoryDetails();
  }, []);
  // console.log(category_Details.category.name);

  return (
    <>
      {/* <div class="flex h-screen py-12 bg-green-200">
    <div className="container ">
      <div
        class="items-center"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div class="max-w-sm rounded overflow-hidden shadow-lg bg-yellow-300">
          <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2 ">{category_Details.category_details.name}</div>
             <p class="text-gray-700 text-base">
                          {category_Details.author}
                        </p>
            <div className="ml-0">
          
            <div class="text-sm mb-2 mt-5 ml-0 italic hover:not-italic">Created_at:{category_Details.category_details.created_at}</div>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>     */}
{category_Details ?
(
<div className="container bg-green-200 h-screen py-12">
<div
  className="items-center"
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  }}
>
  <div className="max-w-sm rounded overflow-hidden shadow-lg bg-yellow-300">
    <div className="px-6 py-4">
      {/* <div className="font-bold text-xl mb-2">
        {category_Details.category_details.name}
      </div> */}
      <p className="text-gray-700 text-base">Created_By:{category_Details.author}</p>
      {/* <div class="text-sm mb-2 mt-5 ml-0 italic hover:not-italic">
        Created_at:{category_Details.category_details.created_at}
      </div> */}
    </div>
  </div>
</div>
<ShowPostByCategory id={id}/>
</div>

):
<div></div>
}

    </>
  );
}

export default ShowCategoryDetails;
