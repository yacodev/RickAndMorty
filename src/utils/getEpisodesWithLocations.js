export default function getEpisodesWithLocations(allEpisodes, characterIdWithOrigin){
  let resultEpisodesLocations = [];
  allEpisodes.forEach((episode)=>{
    let episodesByLocations = {};
    episodesByLocations["name"]= episode.name;
    episodesByLocations["episode"]=episode.episode;
    episodesByLocations["locations"]=[];
    let arrayLocationsOrigin = [];

    episode.characters.forEach((character)=>{
      let characterIdFound = character.match(/\d+/);
      let locationOrigin = characterIdWithOrigin[characterIdFound[0]];
      arrayLocationsOrigin.push(locationOrigin);
    })

    episodesByLocations["locations"] = [... new Set(arrayLocationsOrigin)]
    resultEpisodesLocations.push(episodesByLocations);
  })
  return resultEpisodesLocations
}