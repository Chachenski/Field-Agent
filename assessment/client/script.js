const displayAllButton = document.getElementById("displayAllButton");
const addAgentButton = document.getElementById("addAgentButton");
const mainContent = document.getElementById("mainContent");

// Event listeners
displayAllButton.addEventListener("click", displayAllAgents);
addAgentButton.addEventListener("click", addAgent);

// Display All Agents
let Agents = [];
let editAgentId = 0;

function displayList() {
  setCurrentView("List");
  getAgents().then((data) => {
    Agents = data;
    renderList(data);
  });
}

function getAgents() {
  return fetch("http://localhost:8080/api/agent").then((response) => {
    return response.json();
  });
}

function renderList(Agents) {
  const tableBodyElement = document.getElementById("tableRows");
  console.log(Agents);
  const agentHTML = Agents.map((agent) => {
    return `
        <tr>
        <td>${agent.firstName}</td>
        <td>${agent.middleName}</td>
        <td>${agent.lastName}</td>
        <td>${agent.dob}</td>
        <td>${agent.heightInInches}</td>
        <td>${agent.agencies}</td>
        <td>${agent.aliases}</td>
        <td>
            <button onclick="handleEditAgent(${agent.id})">Edit</button>
            <button onclick="handleDeleteAgent(${agent.id})">Delete</button>
        </td>
    </tr>
    `;
  });
  tableBodyElement.innerHTML = agentHTML.join("");
}

/** DO HTTP METHODS */
function doPost(agent) {
  const init = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(agent),
  };

  fetch("http://localhost:8080/api/agent", init)
    .then((response) => {
      if (response.status === 201 || response.status === 400) {
        return response.json();
      } else {
        return Promise.reject(`Unexpected status code: ${response.status}`);
      }
    })
    .then((data) => {
      if (data.id) {
        displayList();
        resetState();
      } else {
        renderErrors(data);
      }
    })
    .catch(console.log);
}

function doPut(agent) {
  agent.id = editAgentId;

  const init = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(agent),
  };

  fetch(`http://localhost:8080/api/agent/${editAgentId}`, init)
    .then((response) => {
      if (response.status === 204) {
        return agent;
      } else if (response.status === 400) {
        return response.json();
      } else {
        return Promise.reject(`Unexpected status code: ${response.status}`);
      }
    })
    .then((data) => {
      if (data.id) {
        displayList();
        resetState();
      } else {
        renderErrors(data);
      }
    })
    .catch(console.log);
}

// Handle Delete
function handleDeleteAgent(agentId) {
  const agent = Agents.find(
    (agent) => agent.id === agentId
  );
  if (
    confirm(
      `Delete the agent at location: ${agent.firstName} - ${agent.middleName} - ${agent.lastName}`
    )
  ){
    const init = {
      method: "DELETE",
    };

    fetch(`http://localhost:8080/api/agent/${agentId}`, init)
      .then((response) => {
        if (response.status === 204) {
          displayList();
          resetState();
        } else {
          return Promise.reject(`Unexpected Status code: ${response.status}`);
        }
      })
      .catch(console.log);
  }
};