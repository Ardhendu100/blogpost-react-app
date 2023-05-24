import React from "react";
import { Link } from "react-router-dom";
function Navbar(props) {
  let currentUser=JSON.parse(props.currentUser)
  console.log(currentUser.id)
  return (
    <>
  
      <nav class="flex items-center justify-between flex-wrap bg-gray-800 p-6" >
        <div class="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div class="text-sm lg:flex-grow">
            <Link to="/">
              <a
                class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 
              hover:text-white mr-4 font-serif text-lg antialiased 
              font-bold  decoration-white whitespace-normal"
              >
                AllPost
              </a>
            </Link>
            <Link to="/dashboard">
              <a
                href="#responsive-header"
                class="block mt-4 lg:inline-block lg:mt-0 text-teal-200 
              hover:text-white mr-4 font-serif text-lg antialiased
               font-bold  decoration-white whitespace-normal"
              >
                Dashboard
              </a>
            </Link>
          </div>
          {props.userState == null ? (
            <div>
              <Link to="/register">
                <a
                  href="#"
                  class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
                >
                  Register
                </a>
              </Link>

              <Link to="/login">
                <a
                  href="#"
                  class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0 mx-4"
                >
                  Login
                </a>
              </Link>
            </div>
          ) : (
            <div>
              <Link to="/logout">
                <a
                  href="#"
                  class="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0 mx-4"
                >
                  Logout
                </a>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
