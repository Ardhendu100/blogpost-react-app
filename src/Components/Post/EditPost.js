import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
function EditPost(props) {
  const { id } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const[image,setImage]=useState("");
const updatePost=async ()=>{
    let user=JSON.parse(props.currentUser)
    console.log(user.id)
    console.log(props.post_id)
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("user_id",user.id)
    console.log(formData)
    let result = await fetch(
        process.env.REACT_APP_UPDATE_POST + props.post_id + "?_method=PUT",
        {
          method: "POST",
          body: formData,
        }
      );
      result = await result.json();
      console.log(result);
      setDescription('')
      setTitle('')
      setImage("")

    setShowModal(false)
    viewUpdatePost();
}
function viewUpdatePost(){
    props.viewPost();
}
  return (
    <>
      <button
        type="button"
        class="inline-block px-6 h-9 ml-5 py-2.5 bg-blue-600
text-white font-medium text-xs leading-tight uppercase 
rounded shadow-md hover:bg-green-800 hover:shadow-lg focus:bg-blue-700 
focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 
active:shadow-lg transition duration-150 ease-in-out"
        onClick={() => setShowModal(true)}
      >
        Edit
      </button>
      {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font=semibold">Enter Post Details</h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                      x
                    </span>
                  </button>
                </div>
                <div className="relative p-6 flex-auto">
                  <form className="bg-gray-200 shadow-md rounded px-8 pt-6 pb-8 w-full">
                    <label className="block text-black text-sm font-bold mb-1">
                      Title
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" 
                    
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    />
                    <label className="block text-black text-sm font-bold mb-1">
                      Description
                    </label>
                    <textarea className="shadow appearance-none border rounded w-full py-2 px-1 text-black" 
                     value={description}
                     onChange={(e) => setDescription(e.target.value)}
                    
                    />
                    <label class="block text-black text-sm font-bold mb-1">
                      <input
                        type="file"
                        class="block w-full text-sm text-slate-500
file:mr-4 file:py-2 file:px-4
file:rounded-full file:border-0
file:text-sm file:font-semibold
file:bg-blue-50 file:text-blue-700
hover:file:bg-violet-100  my-3
"
                        onChange={(e) => setImage(e.target.files[0])}
                      />
                    </label>
                  </form>
                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-blueGray-200 rounded-b">
                  <button
                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </button>
                  <button
                    className="text-white bg-green-500 active:bg-yellow-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={updatePost}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
}

export default EditPost;
