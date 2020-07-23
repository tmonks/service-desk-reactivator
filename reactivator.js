const axios = require("axios");
require("dotenv").config();

const BASE_URL = "https://api.samanage.com";

const HEADERS = {
  "X-Samanage-Authorization": "Bearer " + process.env.SOLARWINDS_API_KEY,
  Accept: "application/vnd.samanage.v2.1+json",
  "Content-Type": "application/json",
};

const isToday = (dateString) => {
  return dateString.substr(0, 10) === new Date().toISOString().substr(0, 10);
};

// Change the status of incidentId to "In Progress"
async function reactivateIncident(incidentId) {
  const URL = BASE_URL + "/incidents/" + incidentId + ".json";

  try {
    await axios.put(URL, { incident: { state: "In Progress" } }, { headers: HEADERS });
  } catch (error) {
    console.error(error.response);
  }
}

// Add comment to incidentId
async function commentIncident(incidentId, comment) {
  const URL = BASE_URL + "/incidents/" + incidentId + "/comments.json";

  try {
    await axios.post(
      URL,
      { comment: { body: comment } },
      { headers: HEADERS, params: { add_callbacks: "true" } }
    );
  } catch (error) {
    console.error(error.response);
  }
}

// Sets any incidents with `state` and a due_date of today to "In Progress"
async function activateDueIncidents(state) {
  const URL = BASE_URL + "/incidents.json";

  const requestOptions = {
    headers: HEADERS,
    params: {
      state: state,
      per_page: 100,
    },
  };

  let currentPage = 1;
  let totalPages = 1;

  while (currentPage <= totalPages) {
    requestOptions.params.page = currentPage;

    try {
      let results = await axios.get(URL, requestOptions);

      // console.log("Page " + currentPage + ": Found " + results.data.length + " incidents");
      totalPages = results.headers["x-total-pages"] || 1;
      currentPage++;

      results.data.forEach((incident) => {
        if (typeof incident.due_at === "string" && isToday(incident.due_at)) {
          console.log(
            `Reactivating incident #${incident.number} (${incident.id}) which is due today`
          );
          commentIncident(incident.id, "Due date reached. Reactivating incident.");
          reactivateIncident(incident.id);
        }
      });
    } catch (error) {
      console.error(error.response);
    }
  }
}

// reactivate all incidents due today that are in state "Paused"
activateDueIncidents("Paused");
