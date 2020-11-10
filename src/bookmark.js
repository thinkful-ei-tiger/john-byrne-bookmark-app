/* eslint-disable quotes */
/* eslint-disable no-console */
/* eslint-disable semi */
import $ from 'jquery'
import API from './API'
import store from './store'
import rater from 'rater-js'

const grabBookmarkMenu = () => {
  return `
  <center>
    <h1>My Bookmarks</h1>
    <div id="js-menu">
          <button type="button" id="new-btn">New Bookmark</button>
        <label for="stars">Filter By:</label>
        <select name="star-rating" id="rating">
        <option value="0">Show All</option>
        <option value="4">4 Stars & Up</option>
        <option value="3">3 Stars & Up</option>
        <option value="2">2 Stars & Up</option>
        <option value="1">1 Star & Up</option>
        </select>
    </div>
    <div id="js-menu"></div>
    <div id="js-add-item"></div>
    <div id="js-results-list"></div>
  </center>`
}

const addBookmark = () => {
  return `<section class="form-center">
  <form id="js-add">
  <label for="add-new">Title:</label><br>
  <input type="text" name="title" id="add-title" placeholder="Enter Title Here"><br>
  <label for="add-title">Site Link:</label><br>
  <input type="text" name="url" id="js-site-link" placeholder="Enter URL Here"><br>
  <label for="add-desc">Description:</label><br>
  <input type="text" name="desc" id="add-desc" size="30" placeholder="Enter Description Here"><br>
  <div id="stars" style="margin: 20px"></div><br>
  <button type="button" id="cancel-btn">Cancel</button>
  <input type="submit" id="create-btn"></button>
</form>
<section>`
}

const grabBookmarkResult = (bookmark) => {
  if (bookmark.rating < store.rating) {
    return ''
  }
  if (bookmark.expanded) {
    return `
    <section class="project-card">
    <div class="js-bookmark-element" data-bookmark-id="${bookmark.id}" style="margin: 8px 0;">
      <div id="bookmark-title">
        <h2>${bookmark.title} - <img src="images/1star.png" alt="star-pic">${bookmark.rating}</h2>
      </div>
      <div>
        <p>${bookmark.desc}</p>
        <br>
        <a href="${bookmark.url}"><p>Visit Site</p></a>
      </div>
      <button type="button" id="delete-btn" style="margin: 4px;">Delete</button>
      <button type="button" class="expand-collapse">Collapse</button></div>
      </section>`
  } else {
    return `
    <section class="project-card">
    <div class="js-bookmark-element" data-bookmark-id="${bookmark.id}" style="margin: 8px 0;">
      <div id="bookmark-title">
        <h2>${bookmark.title} - <img src="images/1star.png" alt="star-pic">${bookmark.rating}</h2>
      </div>
      <button type="button" id="delete-btn" style="margin: 4px;">Delete</button>

      <button type="button" class="expand-collapse">Expand</button>
    </div>
    </section>`
  }
}

const initialRender = () => {
  $('#app').html(grabBookmarkMenu)
}

const render = () => {
  let html = store.bookmarks.map(grabBookmarkResult)
  $('#js-results-list').html(html)
  if (store.adding === true) {
    $('#js-add-item').html(addBookmark)
    let myRater = rater({
      element: document.querySelector('#stars'),
      rateCallback: (rating, done) => {
        myRater.setRating(rating)
        store.currentRating = rating
        done()
      },
    })
  } else if (store.adding === false) {
    $('#js-add-item').html('')
  }
}

const newBookmarkClick = () => {
  $('#js-menu').on('click', '#new-btn', (event) => {
    console.log(event)
    store.adding = true
    render()
  })
}

const submitNewBookmark = () => {
  $('#js-add-item').on('submit', (event) => {
    event.preventDefault()
    $.fn.extend({
      serializeJSON: function () {
        const formData = new FormData(this[0])
        const jsFormData = {
          rating: store.currentRating,
        }
        formData.forEach((val, name) => (jsFormData[name] = val))
        return JSON.stringify(jsFormData)
      },
    })
    const jsonStringifiedFormData = $('#js-add').serializeJSON()
    API.createBookmark(jsonStringifiedFormData)
      .then((data) => {
        data['expand'] = false
        store.bookmarks.push(data)
        store.adding = false
        store.currentRating = 0
        render()
      })
      .catch((error) => {
        alert(error.message)
      })
  })
}

const handleCancelClick = () => {
  $('#js-add-item').on('click', '#cancel-btn', () => {
    store.adding = false
    render()
  })
}

const getBookmarkIdFromElement = (bookmarks) => {
  return $(bookmarks).closest('.js-bookmark-element').data('bookmark-id')
}

const handleExpand = () => {
  $('#js-results-list').on('click', '.expand-collapse', (event) => {
    event.preventDefault()
    console.log('handleExpand event', event.currentTarget)
    const bookmarkId = $(event.currentTarget)
      .closest('.js-bookmark-element')
      .attr('data-bookmark-id')
    const currentBookmark = store.findById(bookmarkId)
    store.toggleExpand(currentBookmark)
    render()
  })
}

const handleDeleteClicked = () => {
  $('#js-results-list').on('click', '#delete-btn', (event) => {
    const id = getBookmarkIdFromElement(event.currentTarget)
    API.deleteBookmark(id)
      .then(() => {
        store.findAndDelete(id)
        render()
      })
      .catch((error) => {
        alert(error.message)
      })
  })
}

const handleRatingFilter = () => {
  $('#js-menu').on('change', '#rating', (event) => {
    event.preventDefault()
    store.rating = event.currentTarget.value
    if (store.rating === 1) {
      const filteredBookmarks = store.bookmarks.filter(
        (bookmark) => bookmark.rating >= 1
      )
      return filteredBookmarks
    }
    render()
  })
}

const bindEventListeners = () => {
  newBookmarkClick()
  handleCancelClick()
  submitNewBookmark()
  handleExpand()
  handleRatingFilter()
  handleDeleteClicked()
  handleRatingFilter()
}

export default {
  initialRender,
  render,
  bindEventListeners,
}
