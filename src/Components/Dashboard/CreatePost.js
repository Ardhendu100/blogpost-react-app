import React from 'react'
import axios from 'axios'
import { useState,useEffect } from 'react'
import { Link } from 'react-router-dom'
function CreatePost(props) {

  const [data, setData] = useState([]);
  const[selectCategory,setSelectCategory]=useState('')
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const[image,setImage]=useState("");
  function getdata() {
    axios.get(process.env.REACT_APP_SHOW_CATEGORY).then((res) => {
      setData([...res.data]);
     
    });
  }

async function addPost(e){
  e.preventDefault();
  let user=JSON.parse(props.currentUser)
  console.log(user.id)
    const formData = new FormData();
    if(title){
      formData.append("title", title);
    }
    else{

    }
   
    formData.append("description", description);
    formData.append("image", image);
    formData.append("user_id",user.id)
    console.log(formData)
    if(formData.length === null){
      alert("Please fill the data")
    }
    else{
      console.log("null")
    }
    let result = await fetch(process.env.REACT_APP_CREATE_POST+selectCategory, {
      method: "POST",
      body: formData,
    });
    result = await result.json();
    console.log(result);
    setDescription('')
    setTitle('')
    setImage("")
    setSelectCategory("")
}


// console.log(selectCategory)

  useEffect(() => {
    getdata();
  }, []);

  return (
    <>

<div className="container mx-auto px-2 ">
    {props.clicked == true ? (
      <div className="flex">
        <div
          class="p-10 grid grid-cols-1 sm:grid-cols-1 md:grid-cols-3 
      lg:grid-cols-3 xl:grid-cols-3 gap-5"
        >
          {props.allData.map((elem) => (
            <div>
            <div class="max-w-sm rounded shadow-lg bg-white">
              <img
                class="w-full"
                src={"http://localhost:8000/" + elem.image}
              />
              <div class="px-6 py-4">
                <div class="font-bold text-xl mb-2">
                  {elem.title}
                </div>
              </div>
              <Link to={"/post/" + elem.id}>
                <button
                  class="w-full bg-gray-800 hover:bg-blue-700 text-white 
             font-bold py-2 px-4 border border-blue-700 rounded mb-0"
                  // onClick={() => viewPost(elem.id)}
                >
                  View Post
                </button>
              </Link>
           
            </div>
            </div>
          ))}
        </div>
      </div>
    ) : (
    <section className='flex flex-row justify-center align-center'>
      <div
        className="flex item-center justify-center align-center lex xl:justify-center
lg:justify-between  items-center flex-wrap h-full g-4 mt-7 bg-yellow-200"
      >
        <div className="rounded-lg border-2 border-slate-100 divide-x-2 > * + *">

          <form>

          <div class="mb-6 p-3">
          <select
          value={selectCategory}
                      onChange={(e)=>setSelectCategory(e.target.value)} 
                      className="black w-full border-gray-100 focus:border-gray-400 border-2 px-4 py-2 rounded-lg bg-gray-200 focus:outline-none "
                    >
                      <option value="">Choose Category</option>
                      {data.map((item, index) => {
                        return (
                          <>
                            <option value={item.id} key={index}>
                              {item.name}
                            </option>
                          </>
                        );
                      })}
                    </select>
</div>

            <div class=" mb-6" style={{}}>
              <input
                type="text"
                class="form-control block w-half px-4 py-2 
            text-lg font-normal text-gray-700 bg-white bg-clip-padding 
        border border-solid border-gray-300 rounded
         transition ease-in-out m-0 focus:text-gray-700 
         focus:bg-white focus:border-blue-600 focus:outline-none mx-3 my-3 mt-3"
                id="exampleFormControlInput2"
                placeholder="Enter Post Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div class="mb-6">
              <textarea
                type="text"
                class="form-control block w-half px-4 py-2 
             text-lg font-normal text-gray-700 bg-white
              bg-clip-padding border border-solid 
              border-gray-300 rounded transition 
              ease-in-out m-0 focus:text-gray-700 
              focus:bg-white focus:border-blue-600 focus:outline-none mx-3 my-3"
                id="exampleFormControlInput2"
                placeholder="Enter Post Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                style={{height:'5rem'}}
              />
            </div>
         

            <label class="flex mx-3 py-1">
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
            <div class="text-center lg:text-left mx-3 my-4">
              <button
                type="button"
                class="inline-block mt-2  px-5 py-2 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                onClick={addPost}
              >
                Post
              </button>
            </div>
          </form>
        </div>
        </div>
      </section>
    )}
  </div>

  </>
  )
}

export default CreatePost