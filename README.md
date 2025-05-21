# 🎬 Movie Finder App
[DEMO of the app deployed via Netlify](https://movie-explorer-vsell.netlify.app/)

A simple React app to search movies by title using the OMDb API. Built with functional components, custom hooks, Tailwind CSS, and dark/light theme support.

## ✨ Features

- 🔍 **Search Movies by Title**  
  Movie search with a 500ms debounce delay to limit API calls.

- 📋 **Paginated Results**  
  Displays results (title, year, poster) with pagination - 10 movies per page.

- ⭐ **Favorites**  
  Add/remove movies to/from **Favourites**, stored in `localStorage`.

- 🌗 **Dark/Light Theme Toggle**  
  Switch between dark and light themes using `useContext`.

## 🛠️ Technical Requirements

- ✅ **React v19** with functional components and React hooks
- 🔁 **Custom Hooks**:
  - `useDebounce` - for search input throttling
  - `usePagination` - for pagination control
- 🌙 **Theme Switching** - implemented with `useContext`
- 💾 **localStorage** - to persist favourite movies
- 🎨 **Tailwind CSS** - clean, readable utility-based styling
