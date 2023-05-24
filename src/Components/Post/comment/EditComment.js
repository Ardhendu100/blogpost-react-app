import React from 'react'
import { useState,useEffect } from 'react'
function EditComment(props) {
async function editComment(){
    console.log(props.data.id)
    props.setComment(props.data.text)
    console.log(props.data.text)
    props.setPostClicked(false)
    props.setCommentId(props.data.id)
   
}
  return (
    <button
    type="button"
    class="inline-block px-6 h-9 ml-5 py-2.5 bg-blue-600
 text-white font-medium text-xs leading-tight uppercase 
 rounded shadow-md hover:bg-green-800 hover:shadow-lg focus:bg-blue-700 
 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 
 active:shadow-lg transition duration-150 ease-in-out"
    onClick={() => editComment()}
  >
   Edit
  </button>
  )
}

export default EditComment