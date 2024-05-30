import { useState, useEffect } from "react";
import { useRouter } from "next/router";


function Home() {
  return (
    <div>
      <h1>Blood Tracker</h1>
      <nav>
        <ul>
          <li><a href="/add">Add Blood Data</a></li>
          <li><a href="/view">View Blood Data</a></li>
        </ul>
      </nav>
    </div>
  );
}

function AddBloodData() {
  const [date, setDate] = useState('');
  const [systolic, setSystolic] = useState('');
  const [diastolic, setDiastolic] = useState('');
  const router = useRouter();

  const handleSubmit = (e) => {
    e.preventDefault();

    const bloodData = JSON.parse(localStorage.getItem('bloodData')) || [];
    bloodData.push({ date, systolic, diastolic });
    localStorage.setItem('bloodData', JSON.stringify(bloodData));
    router.push('/?view');
  };
  return (
    <div>
      <h1>Add Blood Data</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Date:
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </label>
        <br />
        <label>
          Systolic:
          <input type="number" value={systolic} onChange={(e) => setSystolic(e.target.value)} required />
        </label>
        <br />
        <label>
          Diastolic:
          <input type="number" value={diastolic} onChange={(e) => setDiastolic(e.target.value)} required />
        </label>
        <br />
        <button type="submit">Add Data</button>
      </form>
    </div>
  );
}

function viewBloodDate() {
  const [bloodData, setBloodData] = useState([]);
  
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('bloodData')) || [];
    setBloodData(data);
  }, []);
  return (
    <div>
      <h1>View Blood Data</h1>
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Systolic</th>
            <th>Diastolic</th>
          </tr>
        </thead>
        <tbody>
          {bloodData.map((entry, index) => (
            <tr key={index}>
              <td>{entry.date}</td>
              <td>{entry.systolic}</td>
              <td>{entry.diastolic}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function App() {
  const router = useRouter();
  const { pathname } = router;
  
  let Component;

  if (pathname === '/add') {
    Component = AddBloodData;
  } else if (pathname === '/view') {
    Component = ViewBloodData;
  } else {
    Component = Home;
  }

  return <Component />;
}