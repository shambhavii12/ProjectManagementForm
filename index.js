/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var jpdbBaseURL = 'http://api.login2explore.com:5577';
var jpdbIRL = '/api/irl';
var jpdbIML = '/api/iml';
var projectDBName = 'COLLEGE-DB';
var projectRelationName = 'PROJECT-TABLE';
var connToken = "90934313|-31949204597613958|90957318";

$('#projid').focus();

function saveRecNo(jsonObj) {
    var lvData = JSON.parse(jsonObj.data);
    localStorage.setItem('recno', lvData.rec_no);

}

function getProjIdAsJsonObj() {
    var projid = $('#projid').val();
    var jsonStr = {
        id: projid
    };
    return JSON.stringify(jsonStr);
}

function fillData(jsonObj) {
    saveRecNo(jsonObj);
    var record = JSON.parse(jsonObj.data).record;
    $('#projname').val(record.name);
    $('#assignto').val(record.assign);
    $('#assigndate').val(record.date);
    $('#deadline').val(record.dead);
}

function resetForm() {
    $('#projid').val("");
    $('#projname').val("");
    $('#assignto').val("");
    $('#assigndate').val('');
    $('#deadline').val('');
    $('#projid').prop("disabled", false);
    $('#save').prop("disabled", true);
    $('#change').prop("disabled", true);
    $('#reset').prop("disabled", true);
    $('#projid').focus();
}

function validateData() {
    var projid, projname, assignto, assigndate, deadline;
    projid = $('#projid').val();
    projname = $('#projname').val();
    assignto = $('#assignto').val();
    assigndate = $('#assigndate').val();
    deadline = $('#deadline').val();
    if (projid === '') {
        alert('Project ID is missing');
        $("#projid").focus();
        return "";
    }
    if (projname === "") {
        alert('Project Name is missing');
        $("#projname").focus();
        return "";
    }
    if (assignto === '') {
        alert('Project assigned to is missing');
        $("#assignto").focus();
        return "";
    }
    if (assigndate === '') {
        alert('Assignment Date is missing');
        $('#assigndate').focus();
        return "";
    }
    if (deadline === '') {
        alert('Deadline is missing');
        $('#deadline').focus();
        return '';
    }

    var jsonObj = {
        id: projid,
        name: projname,
        assign: assignto,
        date: assigndate,
        dead: deadline,
    };
    return JSON.stringify(jsonObj);
}

function getProject() {
    var projectIdJsonObj = getProjIdAsJsonObj();
    var getRequest = createGET_BY_KEYRequest(connToken, projectDBName, projectRelationName, projectIdJsonObj);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest, jpdbBaseURL, jpdbIRL);
    jQuery.ajaxSetup({async: true});
    if (resJsonObj.status === 400) {
        $("#projname").focus();
        $("#save").prop('disabled', false);
        $("#reset").prop('disabled', false);

    } else if (resJsonObj.status === 200) {
        $('#projid').prop("disabled", true);
        fillData(resJsonObj);
        $('#change').prop('disabled', false);
        $('#reset').prop('disabled', false);
        $('#projname').focus();
    }
}

function saveData() {
    var jsonStrObj = validateData();
    if (jsonStrObj === '') {
        return "";
    }
    var putRequest = createPUTRequest(connToken, jsonStrObj, projectDBName, projectRelationName);
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    resetForm();
    $('#projid').focus();
}

function changeData() {
    $('#change').prop("disabled", true);
    jsonChg = validateData();
    var updateRequest = createUPDATERecordRequest(connToken, jsonChg, projectDBName, projectRelationName, localStorage.getItem("recno"));
    jQuery.ajaxSetup({async: false});
    var resJsonObj = executeCommandAtGivenBaseUrl(updateRequest, jpdbBaseURL, jpdbIML);
    jQuery.ajaxSetup({async: true});
    console.log(resJsonObj);
    resetForm();
    $('#projid').focus();
}
