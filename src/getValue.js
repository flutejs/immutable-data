export default function getValue(obj, list) {
  let pointer = obj
  list.forEach(key => {
    pointer = pointer[key]
  })
  return pointer
}