# RamyaMTechTask
This framework consists setup for BDD automation tests using cucumber.js and TypeScript for the agify API

## Project structure
<pre>
|---cucumber_tests
|  |---config
|    |---env.ts
|  |---features
|    |---agify.feature
|  |---step_definitions
|    |---agify.steps.ts
|    |---setup.steps.ts
|    |---shared.ts
|---.env
|---cucumber.js
|---tsconfig.json
</pre>
## Setting up
Clone the repository from Git using -- `git clone`

### Pre-requisites
Latest visual studio code - https://code.visualstudio.com/Download
Node-js version 24 or above - https://nodejs.org/en/download
Cucumber plug-in installation `Cucumber (Gherkin) Full support` through extensions in visual studio code

### Installing dependencies
Open the project in visual studio code and open a new terminal in the project
Run `npm install`

#### Dependencies
@cucumber/cucumber
ts-node
typescript
dotenv
axios

## Adding tests
Scenarios are defined in the .feature file under features folder using Gherkin syntax
Steps definitions are implemented in .steps.ts file under step_definitions folder
setup.steps.ts file is for hooks under step_definitions folder
shared.ts file is for reusable types and state under step_definitions folder

## Running tests
Open the project in visual studio code and open a terminal in the project
To run all the tests use - `npx cucumber-js`
To run tests with specific tags use - `npx cucumber-js --tags ""` - example - `npx cucumber-js --tags "@APITest"`

### Test reports
Test reports are automatically generated and stored under reports folder as cucumber-report.html
To view the reports in browser install plug-in `open in browser` through extensions in visual studio code

