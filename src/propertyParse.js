import parser from './property.jison'
export default function propertyParse(str) {
  return parser.parse(str)
}