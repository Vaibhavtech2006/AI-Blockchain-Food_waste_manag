// src/utils.js

// Example function
export function createPageUrl(pageName) {
  return `/pages/${pageName}`;
}

// You can add more utility functions here
export function formatDate(date) {
  return new Date(date).toLocaleDateString();
}
