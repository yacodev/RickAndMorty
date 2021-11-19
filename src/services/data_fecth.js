export async function getData(url){
  return fetch(url)
  .then((res)=>res.json())
  .catch((error)=> {throw new Error(error)})
}