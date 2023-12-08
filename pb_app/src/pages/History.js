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

  const adminuser = "admin@gmail.com";
  const adminpass = "adminadmin";

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
  return (
    <>
      {isLoading && <p>Loading...</p>}
      <h1>{collec}'s Purchase History</h1>
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
          Cost:{" "}
          <input
            className="cost"
            type="text"
            placeholder="item cost"
            {...register("cost")}
          />
          <button className="add" type="submit" disabled={isLoading}>
            + Add New
          </button>
        </form>
      </div>
      <h2 className="title">Expenses</h2>
      <h3 className="total">Total: ${total}</h3>
      <form className="load" onSubmit={handleSubmit(view)}>
        <button type="submit" disabled={isLoading}>
          Load
        </button>
      </form>
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
