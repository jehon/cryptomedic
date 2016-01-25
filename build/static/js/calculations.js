
var calculations = {
  math: {
    evaluatePoly: function (line, x) {
      var i = -1;
      if ((x < line[0][0]) || (x > line[line.length - 1][0])) {
        return NaN;
      }
      for(i = 0; i< line.length; i++) {
        if (x <= line[i][0])
            break;
      }

      // i = the next indice (line[i-1] < x <= line[i])
      if (x == line[i][0]) return line[i][1];

      var xup = line[i][0];
      var yup = line[i][1];
      var xdw = line[i-1][0];
      var ydw = line[i-1][1];
      return ydw + (yup - ydw) * ((x - xdw) / (xup - xdw));
    },
    stdDeviation: function(line, x, y) {
      var avg = this.evaluatePoly(line.medium, x);
      if (isNaN(avg)) return "#Out of bound#";
      if (y == avg) return 0;

      var ref;
      if (y < avg) ref = this.evaluatePoly(line.min, x);
        else ref = this.evaluatePoly(line.max, x);
        /* istanbul skip next */
      if (isNaN(ref)) return "#Out of bound#";

      var dev = Math.abs((avg - ref) / this.sigma);
      return (y - avg) / dev;
    },
    // 1.64485 = sigma at 90 for normal distribution
    sigma: 1.64485
  },

  age: {
    fromBirthDate: function(birth, options) {
      options = Object.assign({}, {
        reference: new Date(),
        format: false
      }, options);
      // reference = reference || new Date();
      if (typeof(options.reference) == "number") {
        options.reference = "" + options.reference;
      }
      if (typeof(options.reference) == "string") {
        if (options.reference.length < 4) {
          return options.format ? null : "?";
          // throw new Exception("Invalid reference");
        }
        var ry = parseInt(options.reference.substring(0, 4));
        var rm = parseInt(options.reference.substring(5, 7));
        if (isNaN(rm)) {
          rm = 1; // emulate january
        }
        options.reference = new Date(ry, rm - 1, 1);
      }
      if (typeof(birth) == "number") {
        birth = "" + birth;
      }
      if (typeof(birth) == "string") {
        if (birth.length < 4) {
          return options.format ? null : "?";
          // throw new Exception("Invalid birth");
        }
        var by = parseInt(birth.substring(0, 4));
        var bm = parseInt(birth.substring(5, 7));
        if (isNaN(bm)) {
          bm = 1; // emulate january
        }
        birth = new Date(by, bm - 1 -1, 30);
      }
      var days = new Date(0, 0, 0, 0, 0, 0, options.reference - birth);
      var res = { years: days.getFullYear() - 1900, months: days.getMonth()};
      if (options.format == "object") {
        return res;
      }
      if (options.format == "number") {
        return res.years + (res.months / 12);
      }
      return res.years + "y" + res.months + "m";
    },

    toBirthDate: function(years, months, reference) {
      reference = reference || new Date();
      var d2 = new Date(reference.getFullYear() - years, reference.getMonth() - months, 10);
      return appState().helpers.date2CanonicString(d2).substring(0, 7);
    },

    atConsultTime: function(file, patient, format) {
      format = format || "number";
      return this.fromBirthDate(patient.Yearofbirth, { reference: file.Date, format: format });
    }
  }

};
