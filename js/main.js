import { sample1, sample2, sample3, sample4, sample5, sample6 } from './data.js';
// import all samples from data.js

let data = sample1; // Change sample1 to (sample2,sample3,sample4 .. sample6) to change the render template contents
changeDataSample(data); // calling function to initiate the html rendring 




function changeDataSample(data) {
    /*
      input : data
      output : extract all objects (if any) from sample json required for creating diabetes history. call function 
      to create hisory for that all available objects.
    */

    let blood_sugar_fasting = '';
    let random_blood_glucose = '';
    let glucose_in_urine = '';
    let glycosylated_haemoglobin = '';
    let estimated_average_plasma_glucose = '';

    setBasicInfo(data[0]); // function to set basic information like name, age, barcode
    data.forEach(extractDiabetesTestData);
    createDiabetesStory(blood_sugar_fasting, random_blood_glucose, glucose_in_urine, glycosylated_haemoglobin, estimated_average_plasma_glucose)
        // createDiabetesStory chack if any of the 5 requred object is present if so call a function to render the story

    function extractDiabetesTestData(item, index) {
        // Extracting the objects
        if (item.TestName.toLowerCase() == 'Blood Sugar Fasting'.toLowerCase()) {
            blood_sugar_fasting = item;
        }
        if (item.TestName.toLowerCase() == 'Random Blood Glucose'.toLowerCase() || item.PackageProfileName.toLowerCase() == 'Random Blood Glucose'.toLowerCase()) {
            random_blood_glucose = item;
        }
        if (item.TestName.toLowerCase() == 'GLUCOSE IN URINE'.toLowerCase()) {
            glucose_in_urine = item;
        }
        if (item.TestName.toLowerCase() == 'HbA1C (Glycosylated haemoglobin)'.toLowerCase()) {
            glycosylated_haemoglobin = item;
        }
        if (item.TestName.toLowerCase() == 'Estimated Average Plasma Glucose'.toLowerCase()) {
            estimated_average_plasma_glucose = item;
        }

    }
}






function createDiabetesStory(blood_sugar_fasting, random_blood_glucose, glucose_in_urine, glycosylated_haemoglobin, estimated_average_plasma_glucose) {
    /*
        input : all five required objects
        process : call their cutom funtions to render dynamic result
    */


    if (typeof blood_sugar_fasting == 'object') {


        createBloodSugarFastingResult(blood_sugar_fasting);


    }
    if (typeof random_blood_glucose == 'object') {
        createRandomBloodGlucoseResult(random_blood_glucose)

    }
    if (typeof glucose_in_urine == 'object') {

        createGlucoseInUrineResult(glucose_in_urine);
    }
    if (typeof glycosylated_haemoglobin == 'object') {

        createGlycosylatedHaemoglobinResult(glycosylated_haemoglobin);

    }
    if (typeof estimated_average_plasma_glucose == 'object') {

        createEstimatedAveragePlasmaGlucose(estimated_average_plasma_glucose);


    }
}

function setBasicInfo(patinet_data) {
    /*
        input : patient object
        process : render patient basic information to the template
    */

    document.getElementById('name').innerHTML = patinet_data.PName;
    document.getElementById('gender_year').innerHTML = `${patinet_data.Gender} ${patinet_data.Age}`;
    document.getElementById('date').innerHTML = patinet_data.ResultEnteredDate;
    document.getElementById('pakage_name').innerHTML = 'WELLNESS';

}


function createBloodSugarFastingResult(blood_sugar_fasting) {

    /*
        input : blood_sugar_fasting object
        process : genrate dynamic result for Blood Sugar Fasting
    */

    $('#blood_sugar_result_section').show()
    let TestResultValue = blood_sugar_fasting.TestResultValue
    $('#blood_sugar_result').html(TestResultValue)
    let resultValue = parseFloat(TestResultValue);
    if (resultValue <= 70.0) {
        $('#suger_blood_circle').removeClass('circle_normal').addClass('circle_denger');
    } else if (resultValue > 70.0 && resultValue < 110.0) {

    } else {
        $('#suger_blood_circle').removeClass('circle_normal').addClass('circle_denger');
        $('#suger_blood_status').html('HIGH')
    }

    $(".js-range-slider").ionRangeSlider({
        type: "single",
        min: 0,
        max: 180,
        from: TestResultValue,
        to: 180,
        grid: false,
        prefix: "You "
    });
}

function createRandomBloodGlucoseResult(random_blood_glucose) {
    /*
        input :random_blood_glucose objects
        process : genrate dynamic result for Random Blood Glusode
    */

    $('#random_blood_result_section').show()
    let TestResultValue = random_blood_glucose.TestResultValue
    $('#random_blood_result').html(TestResultValue)
    let resultValue = parseFloat(TestResultValue);
    if (resultValue <= 70.0) {
        $('#random_blood_circle').removeClass('circle_normal').addClass('circle_denger');
    } else if (resultValue > 70.0 && resultValue < 110.0) {

    } else {
        $('#random_blood_circle').removeClass('circle_normal').addClass('circle_denger');
        $('#random_blood_status').html('HIGH')
    }

    $(".random_blood_slider").ionRangeSlider({
        type: "single",
        min: 0,
        max: 180,
        from: TestResultValue,
        to: 180,
        grid: false,
        prefix: "You "
    });

}



function createGlucoseInUrineResult(glucose_in_urine) {
    /*
        input :glucose_in_urine objects
        process : genrate dynamic result for Glucose In Urine
    */
    $('#glucose_in_urine_result_section').show();

    if (glucose_in_urine.TestResultValue == '+') {
        $('#glucose_in_urine_result_status').html('POSITIVE');
        $('#glucose_in_urine_result_circle').addClass('circle_denger');
        $('#glucose_in_urine_message').html(`"POSITIVE" means not good - it means that Glucose  found in your urine - we advise you to consult a doctor`)
    } else {
        console.log('ok');
    }
}


function createGlycosylatedHaemoglobinResult(glycosylated_haemoglobin) {
    /*
        input :glycosylated_haemoglobin objects
        process : genrate dynamic result for HbA1C (Glycosylated haemoglobin)

    */

    $('#glycosylated_haemoglobin_result_section').show()
    let TestResultValue = glycosylated_haemoglobin.TestResultValue
    let resultValue = parseFloat(TestResultValue);
    $('#glycosylated_haemoglobin_result').html(TestResultValue)
    if (resultValue <= 4.0) {
        $('#glycosylated_haemoglobin_circle').removeClass('circle_normal').addClass('circle_denger');
    } else if (resultValue > 4.0 && resultValue < 6.0) {

    } else {
        $('#glycosylated_haemoglobin_circle').removeClass('circle_normal').addClass('circle_denger');
        $('#glycosylated_haemoglobin_result_status').html('HIGH')
    }
    $("#glycosylated_haemoglobin_range").ionRangeSlider({
        type: "single",
        min: 2,
        max: 8,
        from: TestResultValue,
        to: 8,
        grid: false,
        prefix: "You "
    });
}

function createEstimatedAveragePlasmaGlucose(estimated_average_plasma_glucose) {
    /*
        input :estimated_average_plasma_glucose objects
        process : genrate dynamic result for Estimated Average Plasma Glucose

    */
    $('#estimated_average_plasma_glucose_result_section').show()
    let TestResultValue = estimated_average_plasma_glucose.TestResultValue
    $('#estimated_average_plasma_glucose_result').html(TestResultValue)
    let resultValue = parseFloat(TestResultValue);
    if (resultValue <= 70.0) {
        $('#estimated_average_plasma_glucose_circle').removeClass('circle_normal').addClass('circle_denger');
    } else if (resultValue > 70.0 && resultValue < 110.0) {

    } else {
        $('#estimated_average_plasma_glucose_circle').removeClass('circle_normal').addClass('circle_denger');
        $('#estimated_average_plasma_glucose_status').html('HIGH')
    }

    $(".estimated_average_plasma_glucose_slider").ionRangeSlider({
        type: "single",
        min: 0,
        max: 180,
        from: TestResultValue,
        to: 180,
        grid: false,
        prefix: "You "
    });
}