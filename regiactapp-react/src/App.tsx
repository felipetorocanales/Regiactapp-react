// src/App.js
import React, { useEffect, useState } from 'react';
import './App.css';
import { db } from './firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

function App() {
  const [startDate, setStartDate] = useState("2024-01-01"); // Default start date
  const [endDate, setEndDate] = useState("2024-12-31"); // Default end date
  const [data, setData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(""); // State for selected user


  useEffect(() => {
    const fetchActividades = async () => {
      const actividadesCollection = collection(db, 'registros');
      const actividadesSnapshot = await getDocs(actividadesCollection);
      const actividadesList = actividadesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setData(actividadesList);
    };

    fetchActividades();
  }, []);

  

  const createSummary = (data) => {
    const summary = {};

    const filteredData = data.filter(item =>
      item.fechaIni >= startDate 
      && item.fechaIni <= endDate
      && (selectedUser ? item.userEmail === selectedUser : true)
    );
    // Summing hours by nombre and categoria
    filteredData.forEach(({ actividad, etapa, horas }) => {
      if (!summary[actividad]) {
        summary[actividad] = {};
      }
      if (!summary[actividad][etapa]) {
        summary[actividad][etapa] = 0;
      }
      summary[actividad][etapa] += parseInt(horas);
    });

    return summary;
  };

  const summary = createSummary(data);

  const etapas = new Set();
  for (const actividad in summary) {
    for (const etapa in summary[actividad]) {
      etapas.add(etapa);
    }
  }

  const uniqueUsers = [...new Set(data.map(item => item.userEmail))];

 
  return (
    <div>
      <h1>Hours Summary Table</h1>
      <label>
        Start Date:
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </label>
      <label>
        End Date:
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </label>
      <label>
        Select User:
        <select value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
          <option value="">All</option>
          {uniqueUsers.map((user) => (
            <option key={user} value={user}>{user}</option>
          ))}
        </select>
      </label>
      <table border="1">
        <thead>
          <tr>
            <th>Actividad</th>
            {[...etapas].map((etapa) => (
              <th key={etapa}>{etapa == 0 ? "General" : 
                etapa == 1 ? "Planificación" : 
                etapa == 2 ? "Ejecución" :
                etapa == 3 ? "Comunicación" :
                etapa == 4 ? "Revisión de calidad QA" :
                etapa == 5 ? "Supervisión" : etapa}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.keys(summary).map((actividad) => (
            <tr key={actividad}>
              <td>{actividad}</td>
              {[...etapas].map((etapa) => (
                <td key={etapa}>
                  {summary[actividad][etapa] || 0}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;