import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";

// Agents Default
const AGENTS_DEFAULT = {
  firstName: "John",
  middleName: "M",
  lastName: "Doe",
  dob: new Date(1900, 1, 10),
  heightInInches: 72
}

function AgentsForm() {
  // State
  const [agent, setAgent] = useState(AGENTS_DEFAULT);
  const [errors, setErrors] = useState([]);
  // URL
  const url = "http://localhost:8080/api/agent";
  // useNavigate and useParams hooks
  const navigate = useNavigate();
  const { id } = useParams(); // Destructure the id to pass as the params

  useEffect(() => {
    // check if we have an id value
    if (id) {
      fetch(`${url}/${id}`)
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            return Promise.reject(`Unexpected status code: ${response.status}`);
          }
        })
        .then((data) => {
          setAgent(data);
        })
        .catch(console.log);
    }
  }, [id]);

  // handle change
  const handleChange = (e) => {
    const newAgent = { ...agent };

    if (e.target.type === "checkbox") {
      newAgent[e.target.name] = e.target.checked;
    } else {
      newAgent[e.target.name] = e.target.value;
    }
    setAgent(newAgent);
  };

  // handle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (id) {
      updateAgent();
    } else {
      addAgent();
    }
  };

  // add agent
  const addAgent = () => {
    const init = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(agent),
    };
    fetch(url, init)
      .then((response) => {
        if (response.status === 201 || response.status === 400) {
          return response.json();
        } else {
          return Promise.reject(
            `Unexpected status code: ${response.status}`
          );
        }
      })
      .then((data) => {
        if (data.id) {
          navigate("/agents");
        } else {
          setErrors(data);
        }
      })
      .catch(console.log);
  };

  // Update Agent
  const updateAgent = () => {
    // assign an id
    agent.id = id;

    const init = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(agent),
    };

    fetch(`${url}/${id}`, init)
      .then((response) => {
        if (response.status === 204) {
          return null;
        } else if (response.status === 400) {
          return response.json();
        } else {
          return Promise.reject(`Unexpected status code: ${response.status}`);
        }
      })
      .then((data) => {
        if (!data) {
          navigate("/agents");
        } else {
          setErrors(data);
        }
      })
      .catch(console.log);
  };

  return (
    <>
      <main className="container">
        <section id="formContainer">
          <h2 id="formHeading">
            {id > 0 ? "Update Agent" : "Add Agent"}
          </h2>
          {errors.length > 0 && (
            <div className="alert alert-danger">
              <p>The following errors were found:</p>
              <ul>
                {errors.map((error) => (
                  <li key={error}>{error}</li>
                ))}
              </ul>
            </div>
          )}
          <form onSubmit={handleSubmit} id="form">
            <fieldset className="form-group">
              <label htmlFor="firstName">First Name:</label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                className="form-control"
                value={agent.firstName}
                onChange={handleChange}
              />
            </fieldset>
            <fieldset className="form-group">
              <label htmlFor="middleName">Middle Name:</label>
              <input
                id="middleName"
                name="middleName"
                type="text"
                className="form-control"
                value={agent.middleName}
                onChange={handleChange}
              />
            </fieldset>
            <fieldset className="form-group">
              <label htmlFor="lastName">Last Name:</label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                className="form-control"
                value={agent.lastName}
                onChange={handleChange}
              />
            </fieldset>
            <fieldset className="form-group">
              <label htmlFor="dob">DOB:</label>
              <input
                id="dob"
                name="dob"
                type="date"
                className="form-control"
                value={agent.dob}
                onChange={handleChange}
              />
            </fieldset>
            <fieldset className="form-group">
              <label htmlFor="heightInInches">Height in Inches:</label>
              <input
                id="heightInInches"
                name="heightInInches"
                type="number"
                checked={agent.heightInInches}
                onChange={handleChange}
              />
            </fieldset>
            <div className="mt-4">
              <button className="btn btn-success mr-2" type="submit">
                <i className="bi bi-file-earmark-check"></i>{" "}
                {id > 0 ? "Update Agent" : "Add Agent"}
              </button>
              <Link
                className="btn btn-warning"
                type="button"
                to={"/agents"}
              >
                <i className="bi bi-stoplights"></i> Cancel
              </Link>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}

export default AgentsForm