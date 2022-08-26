[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

# Alcally

Alcally is a modern task management tool for legal corporate obligations.

Based on the details of a given company initially provided by the user, Alcally automatically generates a list of the legally required actions to be performed by the management of the company (e.g. submit annual accounts, renew members of the board, etc.). The app also features a dashboard showing upcoming actions, overview of the current board members and other relevant details of the company.

<img src="./alcally-screenshot-1.png" width="400" height="220" alt="alcally-screenshot-1" />
<img src="./alcally-screenshot-2.png" width="400" height="220" alt="alcally-screenshot-2" />
<img src="./alcally-screenshot-3.png" width="400" height="220" alt="alcally-screenshot-3" />

### Tech stack

<p align="left">
<a href="https://www.typescriptlang.org/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/typescript-colored.svg" width="36" height="36" alt="TypeScript" /></a>
<a href="https://reactjs.org/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/react-colored.svg" width="36" height="36" alt="React" /></a>
<a href="https://mui.com/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/materialui-colored.svg" width="36" height="36" alt="Material UI" /></a>
<a href="https://firebase.google.com/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/firebase-colored.svg" width="36" height="36" alt="Firebase" /></a>
<a href="https://www.postgresql.org/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/postgresql-colored.svg" width="36" height="36" alt="PostgreSQL" /></a>
<a href="https://www.prisma.io/" target="_blank" rel="noreferrer"><img src="https://www.freelogovectors.net/wp-content/uploads/2022/01/prisma_logo-freelogovectors.net_.png" width="36" height="36" alt="Prisma" /></a>
<a href="https://expressjs.com/" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/danielcranney/readme-generator/main/public/icons/skills/express-colored.svg" width="36" height="36" alt="Express" /></a>
</p>


### Getting started:

1. Generate .env files based on the .example.env files provided

2. Install root folder dependencies

```sh
npm i
```

3. Run server:

```sh
cd server
npm i
npx tsc --watch
npx nodemon dist/server/index.js
```
4. Run client:

```sh
cd client
npm i
npm start
```

