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

!(function() {
  // iife

  var route = {
    home: function() {
      console.log("Stap 1");
      api.get();
      // console.log(data);
    },
    victimPage: function(id) {
      render.removeIncidents();
      render.removeVictims();
      render.addMap(victims);
    }
  };

  var api = {
    get: function() {
      fetch("https://data.cityofnewyork.us/resource/9895-df76.json")
        .then(response => response.json())
        .then(data => this.store(data));

      // .then(data => {
      //   route.home(data);
      // });
    },
    store: function(data) {
      localStorage.setItem("victims", JSON.stringify(data));
      var storedData = localStorage.getItem("victims");
      if (storedData) {
        savedData = JSON.parse(storedData);
      }
      // var savedData = data;
      console.log(savedData);
      console.log("stap 5");
      render.drawDom(savedData);
    },
    load: function() {
      // this.get(da);
      console.log(data);
      render.drawDom(data);
    }
  };

  var render = {
    drawDom: function(data) {
      console.log("draw dom");
      element = document.getElementById("list");
      element.innerHTML = `${data
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
      // drawDeathlyIncidents(data);
      this.drawDeathlyIncidents(data);
    },

    drawDeathlyIncidents: function(victim) {
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
      element = document.getElementById("list");
      element.innerHTML = ``;
    },
    addMap: function() {
      console.log("addmap");

      map = document.getElementById("list");
      map.innerHTML += `
    <div class="map" id="map"></div>
      `;
    }
  };

  var filterData = {
    filter: function() {
      console.log("filter");
      var newData = api.get();
      var filteredData = newData.map(key => {
        if (key.incident_key === incident) {
          return [key];
        }
      });

      // console.log(filteredData);
      // render.drawDom(filteredData);
      // render.drawMap(filteredData);
    }
  };
  var mapMan = {
    makeMapSingleMarker: function() {
      render.removeIncidents;
      render.addMap;
      // This is a function form Guugle
      initMap(victim);
    },
    makeMapMultyMarker: function() {
      render.removeIncidents;
      render.addMap;
      drawNewYorkMap(victim);
    }
  };
  console.log("load");
  route.home();
})();
