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
var workHours = [9, 17]; // input on 24 clock
var workLength = workHours[1] - workHours[0];
var schedule = [];


var currentDay = $('#currentDay');
currentDay.text(moment().format('MMMM Do'));
var scheduleContainer = $('.container');


function getSchedule() {
    var storedSchedule = JSON.parse(localStorage.getItem("schedule"));
    if (storedSchedule === null) {
        for (i = 0; i <= workLength; i++) {
            schedule[i] = {
                "timeSlot": moment().hour(i + workHours[0]).format('hA'),
                "apptDesc": "",
            }
        };
    } else {
        schedule = storedSchedule;
    }
}


getSchedule();
for (i = 0; i < schedule.length; i++) {
    var apptRow = $('<div>')
    .addClass('row time-block')
    .attr({ 
        id: 'row-' + (i + workHours[0]) 
    });
    var apptTime = $('<div>')
    .addClass('hour col-1 justify-center')
    .text(schedule[i].timeSlot);
    $(scheduleContainer).append(apptRow);
    $(apptRow).append(apptTime);
    console.log('test');
}



// obj schedule timeSlot, description
// if null build, otherwise parse

//buildSchedul()
//isCurrent()
//isPast()

//save button click // save, purge & rebuild


