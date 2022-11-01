 // #H input on 24 clock; workHours= [first appointment, last appointment]
var workHours = [9, 17];

var workLength = workHours[1] - workHours[0];
var schedule = [];

var currentDay = $('#currentDay');
var currentHour = moment().format('H');
currentDay.text(moment().format('MMMM Do'));
var scheduleContainer = $('.container');

function getSchedule() {
    var storedSchedule = JSON.parse(localStorage.getItem("storedSchedule"));
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

function setState(hour) {
    var qHour = hour + workHours[0];
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

function saveSchedule(hour, appt) {
    console.log(hour);
    for (i = 0; i < schedule.length; i++) {
        console.log(schedule[i].timeSlot);

        

        if (schedule[i].timeSlot === hour) {
            schedule[i].apptDesc = appt;
            console.log(schedule[i].apptDesc);
        };
    }
    localStorage.setItem("storedSchedule", JSON.stringify(schedule));
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
        .text(schedule[i].apptDesc);

    var apptSave = $('<button>')
        .addClass('col-1 saveBtn')
        .attr({
            id: 'save-button-' + (i + workHours[0]),
            type: 'button',
        })
        .on('click', function () {
            // need constant !=i, in h4, need to get first sibling text
            var hour = $(this).siblings().first().text();
            // need text on row from apptInput, need last sibling's child text
            var appt = $(this).siblings().last().children().text();
            saveSchedule(hour, appt);
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



$('.col-10').on('click', 'p', function () {
    var text = $(this).text().trim();
    var input = $('<textarea>').val(text);

    $(this).replaceWith(input);
    input.trigger('focus');

});

$('.col-10').on('blur', 'textarea', function () {
    var ext = $(this).val().trim();
    var userinput = $('<p>').addClass('description col-12').text(ext);
    $(this).replaceWith(userinput);
});