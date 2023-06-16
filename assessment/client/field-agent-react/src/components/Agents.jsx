import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Agents = () => {
  // set the state and useNavigate hook
  const [agents, setAgents] = useState([]);
  const navigate = useNavigate();
  // url
  const url = "http://localhost:8080/api/agent";
  // useEffect is used in conjunction with the API fetch to set the state of Agents
  useEffect(() => {
    fetch(url)
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          return Promise.reject(
            `Unexpected status code: ${response.status}`
          );
        }
      })
      .then((data) => setAgents(data))
      .catch(console.log);
  }, []);

  // Delete Agent
  const handleDeleteAgent = (agentId) => {
    // find the first agent match
    const agent = agents.find(
      (agent) => agent.id === agentId
    );
    // Confirmation
    if (
      window.confirm(
        `Delete Agent: ${agent.firstName} - ${agent.middleName} - ${agent.lastName}?`
      )
    ) {
      const init = {
        method: "DELETE",
      };
      fetch(`${url}/${agentId}`, init)
        .then((response) => {
          if (response.status === 204) {
            const newAgents = Agents.filter(
              (agent) => agent.id !== agentId
            );
            setAgents(newAgents);
            //resetState();
          } else {
            return Promise.reject(`Unexpected Status code: ${response.status}`);
          }
        })
        .catch(console.log);
    }
  };

  return (
    <>
      <main className="container">
        <section id="listContainer">
          <h2>Agents</h2>
          <button
            className="btn btn-primary my-4"
            onClick={() => navigate("/agents/add")}
          >
            <i className="bi bi-plus-circle"></i> Add Agent
          </button>
          <table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Middle Name</th>
                <th>Last Name</th>
                <th>DOB</th>
                <th>Height In Inches</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody>
              {agents.map((agent) => (
                <tr key={agent.id}>
                  <td>{agent.firstName}</td>
                  <td>{agent.middleName}</td>
                  <td>{agent.lastName}</td>
                  <td>{agent.dob}</td>
                  <td>{agent.heightInInches}</td>
                  <td>
                    <div className="float-right mr-2">
                      <Link
                        className="btn btn-primary btn-sm mr-2"
                        to={`/agents/edit/${agent.id}`}
                      >
                        <i className="bi bi-pencil-square"></i> Edit
                      </Link>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDeleteAgent(agent.id)}
                      >
                        <i className="bi bi-trash"></i> Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
    </>
  );
}

export default Agents