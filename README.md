# OTL Website

Hello! This is the codebase for the website of On The Loose, the Claremont Colleges outdoors club.

# Project Structure

```
.
├── firebase           # Backend logic using Firebase functions
├── website             # React Frontend (Single Page App)
│   ├── public              # Html and favicon that will be provided as-is
│   ├── src                 
│   │   ├── app
│   │   │   ├── Main.tsx    # Website routing and layouts
│   │   │   └── ...
│   │   ├── assets          # Static assets (images, fonts)
│   │   ├── utils
│   │   │   ├── hooks       # Reusable component logic
│   │   │   └── ...
│   │   ├── firebase.ts
│   │   └── index.ts        # Entry point
│   └── ...
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

To work on the project, first [install node](https://treehouse.github.io/installation-guides/mac/node-mac.html).

Then follow these steps to start developing:

1. [Clone](https://docs.github.com/en/repositories/creating-and-managing-repositories/cloning-a-repository) this repo.
2. `cd` to the cloned directory.
3. Run `cd website; npm install; cd ../functions; npm i; cd ..` to install all the necessary dependencies.
4. Run `cd website; npm start` to start the development server.

And you're ready to go! Point your browser to http://localhost:1234 to see the website. The page will automatically reload when you make changes in the code.

We recommend that you use [VSCode](https://code.visualstudio.com/) as an editor because of its top notch autocomplete and linting for TypeScript. Additionally, the use of [prettier](https://prettier.io/) to automatically format the code is also highly encouraged to keep the code nice and clean.

<!-- TODO: add deployment instructions -->

## Example component

The general structure of a component in this codebase looks like this:

```tsx
// ... imports ....

export interface Props {
  // ... type declarations for props ....
}

export default (props: Props) => {
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
}
```
