import Home from "Home";
import pb from "lib/pocketbase";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function History() {
  const { register, handleSubmit, setValue } = useForm();
  const [isLoading, setLoading] = useState(false);
  const [records, setRecords] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    // Convert total to a number and fix the decimal places
    setTotal(parseFloat(total).toFixed(2));
  }, [total]);

  async function view() {
    //read
    setLoading(true);
    try {
      const itemRecords = await pb.collection("basic_item").getFullList({
        sort: "-created",
      });
      console.log("Fetched Result:", itemRecords);

      const results = itemRecords.map((record) => ({
        name: record.name,
        cost: record.cost,
      }));
      const totalCost = itemRecords.reduce((sum, item) => sum + item.cost, 0);
      console.log("Fetched Item Records:", results);
      console.log("TOTAL COST:", totalCost);
      setRecords(results);
      setTotal(totalCost);
    } catch (e) {
      console.log("ERROR FETCHING RECORDS: ", e);
      alert(e);
    }
    setLoading(false);
  }
  async function itemYep(data) {
    //create
    setLoading(true);
    try {
      const item = await pb.collection("basic_item").create({
        name: data.name,
        cost: data.cost,
      });
    } catch (e) {
      alert(e);
    }
    setLoading(false);
  }

  if (pb.authStore.isValid)
    return (
      <>
        <div>
          <h2> ADD NEW ITEM </h2>
          <form onSubmit={handleSubmit(itemYep)}>
            Item:{" "}
            <input type="text" placeholder="itemName" {...register("name")} />
            <br />
            Cost:{" "}
            <input type="text" placeholder="itemCost" {...register("cost")} />
            <button type="submit" disabled={isLoading}>
              Add
            </button>
          </form>
        </div>
        <hr style={{ borderTop: "3px solid #bbb" }}></hr>
        <div>
          <h2>Expenses:</h2>
          <form onSubmit={handleSubmit(view)}>
            <button type="submit" disabled={isLoading}>
              Load
            </button>
          </form>
          <div>
            {/* Display the loaded items here */}
            <h3>TOTAL: ${total}</h3>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {records.map((item, index) => (
                <li
                  key={index}
                  style={{
                    marginBottom: "8px",
                    padding: "12px",
                    border: "1px solid #ddd",
                    borderRadius: "4px",
                  }}
                >
                  <div>
                    <strong>Name:</strong> {item.name}
                  </div>
                  <div>
                    <strong>Cost:</strong> ${item.cost}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </>
    );

  return (
    <>
      <Home />
    </>
  );
}
