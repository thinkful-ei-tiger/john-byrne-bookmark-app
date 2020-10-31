/* eslint-disable quotes */
/* eslint-disable semi */
const bookmarks = []
const adding = false
const error = null
const errorMessage = ""
const rating = 0
const edit = false
const expanded = false
const id = 0


const findById = function (id) {
  return bookmarks.find(currentBookmark => currentBookmark.id === id);
}

const addBookmark = function (bookmark) {
  let expandedObject = {
    expanded: false,
  };
  Object.assign(bookmark, expandedObject);
  this.bookmarks.push(bookmark);
}

const findAndDelete = function (id) {
  this.bookmarks = this.bookmarks.filter(currentBookmark => currentBookmark.id !== id);
}

function findAndUpdate(id, newData) {
  const currentBookmark = findById(id);
  Object.assign(currentBookmark, newData);
}

const toggleExpand = function (currentBookmark) {
  console.log("store CB", currentBookmark);
  findAndUpdate(currentBookmark.id, { expanded: !currentBookmark.expanded });
};

export default {
  bookmarks,
  adding,
  error,
  errorMessage,
  rating,
  edit,
  expanded,
  id,
  addBookmark,
  findById,
  findAndDelete,
  findAndUpdate,
  toggleExpand
}
