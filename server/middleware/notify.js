

async function updateNotifications(user, currentDateTime) {
    for (const workout of user.workouts) {
      const workoutDateTime = getDateTimeFromTimeString(workout.time, currentDateTime);
      if (isUpcoming(workoutDateTime)) {
        const notification = `Your workout '${workout.name}' is coming up at ${workout.time}`;
        const data = {
            message:notification,
            time:currentDateTime
        }
        user.notifications.push(data);
      }
    }
    for (const diet of user.diets) {
      const dietDateTime = getDateTimeFromTimeString(diet.time, currentDateTime);
      if (isUpcoming(dietDateTime)) {
        const notification = `It's time for your '${diet.name}' diet at ${diet.time}`;
        const data = {
            message:notification,
            time:currentDateTime
        }
        user.notifications.push(data);
      }
    }
  }
  





function getDateTimeFromTimeString(timeString, currentDateTime) {
    const [hours, minutes] = timeString.split(':');
    return new Date(currentDateTime.getFullYear(), currentDateTime.getMonth(), currentDateTime.getDate(), hours, minutes);
  }
  
  function isUpcoming(dateTime) {
    const now = new Date();
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    return dateTime >= now && dateTime <= tomorrow;
  }

  module.exports = updateNotifications;