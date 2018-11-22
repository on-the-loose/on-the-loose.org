# OTL Website

Hello! This is the codebase of the official website of On The Loose, the Claremont Colleges outdoors club.

# Project Structure

```
.
├── assets/           # Static assets (images, fonts)
├── src/              # Client code (React with Typescript)
│   ├── components/   # Reusable components
│   ├── index/        # App entry point (the code that always gets executed first)
│   └── pages/        # Standalone views
├── package.json      # Dependencies and scripts
├── tsconfig.json     # Typescript configuration
├── README.md         # This README
└── ...
```

We use Parcel as a bundler because it requires no configuration, and TypeScript to keep our code typed and maintainable.

# Development

To work on the project, first [install yarn](https://yarnpkg.com/en/docs/install). Make sure to also install _Node_ (most _yarn_ installations will do this automatically for you).

Then follow these steps to start developing:

1. Go ahead and clone this repo.
2. Open terminal (or equivalent) and `cd` to the cloned directory.
3. Run `yarn install` to install all the necessary dependencies.
4. Run `yarn dev` to start _parcel_.

And you're ready to go! Point your browser to http://localhost:1234 to see the website. The page will automatically reload when you make changes in the code.

We recommend that you use [VSCode](https://code.visualstudio.com/) as an editor because of its top notch autocomplete and linting for TypeScript. Additionally, the use of [prettier](https://prettier.io/) to automatically format the code is also highly encouraged to keep the code nice and clean.
