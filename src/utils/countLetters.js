export default function countLetters(arr,letter){
  const allLetters = arr.join('').toLowerCase();
  return allLetters.split(letter).length - 1;
}