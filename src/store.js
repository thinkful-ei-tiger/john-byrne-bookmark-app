/* eslint-disable quotes */
/* eslint-disable semi */
const bookmarks = [];
const adding = false;
const error = null;
const rating = 0;
const currentRating = 0;
const expanded = false;

const findById = function (id) {
  return bookmarks.find((currentBookmark) => currentBookmark.id === id);
};

const addBookmark = function (bookmark) {
  let expandedObject = {
    expanded: false,
  };
  Object.assign(bookmark, expandedObject);
  this.bookmarks.push(bookmark);
};

const findAndDelete = function (id) {
  this.bookmarks = this.bookmarks.filter(
    (currentBookmark) => currentBookmark.id !== id
  );
};

function findAndUpdate(id, newEntry) {
  const currentBookmark = findById(id);
  Object.assign(currentBookmark, newEntry);
}

const toggleExpand = function (currentBookmark) {
  findAndUpdate(currentBookmark.id, { expanded: !currentBookmark.expanded });
};

export default {
  bookmarks,
  adding,
  error,
  rating,
  currentRating,
  expanded,
  addBookmark,
  findById,
  findAndDelete,
  findAndUpdate,
  toggleExpand,
};
