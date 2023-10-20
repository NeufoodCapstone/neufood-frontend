# Neufood

## Project Creation

Created February 2022 as a Technical Entrepreneurship project and developed as a Lehigh Computer Science capstone project.

### Faculty Advisor

Sean Vassilaros

### Sponsors

Brad DeMassa\
Grant Kim

### Students

Asher Hamrick\
Anisha Gademsky\
Clare Jachim\
Isabella Hudson

## Neufood Frontend Setup

### General App Information

Node installation page can be found [here](https://nodejs.org/en/download/)\
This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

### Available Scripts

See `package.json` under `scripts`

### Building And Running the App Locally

#### Package Installation

1. To check if Node is installed on your local machine type the below commands into your terminal

```bash
$> npm -v
$> node -v
```

If you encounter an error, then you need to install node\
2. A complete guide to install node can be found [here](https://dev.to/klvncruger/how-to-install-and-check-if-node-npm-on-windows-3ho1)\
3. Clone this repository from github onto your local machine in a place of your choosing\
4. Navigate to the `~/neufood-frontend` (or whatever you have named the cloned repository root) folder on your local system in the terminal\
5. Run the install command to install the necessary dependencies

```bash
$> npm install
```

6. You should now have all the necessary packages installed on your machine

#### Configuring Environment Variables

While running Neufood Frontend locally, you can choose to either make AJAX requests to the deployed production server hosted at `https://fair-lime-harp-seal-gown.cyclic.cloud`
or to a development version of the server that you are hosting locally on your machine (info on running the server locally can be found [here](https://github.com/NeufoodCapstone/neufood-backend#readme)).
By default, the frontend will make AJAX requests to the production server. You can change this behavior by running the below command in your terminal:

```bash
$> export REACT_APP_NODE_ENV=development
```

To change back to making requests to the production server run:

```bash
$> export REACT_APP_NODE_ENV=${any-value-that-isn\'t-development}
```

#### Running Neufood Frontend

1. Now that everything is up to date we will start the app by navigating to the root directory of the repository (i.e. `~/neufood-frontend`)
2. To run the app in the development mode type the below into your terminal instance

```
npm start
```

3. Navigate to [http://localhost:3000](http://localhost:3000) to view the website in your browser
   The page will reload when you make changes.\
   You may also see lint errors in the console.

4. To stop the app from running, press `Ctrl-C` in your terminal instance

#### Deployment

The production version of the frontend can be found at [https://neufood-frontend-seven.vercel.app/](https://neufood-frontend-seven.vercel.app/)

1. To deploy the Neufood Frontend, create a pull request with your changes
2. Once the pull request is approved, squash and merge your feature branch into the `main` branch
3. Once merged, GitHub has a webhook set up with vercel to automatically deploy the `main` branch to production
4. After a few minutes, if you see a green checkmark next to the commit hash on the `main` branch, the frontend has been successfully deployed to production
5. If at any time, you see a red "X" next to the commit hash on the `main` branch, the deployment has failed. Sign into [Vercel](https://vercel.com/) with the `NeufoodCapstone` GitHub account and select the project to view the terminal to diagnose the error

#### Testing the Application

NeuFood uses Jest as its primary testing framework. All tests written should test a single file.
All tests should go in the `/src/test` directory with the same path of the file that is being
tested in the corresponding frontend folder
(i.e. testing the file `/src/pages/friend.js` would be placed in the file
`/src/test/frontend/src/pages/friend.test.js`). All testing files need to have `.test` after
the filename and before `.js` to be run automatically.

In order to run all the unit tests, cd to the root directory and simply run the command:

```bash
$> npx jest
```

Following this, you will be told the number of tests that pass and the number of tests that fail,
including the name and suites of the failing tests.

If you only want to run specific suites of unit tests, run the command:

```bash
$> npx jest <path-to-file>
```

If you want to run every suite of unit tests in a directory, run the command:

```bash
$> npx jest <path-to-directory>/
```

If you want to run every suite of tests with a particular pattern in the name, run the command:

```bash
$> npx jest --testPathPattern=<pattern>
```

ALL tests must pass before you submit a pull request. Failing tests MUST be remedied before review

#### Uninstalling node

1. A guide to uninstall node can be found [here](https://reactgo.com/uninstall-node-npm-from-windows/)
2. Restart your system to apply changes
