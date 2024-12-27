import { useState } from "react";
import '../App.css';

const Expense = () => {
    const [inputData, setInputData] = useState({
        description: "",
        date: "",
        price: "",
        category: "",
    });
    const [filterUser, setFilterUser] = useState(null);
    const [saveData, setSaveData] = useState([]);
    const [isEdit, setIsEdit] = useState(false);
    const [editIndex, setEditIndex] = useState();

    const handleInput = (e) => {
        setInputData({ ...inputData, [e.target.name]: e.target.value });
    };

    const handleEdit = (index) => {
        setIsEdit(true);
        setEditIndex(index);
        setInputData(saveData[index]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isEdit) {
            const tempArray = saveData.map((data, index) => {
                return index === editIndex ? inputData : data;
            });
            setSaveData(tempArray);
        } else {
            setSaveData([...saveData, inputData]);
        }

        setInputData({
            description: "",
            date: "",
            price: "",
            category: "",
        });
        setIsEdit(false);
        setEditIndex(null);
    };

    const handleDelete = (index) => {
        const tempArray = [...saveData];
        tempArray.splice(index, 1); // Fix the delete logic to remove only one item
        setSaveData(tempArray);
    };

    const handleSearch = (e) => {
        const searchText = e.target.value.toLowerCase();
        const filteredUser = saveData.filter((data) =>
            data.description.toLowerCase().includes(searchText) ||
            data.category.toLowerCase().includes(searchText)
        );
        setFilterUser(filteredUser.length > 0 ? filteredUser : null);
    };

    // Calculate Income, Expense, and Balance
    const calculateTotals = () => {
        let income = 0;
        let expense = 0;

        saveData.forEach((data) => {
            const price = parseFloat(data.price) || 0;
            if (price > 0) {
                expense += price;
            } else {
                expense += price; // Negative price for expenses
            }
        });

        const balance = income + expense;
        return { income, expense, balance };
    };

    const { income, expense, balance } = calculateTotals();

    return (
        <div className="container">
            <h3>Expense Tracker</h3>
            <form>
                <div className="mb-3">
                    <input
                        type="text"
                        name="description"
                        value={inputData.description}
                        onChange={handleInput}
                        placeholder="Description"
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="date"
                        name="date"
                        value={inputData.date}
                        onChange={handleInput}
                        placeholder="Date"
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="text"
                        name="price"
                        value={inputData.price}
                        onChange={handleInput}
                        placeholder="Price"
                    />
                </div>
                <div className="mb-3">
                    <select
                        name="category"
                        value={inputData.category}
                        onChange={handleInput}
                        placeholder="Category"
                    >
                        <option value="Food">Food</option>
                        <option value="Shopping">Shopping</option>
                        <option value="Travel expense">Travel expense</option>
                        <option value="Recharge">Recharge</option>
                        <option value="Health">Health</option>
                        <option value="Others">Others</option>
                    </select>
                </div>
                <div className="btn">
                    <button type="submit" onClick={handleSubmit}>
                        {isEdit ? "Update Record" : "Add New Record"}
                    </button>
                </div>
            </form>

            <ul className="d-flex">
                <li>Income: RS. {income.toFixed(2)}</li>
                <li>Expense: RS. {Math.abs(expense).toFixed(2)}</li>
                <li>Balance: RS. {balance.toFixed(2)}</li>
            </ul>

            <div className="search">
                <input
                    type="search"
                    placeholder="Search"
                    onChange={handleSearch}
                />
            </div>

            <div className="table">
                <table className="table table-striped">
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
                        {(filterUser || saveData).map((data, index) => (
                            <tr key={index}>
                                <th scope="row">{index + 1}</th>
                                <td>{data.description}</td>
                                <td>{data.date}</td>
                                <td>{data.price}</td>
                                <td>{data.category}</td>
                                <td>
                                    <button
                                        className="btn btn-success"
                                        type="button"
                                        onClick={() => handleEdit(index)}
                                    >
                                        Edit
                                    </button>
                                </td>
                                <td>
                                    <button
                                        className="btn btn-danger"
                                        type="button"
                                        onClick={() => handleDelete(index)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Expense;
