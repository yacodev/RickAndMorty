export function formatResult(name, time, result){
  let resultEpisodeLocation = { "exercise_name": name};
  resultEpisodeLocation["time"]= `${time}ms`;
  resultEpisodeLocation["in_time"] = time<3000;
  resultEpisodeLocation["result"]= result;
  return resultEpisodeLocation
}