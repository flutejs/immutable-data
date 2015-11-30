import traverse from 'traverse'
export default function getPath(root,obj) {
  return traverse(root).reduce(function(acc,x){
    if (obj === x){
      acc.push(this.path)
    }
    return acc
  }, [])
}