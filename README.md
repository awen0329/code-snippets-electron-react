# Code Snippet Manager Application

## version

1.0.0

## Author

Andrus Wen

# Instruction

Node v18.16.0

## Key Features

- Syntax highlighting for various programming languages.
- Implement CRUD(Create, Read, Update, Delete) actions for code snippets.
- Allow users to search snippets by title or description.
- Save code snippets in local storage.

## Installation

- Run `yarn` or `npm i`
- Run `yarn start` or `npm start` for the local environment
- Run `npm run package` for the production environment

# Tech Stacks

Desktop app framework: Electron

UI: ReactJS

Styling: MaterialUI

State Management: Context API

Form Management: react-hook-form and yup resolver

Save Data: Electron-Store

# Duration:

About 5 hours

# Project Description and tasks implementation check:

You are required to develop a code snippet management application with the following functionalities:

- Main Window:

  Display a list of code snippets in sidebar.

  Allow users to create new snippets, edit existing snippets, and delete snippets.

  The homepage should be created using NextJS's Static Site Generation (SSG).

- Code Snippet Entry:

  Each snippet have a title, description, language type and code snippet itself.

  Implement code highlighter component to highlight code snippets based on their languages.

- Persistence and Storage:

  Use electron store to keep the code snippets in local storage.
