# OTL Website

Hello! This is the codebase of the official website of On The Loose, the Claremont Colleges outdoors club.

# Project Structure

```
.
├── client/           # Client code (React)
├── server/           # Server code (Node.js + Express)
│   ├── db/           # Database (MongoDB)
├── ...
└── package.json      # Dependencies and scripts
```

We use Parcel as a bundler because it requires no configuration, and TypeScript to keep our code typed and maintainable.

# Development

To work on the project, first [install yarn](https://yarnpkg.com/en/docs/install). Make sure to also install `Node` (most `yarn` installations will do this automatically for you).

Then go ahead and clone this repo, and inside the directory run `yarn install` to install all the necessary dependencies.

Now you're ready to start developing with the following two scripts:

1. `yarn client` --- This will start `parcel` and will automatically build the client app when the client code is modified.
2. `yarn server` --- This will run the server on `localhost` and automatically restart it when the server code is modified.

Make sure to run these on two separate terminal windows or tabs.

And you're ready to go! Point your browser to http://localhost:3000 to see the website.

We recommend that you use [VSCode](https://code.visualstudio.com/) as an editor because of its top notch autocomplete and linting for TypeScript. Additionally, the use of [prettier](https://prettier.io/) to automatically format the code is also highly encouraged to keep the code nice and clean.
