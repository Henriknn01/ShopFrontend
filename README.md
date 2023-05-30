# ShopFrontend

## Project overview
The shop frontend is running Nuxt 3. Nuxt 3 was selected for this project for a variety of reasons, but mainly for its ease of use and SEO features.
Nuxt 3 also offers great performance and speed, On-demand rendering and SEO.

Link to Frontend: [www.norheimweb.com](https://www.norheimweb.com)

Link to Backend: [api.norheimweb.com](https://api.norheimweb.com)

Link to Swagger api documentation: [api.norheimweb.com/swagger/](https://api.norheimweb.com/swagger/)

### Test users
These are the available test users for testing the website.

| Role  | Username                 | Password                              |
|-------|--------------------------|---------------------------------------|
| Admin | waveadmin@norheimweb.com | 9cC454Pskh48yG9Asq$$9e#T&xF#SM5$q!$$  |
| User  | waveuser@norheimweb.com  | rme?Sxhdmq47g?b@pr&srXRJyxL5sitoxQfr  |


### Checkout
To test the checkout of the website fill inn any personal information.

| Field       | Value               |
|-------------|---------------------|
| Card Number | 4242 4242 4242 4242 |
| MM/YY       | Any valid MM/YY     |
| CVC         | Any number          |



### Infrastructure
From the start we coded the frontend to be scalable together with the backend. Making the application scalable was a priority for out team, to be able to handle user traffic and quickly be able to scale up to meet demand if needed.

![image of services running the shop frontend and backend in DigitalOcean](/Documents/infrastructure.png)
These are the services in DigitalOcean running the backend and frontend.

The frontend utilizes Nuxt 3's ability to run as on DigitalOceans servers as an app. The main advantage of this is ease of 
deployment, when a new pull request is merged into master it is instantly being built and deployed to production automatically.
The frontend is still accessible and running while the new version is being deployed, leading to minimal downtime for the frontend.

The backend uses a managed database run by DigitalOcean, this insures that the backend has regular backups. 
The database is configured to only accept connections from the backend and nothing else, this insures that no unauthorized access is possible.
We also have the possibility to easily scale the database cluster as needed.

### API's
#### Shop Backend
The frontend utilizes a few different API's for its operation. The main api is the [ShopBackend](https://github.com/Henriknn01/ShopBackend), 
this is where the frontend gets all the data displayed to the user, such as products, blog posts, orders, etc.

#### OpenAI
[OpenAI's API](https://openai.com/) is also used for the customer support feature of the website. ChatGPT is used as a customer support agent, helping the user with any question they may have.

#### Dicebear
[Dicebear's API](https://www.dicebear.com/) is used for generating user avatars for the users, these are displayed in a few different locations around the website.

### Performance
Once the project was deployed to production, we noticed a drop in performance. The main issue was the server response time.
From the research we did we found that this could be caused by a wide range of things. Such as:
* The server application's logic to prepare the pages.
* The amount and speed of queries to the backend.
* The server hardware.

We have plans on increasing the performance of the application logic, but we suspect that the main cause of the performance 
drop could be from the server running the application, or the database.

We had plans to run the backend with a redis cache, this would increase the performance of the backend a bit.
This was dropped due to the cost of running the frontend, backend and database was already quite high. 

That also brings us the last item on the list, the server hardware. 
We are running two basic servers for the backend and frontend. 
This should in theory be more than capable to run the website, but the hardware is not dedicated,
so that could have an effect on performance as well.
Upgrading these servers to the servers that would normally be used in production would cost be costly, 
therefore we decided to stick with the basic servers even if it meant the performance wouldn't be great.


## .env template
These are the environment variables required to run the frontend.
Change the variables to your values.
```dotenv
# Nuxt settings
NUXT_SECRET=YOUR_SECRET_NUXT_KEY
FRONTEND_URL=http://localhost:3000
BACKEND_API_URL=http://127.0.0.1:8000
# Stripe
STRIPE_PUBLIC_KEY=YOUR_PUBLIC_STRIPE_KEY
STRIPE_SECRET_KEY=YOUR_SECRET_STRIPE_KEY
# OpenAI
OPENAI_API_KEY=YOUR_SECRET_OPENAI_KEY
OPENAI_ORGANIZATION=YOUR_OPENAI_ORGANIZATION
OPENAI_MODEL=CHATGPT_MODEL
# Checkout settings
CHECKOUT_FREE_SHIPPING_THRESHOLD=750
CHECKOUT_FIXED_STANDARD_SHIPPING_COST=150
CHECKOUT_FIXED_EXPRESS_SHIPPING_COST=350
```

## Build Setup
```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out the [nuxt documentation](https://nuxtjs.org).

## Special Directories

You can create the following extra directories, some of which have special behaviors. Only `pages` is required; you can delete them if you don't want to use their functionality.

### `assets`

The assets directory contains your uncompiled assets such as Stylus or Sass files, images, or fonts.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/assets).

### `components`

The components directory contains your Vue.js components. Components make up the different parts of your page and can be reused and imported into your pages, layouts and even other components.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/components).

### `layouts`

Layouts are a great help when you want to change the look and feel of your Nuxt app, whether you want to include a sidebar or have distinct layouts for mobile and desktop.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/layouts).


### `pages`

This directory contains your application views and routes. Nuxt will read all the `*.vue` files inside this directory and setup Vue Router automatically.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/get-started/routing).

### `plugins`

The plugins directory contains JavaScript plugins that you want to run before instantiating the root Vue.js Application. This is the place to add Vue plugins and to inject functions or constants. Every time you need to use `Vue.use()`, you should create a file in `plugins/` and add its path to plugins in `nuxt.config.js`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/plugins).

### `static`

This directory contains your static files. Each file inside this directory is mapped to `/`.

Example: `/static/robots.txt` is mapped as `/robots.txt`.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/static).

### `store`

This directory contains your Vuex store files. Creating a file in this directory automatically activates Vuex.

More information about the usage of this directory in [the documentation](https://nuxtjs.org/docs/2.x/directory-structure/store).
