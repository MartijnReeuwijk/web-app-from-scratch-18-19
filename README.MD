# NYC gun incidents

Here is the data from the NYC police api related to shootings in New york city
# Demo link
[DEMO](https://martijnreeuwijk.github.io/web-app-from-scratch-18-19/week1/)

# Tabel of content
- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running](#running)
- [Linting](#linting)
- [Build With](#build-with)
- [Data formating](#data-formating)
  * [Data output example](#data-output-example)
      - [Standard use object](#standard-use-object)
- [Javascript templating](#javascript-templating)
- [Authors](#authors)
- [License](#license)
- [Acknowledgments and Thanks](#acknowledgments-and-thanks)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Prerequisites

You will need the following things properly installed on your computer.

-   [Git](https://git-scm.com/)
-   [Node.js](https://nodejs.org/) (with npm)
-   [Google Chrome](https://google.com/chrome/)

## Installation

-   `git@github.com:MartijnReeuwijk/web-app-from-scratch-18-19.git`
-   `cd web-app-from-scratch-18-19`
-   `npm install`

## Running

Local hosting is not needed.

## Linting

For linting i used CleanCss and Prettier
To run the Prettier use the code below

-   `npm run clean`

## Build With

-   [Prettier](https://prettier.io/docs/en/options.html) - Prettier.io - Linter

## Data formating

The data from the API is very clear and easy to use underneath this is an example of the API's output.
It doesn't need any changing for the data i'am going to use.

### Data Fetching
I use a fetch request go get the data for the app.
```js
fetch("https://data.cityofnewyork.us/resource/9895-df76.json")
  .then(response => {
    return response.json();
  })
  .then(data => {
    console.log(data)
  }
```

### Data output example
##### Standard use object
This is an example on how the data looks.
Not all the data is present in all the different cases.
```js
boro: "BROOKLYN"
incident_key: "138817042"
jurisdiction_code: "0"
latitude: "40.651465108"
longitude: "-73.954236416"
occur_date: "2014-09-21T00:00:00.000"
occur_time: "23:15:00"
precinct: "67"
statistical_murder_flag: false
vic_age_group: "25-44"
vic_race: "BLACK"
vic_sex: "M"
x_coord_cd: "996949"
y_coord_cd: "176623"
```

## Javascript templating
This is the first time i used Javascript templating, and its really easy and usefull.
Here is a example of my code, this will generate all the items/lists.
You can very easly

```js
<div class="incident ${item.statistical_murder_flag ? "death" : "alive"}">
<p>Casenumber:${item.incident_key}</p>
<p>Location:${item.boro}</p>
<p>Death:${item.statistical_murder_flag ? "Yes" : "No"}</p>
<p>Victim age: ${item.vic_age_group}</p>
<p>Precinct:${item.precinct}</p>
${
  item.statistical_murder_flag
    ? '<img src="./public/img/rip.png" alt="">'
    : ""
}
</div>
```


## Authors

-   **Martijn Reeuwijk** - [MartijnReeuwijk](https://github.com/MartijnReeuwijk)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments and Thanks

NYC's crime department
