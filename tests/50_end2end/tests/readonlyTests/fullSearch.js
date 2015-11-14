
function testSearch(client, search, resultList) {
  client
    .page.cryptomedic().authenticate("readonly")
    .myClick("#menu_search")
    .myFillInForm(".searchFields", search, "#button_submit")
    .pause(2000)
    .waitForElementPresent("#search_results", 1000)
    .assert.myAssertTableCountRows("#search_results", resultList.length)
    ;
  for(i in resultList) {
    client
      .assert.myAssertCell("#search_results", parseInt(i) + 1, 2, resultList[i]);
  }

  return client;
}

module.exports = {
  'searchPatient2000': function(client) {
    testSearch(client, { "#Patient_entryyear": "2000" }, [ "2000-1" ])
      .myClick("#search_results tbody tr:nth-child(1) td:nth-child(1) img")
      .assert.myAssertHashIs("#/folder/1")
      .end();
  },
  'searchPatient2001': function(client) {
    testSearch(client, { "#Patient_entryyear": "2001" }, [ "2001-1", "2001-4" ])
      .end();
  },
  'searchPatientOrder': function(client) {
    testSearch(client, { "#Patient_entryorder": "104" }, [ "2014-104" ])
      .end();
  },
  'searchPatientByName': function(client) {
    testSearch(client, { "#Patient_Lastname": "OSMAN" }, [ "2014-103" ])
      .end();
  },
  'searchPatientByNameIncorrectCase': function(client) {
    testSearch(client, { "#Patient_Lastname": "osman" }, [ "2014-103" ])
      .end();
  },
  'searchPatientByYearOfBirth': function(client) {
    testSearch(client, { "#Patient_Yearofbirth": 2002 }, [ "2014-107" ])
      .end();
  },
  'searchPatientByLastName': function(client) {
    testSearch(client, { "#Patient_Lastname": "Islam" }, [ "2000-1" ])
      .end();
  },
  'searchPatientByNamePartial': function(client) {
    testSearch(client, { "#Patient_Lastname": "OSM" }, [ "2014-103" ])
      .end();
  },
  'searchPatientByTelephone': function(client) {
    testSearch(client, { "#Patient_Telephone": "1813247984" }, [ "2014-105" ])
      .end();
  },
  'searchPatientCP': function(client) {
    testSearch(client, { "#Patient_pathology_Clubfoot": true }, [ "2014-107", "2014-103", "2014-104", "2014-105", "2000-1" ])
      .end();
  }
};
