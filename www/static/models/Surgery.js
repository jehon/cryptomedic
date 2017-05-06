'use strict';

class Surgery extends PatientRelated {
  getModel() {
    return 'Surgery';
  }

  getServerRessource() {
    return "surgeries";
  }

}
