function testSearch(client, search, resultList) {
    client.myClick('x-page-search x-button[action="cancel"]');
    client.pause(10);
    client.waitForElementPresent('x-page-search #search_empty');
    client.myFormFillIn('x-page-search', search, 'x-page-search x-button[action="query"]');
    client.waitForElementPresent('#search_results');
    client.page.cryptomedic().tableIterator('#search_results', 1, resultList.length).assert().endTable();
    client.pause(100);
    client.myScreenshotReference();

    for (var i in resultList) {
        var tsel = '#search_results tr:nth-child(' + (parseInt(i) + 1) + ') td:nth-child(2)';
        client.waitForElementPresent(tsel);
        client.assert.containsText(tsel, resultList[i]);
    }

    return client;
}

module.exports = {
    allSearch: function (client) {
        client.page.cryptomedic().authenticate('readonly');
        client.waitForElementPresent('#search_menu');
        client.myClick('#search_menu x-button');
        client.waitForElementPresent('x-page-search');
    },

    byEntryYear: function (client) {
        testSearch(client, {
            '[name="entryyear"]': '2000'
        }, ['2000-1']);
    },

    byEntryYear2: function (client) {
        testSearch(client, {
            '[name="entryyear"]': '2001'
        }, ['2001-1', '2001-4']);
    },

    byEntryOrder: function (client) {
        testSearch(client, {
            '[name="entryorder"]': '104'
        }, ['2014-104']);
    },

    byNameUp: function (client) {
        testSearch(client, {
            '[name="Name"]': 'OSMAN'
        }, ['2014-103']);
        testSearch(client, {
            '[name="Name"]': 'osman'
        }, ['2014-103']);
        testSearch(client, {
            '[name="Name"]': 'Islam'
        }, ['2000-1']);
        testSearch(client, {
            '[name="Name"]': 'OSM'
        }, ['2014-103']);
    },

    byYearOfBirth: function (client) {
        testSearch(client, {
            '[name="Yearofbirth"]': 2002
        }, ['2014-107']);
    },

    byPhone: function (client) {
        testSearch(client, {
            '[name="Telephone"]': '1813247984'
        }, ['2014-105']);
    },

    byPathology: function (client) {
        testSearch(client, {
            'x-write-list[name="Pathology"]': {
                value: 'ClubFoot'
            }
        }, ['2014-107', '2014-103', '2014-104', '2014-105', '2000-1']);
        // TODO: search by sex
    },

    end: function (client) {
        client.end();
    }
};
