import getTimeProcess from "../../utils/getTimeProcess"

describe(' Testing function getTimeProcess',()=>{
  const startTime = 0;
  const resultExpected = Date.now();
  const resultObtain = getTimeProcess(startTime);
  test('Return value function',()=>{
    expect(resultExpected).toEqual(resultObtain);
  });
})