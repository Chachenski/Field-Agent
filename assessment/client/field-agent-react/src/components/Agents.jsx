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
    <div>
      <main className="container font-007 text-2xl">
        <section id="listContainer">
          <h2>Agents</h2>
          <div className="border-solid">
            <button onClick={() => navigate("/agents/add")}>
              <i></i> Add Agent
            </button>
          </div>
          <table>
            <thead>
              <tr>
                <div className="flex py-6 px-4">
                  <th className="px-4">First Name</th>
                  <th className="px-4">Middle Name</th>
                  <th className="px-4">Last Name</th>
                  <th className="px-4">DOB</th>
                  <th className="px-4">Height In Inches</th>
                  <th>&nbsp;</th>
                </div>
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
                        className="border-solid"
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
    </div>
  );
}

export default Agents