# Time Tracker

React + Vite single-page app for recording and analysing time spent on arbitrary activities.

    npm install
    npm run dev

## Routes
- `/` Tracker, `/history` History, `/stats` Statistics, `/info` Info
- Unknown addresses redirect to `/`.

## Structure
- `src/views/index.js` – registry of views (id, path, label, component); add a view = add one entry
- `src/views/*View.jsx` – one component per view
- `src/components/NavBar.jsx` – menu using `NavLink`
- `src/App.jsx` – frame: menu + `<Routes>`
- `src/main.jsx` – wraps the app in `BrowserRouter`