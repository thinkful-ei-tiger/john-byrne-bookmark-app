/* eslint-disable semi */
// This file handles the main fetch function and the CRUD requests

const searchURL = 'https://thinkful-list-api.herokuapp.com/john/bookmarks'

const listApiFetch = (...args) => {
  let error;
  return fetch(...args)
    .then(response => {
      if (!response.ok) {
        error = {code: response.status}
        if (!response.headers.get('content-type').includes('json')) {
          error.message = response.statusText
          return Promise.reject(error)
        }
      }
      return response.json()
    })
    .then(data => {
      if (error) {
        error.message = data.message
        return Promise.reject(error)
      }
      return data
    })
}



const getBookmarks = () => {
  return listApiFetch(`${searchURL}`)
}

const createBookmark = (bookmark) => {
  return listApiFetch(`${searchURL}`, {
    method: 'POST',
    headers: {
      'Content-Type' : 'application/json'
    },
    body: bookmark
  })
}


const modifyBookmark = (id, updateData) => {
  const newData = JSON.stringify(updateData)
  return listApiFetch(`${searchURL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: newData
  }) 
}


const deleteBookmark = (id) => {
  return listApiFetch(`${searchURL}/${id}`, {
    method: 'DELETE'
  })
}

export default {
  getBookmarks,
  createBookmark,
  modifyBookmark,
  deleteBookmark

}