import React from 'react'

function DeleteComment(props) {
    async function deletComment(id){
        console.log(props.data.id)
        let result=await fetch(process.env.REACT_APP_DELETE_COMMENT+props.data.id,{
          method:'DELETE'
        });
      result=await result.json();
    props.showComment();

      }
  return (
    <button
    type="button"
    class="inline-block px-6 h-9 ml-5 py-2.5 bg-red-600
 text-white font-medium text-xs leading-tight uppercase 
 rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 
 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 
 active:shadow-lg transition duration-150 ease-in-out"
    onClick={() => deletComment()}
  >
   Delete
  </button>
  )
}

export default DeleteComment