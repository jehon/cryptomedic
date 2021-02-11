module.exports = {
    // 'generateReference'; function(client) {

    // },

    createReference: function (client) {
        var r = Math.floor(Math.random() * 100);

        client.page.cryptomedic().authenticate('murshed');

        client.myClick('#menu_home');
        client.page.cryptomedic().myComponentExecute('x-patient-by-reference >>> [name=entryyear]', function (v) { this.value = v; }, [1999]);
        client.page.cryptomedic().myComponentExecute('x-patient-by-reference >>> [name=entryorder]', function (v) { this.value = v; }, [104]);
        client.page.cryptomedic().myComponentExecute('x-patient-by-reference >>> [action="query"]', function () { this.click(); }, []);

        client.waitForElementVisible('css selector', 'x-patient-by-reference[status=creation-proposed]', 'The patient \'1999-104\' could not be created by reference. Does it already exists? Please delete it then...');
        client.myScreenshotReference();
        client.page.cryptomedic().myComponentExecute('x-patient-by-reference >>> #create-reference', function () { this.click(); }, []);

        client.waitForElementPresent('#Patient_Name');
        client.assert.containsText('#Patient_entryyear', 1999);
        client.assert.containsText('#Patient_entryorder', 104);

        client.setValue('#Patient_Name', 'rezaul' + r);
        client.myClick('#topsubmenu #patient_save');

        // Delete the file
        client.myClick('#topsubmenu #patient_edit');
        client.myClick('#topsubmenu #patient_delete');
        client.acceptAlert();
        client.waitForElementVisible('#page_home');
        // .pause(500);
        client.assert.myAssertHashIs('#/home');
        client.end();
    }
};
