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

// var router = {
//   overview: function() {
//     // stap 2
//     console.log('stap 2');
//     api.get('overview');
//   },
//   detail: function(id) {}
// };
(function() {
  // iife

  var route = {
    home: function() {
      console.log("Stap 1");
      // This needs to be water fall because i dont understand Async await yet so yea.
      api.get();
    },
    victimPage: function(id) {
      let filteredData = filterData.filter(id);
      render.removeIncidents();
      render.removeVictims();
      render.drawDom(filteredData);
      makeMap.makeMapSingleMarker(filteredData);
      // render.addMap(victims);
    }
  };

  var api = {
    url: function() {
      return "https://data.cityofnewyork.us/resource/9895-df76.json";
    },
    get: function() {
      render.load();
      fetch(api.url())
        .then(response => response.json())
        .then(data => this.store(data));
    },
    store: function(data) {
      localStorage.setItem("victims", JSON.stringify(data));
      var storedData = localStorage.getItem("victims");
      if (storedData) {
        savedData = JSON.parse(storedData);
        console.log(savedData);
      } else {
        savedData = fetch(api.url());
      }
      api.load(savedData);
    },
    load: function(data) {
      render.loadremove();
      render.drawDom(data);
    }
  };

  var render = {
    element: document.getElementById("list"),
    load: function() {
      this.element.innerHTML = `<div class="loader"><p>Aan het laden</p></div>`;
    },
    loadremove: function() {
      this.element.innerHTML = ``;
    },
    drawDom: function(data) {
      this.element.innerHTML = `${data
        .map(item =>
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
      render.drawDeathlyIncidents(data);
      // this.drawDeathlyIncidents(data);
    },
    drawDeathlyIncidents: function(victim) {
      console.log(victim);
      console.log("drawDeathlyIncidents");
      element = document.getElementById("personKilled");
      victim.map(victims => {
        if (victims.statistical_murder_flag === true) {
          element.innerHTML += `<div class="personKilledImg ${
            victims.vic_sex === "M" ? "male" : "female"
          }"></div>`;
        } else {
          // Nothing yet
        }
      });
    },
    removeIncidents: function() {
      // Remove the correct element
      console.log("remove incidents");

      element = document.getElementById("personKilled");
      element.innerHTML = ``;
    },
    removeVictims: function() {
      // can this be one this?
      console.log("remove");
      // element = document.getElementById("list");
      this.element.innerHTML = ``;
    },
    addMap: function() {
      console.log("addmap");
      // map = document.getElementById("list");

      this.element.innerHTML += `
    <div class="map" id="map"></div>
      `;
    }
  };

  var filterData = {
    filter: function(filterKey) {
      if (localStorage.getItem("victims")) {
        var savedData = JSON.parse(localStorage.getItem("victims"));
      } else {
        var savedData = fetch(api.url());
      }
      var filteredData = savedData.filter(
        key => key.incident_key === filterKey
      );

      return filteredData;
    }
  };

  var makeMap = {
    makeMapSingleMarker: function(victim) {
      console.log("makeMapSingleMarker");
      render.addMap();
      // This is a function form Guugle
      initMap(victim);
    },
    makeMapMultyMarker: function() {
      console.log("makeMapMultyMarker");
      render.removeIncidents();
      render.addMap();
      drawNewYorkMap(victim);
    }
  };
  // console.log("load");

  routie(":id", function(id) {
    console.log(id);
    route.victimPage(id);
  });
  route.home();
})();
// Hoe is OOP duidelijker dan Functions
