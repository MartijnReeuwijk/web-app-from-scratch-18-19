(function() {
  "use strict";
  var api = {
    url: "https://data.cityofnewyork.us/resource/9895-df76.json",
    get: () => {
      return new Promise((resolve, reject) => {
        fetch(api.url)
          .then(response => resolve(response.json()))
          .catch(error => reject(error));
      });
    },
    store: data => {
      // Here will i store the data and later get this data from all other functions
      localStorage.setItem("victims", JSON.stringify(data));
    }
  };

  var load = {
    firstLoad: () => {
      // Oke this is confusing, here we get the data from a promise
      // But only api.get() give you the while completed response
      // You need to .then() on the promise to get the returned result of the promise

      // This If state will check if you need to do a API request
      api
        .get()
        .then(data => api.store(data))
        .then(route.home());
    }
  };

  var route = {
    data: JSON.parse(localStorage.getItem("victims")),
    // I like my code to be sepret so i set my data in the localStorage
    // now i can freely access the data in my renders and my routing
    home: function() {
      render.loadremove();
      render.drawDom(this.data);
      render.drawDeathlyIncidents(this.data);
    },
    // id for the route/victim
    // Needed to switch to function() instead of () => {} because something with the THIS select.
    victim: function(id) {
      let filterData = dataFunctions.filter(id);
      console.log(id[0]);
      render.removeIncidents();
      render.removeVictims();
      render.load();
      render.drawDom(filterData);
      render.addMap();
      map.makeMapSingleMarker(filterData);
    }
  };

  var render = {
    list: document.getElementById("list"),
    personKilled: document.getElementById("personKilled"),
    deaths: document.getElementById("deaths"),
    load: function() {
      this.list.innerHTML = `<div class="loader"><p>Aan het laden</p></div>`;
    },
    loadremove: function() {
      this.list.innerHTML = ``;
    },
    drawDom: function(data) {
      this.list.innerHTML = `${data
        .map(item =>
          `
      <div class="incident shadowHover ${
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
    },
    drawDeathlyIncidents: function(victim) {
      victim.map(victims => {
        // check if the victim made it
        if (victims.statistical_murder_flag) {
          this.personKilled.innerHTML += `<a href="#${
            victims.incident_key
          }"> <div class="personKilledImg shadowHover ${
            victims.vic_sex === "M" ? "male" : "female"
          }">
          </div></a>`;
        }
      });
    },
    removeIncidents: function() {
      this.deaths.innerHTML = ``;
    },
    removeVictims: function() {
      this.list.innerHTML = ``;
    },
    addMap: function() {
      this.list.innerHTML += `<div class="map borderRadius" id="map"></div>`;
    }
  };

  var dataFunctions = {
    // Here is where we will filter the data based on the selects ID, we get this ID from the #url
    filter: filterKey => {
      // Here will you get the victims from localStorage if it exists, if not refetch
      if (localStorage.getItem("victims")) {
        var savedData = JSON.parse(localStorage.getItem("victims"));
      } else {
        // if it doesnt exist redo the API fetch, this could happen if their is an overload or some other local error
        var savedData = fetch(api.url());
      }
      var filteredData = savedData.filter(
        // A filter function we filter the data
        key => key.incident_key === filterKey
      );
      return filteredData;
    }
  };
  var map = {
    makeMapSingleMarker: function(victim) {
      // This is a function form google it will move the data to an external API.
      initMap(victim);
    },
    makeMapMultyMarker: function() {
      render.removeIncidents();
      render.addMap();
      drawNewYorkMap(victim);
    }
  };
  // check for localStorage and base actions on it
  if (!JSON.parse(localStorage.getItem("victims"))) {
    load.firstLoad();
  } else {
    // check if ID exists if yes filter on ID if not Render.home
    var id = window.location.hash.substring(1);
    // this check you have an Id  in the URL if it exist it will be an Id else it will be 0 and renders the Home page
    if (id == 0) {
      route.home();
    } else {
      route.victim(id);
    }
  } // of localStorage check

  routie(":id", function(id) {
    route.victim(id);
  });
  routie("#", function() {
    oute.home();
  });
})();
