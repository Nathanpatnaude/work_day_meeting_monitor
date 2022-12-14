// #H input on 24 clock; workHours= [first appointment, last appointment]
var workHours = [9, 17];

var workLength = workHours[1] - workHours[0];
var schedule = [];

var currentDay = $('#currentDay');
var currentHour = moment().format('H');
currentDay.text(moment().format('MMMM Do'));
var scheduleContainer = $('.container');
var saved = $('#saved').css('color', "#77dd77")

//finds or builds [{}, {}]
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

//updates current hour position in schedule
function setState(hour) {
    var qHour = hour + workHours[0];
    if (qHour < currentHour) {
        schedule[hour].state = 'past';
    } else if (qHour > currentHour) {
        schedule[hour].state = 'future';
    } else {
        schedule[hour].state = 'present';
    }
}

// saves current row text in schedule[row].apptDesc
// then saves schedule[] in localstorage 
function saveSchedule(hour, appt) {
    for (i = 0; i < schedule.length; i++) {
        if (schedule[i].timeSlot === hour) {
            schedule[i].apptDesc = appt;
        };
    }
    localStorage.setItem("storedSchedule", JSON.stringify(schedule));
}

//forces a schedule[] structure
getSchedule();
//builds schedule[] interface based on workHours[1,2]
//savebtn diables savebtn + saveSchedule
for (i = 0; i < schedule.length; i++) {
    var apptRow = $('<div>')
        .addClass('row time-block');

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
            type: 'button',
        })
        .on('click', function () {
            var hour = $(this).siblings().first().text();
            var appt = $(this).siblings().last().children().text();
            saveSchedule(hour, appt);
            $(this).attr("disabled", true).css('background-color', "#d3d3d3");
            saved.text("Saved!");
        });

    var saveIcon = $('<i>')
        .addClass('fas fa-save fa-2x');

    $(scheduleContainer).append(apptRow);
    $(apptRow).append(apptTime);
    $(apptRow).append(apptSubject);
    $(apptSubject).append(apptInput);
    $(apptRow).append(apptSave);
    $(apptSave).append(saveIcon);
}


// creates textarea within clicked descrition area
// enables save button
$('.col-10').on('click', 'p', function () {
    var text = $(this).text().trim();
    var input = $('<textarea>').val(text);
$(this).parent().siblings().last().attr("disabled", false).css('background-color', "#06aed5");
saved.text("");

    $(this).replaceWith(input);
    input.trigger('focus');
    
});

//deselecting removes textarea, moves text to previous <p> format
$('.col-10').on('blur', 'textarea', function () {
    var ext = $(this).val().trim();
    var userinput = $('<p>').addClass('description col-12').text(ext);


    $(this).replaceWith(userinput);
});