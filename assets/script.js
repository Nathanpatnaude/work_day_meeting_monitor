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
var workHours = [9, 17]; // input on 24 clock [start time, end time]
var workLength = workHours[1] - workHours[0];
var schedule = [];


var currentDay = $('#currentDay');
var currentHour = moment().format('H');
currentDay.text(moment().format('MMMM Do'));
var scheduleContainer = $('.container');

function getSchedule() {
    var storedSchedule = JSON.parse(localStorage.getItem("schedule"));
    if (storedSchedule === null) {
        for (i = 0; i <= workLength; i++) {
            schedule[i] = {
                "timeSlot": moment().hour(i + workHours[0]).format('hA'),
                "apptDesc": "",
                "state": "",
            }
        };
    } else {
        schedule = storedSchedule;
    }
}

function setState (hour) {
    var qHour = hour +workHours[0];
    console.log(qHour);
    if (qHour < currentHour) {
        schedule[hour].state = 'past';
    } else if (qHour === currentHour) {
        schedule[hour].state = 'present';
    } else {
        schedule[hour].state = 'future';
    }
    console.log(schedule[hour].state)
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

    setState(i);

    var apptSubject = $('<div>')
    .addClass('p-0 col-10 ' + schedule[i].state);

    var apptInput = $('<p>')
    .addClass('description col-12')
    .text('dv ');

    var apptSave = $('<button>')
    .addClass('col-1 saveBtn')
    .attr({
        id: 'save-button-' + (i + workHours[0]),
        type: 'button',
    });

    var saveIcon = $('<i>')
    .addClass('fas fa-save fa-2x');

    $(scheduleContainer).append(apptRow);
    $(apptRow).append(apptTime);
    $(apptRow).append(apptSubject);
    $(apptSubject).append(apptInput);
    $(apptRow).append(apptSave);
    $(apptSave).append(saveIcon);
    console.log('test');
}

$('.col-10').on( 'click', 'p', function() {
    var text = $(this).text().trim();
    var input = $('<textarea>').val(text);

    $(this).replaceWith(input);
    input.trigger('focus');

});

$('.col-10').on('blur', 'textarea', function() {
    var ext = $(this).val().trim();
    var userinput = $('<p>').addClass('description col-12').text(ext);
    $(this).replaceWith(userinput);
});





// obj schedule timeSlot, description
// if null build, otherwise parse
//buildSchedul()

//isCurrent()
//isPast()

//save button click // save, purge & rebuild


