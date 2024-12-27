import React from "react";
import { useState } from "react";
import './App1.css'

const Crud=()=>{
    const [inputData,setInputData]=useState({
        fname:"",
        lname:"",
        email:"",
        password:""


    });
    const [saveData,setSaveData]=useState([]);
    const handleInput=(e)=>{
        console.log(e.target.value)
        setInputData({...inputData,[e.target.name]:e.target.value})

    };
    const[isEdit,setIsEdit]=useState(false);
    const[editIndex,setEditIndex]=useState();
    const handleEdit=(index)=>{
        console.log(index);
        setIsEdit(true);
        setEditIndex(index);
        setInputData(saveData[index])

    }
    const handleSubmit=(e)=>{
        e.preventDefault();
        if (isEdit) {
            const tempArray=saveData.map((data,index)=>{
                return index=== editIndex? inputData :data
            })
            setSaveData(tempArray)
            
        } else {
            setSaveData([...saveData,inputData]);
        
        console.log(inputData)

        }
        setInputData({
            fname:"",
            lname:"",
        email:"",
        password:""
        })
        setIsEdit(false);
        setEditIndex();
       
        
    };
    const handleDelete=(index)=>{
        console.log(index);
        const tempArray=[...saveData]
        tempArray.splice(index)
        setSaveData(tempArray);

    }
    return(
<>
<div className="container">
    <h3>Crud Application</h3>
    <form>
    <div className="mb-3">
   <input 
   type="text" 
   name="fname" 
   placeholder="First name"
   value={inputData.fname}
   className="form-control" 
   onChange={handleInput}
   />
  </div>
  
  <div className="mb-3">
   <input 
   type="text" 
   name="lname" 
   placeholder="Last name"
   value={inputData.lname}
   className="form-control" 
   onChange={handleInput}
   />
  </div>
  <div className="mb-3">
   <input 
   type="text" 
   name="email" 
   placeholder="Email"
   value={inputData.email}
   className="form-control" 
   onChange={handleInput}
   />
  </div>
  <div className="mb-3">
   <input 
   type="text" 
   name="password" 
   placeholder="Password"
   value={inputData.password}
   className="form-control" 
   onChange={handleInput}
   />
  </div>
  <button 
  type="submit"
  onClick={handleSubmit}
  className="btn btn-primary ml-5"
  >Submit</button>
    </form>
    <div className="table">
   
<table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">S.No</th>
      <th scope="col">First</th>
      <th scope="col">Last</th>
      <th scope="col">Email</th>
      <th scope="col">Password</th>
      <th scope="col">Edit</th>
      <th scope="col">Delete</th>
    </tr>
  </thead>
  <tbody>
    {saveData.map((data,index)=>{
        return <tr>
         <th scope="row">{index+1}</th>
         <td>{data.fname}</td>
         <td>{data.lname}</td>
         <td>{data.email}</td>
         <td>{data.password}</td>
         <td><button className="btn btn-success" type="submit" onClick={()=>handleEdit(index)}>Edit</button></td>
         <td><button className="btn btn-danger" type="submit" onClick={()=>handleDelete(index)}>Delete</button></td>
         
   
       </tr>

    })}
   
   
  </tbody>
</table>
    </div>

</div>

</>
    )
}

export default Crud