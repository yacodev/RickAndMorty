# Chipax Challenge - Rick and Morty API

Solution of challenge Rick and Morty from Chipax.

## Demo

You can view the demo [hear](https://yacodev.github.io/RickAndMorty/).



## Estructura del repositorio

This repository has the following  organization:

    ├── src                     # React - app
        ├── components
            ├── Character          # Get all data of Characters from API.
            ├── Episodes           # Get all data of Episodes from API.
            ├── Locations          # Get all data of Locations from API. 
        ├── services
            ├── data_fecth         # Service to get data from API.
        ├── static
            ├── images             # Images to header home pages.
        ├── utils                      
            ├── countLetters                # Function in charge count letter in array.
            ├── formatResult                # Function give JSON format to results.
            ├── getCharacterIdWithOrigin    # Function return object with keys is characterId and the value is origin
            ├── getEpisodesWithLocations    # Function return array with all episodes with character's locations origin 
            ├── getTimeProcess              # Function calculate the duration of the process.
    └── README.md                   # README


## Details

* Using React hooks.
* Using React components.

## Library

* gh-pages -> to generate a github pages.
* emotion-styled  -> to write css directly in the component

## Request

* Git
* Node.js 14.15.2
* npm


## Inicio de la aplicación

* Clone the repository.
* npm install
* npm start

## Tests

Se utilizó Cucumber para la definición e implementación de los escenarios de pruebas funcionales. Para ejecutar: `npm test`