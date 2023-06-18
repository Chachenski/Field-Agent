import React, { useEffect, useState } from 'react';
import { Link, useNavigate, } from 'react-router-dom';

// Todo - Add a resetState function
// Confirmation message to echo back to the user of success or failure

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
      (agent) => agent.agentId === agentId
    );
    console.log({ agent, agents, agentId });
    // Does the agent exist?
    if (!agent) {
      console.log(`Agent not found with id: ${agentId}`);
      return;
    }
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
            const newAgents = agents.filter(
              agent => agent.agentId !== agentId
            );
            setAgents(newAgents);

          } else {
            return Promise.reject(`Unexpected Status code: ${response.status}`);
          }
        })
        .catch(error => {
          console.log(error)
          // console.log(agentId)
        });
    }
  };

  return (
    <div>
      <main className="container font-007 text-2xl">
        <section id="listContainer">
          <h2 className="px-4 text-4xl font-black">Agents</h2>
          <div className="border-solid">
            <button
              className="ml-2 px-2 py-1 text-white bg-black hover:bg-gray-800 rounded-sm"
              onClick={() => navigate("/agents/add")}
            >
              Add Agent
            </button>
          </div>
          <table>
            <thead>
              <tr className="flex py-6 px-4">
                <th className="px-4">First Name</th>
                <th className="px-4">Middle Name</th>
                <th className="px-4">Last Name</th>
                <th className="px-4">DOB</th>
                <th className="px-4">Height In Inches</th>
                <th>&nbsp;</th>
              </tr>
            </thead>
            <tbody className="absolute px-4">
              {agents.map((agent) => (
                <tr key={agent.agentId}>
                  <td className="px-4">{agent.firstName}</td>
                  <td className="px-24">{agent.middleName}</td>
                  <td className="px-4">{agent.lastName}</td>
                  <td className="pr-4">{agent.dob}</td>
                  <td className="px-16">{agent.heightInInches}</td>
                  <td>
                    <div className="flex justify-end">
                      <Link
                        className="px-4 py-2 text-white bg-black hover:bg-gray-800 rounded mr-2 flex-1 text-center"
                        to={`/agents/edit/${agent.agentId}`}
                      >
                        Edit
                      </Link>
                      <button
                        className="px-4 py-2 text-black bg-white hover:bg-gray-200 rounded flex-1 text-center"
                        onClick={() => handleDeleteAgent(agent.agentId)}
                      >
                        Delete
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