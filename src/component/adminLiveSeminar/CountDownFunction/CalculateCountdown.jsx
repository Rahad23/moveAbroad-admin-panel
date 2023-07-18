// Client-side implementation for countdown calculation

// On the client-side, use JavaScript to calculate the countdown based on the publish date and registration timing received from the server. Display the countdown on the client-side.

// Example client-side implementation (JavaScript):
function CalculateCountdown(publishDate, registrationTiming) {


    const currentDate = new Date();
    const registrationPublish = publishDate;
    const registrationTime = registrationTiming;
    // eslint-disable-next-line no-unused-vars
    const publishDate_ = new Date(registrationPublish); // Corrected publishDate
    const registrationTimeLimitMonths = new Date(registrationTime); // Registration time limit in months (adjust as needed)

    // Calculate the time difference in milliseconds
    const timeDifference = registrationTimeLimitMonths - currentDate;

// Check if the registration time has passed
if (timeDifference <= 0) {
// Registration time has passed, set all countdown values to 0
return {
  countdown: {
    years: 0,
    months: 0,
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  },
};
}

    // Convert the time difference to days, months, and years
    const millisecondsInADay = 1000 * 60 * 60 * 24;
    const daysDifference = Math.floor(timeDifference / millisecondsInADay);
    const monthsDifference = Math.floor(daysDifference / 30); // Assuming 30 days in a month
    const remainingDays = daysDifference % 30;

    // Calculate the years and months
    const yearsDifference = Math.floor(monthsDifference / 12);
    const monthsRemaining = monthsDifference % 12;

    // Calculate remaining hours, minutes, and seconds
    const hoursDifference = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
    const minutesDifference = Math.floor((timeDifference / (1000 * 60)) % 60);
    const secondsDifference = Math.floor((timeDifference / 1000) % 60);

    // Prepare the result object with the countdown information
    const liveSeminarWithCountdown = {
      countdown: {
        years: yearsDifference,
        months: monthsRemaining,
        days: remainingDays,
        hours: hoursDifference,
        minutes: minutesDifference,
        seconds: secondsDifference,
      },
    };
    return liveSeminarWithCountdown;






    // const targetTime = new Date(targetDate).getTime();
    // const now = new Date().getTime();
    // const timeDifference = targetTime - now;
  
    // if (timeDifference <= 0) {
    //   return {
    //     years: 0,
    //     months: 0,
    //     days: 0,
    //     hours: 0,
    //     minutes: 0,
    //     seconds: 0,
    //   };
    // }
  
    // const millisecondsInADay = 1000 * 60 * 60 * 24;
    // const daysDifference = Math.floor(timeDifference / millisecondsInADay);
    // const monthsDifference = Math.floor(daysDifference / 30);
    // const remainingDays = daysDifference % 30;
    // const yearsDifference = Math.floor(monthsDifference / 12);
    // const monthsRemaining = monthsDifference % 12;
    // const hoursDifference = Math.floor((timeDifference / (1000 * 60 * 60)) % 24);
    // const minutesDifference = Math.floor((timeDifference / (1000 * 60)) % 60);
    // const secondsDifference = Math.floor((timeDifference / 1000) % 60);
  
    // return {
    //   years: yearsDifference,
    //   months: monthsRemaining,
    //   days: remainingDays,
    //   hours: hoursDifference,
    //   minutes: minutesDifference,
    //   seconds: secondsDifference,
    // };
  }
  
  export default CalculateCountdown;

