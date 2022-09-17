import React,{useState} from "react";
import Constants from "./utilities/Constants";
import PostCreateForm from "./components/PostCreateForm";
import PostUpdateForm from "./components/PostUpdateForm";

export default function App() {
  const [posts,setPosts]=useState([]);
  const [showForm,setShowForm]=useState(false);
  const [showUpdateform, setShowUpdateForm]=useState(null);

  function getPosts(){
    const url =Constants.API_URL_GET_ALL_POSTS;
    fetch (url,{
      method:'GET'
    })
    .then(response => response.json())
    .then(postsFromServer =>{
      // console.log(postsFromServer);
      setPosts(postsFromServer);
    })
    .catch((err)=> {
      console.log(err);
      alert(err);
    });
    
  }
  function deletePost(postId){
    const url =`${Constants.API_URL_DELETE_POST_BY_ID}/${postId}`;
    fetch (url,{
      method:'DELETE'
    })
    .then(response => response.json())
    .then(responseFromServer =>{
      // console.log(postsFromServer);
    console.log(responseFromServer);
    onPostDeleted(postId) ;
    })
    .catch((err)=> {
      console.log(err);
      alert(err);
    });

  }
  return (
    <div className="container">
    <div  className="row min-vh-100">
<div className="col d-flex flex-column justify-content-center align-items-center">
  {(showForm === false && showUpdateform === null ) && (
    <div>
    <h1> ASP.NET Core App</h1> 
<div className="mt-5">
<button className="btn btn-dark btn-lg w-100" onClick={getPosts}>Get Posts From Server </button>
<button className="btn btn-secondary btn-lg w-100 mt-4" onClick={()=>setShowForm(true)}>Create New Post</button>
</div>
</div>
  )}

  {(posts.length>0 && showForm === false && showUpdateform === null )&& renderPostsTable()}
{showForm && <PostCreateForm onPostCreated={onPostCreated}/> }
{showUpdateform !== null && <PostUpdateForm post={showUpdateform} onPostUpdated={onPostUpdated}/>}
  </div>
    </div>
    </div>
  );

  function renderPostsTable(){
    return (
      <div className="table-responsive mt-5">
        <table className="table table-bordered border-dark">
          <thead>
            <tr>
              <th scope="col"> PostId (PK)</th>
              <th scope="col"> Title </th>
              <th scope="col"> Content </th>
              <th scope="col"> Operations </th>
            </tr>
          </thead>
          <tbody>
 {posts.map((post)=> (
              <tr key={post.postId}>
              <th scope="col"> {post.postId} </th>
              <td> {post.title}</td>
              <td> {post.content}</td>
              <td>
<button onClick ={()=> setShowUpdateForm(post)} className="btn btn-dark btn-lg mx-3 my-3"> Update</button>    
<button onClick ={()=>{if (window.confirm(`Are you sure to delete this post titled "${post.title}"?`))deletePost(post.postId)}} className="btn btn-secondary btn-lg "> Delete</button>    
 </td>
            </tr>
 ))}
          </tbody>

        </table>
<button className="btn btn-dark btn-larg w-100" onClick={()=>setPosts([])}>Empty Posts Array </button>
      </div>
    )
  }

  function onPostCreated(createdPost){
    setShowForm(false);
if (createdPost===null){
  return;
}
alert(`Post Successfully created,your post title"${createdPost.title}"`);
getPosts();
  }

  function onPostUpdated(updatedPost){
    setShowUpdateForm(null);
    if (updatedPost=== null){
      return ;
    }
    let PostCopy=[...posts];
    const index=PostCopy.findIndex((postsCopyPost,currentIndex) => {
      if (postsCopyPost.postId === updatedPost.postId){
        return true;
      }
    });
    if (index!== -1){
      PostCopy[index]=updatedPost;
    }
setPosts(PostCopy);

alert (`Post Successfully Updated click ok to save`);
  }


  function onPostDeleted(deletedPostId){
    let PostCopy=[...posts];
    const index=PostCopy.findIndex((postsCopyPost,currentIndex) => {
      if (postsCopyPost.postId === deletedPostId.postId){
        return true;
      }
    });
    if (index!== -1){
      PostCopy.splice(index,1);
    }
// setPosts(PostCopy);
getPosts();
alert (`Post Successfully Deleted`);
  }
  }


