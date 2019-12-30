<h1 align="center">
  <img alt="Radar" title="Radar" src=".github/logo-radar.png" width="600px" />
</h1>

<h3 align="center">
  Challenge Junior / Pleno
  <p>Develop a CRUD using Node / Express, creating a preferred API using GraphQL, but will also accept RESTful, where the main entity will be user and should have the following fields: name, address, email, city and state and automatically generate a field called createdAt that will tell you when this user was created.</p>
  <p>State and city information is being searched by the IBGE API</p>
</h3>

<p align="center">
  <img alt="Github Last Confirmation" src = "https://img.shields.io/github/last-commit/joaogasparr/brazil-ibge-locations">
  <img alt="GitHub Main Language" src = "https://img.shields.io/github/languages/top/joaogasparr/brazil-ibge-locations">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/joaogasparr/brazil-ibge-locations?color=%2304D361">
  <img alt="License" src="https://img.shields.io/badge/license-MIT-%2304D361">

  <a href="https://github.com/joaogasparr/brazil-ibge-locations/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/joaogasparr/brazil-ibge-locations?style=social">
  </a>
</p>

## :rocket: Getting Started

The following instructions show the walkthrough of how to copy the project to run on local machine for development and testing purposes.

### Prerequisites

- [Git](https://git-scm.com)
- [NodeJS](https://nodejs.org/en/)
- [Yarn](https://yarnpkg.com/en/docs/install)
- [Docker](https://docs.docker.com/install/)
- [IBGE API Documentation](https://servicodados.ibge.gov.br/api/docs/localidades?versao=1)

### Installing

A step by step series of examples that tell you how to get a development env running

```
# Run the following command in a local directory to copy the project.

$> git clone https://github.com/joaogasparr/brazil-ibge-locations.git
```

### :books: Databases

The first thing you must do is configure all database settings. To do this, follow the steps below at the terminal.

```
$> docker run --name postgresql -e POSTGRES_PASSWORD=postgres -p 5432:5432 -d postgres:11
```

### :gear: Back-end

```
# First install back-end dependencies
$> cd ./backend/ && yarn

# Create the .env file by copying from .env.example and replace the information
$> cp .env.example .env

# Start back-end service
$> yarn dev
```

### :computer: Front-end

```
# First install front-end dependencies
$> cd ./frontend/ && yarn

# Then run app
$> yarn start
```

---

## :memo: Licença

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

---

Made with ♥ by João Vitor Gaspar :wave: [See my linkedin!](https://www.linkedin.com/in/jo%C3%A3o-vitor-gaspar-b1b527170/)
