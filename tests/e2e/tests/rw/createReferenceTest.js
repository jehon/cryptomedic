module.exports = {
    // 'generateReference'; function(client) {

    // },

    'createReference': function (client) {
        var r = Math.floor(Math.random() * 100);

        client.page.cryptomedic().authenticate('murshed');

        client.myClick('#menu_home');
        client.waitForElementVisible('input[ng-model=\'entryyear\']');
        client.clearValue('input[ng-model=\'entryyear\']');
        client.setValue('input[ng-model=\'entryyear\']', 1999);
        client.clearValue('input[ng-model=\'entryorder\']');
        client.setValue('input[ng-model=\'entryorder\']', 104);
        client.myClick('[ng-click=\'checkReference()\']');
        client.waitForElementVisible('#button_create_reference', 5000, 'The patient \'1999-104\' could not be created by reference. Does it already exists? Please delete it then...');
        client.myScreenshotReference();
        client.myClick('#button_create_reference');

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
