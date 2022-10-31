// <!-- GIVEN I am using a daily planner to create a schedule
// WHEN I open the planner
// THEN the current day is displayed at the top of the calendar
// WHEN I scroll down
// THEN I am presented with time blocks for standard business hours
// WHEN I view the time blocks for that day
// THEN each time block is color-coded to indicate whether it is in the past, present, or future
// WHEN I click into a time block
// THEN I can enter an event
// WHEN I click the save button for that time block
// THEN the text for that event is saved in local storage
// WHEN I refresh the page
// THEN the saved events persist -->
var workHours = [9, 17];
var workLength = workHours[1]-workHours[0];
var schedule = [];
for (i = 0; i <= workLength; i++) {
    schedule[i] = {
        "timeSlot":  moment().hour(i+workHours[0]).format('hA'),
        "apptDesc": "",
    }
}
console.log(schedule);
var currentDay = $('#currentDay');
currentDay.text(moment().format('MMMM Do'));

// obj schedule timeSlot, description
// if null build, otherwise parse

//buildSchedul()
//isCurrent()
//isPast()

//save button click // save, purge & rebuild

