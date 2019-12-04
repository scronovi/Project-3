// Set focus on the first form element
$('#name').focus();

// Hide textarea for "other" option
$('#other-title').hide()

// Attach change event handler to dropdown menu
$('#title').on('change', function(e){
    // if selected option is 'other' then show textarea, otherwise hide it
    let selectedOption = $('#title option:selected').val();
    if(selectedOption == 'other') {
        $('#other-title').show();
    }else {
        $('#other-title').hide();
    }
});

// Hide the color-options if the user has not yet picked a theme
// Show color options based on which design is chosen and update dropdown menu
$('#color').hide();
$('#design option:first').hide();
$('#design').on('change', function(e){
    if ($('#design option:selected').val() == "js puns"){
        $('#color').show();
        $('#color option[value="cornflowerblue"]').show().attr('selected', 'selected');
        $('#color option[value="darkslategrey"]').show();
        $('#color option[value="gold"]').show();
        $('#color option[value="tomato"]').hide().attr('selected', false);
        $('#color option[value="steelblue"]').hide();
        $('#color option[value="dimgrey"]').hide();

    }else if ($('#design option:selected').val() == 'heart js'){
        $('#color').show();
        $('#color option[value="cornflowerblue"]').hide().attr('selected', false);
        $('#color option[value="darkslategrey"]').hide();
        $('#color option[value="gold"]').hide();
        $('#color option[value="tomato"]').show().attr('selected', true);
        $('#color option[value="steelblue"]').show();
        $('#color option[value="dimgrey"]').show();

    }
});

let activityCostDiv = $('<div id="totalCost"></div>');
const activitiesData = $('.activities input:checkbox').each(function(i){
    console.log(this);
    return this;
});

$('.activities').append(activityCostDiv);
let totalPrice = 0;

$('.activities input:checkbox').on('click', function(e){ 
    let activityTarget = $(e.target);
    activityCost = parseInt(activityTarget.attr('data-cost'));

    // If box is checked then add price to total
    if ($(activityTarget).is(':checked')){
        totalPrice += activityCost;
    }
    // If box is unchecked then remove price from total
    else{
        totalPrice -= activityCost;
    };
    // Add totalPrice to activityCostDiv if there's a total to show, otherwise hide it.
    if (totalPrice != 0){
        activityCostDiv.text("$" + totalPrice);
    }else {
        activityCostDiv.text("");
    }
    // Disable conflicting activities  
    for(let i = 0; i <= activitiesData.length; i += 1){
        if (activityTarget.attr('data-day-and-time') == activitiesData.attr('data-day-and-time') && activityTarget != activitiesData){
            activitiesData.attr('disabled', true);
        }else{
            console.log('does not work');
        }
    }
});