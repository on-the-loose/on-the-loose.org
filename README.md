# OTL Website

Hello! This is the codebase for the new main website of On The Loose, the Claremont Colleges outdoors club. This project is in development and we have [a demo](https://on-the-loose.firebaseapp.com/) of our progress so far.

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

This project was bootstrapped with create-react-app.

# Development

We use the following stack of technologies:
  - [React](https://reactjs.org/) for our front-end.
  - [Firebase](https://firebase.google.com/) for our back-end.
  - [TypeScript](https://www.typescriptlang.org/) to keep our code typed and maintainable. 
  - [Emotion](https://emotion.sh/) for styling components.
  - [Ant Design](https://ant.design/docs/react/introduce) as a design framework and component library. 

Make sure to familiarize yourself with these tools before contributing. 

## Setup

To work on the project, first [install yarn](https://yarnpkg.com/en/docs/install). Make sure to also install _Node_ (most _yarn_ installations will do this automatically for you).

Then follow these steps to start developing:

1. Go ahead and clone this repo.
2. Open terminal (or equivalent) and `cd` to the cloned directory.
3. Run `yarn; cd functions; npm i; cd ..` to install all the necessary dependencies.  
4. Run `yarn start` to start the development server.

And you're ready to go! Point your browser to http://localhost:3000 to see the website. The page will automatically reload when you make changes in the code.

We recommend that you use [VSCode](https://code.visualstudio.com/) as an editor because of its top notch autocomplete and linting for TypeScript. Additionally, the use of [prettier](https://prettier.io/) to automatically format the code is also highly encouraged to keep the code nice and clean.

## Guidelines

For the sake of consistency, the general structure of a component you create should look like this:

```tsx
import React from 'react'
// ... more imports ....

// ... helper functions ....

export default function App() {
  // ... component logic with react hooks ....

  return (
    <div>
      <Button css={styles.button}/>
    </div>
  )
}

// ... styles in the same file, but outside of jsx ....
const styles = {
  button: css`
    padding: 8rem 4rem 4rem 4rem;
  `
  // ... more styles ....
}
```

### Managing State

We encourage the use of [React Hooks](https://reactjs.org/docs/hooks-intro.html) for managing state, and generally try to stay away from classes. 

### Styling Components
We keep all of our styles in the same TypeScript file as our component, except in cases in which we want to reuse the same style over multiple components. Usually we just end up reusing the component itself instead of reusing styles though, making things more maintanable. 

