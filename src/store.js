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
  return this.bookmarks.find(currentBookmark => currentBookmark.id === id);
}

const addBookmark = function (bookmark) {
  let expandedObject = {
    expanded: false,
  };
  Object.assign(bookmark, expandedObject);
  this.bookmarks.push(bookmark);
}

function findAndUpdate(id, newData) {
  const currentBookmark = this.findById(id);
  Object.assign(currentBookmark, newData);
}


const findAndDelete = function (id) {
  this.bookmarks = this.bookmarks.filter(currentBookmark => currentBookmark.id !== id);
}

const toggleExpand = function (currentBookmark, arg) {
  currentBookmark 
}

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
  findAndUpdate,
  findAndDelete,
};
