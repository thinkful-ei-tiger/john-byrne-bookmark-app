/* eslint-disable no-console */
/* eslint-disable semi */
import $ from 'jquery'
import API from './API'

import store from './store'

// // Functions that return HTML Templates

const grabBookmarkMenu = () => {
  return `
  <div id="js-menu">
    <button type="button" id="new-btn">New</button>
    <div>  
      <label for="stars">Filter By:</label>
      <select name="star-rating" id="rating">
      <option value="5">5 Stars</option>
      <option value="4">4 Stars & Up</option>
      <option value="3">3 Stars & Up</option>
      <option value="2">2 Stars & Up</option>
      <option value="1">1 Star & Up</option>
      </select>
    <div>  
  </div>` 
}

const addBookmark = () => {
  return`<form id="js-add">
    <label for="add-new">Title:</label><br>
    <input type="text" name="title" id="add-title"><br>
    <label for="add-title">Site Link:</label><br>
    <input type="text" name="url" id="js-site-link"><br>
    <label for="add-desc">Description:</label><br>
    <input type="text" name="desc" id="add-desc" size="30"><br>
    <button type="button" id="cancel-btn">Cancel</button>
    <button type="button" id="create-btn">Create</button>

    <h2>Link Description</h2>
    <hr>
    <div class="stars">
        <input id="star-1" type="radio" name="rating" value="1">
        <label class="star star-1" for="star-1"></label>
        <input id="star-2" type="radio" name="rating" value="2">
        <label class="star star-2" for="star-2"></label>
        <input id="star-3" type="radio" name="rating" value="3">
        <label class="star star-3" for="star-3"></label>
        <input id="star-4" type="radio" name="rating" value="4">
        <label class="star star-4" for="star-4"></label>
        <input id="star-5" type="radio" name="rating" value="5">
        <label class="star star-5" for="star-5"></label>
      </form>
    </div>
  <form>`
}

const grabBookmarkResult = (bookmark) => {
  if(bookmark.rating < store.rating ) {
    return ''
  }
  if(bookmark.expanded) {
    return `<div class="js-bookmark-element" data-bookmark-id="${bookmark.id}">
      <div id="bookmark-title">${bookmark.title}${bookmark.rating}</div><button type="button" id="delete-btn">Delete</button><button type="button" class="expand-collapse">Expand</button></div>`
  } else {
    return `<div class="js-bookmark-element" data-bookmark-id="${bookmark.id}">
    <div id="bookmark-title">${bookmark.title}${bookmark.rating}</div><button type="button" id="delete-btn">Delete</button><button type="button" class="expand-collapse">Collapse</button>
    <div class>${bookmark.desc}<br>${bookmark.url}</div>`
  }
}


const render = () => {
  console.log(store)
  let html = store.bookmarks.map(grabBookmarkResult)
  console.log(html)
  $('#js-results-list').html(html)
  if(store.adding === true) {
    $('#js-menu').html('')
    $('#js-add-item').html(addBookmark)
  } else if (store.adding === false) {
    $('#js-add-item').html('')
    $('#js-menu').html(grabBookmarkMenu)
  } else {
    // TO DO IF SOMETHING BREAKS
  }
}


// // Event Handlers //

const newBookmarkClick = () => {
  $('#js-menu').on('click', '#new-btn', (event) => {
    console.log(event)
    store.adding = true
    render()
  })
}

const submitNewBookmark = () => {
  $('#js-add-item').on('click', '#create-btn', (event) => {
    event.preventDefault()
    $.fn.extend({
      serializeJSON: function () {
        const formData = new FormData(this[0])
        const jsFormData = {}
        formData.forEach((val, name) => (jsFormData[name] = val))
        return JSON.stringify(jsFormData)
      }
    })
    const jsonStringifiedFormData = $('#js-add').serializeJSON()
    console.log(jsonStringifiedFormData)
    API
      .createBookmark(jsonStringifiedFormData)
      .then((data) => {
        console.log()
        data['expand'] = false
        data['edit'] = false
        store.bookmarks.push(data)
        store.adding = false
        render()
      })
  })
}

// const findError = () => {
//   $()
// }

const handleCancelClick = () => {
  $('#js-add-item').on('click', '#cancel-btn', (event) => {
    store.adding = false
    render()
  })
}

const getBookmarkIdFromElement = (bookmarks) => {
  return $(bookmarks)
    .closest('.js-bookmark-element')
    .data('bookmark-id')
}

const handleExpand = () => {
  $('#js-results-list').on('click', '.expand-collapse', (event) => {
    event.preventDefault()
    console.log(event)
    const bookmarkId = $(event.currentTarget)
      .closest('.js-bookmark-element')
      .find('#data-bookmark-id')
      .attr('id')
      console.log(bookmarkId)
    const currentBookmark = store.findById(bookmarkId)
    
    render()  
  })  
}

const handleDeleteClicked = () => {
  $('#js-results-list').on('click', '#delete-btn', (event) => {
    const id = getBookmarkIdFromElement(event.currentTarget)
    API.deleteBookmark(id)
      .then(() => {
        store.findAndDelete(id);
        render()
      })
      .catch((error) => {
        console.log(error)
        store.setError(error.message)
        generateError()
      })
  })
}

const handleRatingFilter = () => {
  $('#js-menu').on('change', '#rating', event => {
    event.preventDefault()
    store.rating =$('#rating').val()
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
  render,
  bindEventListeners
}