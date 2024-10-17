# **Minimized Reown AppKit**

## **REQUIREMENTS**

- ### **VITE**

  This project uses Vite as its compiler (not that CRA trash).

- ### **Node v18**

  This project uses Node v18.

  NVM is a great tool for managing / switching between node versions on your device. you can use `nvm use <version_number>` to switch to a particular version or `nvm use` to extract the version number from the `.nvmrc` file.

- ### **Environment Variables**

Please ask a developer of this project for the respective `.env` file.

## **SCRIPTS**

- ### **Starting the App**

  #### First and foremost install all required packages by running `yarn install`.

  - `yarn start:app:local` <span style="color:lightgreen">&nbsp;&nbsp;(USE AS DEFAULT)</span>

    Starts the app in <span style="color:cyan">local</span> environment

- ### **Building the App**

  #### When building apps using a specific environment, the resulting build artifacts will be saved to `/builds/<env>/build-<env>-<version-number>`. The latest build will also always overwrite the artifacts found in `/build`.

  - `yarn build:local`

    Builds the app using <span style="color:cyan">local</span> environment

- ### **Testing the App**

  - `yarn test`

    Launches the test runner in the interactive watch mode.\
    See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.
