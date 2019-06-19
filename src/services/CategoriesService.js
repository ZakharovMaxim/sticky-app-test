export function getCategories() {
  const categories = localStorage.getItem('categories');
  if (categories) {
    try {
      return JSON.parse(categories)
    } catch(e) {
      return []
    }
  }
  return []
}

export function setCategories(categories) {
  localStorage.setItem('categories', JSON.stringify(categories));
}