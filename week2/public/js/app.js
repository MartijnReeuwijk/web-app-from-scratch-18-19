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

function getData() {
  fetch("https://data.cityofnewyork.us/resource/9895-df76.json")
    .then(response => response.json())
    .then(data => {
      // Draw the site and main functions for the index page
      routie("allCases", () => {
        drawDom(data);
      });
      routie(":incident", incident => {
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
  console.log("inside dataFilter", incident);
  var filteredData = data.map(key => {
    if (key.incident_key === incident) {
      // [] is needed for arrays and .map
      key = [key];
      drawDom(key);
    }
  });
}

function drawDom(data) {
  element = document.getElementById("list");
  element.innerHTML = `${data
    .map(item =>
      `
<div class="incident ${item.statistical_murder_flag ? "death" : "alive"}">
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
} // drawDom

function addUtils() {
  document.getElementById("spinlol").addEventListener("mouseover", () => {
    var audio = new Audio(
      "https://www.soundboard.com/handler/DownLoadTrack.ashx?cliptitle=Kermit+Suicide&filename=23/235117-daf52696-6d89-415b-b2e7-9a87c2cba17f.mp3"
    );
    audio.play();
  });
} // addUtils

getData();
routie("allCases");
