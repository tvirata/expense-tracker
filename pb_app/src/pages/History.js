import pb from "lib/pocketbase";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function PurchaseHist() {
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setLoading] = useState(false);
  const [dummy, reload] = useState(false);
  const [records, setRecords] = useState([]);
  const [total, setTotal] = useState(0);
  const [collec, setCollec] = useState("");

  useEffect(() => {
    // Convert total to a number and fix the decimal places
    setTotal(parseFloat(total).toFixed(2));
  }, [total]);

  useEffect(() => {
    setCollec(JSON.parse(localStorage.getItem("currentuser")));
  }, [view]);

  async function view() {
    // read

    setLoading(true);
    try {
      const itemRecords = await pb.collection(collec).getFullList({
        sort: "-created",
      });

      const results = itemRecords.map((record) => ({
        name: record.name,
        cost: record.cost,
      }));
      const totalCost = itemRecords.reduce((sum, item) => sum + item.cost, 0);

      setRecords(results);
      setTotal(totalCost);
    } catch (e) {
      console.log("ERROR FETCHING RECORDS: ", e);
      alert(e);
    }
    setLoading(false);
  }
  async function del(dname) {
    // delete
    setLoading(true);
    try {
      const findr = await pb
        .collection(collec)
        .getFirstListItem(`name="${dname}"`);
      console.log(findr.id);
      console.log(dname);
      await pb.collection(collec).delete(findr.id);
    } catch (e) {
      console.log("ERROR FETCHING RECORDS: ", e);
      alert(e);
    }
    view();
    setLoading(false);
  }

  async function itemYep(data) {
    // create
    setLoading(true);
    try {
      const item = await pb.collection(collec).create({
        name: data.name,
        cost: data.cost,
      });
    } catch (e) {
      alert(e);
    }
    view();
    setLoading(false);
    reset();
    reload(!dummy);
  }
  if (pb.authStore.isValid){
  return (
    <>
      {isLoading && <p>Loading...</p>}
      <h1>Expense Tracker</h1>
      <div className="purchase-history">
        <form onSubmit={handleSubmit(itemYep)}>
          Item:{" "}
          <input
            className="item-name"
            type="text"
            placeholder="item name"
            {...register("name")}
          />
          <br />
          Cost ($):{" "}
          <input
            className="cost"
            type="text"
            placeholder="item cost"
            {...register("cost")}
          /><div className="centerButton">
            <button className="add" type="submit" disabled={isLoading}>
            Add Item
          </button>
          </div>
        </form>
      </div>
      <h2 className="etitle">Expenses</h2>
      <form className="load" onSubmit={handleSubmit(view)}>
        <button className="lbut" type="submit" disabled={isLoading}>
          Load Expenses
        </button>
      </form>
      <h3 className="total">Total: ${total}</h3>
      <div className="purchase-history">
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {records.map((item, index) => (
            <li key={index} className="tab">
              <div>
                <strong className="item">Name:</strong> {item.name}
              </div>
              <div>
                <strong className="item">Cost:</strong> ${item.cost}
              </div>
              <div>
                <form
                  className="delete-form"
                  onSubmit={(e) => handleSubmit(() => del(item.name))(e)}
                >
                  <button className="delete" type="submit" disabled={isLoading}>
                    Delete
                  </button>
                </form>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
  }
  return(
    <>
      <div className="section">
        <div className="title">
          <h1>Track your expenses!</h1>
        </div>
        <div className="features">
          <div className="card">
            <div className="icon">
              <i class="fa-solid fa-user"></i>
            </div>
            <h2>Personalized Collections</h2>
            <p>
              Access your own personalized collection to track your expenses. 
              This feature ensures that all your financial data is securely stored in our 
              database, providing a convenient and personalized overview of your spending habits.
            </p>
            <a href="https://pocketbase.io/docs/collections/" className="boottoon">Read More</a>
          </div>
          <div className="card">
            <div className="icon">
              <i class="fa-solid fa-hand-holding-dollar"></i>
            </div>
            <h2>Add / Delete Expenses</h2>
            <p>
              Seamlessly add or delete expense items to maintain an accurate record of your spending. 
              Users can effectively manage and monitor their finances by updating their expense history, 
              reflecting real-time changes in their financial situation.
            </p>
            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" className="boottoon rick"><span>Read More</span></a>
          </div>
          <div className="card">
            <div className="icon">
              <i class="fa-solid fa-address-card"></i>
            </div>
            <h2>Register or Log In</h2>
            <p>
            New users are invited to create an account for full access to our expense tracker. 
            Registration unlocks a personalized experience, secure data storage, and comprehensive tools. 
            Returning users can log in to access their personalized expense tracking dashboard.
            </p>
            <div className="nextTo">
              <a href="signup" className="boottoon">Sign Up</a><a href="login" className="boottoon">Log In</a>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}