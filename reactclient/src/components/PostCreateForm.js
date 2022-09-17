import React,{useState} from 'react';
import Constants from '../utilities/Constants';
export default function PostCreateForm(props) {
      const initialFormData=Object.freeze({
        title:"Post x",
        content:"this is post x"
    });
    const [formData, setFormData]=useState(initialFormData);
  
    const handleChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value,
        });
    };
    const handleSubmit=(e)=>{
        e.preventDefault();
        const postToCreate={
            postId:0,
            title:formData.title,
            content:formData.content
        };

        const url=Constants.API_URL_CREATE_POST;
    
    fetch (url,{
      method:'POST',
      headers:{
          'Content-Type':'application/json'
      },
      body:JSON.stringify(postToCreate)
    })
    .then(response => response.json())
    .then(responseFromServer =>{
      console.log(responseFromServer);
    })
    .catch((err)=> {
      console.log(err);
      alert(err);
    });
props.onPostCreated(postToCreate);
    };

    return (
        
            <form className="w-100 px-5">
                <h1 className="mt-5"> Create New Post</h1>
                <div className="mt-5">
                    <label className="h3 form-label">Post Title</label>
                    <input className="form-control" value={formData.title} name="title" type="text" onChange={handleChange}/>
                </div>

               <div className="mt-4">
                    <label className="h3 form-label">Post Content</label>
                    <input className="form-control" value={formData.content} name="content" type="text" onChange={handleChange}/>
                </div>

                <button onClick={handleSubmit} className="btn btn-lg btn-dark w-100 mt-5"> Submit</button>
                <button onClick={()=>props.onPostCreated(null)} className="btn btn-lg btn-secondary w-100 mt-3"> cancel</button>

            </form>
     
    )
}
