# OTL Website

Hello! This is the codebase of the official website of On The Loose, the Claremont Colleges outdoors club.

# Project Structure

```
.
├── config              # Configuration files from create-react-app
├── public              # Html and assets that will be provided as-is
├── scripts             # Scripts for development and deployment
├── src                 # Web app source code (React with Typescript)
│   ├── assets/           # Static assets (images, fonts)
│   ├── react/              # React code
│   │   ├── components      # Reusable components
│   │   ├── views           # Standalone views
│   │   └── App.tsx         # App routing and layouts
│   ├── tests/          # Tests to make sure things work (Jest)
│   ├── firebase.ts     # Firebase configuration
│   └── index.ts        # Entry point
├── package.json        # Dependencies and scripts
├── tsconfig.json       # Typescript configuration
└── ...
```

We use Parcel as a bundler because it requires no configuration, and TypeScript to keep our code typed and maintainable.

# Development

To work on the project, first [install yarn](https://yarnpkg.com/en/docs/install). Make sure to also install _Node_ (most _yarn_ installations will do this automatically for you).

Then follow these steps to start developing:

1. Go ahead and clone this repo.
2. Open terminal (or equivalent) and `cd` to the cloned directory.
3. Run `yarn install` to install all the necessary dependencies.
4. Run `yarn start` to start the development server.

And you're ready to go! Point your browser to http://localhost:3000 to see the website. The page will automatically reload when you make changes in the code.

We recommend that you use [VSCode](https://code.visualstudio.com/) as an editor because of its top notch autocomplete and linting for TypeScript. Additionally, the use of [prettier](https://prettier.io/) to automatically format the code is also highly encouraged to keep the code nice and clean.

# Coding guidelines

We use react to build this web app. This modern JS framework allows us to be able to easily build rich and interactive views.

Each of the React components used are structured in the following way:

```tsx
import React from 'react'
// ... more imports ....

// ... helper functions ....

export default function App() {
  // ... component logic ....

  return (
    <div>
      <s.Button/> <-- A styled component declared bellow
    </div>
  )
}

const s = {
  Button: styled.button`
    padding: 8rem 4rem 4rem 4rem;
  `
  // ... more styles ....
}
```

When adding new components, please adhere to this structure to keep the codebase consistent and readable.
