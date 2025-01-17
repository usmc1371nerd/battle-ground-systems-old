# Battleground Communication Tool

Welcome to my React project creating a battleground communication tool. This is a project that may not have a significant use in the real world, but it allows me to create an app on something I know a little about. The idea of this project is to provide a tool that can be used by frontline combatants to communicate force numbers, equipment, contact with the enemy, and have tools easily available to ground troops.

## Project Overview

This project aims to develop a robust communication tool for frontline combatants using modern web technologies. The primary goal is to create a user-friendly interface for reporting and accessing critical information on the battlefield.

## Tech Stack

- **Frontend**: React + Vite
- **Backend**: Python (Flask)
- **Authentication**: Clerk

## Features

- **Force Numbers Reporting**: Easily report and view current force numbers.
- **Equipment Tracking**: Log and track equipment status and availability.
- **Enemy Contact Reporting**: Real-time reporting of enemy contact.
- **Tools for Ground Troops**: Provide essential tools and utilities like maps, GPS coordinates, etc.

## Installation

### Prerequisites

- Node.js
- npm or yarn
- Python

### Frontend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/battleground-comm-tool.git
   cd battleground-comm-tool


## Install Dependencies

npm install
or
yarn install

Create a .env file in the root directory and add your Clerk publishable key:

VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here

You have to setup a account with clerk to get your publishable key. 

List of other dependencies:
Leaflet
Axios

**SERVER ISSUES IN DEV**
you can create a https:// to your dev server so you can retrieve locations.. 

steps needed:

in bash you will need to run each of these seperate.. location is US and you can leave all others blank. 

openssl genrsa -out server.key 2048
openssl req -new -key server.key -out server.csr
openssl x509 -req -days 365 -in server.csr -signkey server.key -out server.crt

make sure your vite.config.js looks like this

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, 'server.key')),
      cert: fs.readFileSync(path.resolve(__dirname, 'server.crt'))
    },
    host: true,
  },
});
 
make sure these files are in the root directory
server.crt
server.csr
server.key 
-----------------------------------------------

To run the project:
npm run dev
or 
yarn dev

## Links
**https://clerk.com/** 