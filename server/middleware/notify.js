

async function updateNotifications(user, currentDateTime) {

  for (const workout of user.workouts) {
    const workoutDateTime = getDateTimeFromTimeString(workout.time, currentDateTime);
    const dietHour = workoutDateTime.getHours();
    const dietMinute = workoutDateTime.getMinutes();
    const crntHour = currentDateTime.getHours();
    const crntMinute = currentDateTime.getMinutes();
    if (dietHour == crntHour && dietMinute == crntMinute) {
      const notification = `Your workout ${workout.name} is scheduled up at ${workout.time}`;
      const data ={
        id:workout.id,
        category:"workout",
        message:notification,
        time:Date.now(),
        view:false
      };
      user.notifications.push(data);

    }
  }

  for (const diet of user.diets) {
    const dietDateTime = getDateTimeFromTimeString(diet.time, currentDateTime);
    const dietHour = dietDateTime.getHours();
    const dietMinute = dietDateTime.getMinutes();
    const crntHour = currentDateTime.getHours();
    const crntMinute = currentDateTime.getMinutes();
    if (dietHour == crntHour && dietMinute == crntMinute ) {
 
      const notification = `It's time for your ${diet.name} Set at ${diet.time}`;
      const data ={
        id:diet.id,
        category:"diet",
        message:notification,
        time:Date.now(),
        view:false
      };
      user.notifications.push(data);
    }
  }

}
  


function getDateTimeFromTimeString(timeString, currentDateTime) {
    const [hours, minutes] = timeString.split(':');
    const date = new Date();
    return new Date(currentDateTime.getFullYear(), currentDateTime.getMonth(), currentDateTime.getDate(), hours, minutes);
  }
  
 

  module.exports = updateNotifications;