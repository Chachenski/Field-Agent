const mainContent = document.getElementById("mainContent");
const displayAllButton = document.getElementById("displayAllButton");
const addAgentButton = document.getElementById("addAgentButton");

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

function handleAddAgent() {
  setCurrentView("Form");
}

function handleEditAgent(agentId) {
  const agent = agent.find(
    (agent) => agent.id === agentId
  );
  document.getElementById("firstName").value = agent.firstName;
  document.getElementById("middleName").value = agent.middleName;
  document.getElementById("lastName").value = agent.lastName;
  document.getElementById("dob").value = agent.dob;
  document.getElementById("heightInInches").value = agent.heightInInches;
  console.log(agent);

  document.getElementById("formHeading").innerText = "Update Agent";
  document.getElementById("formSubmitButton").innerText = "Update Agent";
  editAgentId = agentId;
  setCurrentView("Form");
}

function handleSubmit(event) {
  event.preventDefault();
  const firstName = document.getElementById("firstName").value;
  const middleName = document.getElementById("middleName").value;
  const lastName = document.getElementById("lastName").value;
  const dob = document.getElementById("dob").value;
  const heightInInches = document.getElementById("heightInInches").value;

  const agent = {
    firstName,
    middleName,
    lastName,
    dob,
    heightInInches: heightInInches ? parseInt(heightInInches) : 0
  };

  if (editAgentId > 0) {
    doPut(agent);
  } else {
    doPost(agent);
  }
}

// Helper Methods 
function renderErrors(errors) {
  const errorsHTML = errors.map((error) => `<li>${error}</li>`);
  const errorsHTMLString = `<p>The following errors were found:</p>
    <ul>
    ${errorsHTML.join("")}
    </ul>`;
  document.getElementById("error").innerHTML = errorsHTMLString;
}

function resetState() {
  document.getElementById("form").reset();
  document.getElementById("formSubmitButton").innerText = "Add Agent";
  document.getElementById("formHeading").innerText = "Add Agent";
  document.getElementById("error").innerHTML = "";
  editAgentId = 0;
  setCurrentView("List");
}

function setCurrentView(view) {
  const formContainerElement = document.getElementById("formContainer");
  const listContainerElement = document.getElementById("listContainer");

  switch (view) {
    case "List":
      formContainerElement.style.display = "none";
      listContainerElement.style.display = "block";
      break;
    case "Form":
      formContainerElement.style.display = "block";
      listContainerElement.style.display = "none";
      break;
  }
}

displayList();