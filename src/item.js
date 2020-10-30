import cuid from 'cuid'

const validateName = (name) => {
  if (!name) throw new TypeError('Name must not be blank')
}

const create = (name) => {
  return {
    id: cuid(),
    name,
    desc,
    expanded: false
  }
}

export default {
  validateName,
  create
}