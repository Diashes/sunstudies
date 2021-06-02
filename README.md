# Sunstudies

## Requirements

- Docker
- Composer (optional)

## Getting Started

1.  Install dependencies.

    1.  If you have Composer, just run:

            composer require laravel/sail --dev

    1.  If you don't have Composer (but have Docker), you can run:

            docker run --rm -v $(pwd):/opt -w /opt laravelsail/php80-composer:latest bash -c "composer require laravel/sail --dev"

2.  Create a new file `.env` in root directory and copy contents from `.env.example`.

3.  Start docker containers using Sail.

        ./vendor/bin/sail up

4.  Create database tables.

        docker exec -it sunstudies_laravel.test_1 php artisan migrate:fresh

5.  Create public storage for images.

        docker exec -it sunstudies_laravel.test_1 php artisan storage:link

6.  Navigate to `localhost:80`

## The Front End

The front end is built in React and source code is located in folder `./resources/js/src`. You can also find the styling of the application in `./resources/css/app.css`. The initial html document view that is rendered by Laravel (when you visit any route specified in `./routes/web.php`) is `index.blade.php` located in `./resources/views/`. Here you can see that we add the script to the React application, as well as styling.

To develop in front end, you first have to have node installed. Then run `npm install` to install dependencies. To watch and build assets, run `npm run watch`. All assets are then transformed and copied to the `./public` folder, where the final build of the front end application is hosted by Laravel.

## The Back End

The project is scaffolded as a basic Laravel application and has the default setup. You can find the routes of the application in `./routes` folder, where `web.php` holds the endpoints to view the React application and `api.php` shows the different API request you can to against the Laravel application (from React application).

The API have currently two endpoints; one for `localhost/api/sunstudies` that holds the sunstudies and one for `localhost/api/images` that holds the images for the sunstudies. Controllers that handles GET, POST, DELETE and PUT requests against these endpoints are located at `./app/Http/Controllers/`. You can also find models in `./app/Models/` that are used to map against the database.

Images uploaded to back end from React application is stored in `./storage/app/public/images`.
