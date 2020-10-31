/* eslint-disable no-console */
/* eslint-disable semi */
import $ from 'jquery'

import './style.css'

import API from './API'
import store from './store'
import bookmarkList from './bookmark'


const main = () => {
  API.getBookmarks().then((bookmarks) => {
    bookmarks.forEach((bookmark) => {
      store.addBookmark(bookmark)
    })
    bookmarkList.bindEventListeners()
    bookmarkList.render()
  })
}

$(main)