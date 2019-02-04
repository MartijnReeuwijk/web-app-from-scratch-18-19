# Openintel

This is a visualization of the data from the Openintel dataset web

# Tabel of content
- [Openintel](#openintel)
- [Tabel of content](#tabel-of-content)
  * [Getting Started](#getting-started)
  * [Prerequisites](#prerequisites)
  * [Installation](#installation)
  * [Running](#running)
  * [Linting](#linting)
  * [Build With](#build-with)
  * [Data formating](#data-formating)
    + [Data formating](#data-formating-1)
    + [Data output example](#data-output-example)
        * [Standard use object](#standard-use-object)
  * [Visualization](#visualization)
  * [Authors](#authors)
  * [License](#license)
  * [Acknowledgments and Thanks](#acknowledgments-and-thanks)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

## Prerequisites

You will need the following things properly installed on your computer.

-   [Git](https://git-scm.com/)
-   [Node.js](https://nodejs.org/) (with npm)
-   [Google Chrome](https://google.com/chrome/)

## Installation

-   `git@github.com:MartijnReeuwijk/OpenIntel.git`
-   `cd OpenIntel`
-   `npm install`

## Running

For now its just a CLI client app
Just run the "app" by using this line of code inside the correct folder
Our port is a default of 5000.

-   `Npm start`

## Linting

For linting i used CleanCss and Prettier
To run the Prettier use the code below

-   `npm run clean`

## Build With

-   [Prettier](https://prettier.io/docs/en/options.html) - Prettier.io - Linter

## Data formating

### Data formating

The data we got from Openintel was clean and in a good readable format however we did change it a bit to better fit our needs.
We counted all the TLD and added them together to get a total of a single TLD. We also added the total values form a TLD.

### Data output example
##### Standard use object
This is an example on how the data looks.
```
nl: Array(31)
0: {date: "2016-04-01T00:00:00.000Z", values: Array(50), country: "nl", all: Array(6), total: 3329761}
1: {date: "2016-05-01T00:00:00.000Z", values: Array(50), country: "nl", all: Array(6), total: 3337435}
2: {date: "2016-06-01T00:00:00.000Z", values: Array(50), country: "nl", all: Array(6), total: 3342944}
3: {date: "2016-07-01T00:00:00.000Z", values: Array(50), country: "nl", all: Array(6), total: 3350057}
4: {date: "2016-08-01T00:00:00.000Z", values: Array(50), country: "nl", all: Array(7), total: 3353996}
```
With in on the inside of the values array
```
1: {name: "metaregistrar.nl.", value: 370038}
2: {name: "transip.net.", value: 326939}
3: {name: "firstfind.nl.", value: 266901}
4: {name: "rzone.de.", value: 152024}
```

## Visualization

## Authors

-   **Martijn Reeuwijk** - [MartijnReeuwijk](https://github.com/MartijnReeuwijk)


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments and Thanks
