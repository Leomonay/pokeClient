# Pokedex Client
Client for Pokedex project made in ReactJS (Server on Heroku)

## Functions:
The app must have 4 pages:
- <b>Landing Page: </b>
  - A landing image widh a button to enter.
- <b>Search Page: </b>
  - Search Page to find by exact name of pokemon
  - first 12 must be shown by default
  - pokemon can be filtered by type or by base
  - navigation must be by pages. 
- <b>Detail Page:</b>
  - When a pokemon is clicked must redirect to a detail page where an image, type and stats (life, height, weight, power, defense,  and speed) can be seen.
- <b>Creation Page:</b>
  - A pokemon can be created in this page.
  - Types can be selected from a menu.
  - Images must be set using a url.
  - Pokemon must be saved in database.

### Personal adds
- <b>Landing Page (/):</b> Pokedex on landing page is made using pure CSS.
- <b>Search Page (/pokedex):</b>
  - Size of page can be set from main view.
  - A big sized pokemon can be seen at full PC screen width when mouse is over the pokemon card. For created pokemon, this image is the same that Main image.
- <b>Detail Page (/pokedex):</b>
  - Included an icon to be shown in pokdedex. When icon is missing, it's a miniature of the main image.
  - Included a back view. When back image is missing, it's a shadow of the main image.
  - Included the stats from the games and called them by their name.
  - The background changes depending on pokemon type.
- <b>Creation Page (/pokedex):</b>
  - Stats are limited. The six combat stats must add up to 600 or less.
  - The images are displayed when the url is set.
  - A log of errors are displayed at bottom of the page (bottom left in desk view).
  - If there is no errors, the create button is shown in the same box.
