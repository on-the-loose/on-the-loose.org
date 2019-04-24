# OTL Website

Hello! This is the codebase for the new main website of On The Loose, the Claremont Colleges outdoors club.

# Project Structure

```
.
├── functions           # Firebase functions for backend logic
├── public              # Html and favicon that will be provided as-is
├── src                 # Web app source code (React with Typescript)
│   ├── app
│   │   ├── Main.tsx    # App routing and layouts
│   │   └── ...
│   ├── assets          # Static assets (images, fonts)
│   ├── utils
│   │   ├── hooks       # Reusable component logic
│   │   └── ...
│   ├── firebase.ts
│   └── index.ts        # Entry point
└── ...
```

# Development

We use the following stack of technologies:

- [React](https://reactjs.org/) for our front-end.
- [Firebase](https://firebase.google.com/) for our serverless backend.
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

## Example component

The general structure of a component in this codebase looks like this:

```tsx
import React from 'react'
// ... more imports ....

// ... type declarations for props ....

export default () => {
  // ... component logic with react hooks ....

  return (
    <div>
      <Button css={styles.button} />
    </div>
  )
}

// ... helper functions ....

// ... styles in the same file ....
const styles = {
  button: css`
    padding: 8rem 4rem 4rem 4rem;
  `
  // ... more styles ....
}
```
