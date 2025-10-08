# SRS_Creator_FE

project stucture - 
1. package.json
2. next.config.js
3. tailwind.config.js
4. postcss.config.js
5. .env.local        
6. /public
   6.a. logo.png
7. /styles
   7.a. globals.css
8. /utils
   8.a. api.js
9. /components
   9.a. Navbar.jsx
   9.b. ProjectList.jsx
   9.c. ProjectEditor.jsx
   9.d QuestionBox.jsx
10. /pages
   10.a.  _app.jsx
   10.b. index.jsx
   10.c. new.jsx
   10.d. project/[id].jsx


    Changes needed to make -
    .env.local → add  Firebase keys, backend API URL, Socket.IO URL.

     utils/api.js → confirm backend endpoints match /projects and /projects/:id.

     components/ProjectEditor.jsx → for live transcription if integrate audio.

      pages/index.jsx → name, logo, colors.
