import pb from "lib/pocketbase";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

export default function Auth() {
  const { register, handleSubmit, reset } = useForm();
  const [isLoading, setLoading] = useState(false);
  const [dummy, reload] = useState(false);
  const [records, setRecords] = useState([]);
  const [total, setTotal] = useState(0);
  const [collec, setCollec] = useState('');  

  const adminuser = 'admin@gmail.com';
  const adminpass = 'adminadmin';

  useEffect(() => {
    // Convert total to a number and fix the decimal places
    setTotal(parseFloat(total).toFixed(2));
  }, [total]);

  useEffect(() =>{
    setCollec(JSON.parse(localStorage.getItem("currentuser")));
  }, [view]);

  async function view() {  // read

    setLoading(true);
    try {
      const itemRecords = await pb.collection(collec).getFullList({
        sort: '-created',
      });

      const results = itemRecords.map((record) => ({ name: record.name, cost: record.cost }));
      const totalCost = itemRecords.reduce((sum, item) => sum + item.cost, 0);

      setRecords(results);
      setTotal(totalCost);
    } catch (e) {
      console.log("ERROR FETCHING RECORDS: ", e);
      alert(e);
    }
    setLoading(false);
  }
  async function del(dname) {  // delete
    setLoading(true);
    try {
      const findr = await pb.collection(collec).getFirstListItem(`name="${dname}"`);
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

  async function login(data) {
    setLoading(true);
    try {
      const authData = await pb.collection('users').authWithPassword(data.user, data.pass);
      const getusername = data.user.substring(0, data.user.lastIndexOf("@"));
      localStorage.setItem("currentuser", JSON.stringify(getusername));
    } catch (e) {
      alert(e);
    }

    setLoading(false);
    reset();
    reload(!dummy);
  }

  async function regnew(data) {
    setLoading(true);
    const newuser = {
      "email": data.r_user,
      "emailVisibility": true,
      "password": data.r_pass,
      "passwordConfirm": data.r_pass
    };
    try {
      const anotheruser = await pb.collection('users').create(newuser);
      const authData = await pb.admins.authWithPassword(adminuser, adminpass);
      const getusername = anotheruser.email.substring(0, anotheruser.email.lastIndexOf("@"));
      localStorage.setItem("currentuser", JSON.stringify(getusername));
      const base = await pb.collections.create({
        name: getusername,
        type: 'base',
        listRule: '',
        viewRule: '',
        createRule: '',
        updateRule: '',
        deleteRule: '',
        schema: [
          {
            name: 'name',
            type: 'text',
            required: true,
          },
          {
            name: 'cost',
            type: 'number',
            required: true,
          },
        ],
      });
    } catch (e) {
      alert(e);
    }
    const authData = await pb.collection('users').authWithPassword(newuser.email, newuser.passwordConfirm);
    alert("NEW ACCOUNT CREATED!")
    setLoading(false);
    reset();
    reload(!dummy);
  }

  async function itemYep(data) { // create
    setLoading(true);
    try {
      const item = await pb.collection(collec).create({
        'name': data.name,
        'cost': data.cost,
      });
    } catch (e) {
      alert(e);
    }
    view();
    setLoading(false);
    reset();
    reload(!dummy);
  }

  function logout() {
    pb.authStore.clear();
    setCollec('');  // Reset the collection on logout
    localStorage.removeItem("currentuser");
    window.location.reload();
    reload(!dummy);
  }

  if (pb.authStore.isValid) {
    return (
      <>
        <h1>Logged In: {pb.authStore.model.email}</h1>
        <h2>COLLECTION: {collec}</h2>
        <button onClick={logout}>Logout</button>
        <hr style={{ borderTop: '3px solid #bbb' }}></hr>
        <div>
          <h2> ADD NEW ITEM </h2>
          <form onSubmit={handleSubmit(itemYep)}>
            Item: <input type="text" placeholder="itemName" {...register("name")} /><br />
            Cost: <input type="text" placeholder="itemCost" {...register("cost")} />

            <button type="submit" disabled={isLoading}>Add</button>
          </form>
        </div>
        <hr style={{ borderTop: '3px solid #bbb' }}></hr>
        <div>
          <h2>Expenses:</h2>
          <form onSubmit={handleSubmit(view)}>
            <button type="submit" disabled={isLoading}>Load</button>
          </form>
          <div>
            <h3>TOTAL: ${total}</h3>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {records.map((item, index) => (
                <li key={index} style={{ marginBottom: '8px', padding: '12px', border: '1px solid #ddd', borderRadius: '4px' }}>
                  <div>
                    <strong>Name:</strong> {item.name}
                  </div>
                  <div>
                    <strong>Cost:</strong> ${item.cost}
                  </div>
                  <div>
                  <form onSubmit={(e) => handleSubmit(() => del(item.name))(e)}>
                   <button type="submit"  disabled={isLoading}>Delete</button>
                  </form>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {isLoading && <p>Loading...</p>}
      <h1>
        Log In
      </h1>
      <form onSubmit={handleSubmit(login)}>
        <input type="text" placeholder="email" {...register("user")} /><br />
        <input style={{ marginTop: 10 }} type="password" placeholder="password" {...register("pass")} />
        <br />
        <button style={{ marginTop: 10 }} type="submit" disabled={isLoading}>Login</button>
      </form>
      <hr style={{ borderTop: '3px solid #bbb' }}></hr>
      <div>
        <h1>
          Register New Account
        </h1>
        <form onSubmit={handleSubmit(regnew)}>
          <input type="text" placeholder="email" {...register("r_user")} /><br />
          <input style={{ marginTop: 10 }} type="password" placeholder="password" {...register("r_pass")} />
          <br />
          <button style={{ marginTop: 10 }} type="submit" disabled={isLoading}>Register</button>
        </form>
      </div>
    </>
  );
}
