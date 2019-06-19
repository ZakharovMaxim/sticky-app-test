if (!localStorage.getItem('tags')) {
  localStorage.setItem('tags', 'test1,test2');
}
let tags;
fetchTags()
export function getTags() {
  return localStorage.getItem('tags').split(',');
}
export function compareTags(tagList) {
  tagList.forEach(tag => {
    if (tags.indexOf(tag) === -1) {
      addTag(tag);
    }
  })
}
function addTag(tagname) {
  if (tags.indexOf(tagname) === -1) {
    localStorage.setItem('tags', [...tags, tagname])
  }
  fetchTags()
}
function fetchTags() {
  tags = localStorage.getItem('tags').split(',');
}