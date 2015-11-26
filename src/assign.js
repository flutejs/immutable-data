import objectAssign from 'object-assign'
import isArray from 'is-array'

export default function assign() {
  return objectAssign(isArray(arguments[0])?[]:{},...arguments)
}