import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AddComment from "./comment/AddComment";
import EditPost from "./EditPost";
import { useNavigate } from "react-router-dom";
function ViewPost(props) {
  const [postDetails, setPostDetails] = useState([]);
  const [authorId, setAuthorId] = useState("");
  const { id } = useParams();
  let navigate=useNavigate();
  let currentUser = JSON.parse(props.currentUser);
  function viewPost() {
    axios
      .get(process.env.REACT_APP_SHOW_POST_DETAILS + id)
      .then((res) => {
        let result = res.data;

        setPostDetails([result]);

        console.log(result.post_details.user.id);
        setAuthorId(result.post_details.user.id)
      });
  }


const deletePost=async(id)=>{
console.log(id)
let result=await fetch(process.env.REACT_APP_DELETE_POST+id,{
  method:'DELETE'
});
result=await result.json();
navigate('/dashboard')
}


  useEffect(() => {
    viewPost();
  }, []);

  return (
    <>
      <center>
        <div
          className="box-content  w-30 mt-8
                border-4 bg-red-100 flex justify-center"
          style={{
            width: "600px",
            minHeight: "464px",
            overflow: "scroll",
            justifyContent: "center",
            display: "block",
            alignContent: "center",

            marginTop: "6rem",
          }}
        >
          {postDetails &&
            postDetails.map((elem) => (
              <div class="flex h-screen items-center py-12">
                <div className="container">
                  <div
                    class="items-center"
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div class="max-w-sm rounded overflow-hidden shadow-lg">
                      <img
                        class="w-full"
                        src={"http://localhost:8000/" + elem.post_details.image}
                      />
                      <div class="px-6 py-4">
                        <div class="font-bold text-xl mb-2">
                          {elem.post_details.title}
                        </div>
                        <p class="text-gray-700 text-base">
                          {elem.post_details.description}
                        </p>
                        <div className="ml-0">
                          {/* <div class="text-sm mb-2 mt-5 ml-0 italic hover:not-italic">Created_at: <span>{elem.created_at}</span></div> */}
                          <div class="text-sm mb-2 mt-5 ml-0 italic hover:not-italic">
                            Author:{elem.post_details.user.name}
                          </div>
                        </div>
                      </div>
                      {currentUser.id == elem.post_details.user.id ? (
                        <div className="flex mb-4 justify-center">
                          <EditPost
                            post_id={elem.post_details.id}
                            currentUser={props.currentUser}
                            viewPost={viewPost}
                          />
                          <button
                            type="button"
                            class="inline-block px-6 h-9 ml-5 py-2.5 bg-red-600
text-white font-medium text-xs leading-tight uppercase 
rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-red-600 
focus:shadow-lg focus:outline-none focus:ring-0 active:bg-red-600 
active:shadow-lg transition duration-150 ease-in-out"
onClick={() => deletePost(elem.post_details.id)}
                          >
                            Delete
                          </button>
                        </div>
                      ) : (
                        <div></div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          <AddComment
            currentUser={props.currentUser}
            author_id={authorId}
            postDetails={postDetails}
            viewPost={viewPost}
          />
        </div>
      </center>
    </>
  );
}

export default ViewPost;
