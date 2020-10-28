// Functions that return HTML Templates

const grabBookmarkElement = () =>

const grabBookmarkString = () =>

const grabAddBookmark = () =>

const grabStarRating = () =>

const render = () =>


// Event Handlers //

const createBookmarkClick = () =>

const filterBookmarks = () =>

const expandBookmark = () =>

const collapseBookmark = () =>

const deleteBookmark = () =>

const bindEventListeners = () => {
  createBookmarkClick()
  filterBookmarks()
  expandBookmark()
  collapseBookmark()
  deleteBookmark()
}

export default {
  render,
  bindEventListeners
}