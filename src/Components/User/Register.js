import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
function Register() {
  const [userName, setuserName] = useState("");
  const [emailValues, setEmailValues] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState("");
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  async function addUser(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", userName);
    formData.append("email", emailValues);
    formData.append("password", password);
    formData.append("avatar", avatar);

    let result = await fetch(process.env.REACT_APP_REGISTER, {
      method: "POST",
      body: formData,
    });
    result = await result.json();
    console.log(result);

    navigate("/login");
    console.log(result.user);
    let message = result.message;
    console.log(message);
  }
  return (
    <>
      <section class="h-screen">
        {/* <div
          classname="block m-8"
        >
          <img
            class="h-16 w-16 object-cover rounded-full align-center"
            src="https://www.pngkey.com/png/full/125-1253311_you-can-also-register-online-registration-png.png"
          />
          <h2>Register Here!!!</h2>
        </div> */}
        <div
          className="flex item-center justify-center align-center lex xl:justify-center
  lg:justify-between  items-center flex-wrap h-full g-4"
        >
          <div className="rounded-lg border-2 border-slate-100 divide-x-2 > * + *">
            <form>
              <div class="mb-6">
                <input
                  type="text"
                  class="form-control block w-half px-4 py-2 
                  text-xl font-normal text-gray-700 bg-white bg-clip-padding 
              border border-solid border-gray-300 rounded
               transition ease-in-out m-0 focus:text-gray-700 
               focus:bg-white focus:border-blue-600 focus:outline-none mx-3 my-3 mt-3"
                  id="exampleFormControlInput2"
                  placeholder="Enter Your Name"
                  value={userName}
                  onChange={(e) => setuserName(e.target.value)}
                />
              </div>

              <div class="mb-6">
                <input
                  type="text"
                  class="form-control block w-half px-4 py-2
                   text-xl font-normal text-gray-700 bg-white
                    bg-clip-padding border border-solid 
                    border-gray-300 rounded transition 
                    ease-in-out m-0 focus:text-gray-700 
                    focus:bg-white focus:border-blue-600 focus:outline-none mx-3 my-3"
                  id="exampleFormControlInput2"
                  placeholder="Email address"
                  value={emailValues}
                  onChange={(e) => setEmailValues(e.target.value)}
                />
              </div>

              <div class="mb-6">
                <input
                  type="password"
                  class="form-control block w-half px-4 py-2 text-xl 
                  font-normal text-gray-700 bg-white bg-clip-padding border border-solid
                   border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 
                   focus:bg-white focus:border-blue-600 focus:outline-none mx-3 my-3"
                  id="exampleFormControlInput2"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <label class="flex mx-3 py-1">
                <img
                  class="h-16 w-16 object-cover rounded-full"
                  src="https://cdn2.vectorstock.com/i/1000x1000/20/76/man-avatar-profile-vector-21372076.jpg"
                  alt="Current profile photo"
                />
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
              <div class="text-center lg:text-left mx-3 my-4">
                <button
                  type="button"
                  class="inline-block mt-2  px-5 py-2 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  onClick={addUser}
                >
                  Register
                </button>
                <p class="text-sm font-semibold mt-2 pt-1 mb-0">
                  Already have an account?
                  <Link to="/login">
                    <a class="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out">
                      Login
                    </a>
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}

export default Register;
