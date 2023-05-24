import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
function Login(props) {
  const [emailValues, setEmailValues] = useState("");
  const [password, setPassword] = useState("");
  const [loginUserData, setLoginUserData] = useState([]);
  const navigate = useNavigate();

  async function authUser(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", emailValues);
    formData.append("password", password);
    if(formData==null){
        alert("hey")
    }
    else{
        let res = await fetch(process.env.REACT_APP_LOGIN, {
            method: "POST",
            body: formData,
          });
          res = await res.json();
          // console.log(result.user);
          if (res.status == 200) {
            localStorage.setItem("CurrentUser", JSON.stringify(res.user));
            localStorage.setItem("token", res.access_token);
            props.setUserState(res.access_token);
            setLoginUserData([res.user]);
            navigate("/dashboard");
          }
      
          else{
              alert(res.error)
              setEmailValues("")
              setPassword("")
          }
        }
    }


  return (
    <>
      <section class="h-screen">
        <div
          className="flex items-center justify-center align-center lex xl:justify-center
  lg:justify-between  flex-wrap h-full g-4"
        >
          <div className="rounded-lg border-2 border-slate-100 divide-x-2 > * + *">
            <form>
              <div class="mb-6">
                <input
                  type="text"
                  required
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
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <div class="text-center lg:text-left mx-3 my-4">
                <button
                  type="button"
                  class="inline-block mt-2  px-5 py-2 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                  onClick={authUser}
                >
                  Login
                </button>
                <p class="text-sm font-semibold mt-2 pt-1 mb-0">
                  Don't have an account?
                  <Link to="/register">
                    <a class="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out">
                      Register
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

export default Login;
