# Project Management Form with JsonPowerDB

## Description
This project is a web-based **Project Management Form** that allows users to add, update, and manage project details using **JsonPowerDB (JPDB)** as the backend database. The form provides seamless integration with JPDB via RESTful APIs for real-time data storage and retrieval.

## Benefits of using JsonPowerDB
- **Simple and Easy to Use**: No complex configurations required.
- **High Performance**: Optimized for real-time applications.
- **Schema-Free**: Flexible structure, allowing easy updates.
- **RESTful APIs**: Quick data access with JSON-based interactions.
- **Multi-Mode Storage**: Supports various data storage models.

## Release History
- **v1.0.0** (Initial Release) - Implemented basic form with JPDB integration.
- **v1.1.0** - Added validation and data retrieval functionality.
- **v1.2.0** - Implemented update feature for existing records.

## Table of Contents
- [Description](#description)
- [Benefits of using JsonPowerDB](#benefits-of-using-jsonpowerdb)
- [Release History](#release-history)
- [Scope of Functionalities](#scope-of-functionalities)
- [Examples of Use](#examples-of-use)
- [Project Status](#project-status)
- [Sources](#sources)
- [Other Information](#other-information)

## Scope of Functionalities
- CRUD operations with JsonPowerDB.
- User authentication and role-based access control.
- Real-time data retrieval using RESTful API calls.
- Interactive and responsive UI using Bootstrap.

## Examples of Use
```javascript
// Sample API request to fetch project data
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
```

## Project Status
Currently active and maintained with regular updates. Future improvements include advanced search capabilities and optimized indexing.

## Sources
- [JsonPowerDB Official Documentation](https://jsonpowerdb.com/docs)
- [Github Repository](https://github.com/your-repository)

## Other Information
For contributions, please follow the standard PR process. For any issues, open a ticket in the repository.

---
Developed by **[Your Name]**

