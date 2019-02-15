// Data structure

// boro: "BRONX"
// incident_key: "136393517"
// jurisdiction_code: "0"
// latitude: "40.8452198"
// longitude: "-73.908443339"
// occur_date: "2014-04-22T00:00:00.000"
// occur_time: "18:38:00"

// Perp wont always be there

// perp_age_group: "18-24"
// perp_race: "ASIAN / PACIFIC ISLANDER"
// perp_sex: "M"
// precinct: "46"
// statistical_murder_flag: false
// vic_age_group: "18-24"
// vic_race: "ASIAN / PACIFIC ISLANDER"
// vic_sex: "M"
// x_coord_cd: "1009582"
// y_coord_cd: "247224"

!(function() {
  // iife
  function getData() {
    fetch("https://data.cityofnewyork.us/resource/9895-df76.json")
      .then(response => response.json())
      .then(data => {
        // Draw the site and main functions for the index page
        routie("allCases", () => {
          drawDom(data);
        });
        routie("bigMap", () => {
          getNewYorkMap(data);
        });
        routie(":incident", incident => {
          console.log(incident);
          dataFilter(incident, data);
        });
      })
      .then(() => {
        // add functions that add interactions here
        addUtils();
      })
      .catch(err => {
        console.log(err);
      });
  }
  function dataFilter(incident, data) {
    var filteredData = data.map(key => {
      if (key.incident_key === incident) {
        // [] is needed for arrays and .map
        key = [key];
        drawDom(key);
        drawMap(key);
      }
    });
  }
  function drawDom(data) {
    element = document.getElementById("list");
    element.innerHTML = `${data
      .map(item =>
        // need to change the prettier settings its going bad
        `
<div class="incident ${
          item.statistical_murder_flag ? "death" : "alive"
        } borderRadius">
<a href="#${item.incident_key}">
<p>Casenumber:${item.incident_key}</p>
<p>Location:${item.boro}</p>
<p>Death:${item.statistical_murder_flag ? "Yes" : "No"}</p>
<p>Victim age: ${item.vic_age_group}</p>
<p>Precinct:${item.precinct}</p>
${
  item.statistical_murder_flag
    ? '<img class="spinlol" id="spinlol" src="./public/img/rip.png" alt="">'
    : ""
}
</a>
</div>
`.trim()
      )
      .join("")}`;
    drawDeathlyIncidents(data);
  } // drawDom
  function drawDeathlyIncidents(victim) {
    element = document.getElementById("personKilled");
    victim.map(victims => {
      if (victims.statistical_murder_flag === true) {
        element.innerHTML += `<div class="personKilledImg ${
          victims.vic_sex === "M" ? "male" : "female"
        }"></div>`;
      } else {
      }
    });
  }
  function removeIncidents() {
    element = document.getElementById("personKilled");
    element.innerHTML = ``;
  }
  function removeVictims() {
    element = document.getElementById("list");
    element.innerHTML = ``;
  }
  function addMap() {
    map = document.getElementById("list");
    map.innerHTML += `
<div class="map" id="map"></div>
  `;
  }
  function drawMap(victim) {
    removeIncidents();
    addMap();
    initMap(victim);
  }
  function getNewYorkMap(victim) {
    console.log("Get big map");
    removeIncidents();
    removeVictims();
    addMap();
    drawNewYorkMap(victim);
  }
  function addUtils() {} // addUtils

  getData();
  routie("allCases");
})();
