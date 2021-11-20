import countLetters from "../../utils/countLetters";

describe(' Testing funtion countLetters',()=>{
  const arrayLetter = ["car","luis","saul"];
  const letter = "l";
  const resultExpected = 2;
  const resultObtain = countLetters(arrayLetter,letter);
  test('Return value function',()=>{
    expect(resultExpected).toEqual(resultObtain);
    
  });
  test('Is a result a number',()=>{
    expect(typeof(resultObtain)).toBe('number');
  });
})