## Getting started - Setting up a React project



1. Development tools
    - The basic set:
      - Git + GitHub
      - Node.js + npm
      - VS Code + extensions, add 'ES7+ React/Redux/React-Native snippets'
      - Browser + dev tools (+ [React Developer Tools](https://chromewebstore.google.com/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi))
    - [Vite](https://vitejs.dev/) for project scaffolding and automated development tasks
1. Create a new project with Vite
    - `npm create vite@latest my-app`
      - Choose 'React' -> 'TypeScript + SWC'
    - `cd my-app`
    - `npm install`
    - `npm run dev`
    - Open <http://localhost:port> in your browser (remember to check the port from the console output and open dev tools)
    - Open the project folder in code editor

1. Create new file '.editorconfig' and add this content:

   ```conf
   root = true

   [*]
   indent_style = space
   indent_size = 2
   end_of_line = lf
   charset = utf-8
   trim_trailing_whitespace = true
   insert_final_newline = true
   ```

1. Install prettier: `npm install --save-dev --save-exact prettier` and `npm install --save-dev eslint-config-prettier`
1. If using VSCode, Create new file `.prettierrc` and add this content:

   ```json
   {
       "semi": true,
       "singleQuote": true,
       "tabWidth": 2,
       "useTabs": false,
       "bracketSpacing": false
   }
   ```

1. Review the example code and application structure in `src/` folder
   - `main.tsx` is the starting point that creates the root component of the React app and binds it to the DOM
   - `App.tsx` contains the main component of you app
   - [`<StrictMode>`](https://react.dev/reference/react/StrictMode) lets you find common bugs in your components early during development
1. Clean up & modify the example code in following files to get a clean starting point
    - `src/App.tsx`, modify to function component and remove unnecessary code:

      ```js
      import './App.css';
      const App = () => {
        return (
          <>
            <h1>My App</h1>
          </>
        );
      };
      export default App;
      ```

    - `src/App.css`: remove unused styles
    - `src/index.css`: remove unused styles
1. Create a new project in Github and push your code branches there
    - `git init`, `git add .`, `git commit -m "Initial commit"`, `git branch -M main`, `git remote add origin ...`, `git push -u origin main`

