const displayAllButton = document.getElementById("displayAllButton");
const addAgentButton = document.getElementById("addAgentButton");
const mainContent = document.getElementById("mainContent");

// Event listeners
displayAllButton.addEventListener("click", displayAllAgents);
addAgentButton.addEventListener("click", addAgent);

// Display All Agents
function displayAllAgents(event) {
  event.preventDefault();

  fetch("/api/agent")
    .then((response) => response.json())
    .then((agents) => {
      let content = "<h2>All Agents</h2>";

      if (agents.length > 0) {
        content += "<ul class='agent-list'>";
        agents.forEach((agent) => {
          content += `
            <li>
              <span>${agent.name} - ${agent.code}</span>
              <div class="agent-actions">
                <button onclick="editAgent(${agent.id})">Edit</button>
                <button onclick="deleteAgent(${agent.id})">Delete</button>
              </div>
            </li>
          `;
        });
        content += "</ul>";
      } else {
        content += "<p>No agents found.</p>";
      }

      mainContent.innerHTML = content;
    })
    .catch((error) => {
      console.error("Error:", error);
      mainContent.innerHTML = "<p>An error occurred while fetching agents.</p>";
    });
}

// Add Agent
function addAgent(event) {
  event.preventDefault();

  mainContent.innerHTML = `
    <h2>Add Agent</h2>
    <form id="addAgentForm">
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" required>

      <label for="code">Code:</label>
      <input type="text" id="code" name="code" required>

      <button type="submit">Add</button>
      <button type="button" onclick="displayAllAgents(event)">Cancel</button>
    </form>
  `;

  const addAgentForm = document.getElementById("addAgentForm");
  addAgentForm.addEventListener("submit", submitAddAgentForm);
}

// Submit Add Agent form
function submitAddAgentForm(event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const code = document.getElementById("code").value;

  fetch("/api/agent", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, code }),
  })
    .then((response) => response.json())
    .then((data) => {
      displayAllAgents(event);
    })
    .catch((error) => {
      console.error("Error:", error);
      mainContent.innerHTML =
        "<p>An error occurred while adding the agent.</p>";
    });
}

// Edit Agent
function editAgent(agentId) {
  fetch(`/api/agent/${agentId}`)
    .then((response) => response.json())
    .then((agent) => {
      mainContent.innerHTML = `
        <h2>Edit Agent</h2>
        <form id="editAgentForm">
          <label for="name">Name:</label>
          <input type="text" id="name" name="name" value="${agent.name}" required>

          <label for="code">Code:</label>
          <input type="text" id="code" name="code" value="${agent.code}" required>

          <button type="submit">Update</button>
          <button type="button" onclick="displayAllAgents(event)">Cancel</button>
        </form>
      `;

      const editAgentForm = document.getElementById("editAgentForm");
      editAgentForm.addEventListener("submit", (event) =>
        submitEditAgentForm(event, agentId)
      );
    })
    .catch((error) => {
      console.error("Error:", error);
      mainContent.innerHTML =
        "<p>An error occurred while fetching the agent.</p>";
    });
}

// Submit Edit Agent form
function submitEditAgentForm(event, agentId) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const code = document.getElementById("code").value;

  fetch(`/api/agent/${agentId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, code }),
  })
    .then((response) => response.json())
    .then((data) => {
      displayAllAgents(event);
    })
    .catch((error) => {
      console.error("Error:", error);
      mainContent.innerHTML =
        "<p>An error occurred while updating the agent.</p>";
    });
}

// Delete Agent
function deleteAgent(agentId) {
  fetch(`/api/agent/${agentId}`)
    .then((response) => response.json())
    .then((agent) => {
      const confirmDeletion = confirm(
        `Are you sure you want to delete the agent '${agent.name}'?`
      );

      if (confirmDeletion) {
        fetch(`/api/agent/${agentId}`, {
          method: "DELETE",
        })
          .then((response) => response.json())
          .then((data) => {
            displayAllAgents();
          })
          .catch((error) => {
            console.error("Error:", error);
            mainContent.innerHTML =
              "<p>An error occurred while deleting the agent.</p>";
          });
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      mainContent.innerHTML =
        "<p>An error occurred while fetching the agent.</p>";
    });
}

// Display All Agents
displayAllAgents();