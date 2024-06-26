// Import data from data.js
import { books, authors, genres } from "./data.js";

// Ensure books array exists and is an array
if (!books || !Array.isArray(books)) {
  throw new Error('Books data is missing or not an array.');
}

// Ensure range exists and has at least 2 values
const range = books.length;
if (!range || range < 2) {
  throw new Error('Range must be an array with two numbers');
}

// Define colors for day and night modes
const day = {
  dark: '10, 10, 20',
  light: '255, 255, 255',
};
const night = {
  dark: '255, 255, 255',
  light: '10, 10, 20',
};

// Create document fragment for previews
const fragment = document.createDocumentFragment();
let startIndex = 0;
let endIndex = 36;
const extracted = books.slice(startIndex, endIndex);

// Loop through the extracted previews and append them to the fragment
for (let i = 0; i < extracted.length; i++) {
  const preview = document.createElement('dl');
  preview.className = 'preview';
  preview.dataset.id = books[i].id;
  preview.dataset.title = books[i].title;
  preview.dataset.image = books[i].image;
  preview.dataset.subtitle = `${authors[books[i].author]} (${new Date(books[i].published).getFullYear()})`;
  preview.dataset.description = books[i].description;
  preview.dataset.genre = books[i].genres;
  preview.innerHTML = `
      <div>
        <image class='preview__image' src="${books[i].image}" alt="book pic"/>
      </div>
      <div class='preview__info'>
        <dt class='preview__title'>${books[i].title}</dt>
        <dt class='preview__author'> By ${authors[books[i].author]}</dt>
      </div>`;
  fragment.appendChild(preview);
}
const booklist1 = document.querySelector('[data-list-items]');
booklist1.appendChild(fragment);

// Create options for authors select
const authorSelect = document.querySelector("[data-search-authors]");
authorSelect.innerHTML = `<option value="any">All Authors</option>`;
for (const authorId in authors) {
  const optionElement = document.createElement('option');
  optionElement.value = authorId;
  optionElement.textContent = authors[authorId];
  authorSelect.appendChild(optionElement);
}

// Create options for genres select
const genreSelect = document.querySelector("[data-search-genres]");
genreSelect.innerHTML = `<option value="any">All Genres</option>`;
for (const [genreId, genreName] of Object.entries(genres)) {
  const optionElement = document.createElement('option');
  optionElement.value = genreId;
  optionElement.textContent = genreName;
  genreSelect.appendChild(optionElement);
}

// Change themes
const settingOverlay = document.querySelector('[data-header-settings]');
const themePopUp = document.querySelector('[data-settings-overlay]');
settingOverlay.addEventListener('click', () => {
  themePopUp.style.display = "block";
});

const saveButton = document.querySelector("[data-settings-form]");
saveButton.addEventListener('submit', (event) => {
  event.preventDefault();
  const dataSettingsTheme = document.querySelector('[data-settings-theme]');
  if (dataSettingsTheme.value === 'day') {
    document.querySelector('body').style.setProperty('--color-dark', day.dark);
    document.querySelector('body').style.setProperty('--color-light', day.light);
  }
  if (dataSettingsTheme.value === 'night') {
    document.querySelector('body').style.setProperty('--color-dark', night.dark);
    document.querySelector('body').style.setProperty('--color-light', night.light);
  }
});

// Show and hide search overlay
const searchButton = document.querySelector("[data-header-search]");
const searchOverlay = document.querySelector("[data-search-overlay]");
const searchCancel = document.querySelector("[data-search-cancel]");
const searchInput = document.querySelector("[data-search-input]");
const searchClear = document.querySelector("[data-search-clear]");

// Function to show search overlay
const showSearchOverlay = () => {
  searchOverlay.style.display = "block";
  searchInput.focus(); // Automatically focus on the search input when the overlay is displayed
};

// Function to hide search overlay
const hideSearchOverlay = () => {
  searchOverlay.style.display = "none";
  searchInput.value = ""; // Clear search input when hiding overlay
};

// Event listener to show search overlay when search button is clicked
searchButton.addEventListener('click', () => {
  showSearchOverlay();
});

// Event listener to hide search overlay when cancel button is clicked
searchCancel.addEventListener('click', () => {
  hideSearchOverlay();
});

// Event listener to hide search overlay when clicking outside of it
window.addEventListener('click', (event) => {
  if (event.target === searchOverlay) {
    hideSearchOverlay();
  }
});

// Event listener to close search overlay when escape key is pressed
window.addEventListener('keydown', (event) => {
  if (event.key === "Escape") {
    hideSearchOverlay();
  }
});

// Event listener to clear search input
searchClear.addEventListener('click', () => {
  searchInput.value = ""; // Clear search input
  searchInput.focus(); // Focus on search input after clearing
});

// Simulated search functionality (Replace this with actual search implementation)
searchInput.addEventListener('input', () => {
  // This is a placeholder for actual search functionality
  // You would replace this with your backend logic to search through content
  console.log("Searching for:", searchInput.value);
});
































