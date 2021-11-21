import getEpisodesWithLocations from "../../utils/getEpisodesWithLOcations";

describe("testing function getEpisodesWithLocations",()=>{
  const allEpisodes = [
    {
    id: 1,
    name: "Pilot",
    air_date: "December 2, 2013",
    episode: "S01E01",
    characters: [
    "https://rickandmortyapi.com/api/character/1",
    "https://rickandmortyapi.com/api/character/2",
    ],
    url: "https://rickandmortyapi.com/api/episode/1",
    created: "2017-11-10T12:56:33.798Z"
    },
    {
    id: 2,
    name: "Lawnmower Dog",
    air_date: "December 9, 2013",
    episode: "S01E02",
    characters: [
    "https://rickandmortyapi.com/api/character/38",
    ],
    url: "https://rickandmortyapi.com/api/episode/2",
    created: "2017-11-10T12:56:33.916Z"
    }
  ];

  const characterIdWithOrigin = {"1": "Earth", "2": "Bepis 9", "38":"unknown"}

  const resultExpected = [
    {
      "name": "Pilot",
      "episode": "S01E01",
      "locations": [
        "Earth",
        "Bepis 9",
      ]
    },
    {
      "name": "Lawnmower Dog",
      "episode": "S01E02",
      "locations": [
        "unknown",
      ]
    }
  ]
  const resultObtain = getEpisodesWithLocations(allEpisodes,characterIdWithOrigin);
  test("Return value Function",()=>{
    expect(resultExpected).toEqual(resultObtain);
  })
})