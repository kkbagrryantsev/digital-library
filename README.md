# Digital library

## Overview

This project is a web application built with React, designed to serve as a minimalistic digital library. All elements are styled to imitate some parts of real books

## Project Idea

The main idea behind this project is to implement a minimalistic digital library with smart search functionality. Smart search suggests the books based on their content and meta infos. Authorized and authenticated moderators can edit books' data and attached files. Moderators are assigned by the administrator manually using direct API calls

## Frontend Architecture

### Components

Below there are some comments for the components, which are complicated in use

**AutoResizableTextArea** \
Acts as a normal textarea, but resizes on input to sync the size with the current amount of text

**PseudoElementShiftAnimationContainer** \
Wrapper for the container which needs to be animated on some nested child element hover. Child needs to access ```PseudoElementShiftAnimationContext``` to toggle animation

**BookAction** \
Shared component for the actions on the book page. Imitates the content's line of a real book. The amount of text dots in the component is computed dynamically to fill all the available space

**useRandomSymbolAnimation** \
Hook which takes a string and returns the same string with a random symbol replaced at random position ignoring the space symbols. Updates are performed on timeout - one symbol per update

### State Management

- [Zustand](https://github.com/pmndrs/zustand)
- [React Context](https://ru.react.js.org/docs/context.html) for UI components

### Routing

- [Wouter](https://github.com/molefrog/wouter) as a lightweight solution for simple routing scenarios

### Known issues

- Authorization is temporarily disabled at the backend, so all other routes are not protected

## How to Run

### Prerequisites

```Node.js``` and ```npm``` installed

### Installation

1. Clone this repository ```git clone https://github.com/kkbagrryantsev/digital-library```
2. Run ```npm install``` in the project directory
3. Clone the backend repo ```git clone https://github.com/miqqra/digital-library```

### Running the Project

Backend is configured to run on port 8080 and CORS policy is configured to accepts requests from port 5173

1. Run the backend application
2. Make sure the port 5173 is not occupied
3. Run ```vite``` in the project directory
4. Navigate to ```/search```

Consider checking the ```package.json``` scripts for other available options

## Technology Stack

- [React](https://ru.legacy.reactjs.org/)
- [Wouter](https://github.com/molefrog/wouter)
- [Zustand](https://github.com/pmndrs/zustand)
- [Axios](https://axios-http.com/)
- [Vite](https://vitejs.dev/)

## License

MIT License

Copyright (c) 2024 Klim Bagryantsev

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
