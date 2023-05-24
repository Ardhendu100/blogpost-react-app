import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import CreateForm from '../Dashboard/CreateForm'
function Dashboard(props) {
  let {id}=useParams()
  const [userData,setUserData]=useState([])
  const [showModal, setShowModal] = useState(false);
  const [password, setpassword] = useState("");
  const [avatar, setAvatar] = useState("");
    let userDetails=JSON.parse(localStorage.getItem("CurrentUser")) 
 console.log(userDetails.avatar)
function UserDashboard(){
axios.get("http://127.0.0.1:8000/api/user_details/"+userDetails.id).then((res)=>{
  console.log(res.data)
  setUserData(res.data)
})
}
const updateProfile=async()=>{
const formData = new FormData();
formData.append("password", password);
formData.append("avatar", avatar);
let result = await fetch(
  "http://127.0.0.1:8000/api/update/" +userDetails.id + "?_method=PUT",
  {
    method: "POST",
    body: formData,
  }
);
setpassword("")
setAvatar("")
setShowModal(false)
UserDashboard();
}
useEffect(()=>{
  UserDashboard();
},[])
  return (
      <>
    <div className='Block border-4 rounded-md mt-5 h-70 bg-amber-300'>
      <div className='flex'>  
<img src={"http://127.0.0.1:8000/"+userData.avatar}

className='h-48 w-full object-cover md:h-full md:w-48  rounded-full  ml-5'>
</img>
<button class="inline-flex items-center justify-center w-10 h-10 mr-2 text-gray-700 transition-colors duration-150 bg-white rounded-full focus:shadow-outline hover:bg-gray-200" onClick={() => setShowModal(true)}>
  <svg class="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path></svg>
</button>
<div class="p-8 ml-14">
<h1 class="text-2xl text-indigo-500 font-semibold ml-5">Name : <span className='ml-1 font-mono'>{userData.name}</span></h1>
<h1 class="text-2xl text-indigo-500 font-semibold ml-5 mt-2">Email : <span className='ml-1 font-mono'>{userData.email}</span></h1>

</div>
      </div>

    </div>
    {showModal ? (
        <>
          <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-3xl font=semibold">Update form</h3>
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
                      Enter New Password
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-1 text-black" 
                    type="password"
                    value={password}
                    onChange={(e) => setpassword(e.target.value)}
                    />
                    <label class="block text-black text-sm font-bold mb-1">Update Profile Pic
                      <input
                        type="file"
                        class="block w-full text-sm text-slate-500
file:mr-4 file:py-2 file:px-4
file:rounded-full file:border-0
file:text-sm file:font-semibold
file:bg-blue-50 file:text-blue-700
hover:file:bg-violet-100  my-3
"
                        onChange={(e) => setAvatar(e.target.files[0])}
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
                    onClick={updateProfile}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    <CreateForm currentUser={props.currentUser} allCategory={props.allCategory} category={props.category}/>
    </>
  )
}

export default Dashboard