import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EditComment from "./EditComment";
import DeleteComment from "./DeleteComment";
function AddComment(props) {
  const [comment, setComment] = useState("");
  const [postClicked, setPostClicked] = useState(true);
  const [userId, setuserId] = useState("");
  const [commentId, setCommentId] = useState("");
  const [allComment, setAllComment] = useState([]);
  const { id } = useParams();
  console.log(props.author_id);
  let user = props.currentUser;
  
  user = JSON.parse(user);
  function showComment() {
    axios.get(process.env.REACT_APP_SHOW_POST_DETAILS + id).then((res) => {
      console.log(res.data)
      let result = res.data.comment_details.comment;
      setAllComment([...result]);
    });
  }

  async function addComment() {
    setuserId("");
    setPostClicked(true);
    let currentUser = JSON.parse(props.currentUser);
    console.log(currentUser.id);
    const uploadItem = new FormData();
    uploadItem.append("text", comment);
    uploadItem.append("user_id", currentUser.id);
    let result = await fetch(process.env.REACT_APP_ADD_COMMENT + id, {
      method: "POST",
      body: uploadItem,
    });
    result = await result.json();
    console.log(result);
    // await axios.post("http://127.0.0.1:8000/api/add_user_comment/"+id,uploadItem).then((res)=>{
    //     console.log(res)
    // })

    setuserId(currentUser.id);
    setComment("");

    showComment();
  }

  async function updateComment() {
    console.log(commentId);
    setPostClicked(true);
    const formData = new FormData();
    formData.append("text", comment);
    let result = await fetch(
      process.env.REACT_APP_UPDATE_COMMENT + commentId + "?_method=PUT",
      {
        method: "POST",
        body: formData,
      }
    );

    setComment("");
    showComment();
  }
  useEffect(() => {
    showComment();
  }, []);

  return (
    <>
      <div className="flex justify-center">
        <div class="mb-3 xl:w-80 ">
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
            placeholder="Write a public comment...."
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
        </div>
        {postClicked === true ? (
          <div class="flex space-x-2 justify-center">
            <button
              type="button"
              class="inline-block px-6 h-9 ml-2 py-2.5 bg-blue-600
             text-white font-medium text-xs leading-tight uppercase 
             rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 
             focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 
             active:shadow-lg transition duration-150 ease-in-out"
              onClick={addComment}
            >
              Post
            </button>
          </div>
        ) : (
          <div class="flex space-x-2 justify-center">
            <button
              type="button"
              class="inline-block px-6 h-9 ml-2 py-2.5 bg-blue-600
           text-white font-medium text-xs leading-tight uppercase 
           rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 
           focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 
           active:shadow-lg transition duration-150 ease-in-out"
              onClick={updateComment}
            >
              Update
            </button>
          </div>
        )}

        <br></br>
      </div>
      {/* <ShowComment
        currentUser={props.currentUser}
        id={id}
        author_id={props.author_id}
        setComment={setComment}
        comment={comment}
        setPostClicked={setPostClicked}
        userId={userId}
        postClicked={postClicked}
        postDetails={props.postDetails}
        setCommentId={setCommentId}
      /> */}

      {allComment &&
        allComment.map((elem) => (
          <div className="flex bg-white p-4 m-4">
            <form class="flex items-center space-x-6">
              <div class="shrink-0">
                <img
                  class="h-14 w-16 object-cover rounded-full"
                  src={"http://localhost:8000/" + elem.user.avatar}
                />
              </div>
              <label class="block">
                <div class="font-semi-bold text-lg mb-2">{elem.user.name}</div>
                <div class="font-semi-bold text-sm mb-2">{elem.user.email}</div>
                <div class="font-semi-bold text-sm mb-2">
                  comment: <span>{elem.text}</span>
                </div>
              </label>
            </form>
            <p>hii</p>
{elem.user_id==props.author_id?
  <div className="flex">
<DeleteComment
                  setComment={props.setComment}
                  data={elem}
                  comment={props.comment}
                  showComment={showComment}
                  setPostClicked={props.setPostClicked}
                />
</div>
:
<>
            {elem.user_id == user.id ? (
              <div className="flex">
                <EditComment
                  setComment={setComment}
                  data={elem}
                  comment={props.comment}
                  showComment={showComment}
                  setCommentId={setCommentId}
                  setPostClicked={setPostClicked}
                />

                <DeleteComment
                  setComment={props.setComment}
                  data={elem}
                  comment={props.comment}
                  showComment={showComment}
                  setPostClicked={props.setPostClicked}
                />
              </div>
            ) : (
             
          <div></div>
        )
        
        }
           </>
}
          </div>
        ))}
    </>
  );
}

export default AddComment;
