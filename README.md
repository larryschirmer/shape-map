# Shape Map

## A view and edit interface for GeoJSON files

![app sample](https://github.com/larryschirmer/shape-map/raw/main/docs/sample-img.png)

### Features

- Accepts GeoJSON files and import features into the map
- Allows for intersecting and unioning features from a GeoJSON file
- Edit are kept even when switch between GeoJSON files
- The area and total sum area (excluding overlap) is displayed in the stats section
- Undoing and redoing edits is easy

### Built With

- React.js
- Typescript
- Mapbox
- Turf.js
- CSS Modules

### Importing GeoJSON files

To import additional files, add the new file to the `src/data` directory. Open the `index.ts` file and:

- Import the new GeoJSON file
- Add the features of the file to the `data` array including an `id` and `name` property.

### Install

- clone repository
- create file `.devcontainer/devcontainer.env`
- include in env file a value for `REACT_APP_MAPBOX_TOKEN=`
- load dev container
- run `yarn start`

### Future Work

- Make importing GeoJSON files easier by
    - setting up a backend route to return to the frontend the necessary data
    - create a file io process to automatically search and import GeoJSON files from a predefined directory