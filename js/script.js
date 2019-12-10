// *** Globals ***

let activityCostDiv = $('<div id="totalCost"></div>');
const activitiesData = $('.activities input:checkbox').each(function(i){
    return this;
});
$('.activities').append(activityCostDiv);

let totalPrice = 0;

let checkedBoxes = false;
let checkBoxes = $('<div class="checkBoxes">Please choose activity (min. 1)</div><br>')
checkBoxes.css({'color': '#a81837'});
$('.activities').prepend(checkBoxes);

let emailField = false;
let nameField = false;
let cardNumberField = false;
let zipField = false;
let cvvField = false;

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

// *** Checkboxes ***
$('.activities input:checkbox').on('click', function(e){
    // Display text if no checkbox is checked
    if($(':checkbox').is(':checked')){
        checkBoxes.text("");
        checkedBoxes = true;
    }else{
        checkBoxes.text("Please choose activity (min. 1)");
        checkedBoxes = false;
    }
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
        if (activityTarget.attr('data-day-and-time') === activitiesData.eq(i).attr('data-day-and-time') && activityTarget !== activitiesData){
            activitiesData.eq(i).attr('disabled', this.checked);
            activityTarget.attr('disabled', false);
        }
    }
});

// Make "Credit card" the default selection
// Initially hide divs for other payment information
$('#paypal').hide();
$('#bitcoin').hide();
$('#payment option').eq(0).hide();
$('#payment option').eq(1).attr('selected', true);
$('#payment option:selected').val('credit card');

// If the user changes payment method then show the correct information
$('#payment').on('change', function(e){
    if ($('#payment option:selected').val() === 'credit card') {
        $('#credit-card').show();
        $('#paypal').hide();
        $('#bitcoin').hide();

    }
    else if ($('#payment option:selected').val() === 'paypal') {
        $('#credit-card').hide();
        $('#paypal').show();
        $('#bitcoin').hide();
    }
    else if ($('#payment option:selected').val() === 'bitcoin') {
        $('#credit-card').hide();
        $('#paypal').hide();
        $('#bitcoin').show();
    }

});

// *** Credit card validation ***

if ($('#payment option:selected').val() === 'credit card') {
    // Card number
    $('#cc-num').focusout(function(event){
        let $creditCardRE = new RegExp('^ ?([0-9] ?){13,16}$');
        let $creditCardValue = $('#cc-num').val();
        if ($creditCardRE.test($creditCardValue)){
            $('#cc-num').css({border: '1.5px solid #30d860'});
            cardNumberField = true;
        }else {
            $('#cc-num').css({border: '1.5px solid #EE204D'});
            cardNumberField = false;
        }
    });
    // Zip Code
    $('#zip').focusout(function(event){
        let $zipRE = new RegExp('^([0-9] ?){5}$');
        let $zipValue = $('#zip').val();
        if ($zipRE.test($zipValue)){
            $('#zip').css({border: '1.5px solid #30d860'});
            zipField = true;
        }else {
            $('#zip').css({border: '1.5px solid #EE204D'});
            zipField = false;
        }
    });
    // CVV
    $('#cvv').focusout(function(event){
        let $cvvRE = new RegExp('^([0-9] ?){3}$');
        let $cvvValue = $('#cvv').val();
        if ($cvvRE.test($cvvValue)){
            $('#cvv').css({border: '1.5px solid #30d860'});
            cvvField = true;
        }else {
            $('#cvv').css({border: '1.5px solid #EE204D'});
            cvvField = false;
        }
    });
}

// *** Name field validation ***
$('#name').focusout(function(e){
    if ($('#name').val() === ''){
        $('#name').css({border: '1.5px solid #EE204D'});
        nameField = false;
    }else{
        $('#name').css({border: '1.5px solid #30d860'});
        nameField = true;
    }
});

// *** Email field validation ***
$('#mail').focusout(function(e){
    let $emailRegEx = new RegExp('^[^@]+@[^@.]+[.][^@.]{2,5}$');
    let $emailValue = $('#mail').val();
    if ($emailRegEx.test($emailValue)){
        $('#mail').css({border: '1.5px solid #30d860'});
        emailField = true;
    }else{
        $('#mail').css({border: '1.5px solid #EE204D'});
        emailField = false;
    }
});

// *** Submit validation ***
$('button').on('click', function(e){
    if (nameField === false || emailField === false || checkedBoxes === false){
        // If any of these fields are invalid, make user aware of which by changing text or border color of that field
        if(nameField === false){
            $('#name').css({border: '1.5px solid #EE204D'});
            $("label[for=name]").css({color: '#EE204D'});
        }
        if(emailField === false){
            $('#mail').css({border: '1.5px solid #EE204D'});
            $("label[for=mail]").css({color: '#EE204D'});
        }
        if(checkedBoxes === false){
            $(".activities").children('legend').css({color: '#EE204D'});
        }
        event.preventDefault();
    }else if ($('#payment option:selected').val() === 'credit card'){
        if (nameField === false || emailField === false || checkedBoxes === false || cardNumberField === false || zipField === false || cvvField === false){
            // If any of these fields are invalid, make user aware of which by changing text or border color of that field
            if(nameField === false){
                $('#name').css({border: '1.5px solid #EE204D'});
                $("label[for=name]").css({color: '#EE204D'});
            }
            if(emailField === false){
                $('#mail').css({border: '1.5px solid #EE204D'});
                $("label[for=mail]").css({color: '#EE204D'});
            }
            if(checkedBoxes === false){
                $(".activities").children('legend').css({color: '#EE204D'});
            }
            if(cardNumberField === false){
                $('#cc-num').css({border: '1.5px solid #EE204D'});
                $("label[for=cc-num]").css({color: '#EE204D'});
            }
            if(zipField === false){
                $('#zip').css({border: '1.5px solid #EE204D'});
                $("label[for=zip]").css({color: '#EE204D'});
            }
            if(cvvField === false){
                $('#cvv').css({border: '1.5px solid #EE204D'});
                $("label[for=cvv]").css({color: '#EE204D'});
            }
            event.preventDefault();
        }
    }
    else{
        console.log('form submitted');
    }
});