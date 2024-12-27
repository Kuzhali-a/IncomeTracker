import { useState } from "react";
import './App.css'
import axios from "axios";

const IncomeTracker=()=>{
    const URL="http://localhost:9000/transaction";
    const[inputData, setInputData]=useState({
        description:"",
        date:"",
        price:"",
        category:""
    });
    const [searchInput, setSearchInput] = useState("");
    const[saveData,setSaveData]=useState([]);
    const handleInput=(e)=>{
        setInputData({...inputData,[e.target.name]:e.target.value});
        
    }
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
        fetchAPI();

        }
        
        setInputData({
            description:"",
            date:"",
            price:"",
            category:""
            
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
    const handleSearch = (e) => {
        setSearchInput(e.target.value); // Update search input dynamically
    };

    // Filter Data Based on Search Input
    const filteredData = saveData.filter((data) =>
        data.description.toLowerCase().includes(searchInput.toLowerCase()) ||
        data.category.toLowerCase().includes(searchInput.toLowerCase())
    );
    const calculateTotals = () => {
        let income = 0;
        let expense = 0;

        saveData.forEach((data) => {
            const price = parseFloat(data.price) || 0;
            if (price > 0) {
                income += price;
            } else {
                expense += price; // Negative price for expenses
            }
        });

        const balance = income + expense;
        return { income, expense, balance };
    };

    const { income, expense, balance } = calculateTotals();

    const fetchAPI = async () => {
        try {
          const response = await axios.post(URL, inputData);
          console.log('Data saved:', response.data);
        } catch (error) {
          console.error('Error saving data:', error.message);
        }
      };
      

    return(
        <div className="container">
            <h3>Expense Tracker</h3>
           <form action="#">
            <div className="mb-3">
                <input 
                type="text" 
                name="description" 
                value={inputData.description}
                onChange={handleInput}
                placeholder="Description" />
            </div>
            <div className="mb-3">
                <input 
                type="date" 
                name="date" 
                value={inputData.date}
                onChange={handleInput}
                placeholder="Date" />
            </div>
            <div className="mb-3">
                <input 
                type="text" 
                name="price" 
                value={inputData.price}
                onChange={handleInput}
                placeholder="Price" />
            </div>
            <div className="mb-3">
                <select name="category"
                value={inputData.category}
                onChange={handleInput}
                placeholder="Category"
                >
                    <option value="" disabled hidden>
        Select Category
    </option>
                    <option value="Food">Food</option>
                    <option value="Income">Income</option>
                    <option value="Bills">Bills</option>
                    <option value="Fun">Fun</option>
                    <option value="Rent">Rent</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Travel expense">Travel expense</option>
                    <option value="Recharge">Recharge</option>
                    <option value="Health">Health</option>
                    <option value="Others">Others</option>

                </select>
                {/* <input 
                type="text" 
                name="category" 
                value={inputData.category}
                onChange={handleInput}
                placeholder="Category" /> */}
            </div>
            <div className="btn">
                <button type="submit" onClick={handleSubmit}>Add New Record</button>
            </div>
           </form>
           <ul className="d-flex">
                <li>Income: RS. {income.toFixed(2)}</li>
                <li>Expense: RS. {Math.abs(expense).toFixed(2)}</li>
                <li>Balance: RS. {balance.toFixed(2)}</li>
            </ul>

           <div className="search">
            <input type="search" placeholder="Search"
            onChange={handleSearch} />
           </div>
           <div className="table">
   
<table class="table table-striped">
  <thead>
    <tr>
      <th scope="col">S.No</th>
      <th scope="col">Description</th>
      <th scope="col">Date</th>
      <th scope="col">Price</th>
      <th scope="col">Category</th>
      <th scope="col">Edit</th>
      <th scope="col">Delete</th>
    </tr>
  </thead>
  <tbody>
    {filteredData.map((data,index)=>{
        return <tr>
         <th scope="row">{index+1}</th>
         <td>{data.description}</td>
         <td>{data.date}</td>
         <td>{data.price}</td>
         <td>{data.category}</td>
         <td><button className="btn btn-success" type="submit" onClick={()=>handleEdit(index)}>Edit</button></td>
         <td><button className="btn btn-danger" type="submit" onClick={()=>handleDelete(index)}>Delete</button></td>
         
   
       </tr>

    })}
   
   
  </tbody>
</table>
    </div>

        </div>
    )
};
export default IncomeTracker