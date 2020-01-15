# MERN Boilerplate

This is a boilerplate amed at starting up a new client app with an admin CMS panel and a node server using mongoDB.

## Client App
## Admin CMS

Both Client and Admin apps follow the same structure. Webpack as bundler. Both apps comes with authentication (signup / login / verify email / reset password / sessions with jwt).

| Libraries | Info |
| ------ | ------ |
| React Redux | For state management. |
| React Router | Routing is set up with protected route's and 404 page to get you running. |
| React Sagas | Completed with API calls, just update your route's and start hitting that server. |
| React Helmet | SEO made easy with Helmet. Update document head data depending on what route is visited. All meta data is set up in CMS so no need to hardcode/rebuild when SEO data updates. |

| Webpack | Info |
| ------ | ------ |
| babel-loader | This package allows transpiling JavaScript files using Babel and webpack. |
| react-hot-loader | Live reloading your app without the loss of state. |
| sass-loader | Sassy CSS makes CSS fun! Use features that aren&apos;t a part of the wider CSS standard yet. Webpack handles the bundling. |
| urifycss-webpack | Remove all unused styling for your production build. |
| uglifyjs-webpack-plugin | Minimize your build by removing unwanted javascript and uglifying what&apos;s included. |
| nodemon | Restart your environment automatically when any config file changes. |
| sass-lint | Keep your CSS tidy with sass-lint. |
| eslint | Maintain your code quality with ease. |

Both apps comes with a set of handy React components. Sidebar, modal and hamburger menu runs through Redux for easy access / manipulation from anywhere in the app.
| Component | Info |
| ------ | ------ |
| Hamburger Menu | Navigation for mobile view. Can be hardcoded or dynamically loaded from CMS. |
| Sidebar | Any reason for a sidebar to show up? This one supports multiple pages so you can navigate inside your sidebar as well. |
| Modal | Easy way to show a modal window from anywhere, just send in a React component. Supporst a stack of modal windows so you can have several modal's opened on top of each other. |
| Header | Header with navigation (dropdown with submenus, megamenu, etc... |

### Websockets
Both Apps support webosockets. Keep's track of if user is logged in or not. Can handle several "sessions" from the same user simultaniously. Also keeps track of what environment the session belongs to (dev/staging/production or whatever your envisonments are set up as)

## Node / Express / mongoDB
Server is running Express. mongoDB as database.
| Content | Info |
| ------ | ------ |
| Authentication | Signup / Login / jwt / etc... |
| HTML email templates | Send HTML emails whenever and from wherever |
| Websockets | |

