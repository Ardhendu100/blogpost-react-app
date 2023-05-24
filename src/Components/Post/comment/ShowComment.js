import React from "react";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import EditComment from "./EditComment";
import axios from "axios";
import DeleteComment from "./DeleteComment";
import { comment } from "postcss";
function ShowComment(props) {
  const [allComment, setAllComment] = useState([]);
  const [currentUser, setCurrentUser] = useState([]);
  const[data,setData]=useState([]);
  const { id } = useParams();
  let user=props.currentUser
  user=JSON.parse(user)   
  function showComment() {
    axios
      .get(process.env.REACT_APP_SHOW_POST_DETAILS + props.id)
      .then((res) => {
       
        let result = res.data.comment_details.comment;
  setAllComment([...result]);

        
      });
  }

  useEffect(() => {

    showComment();

  }, []);





  return (
    <>
      {allComment &&
        allComment.map((elem) => (
          <div className="flex bg-white p-4 m-4">
            <form class="flex items-center space-x-6">
              <div class="shrink-0">
                <img class="h-14 w-16 object-cover rounded-full" src={"http://localhost:8000/"+elem.user.avatar}/>
              </div>
              <label class="block">
                <div class="font-semi-bold text-lg mb-2">{elem.user.name}</div>
              <div class="font-semi-bold text-sm mb-2">{elem.user.email}</div>
                <div class="font-semi-bold text-sm mb-2">
                  comment: <span>{elem.text}</span>
                </div>
              </label>
            </form>
            {elem.user_id==user.id?(
       <div className="flex">
<EditComment  setComment={props.setComment} data={elem} 
comment={props.comment}
showComment={showComment}
setCommentId={props.setCommentId}
setPostClicked={props.setPostClicked}/>

<DeleteComment  setComment={props.setComment} data={elem} 
comment={props.comment}
showComment={showComment}

setPostClicked={props.setPostClicked}/>
       </div>       



            ):(
              <div></div>
            )
                     
          
          }
  
          </div>
        ))}
    </>
  );
}

export default ShowComment;
