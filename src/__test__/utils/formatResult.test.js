import { formatResult } from "../../utils/formatResult";

describe('Testing function formatResult',()=>{
  const name = "Char counter";
  const time = 545;
  const result = [
    {
        "char": "l",
        "count": 12345,
        "resource": "location"
    },
    {
        "char": "e",
        "count": 12345,
        "resource": "episode"
    },
    {
        "char": "c",
        "count": 12345,
        "resource": "character"
    }
  ];
  const resultObtain = formatResult(name,time,result);
  
  const resultExpeted = {
    "exercise_name": "Char counter",
    "time": "545ms",
    "in_time": true,
    "result": [
        {
            "char": "l",
            "count": 12345,
            "resource": "location"
        },
        {
            "char": "e",
            "count": 12345,
            "resource": "episode"
        },
        {
            "char": "c",
            "count": 12345,
            "resource": "character"
        }
      ]
    };

  test('Return value function',()=>{
    expect(resultExpeted).toEqual(resultObtain);
  });
})