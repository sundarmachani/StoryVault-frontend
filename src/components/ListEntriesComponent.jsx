import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllEntriesFromApi, deleteEntryApi } from "./api/DiaryApiService";
import { useAuth } from "./security/AuthContext";

export default function ListEntriesComponent() {
  const [entries, setEntries] = useState([]);
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);

  const authContext = useAuth();
  const username = authContext.username;
  const navigate = useNavigate();

  const refreshEntries = () => {
    setLoading(true);
    getAllEntriesFromApi(username)
      .then((res) => setEntries(res.data))
      .catch((err) => {
        console.error(err);
        alert("Error fetching entries");
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    refreshEntries();
  }, [username]);

  const deleteEntry = (id) => {
    if (window.confirm("Are you sure you want to delete this entry?")) {
      deleteEntryApi(username, id)
        .then(() => {
          setMessage(`Deleted Entry with ID: ${id}`);
          refreshEntries();
        })
        .catch((err) => {
          console.error(err);
          alert("Error deleting entry");
        });
    }
  };

  const updateEntry = (id) => {
    navigate(`/entry/${id}`);
  };

  const createEntry = () => {
    navigate(`/entry/-1`);
  };

  if (loading) {
    return <div>Loading entries...</div>;
  }

  return (
    <div className="container">
      <h1>Your Stories 🫣</h1>
      {message && <div className="alert alert-warning">{message}</div>}
      <table className="table">
        <thead>
          <tr>
            <th>Day</th>
            <th>Description</th>
            <th>Date</th>
            <th>Delete</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.day}</td>
              <td>{entry.description}</td>
              <td>{entry.entryDate}</td>
              <td>
                <button
                  className="btn btn-warning"
                  onClick={() => deleteEntry(entry.id)}
                >
                  Delete
                </button>
              </td>
              <td>
                <button
                  className="btn btn-success"
                  onClick={() => updateEntry(entry.id)}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="btn btn-success" onClick={createEntry}>
        Add Story
      </button>
    </div>
  );
}
