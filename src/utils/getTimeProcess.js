export default function getTimeProcess(startTime){
  const finishTime = Date.now();
  return finishTime - startTime;
}