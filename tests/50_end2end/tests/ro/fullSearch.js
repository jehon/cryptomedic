
function testSearch(client, search, resultList) {
  client
    .myClick("#button_reset")
    .waitForElementPresent("#search_no_results")
    // .page.cryptomedic().authenticate("readonly")
    // .myClick("#menu_search")
    .myFillInForm(".searchFields", search, "#button_submit")
    .waitForElementPresent("#search_results")
    .assert.myAssertTableCountRows("#search_results", resultList.length)
    .pause(1000)
    ;
  for(var i in resultList) {
    client
      .waitForText("#search_resultstr:nth-child(" + (i + 1) + ") td:nth-child(2)", resultList[i])
      ;
      // .assert.myAssertCell("#search_results", parseInt(i) + 1, 2, resultList[i]);
  }

  return client;
}

module.exports = {
  "allSearch": function(client) {
    client
      .page.cryptomedic().authenticate("readonly")
      .myClick("#menu_search")
      ;
    testSearch(client, { "#Patient_entryyear": "2000" }, [ "2000-1" ]);
    testSearch(client, { "#Patient_entryyear": "2001" }, [ "2001-1", "2001-4" ]);
    testSearch(client, { "#Patient_entryorder": "104" }, [ "2014-104" ]);
    testSearch(client, { "#Patient_Name": "OSMAN" }, [ "2014-103" ]);
    testSearch(client, { "#Patient_Name": "osman" }, [ "2014-103" ]);
    testSearch(client, { "#Patient_Yearofbirth": 2002 }, [ "2014-107" ]);
    testSearch(client, { "#Patient_Name": "Islam" }, [ "2000-1" ]);
    testSearch(client, { "#Patient_Name": "OSM" }, [ "2014-103" ]);
    testSearch(client, { "#Patient_Telephone": "1813247984" }, [ "2014-105" ]);
    testSearch(client, { "select#Patient_Pathology": 2 }, [ "2014-107", "2014-103", "2014-104", "2014-105", "2000-1" ]);

    // TODO: search by sex
  }
};
