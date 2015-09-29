"use strict";

Dexie.Promise.on("error", function(e) {
    console.error("Error in Dexie: ", e);
});

/**
 * Build up the db_patients service
 * 
 * @param withVersions if true, upgrade the database
 * @returns a db_patients proxy
 */
function build_db_patients(withVersions) {
    var db = new Dexie("cryptomedic");

    if (withVersions) {
        db.version(1).stores({
            patients: '++id'
        });
    
        db.version(2).stores({
        	patients: '++id,[mainFile.entryyear+mainFile.entryorder]'
        });
    
        db.version(3).stores({
            patients: '++id'
        });
    
        db.version(4).stores({
        	// @see
        	// db.relations.where('[userId1+userId2]').equals([2,3]).or('[userId1+userId2]').equals([3,2])
        	// - will give you all the relations that user 1 has to user 2 or user 2
        	// has to user 1.
        	patients: '++id,[mainFile.entryyear+mainFile.entryorder]'
        });
    
        db.version(5).upgrade(function(trans) {
            trans.patients.toCollection().modify(function(p) {
        	if (typeof(p.id) == "number") {
        	    console.log("deleting", p.id);
        	    delete this.value;
        	}
        	p.id = "" + p.id;
            });
        });
        
        db.version(6).stores({
            patients: '++id,[mainFile.entryyear+mainFile.entryorder]',
            settings: 'key'
        });
    }
    
    db.open();

    // ------------------ Business functions ------------------------------
    /**
     * Get the folder, with all the currently awaiting modifications applied
     */
    function getFolder(id) {
        return db.patients.get("" + id).then(function(data) {
            if (data) {
        	return data;
            } else {
        	throw "I say, patient not found";
            }
        });
    }
    
    /**
     * Get the folder by the reference
     */
    function getByReference(entryyear, entryorder) {
        return db.patients.where("[mainFile.entryyear+mainFile.entryorder]").equals([""+entryyear, ""+entryorder]).toArray(function(data) {
            if (data.length == 1) {
        	return getFolder(data[0]['id']);
            } else {
        	throw "I say, reference not found";
            }
        });
    }

    // ------------------ Enhanced functions ------------------------------
    
    /**
     * Insert data in bulk, in one transaction (faster than the simple insert)
     * 
     * @param bulk: array of object to be inserted if the bulk[].key = "_deleted",
     *                delete it otherwise, store bulk[].record into the store
     */
    function bulkUpdate(bulk, feedback) {
        var self = db.patients;
        var prevPromise = Promise.resolve(); // initial Promise always resolve
        for (var key in bulk) {
            prevPromise = prevPromise.then((function(key) {
            	return new Promise(function(iresolve, ireject) {
            	   var req;
            	   if (bulk[key]['_deleted']) {
            	       req = self.delete("" + key);
            	   } else {
            	       bulk[key]['record']['id'] = "" + bulk[key]['record']['id']; 
            	       req = self.put(bulk[key]['record']);
            	   }
            	   req.then(function (e) {
            	       if (feedback) {
            		   feedback(bulk[key]['record']);
            	       }
            	       iresolve();
            	   }, function (ev) {
            	       ireject(e);
            	   });
            	});
            })(key));
        }
        return prevPromise;
    };

    // ------------------ System functions ------------------------------
    function version() {
	return db.verno;
    }
    
    function clear() {
	return db.patients.clear();
    }
    
    return {
	'getFolder': getFolder,
	'getByReference': getByReference,
	'clear': clear,
	'bulkUpdate': bulkUpdate,
	'version': version
    };
};
