# Skygazer
An instructive web utility that compiles different astronomical phenomena and observatory points in one place.

## Context
This repository was developed over one weekend by the "[Houston, we have a bug](https://www.spaceappschallenge.org/2025/find-a-team/houston-we-have-a-bug/?tab=details)" team during the [NASA Space Apps Challenge 2025](https://www.spaceappschallenge.org/2025/), a global Hackathon about space and science. The members of the team are the following:

- [Pablo Díez](https://github.com/pablo10diez2)
- [Jon Fernández](https://github.com/jfern4dez)
- [Naia Martín](https://github.com/naiamartin)
- [Sergio Morales](https://github.com/Sergitxin22)
- [Daniel Suso](https://github.com/Dansuso)
- Me

Special thanks to [Andrei Popan](https://github.com/vasileandreipopan) for his support and ideas and to the staff team at the hackathon and [42 Urduliz](https://www.42urduliz.com/) for making this event possible.

## Content
This webapp serves as a prototype for a divulgative platform to learn about ongoing celestial events or observation sites such as research centers or the International Space Station (ISS).

The page offers a map with a set of markers that pinpoint different events or locations. These markers are interactive and they can provide aditional information about what they represent. Skygazer tracks:

- Ongoing Aurora Borealis
- Recently registered meteor locations
- Observatories all around the world
- The ISS current location and the current members aboard it

## Stack
This website is built in plain HTML/CSS/JavaScript, with no frameworks nor server-side environments.

The map is made possible thanks to [Leaflet](https://leafletjs.com/), an open-source JavaScript library that offers very customizable map utilities.

The page does not run any database as its datasets are json files that can be found in `resources/data/`.

## License
This repository follows the GNU General Public License (GPLv3). Everyone is permitted to copy and distribute verbatim copies of this license document, but changing it is not allowed. For more information, refer to the [Free Software Foundation website](https://www.fsf.org/) or [read the license](LICENSE).