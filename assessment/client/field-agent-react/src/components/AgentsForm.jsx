import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from "react-router-dom";

// Agents Default
const AGENTS_DEFAULT = {
  firstName: "John",
  middleName: "M",
  lastName: "Doe",
  dob: new Date(),
  heightInInches: 72
}

function AgentsForm() {
  // State
  const [agent, setAgent] = useState(AGENTS_DEFAULT);
  const [errors, setErrors] = useState([]);
  // URL
  const url = "http://localhost:8080/api/agent";
  // useNavigate, useParams 
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
          return Promise.reject(`Unexpected status code: ${response.status}`);
        }
      })
      .then((data) => {
        if (!data.id) {
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
    agent.agentId = id;

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
      <main className="flex flex-col container font-007 text-2xl px-4 py-4">
        <section id="formContainer">
          <h2 id="formHeading" className="py-2 mb-2">
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
                className="form-control py-2 px-4 mb-2"
                value={agent.firstName}
                onChange={handleChange}
              />
            </fieldset>
            <fieldset className="form-group">
              <label htmlFor="middleName" className="mb-2">
                Middle Name:
              </label>
              <input
                id="middleName"
                name="middleName"
                type="text"
                className="form-control py-2 px-4 mb-2"
                value={agent.middleName}
                onChange={handleChange}
              />
            </fieldset>
            <fieldset className="form-group">
              <label htmlFor="lastName" className="mb-2">
                Last Name:
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                className="form-control py-2 px-4 mb-2"
                value={agent.lastName}
                onChange={handleChange}
              />
            </fieldset>
            <fieldset className="form-group">
              <label htmlFor="dob" className="mb-2">
                DOB:
              </label>
              <input
                id="dob"
                name="dob"
                type="date"
                className="form-control py-2 px-4 mb-2 appearance-none bg-transparent" // The date icon is still appearing
                value={agent.dob}
                onChange={handleChange}
              />
            </fieldset>
            <fieldset className="form-group">
              <label htmlFor="heightInInches" className="mb-2">
                Height in Inches:
              </label>
              <input
                id="heightInInches"
                name="heightInInches"
                type="number"
                className="form-control py-2 px-4 mb-2"
                value={agent.heightInInches}
                onChange={handleChange}
              />
            </fieldset>
            <div className="mt-4">
              <button
                className="bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 rounded mr-2"
                type="submit"
              >
                {" "}
                {id > 0 ? "Update Agent" : "Add Agent"}
              </button>
              <Link
                className="bg-white hover:bg-gray-200 text-black font-bold py-2 px-4 rounded"
                to={"/agents"}
              >
                Cancel
              </Link>
            </div>
          </form>
        </section>
      </main>
    </>
  );
}

export default AgentsForm;