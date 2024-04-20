import { deepFreeze } from "./objects.js";

const amd_stats = { m: {}, f: {} };
export default amd_stats;

// Age based concatenate
amd_stats.m.height_cm = {};
amd_stats.m.height_cm.min = [
  [0, 47],
  [0.25, 58],
  [0.5, 64],
  [0.75, 68],
  [1, 72],
  [1.25, 75],
  [3, 91],
  [9, 125],
  [10, 130],
  [11, 135],
  [12, 140],
  [13, 146],
  [14, 153],
  [15, 159],
  [16, 163],
  [17, 166],
  [18, 167],
  [19, 169],
  [20, 170]
];
amd_stats.m.height_cm.medium = [
  [0, 50],
  [0.25, 61],
  [0.5, 67],
  [0.75, 72],
  [1, 76],
  [1.25, 79],
  [3, 96],
  [9, 134],
  [10, 139],
  [11, 144],
  [12, 149],
  [13, 156],
  [14, 165],
  [15, 170],
  [16, 174],
  [17, 175],
  [18, 176],
  [19, 177],
  [20, 177]
];
amd_stats.m.height_cm.max = [
  [0, 53],
  [0.25, 64],
  [0.5, 70],
  [0.75, 75],
  [1, 79],
  [1.25, 83],
  [3, 101],
  [9, 142],
  [10, 147],
  [11, 152],
  [12, 159],
  [13, 166],
  [14, 174],
  [15, 179],
  [16, 183],
  [17, 184],
  [18, 185],
  [19, 186],
  [20, 186]
];

amd_stats.m.weight_kg = {};
amd_stats.m.weight_kg.min = [
  [0, 2.8],
  [0.25, 5],
  [0.5, 6.8],
  [0.75, 8],
  [1, 9],
  [1.25, 9.6],
  [1.5, 10.2],
  [3, 12.5],
  [4, 14],
  [5, 16],
  [6, 17],
  [7, 19.5],
  [8, 21.5],
  [9, 24],
  [10, 26],
  [11, 29],
  [12, 33],
  [13, 36],
  [14, 40],
  [15, 45],
  [16, 50],
  [17, 53],
  [18, 56],
  [19, 57],
  [20, 58]
];
amd_stats.m.weight_kg.medium = [
  [0, 3.6],
  [0.25, 6],
  [0.5, 8],
  [0.75, 9.4],
  [1, 10.4],
  [1.25, 11.2],
  [1.5, 11.8],
  [3, 14.4],
  [4, 16.5],
  [5, 19],
  [6, 21],
  [7, 23],
  [8, 26],
  [9, 29],
  [10, 32],
  [11, 36],
  [12, 40],
  [13, 45],
  [14, 51],
  [15, 56],
  [16, 61],
  [17, 65],
  [18, 67],
  [19, 69],
  [20, 71]
];
amd_stats.m.weight_kg.max = [
  [0, 4.2],
  [0.25, 7],
  [0.5, 9.2],
  [0.75, 10.8],
  [1, 12],
  [1.25, 12.8],
  [1.5, 13.5],
  [3, 16.6],
  [4, 19],
  [5, 22],
  [6, 25],
  [7, 29],
  [8, 32],
  [9, 37],
  [10, 42],
  [11, 48],
  [12, 54],
  [13, 60],
  [14, 67],
  [15, 73],
  [16, 78],
  [17, 82],
  [18, 85],
  [19, 87],
  [20, 89]
];

amd_stats.f.height_cm = {};
amd_stats.f.height_cm.min = [
  [0, 46],
  [0.25, 56],
  [0.5, 62],
  [0.75, 66],
  [1, 70],
  [1.25, 73],
  [1.5, 76],
  [1.75, 79],
  [2, 81],
  [2.25, 84],
  [2.5, 86],
  [2.75, 87],
  [3, 90],
  [4, 95],
  [7, 115],
  [8, 120],
  [9, 125],
  [10, 130],
  [11, 135],
  [12, 141],
  [13, 148],
  [14, 152],
  [15, 153],
  [16, 154],
  [17, 155],
  [20, 155]
];
amd_stats.f.height_cm.medium = [
  [0, 51],
  [0.25, 59],
  [0.5, 65],
  [0.75, 70],
  [1, 74],
  [1.25, 77],
  [1.5, 81],
  [1.75, 83],
  [2, 86],
  [2.25, 88],
  [2.5, 91],
  [2.75, 93],
  [3, 95],
  [4, 100],
  [7, 122],
  [8, 128],
  [9, 133],
  [10, 138],
  [11, 144],
  [12, 151],
  [13, 155],
  [14, 160],
  [15, 162],
  [16, 164],
  [17, 164],
  [20, 164]
];
amd_stats.f.height_cm.max = [
  [0, 53],
  [0.25, 63],
  [0.5, 67],
  [0.75, 73],
  [1, 76],
  [1.25, 81],
  [1.5, 84],
  [1.75, 87],
  [2, 90],
  [2.25, 93],
  [2.5, 96],
  [2.75, 98],
  [3, 100],
  [4, 106],
  [7, 129],
  [8, 135],
  [9, 141],
  [10, 147],
  [11, 153],
  [12, 160],
  [13, 166],
  [14, 169],
  [15, 170],
  [16, 171],
  [17, 171],
  [20, 172]
];

amd_stats.f.weight_kg = {};
amd_stats.f.weight_kg.min = [
  [0, 2.8],
  [0.25, 4.6],
  [0.5, 6.2],
  [0.75, 7.4],
  [1, 8.4],
  [1.25, 9],
  [1.5, 9.6],
  [3, 12],
  [4, 14],
  [5, 15],
  [6, 17],
  [8, 21],
  [9, 23],
  [10, 26],
  [11, 29],
  [12, 34],
  [13, 36],
  [14, 40],
  [15, 43],
  [16, 45],
  [17, 46],
  [18, 47],
  [19, 48],
  [20, 49]
];
amd_stats.f.weight_kg.medium = [
  [0, 3.7],
  [0.25, 5.8],
  [0.5, 7.2],
  [0.75, 8.4],
  [1, 9.6],
  [1.25, 10.4],
  [1.5, 11],
  [3, 13.8],
  [4, 16],
  [5, 18],
  [6, 20],
  [8, 26],
  [9, 29],
  [10, 33],
  [11, 37],
  [12, 42],
  [13, 46],
  [14, 49],
  [15, 52],
  [16, 54],
  [17, 55],
  [18, 56],
  [19, 57],
  [20, 59]
];
amd_stats.f.weight_kg.max = [
  [0, 4],
  [0.25, 6.4],
  [0.5, 8.4],
  [0.75, 9.8],
  [1, 11],
  [1.25, 11.8],
  [1.5, 12.6],
  [3, 16.4],
  [4, 19],
  [5, 22],
  [6, 25],
  [8, 33],
  [9, 38],
  [10, 43],
  [11, 50],
  [12, 55],
  [13, 61],
  [14, 66],
  [15, 68],
  [16, 70],
  [17, 72],
  [18, 73],
  [19, 74],
  [20, 75]
];

amd_stats.m.bmi = {};
amd_stats.m.bmi.min = [
  [2, 15],
  [3, 14.6],
  [4, 14.4],
  [5, 14.1],
  [6, 14],
  [7, 14],
  [8, 14.2],
  [9, 14.4],
  [10, 14.6],
  [11, 15],
  [12, 15.4],
  [20, 19.8]
];
amd_stats.m.bmi.medium = [
  [2, 16.8],
  [3, 16],
  [4, 15.6],
  [5, 15.4],
  [6, 15.5],
  [7, 15.5],
  [8, 15.8],
  [9, 16.2],
  [10, 16.6],
  [11, 17.2],
  [12, 17.8],
  [20, 23]
];
amd_stats.m.bmi.max = [
  [2, 19.2],
  [3, 18.2],
  [4, 17.8],
  [5, 18],
  [6, 18.4],
  [7, 19],
  [8, 20],
  [9, 21],
  [10, 22],
  [11, 23.2],
  [12, 24.2],
  [20, 30.6]
];

amd_stats.f.bmi = {};
amd_stats.f.bmi.min = [
  [2, 14.8],
  [3, 14.4],
  [4, 14],
  [5, 13.8],
  [6, 13.8],
  [7, 13.8],
  [8, 14],
  [9, 14.2],
  [10, 14.5],
  [11, 15],
  [12, 15.4],
  [17, 17.8],
  [18, 18.2],
  [19, 18.4],
  [20, 18.5]
];
amd_stats.f.bmi.medium = [
  [2, 16.4],
  [3, 15.8],
  [4, 15.3],
  [5, 15.2],
  [6, 15.2],
  [7, 15.4],
  [8, 15.8],
  [9, 16.4],
  [10, 16.8],
  [11, 17.4],
  [12, 18],
  [17, 20.9],
  [18, 21.3],
  [19, 21.6],
  [20, 21.7]
];
amd_stats.f.bmi.max = [
  [2, 19],
  [3, 18.2],
  [4, 18],
  [5, 18.2],
  [6, 18.8],
  [7, 19.6],
  [8, 20.6],
  [9, 21.8],
  [10, 23],
  [11, 24],
  [12, 25.2],
  [17, 29.6],
  [18, 30.4],
  [19, 31],
  [20, 31.8]
];

// Height based concatenate
amd_stats.m.wh = {};
amd_stats.m.wh.min = [
  [80, 10],
  [95, 13.2],
  [105, 15.6],
  [110, 17],
  [115, 18.6],
  [120, 20.2]
];
amd_stats.m.wh.medium = [
  [80, 11],
  [95, 14.4],
  [105, 17],
  [110, 18.6],
  [115, 20.4],
  [120, 22.2]
];
amd_stats.m.wh.max = [
  [80, 12.2],
  [95, 16],
  [105, 19.2],
  [110, 21],
  [115, 23.2],
  [120, 25.8]
];

amd_stats.f.wh = {};
amd_stats.f.wh.min = [
  [80, 9.8],
  [100, 14],
  [105, 15.2],
  [110, 16.6],
  [115, 18.2],
  [120, 20]
];
amd_stats.f.wh.medium = [
  [80, 10.8],
  [100, 15.4],
  [105, 16.8],
  [110, 18.4],
  [115, 20.4],
  [120, 22.4]
];
amd_stats.f.wh.max = [
  [80, 12],
  [100, 17.6],
  [105, 19.4],
  [110, 21.4],
  [115, 23.8],
  [120, 26]
];

amd_stats.dimensions = {};
amd_stats.dimensions.ageAtConsultTime_weight_kg_m = {};
amd_stats.dimensions.ageAtConsultTime_weight_kg_m.top = 0.05;
amd_stats.dimensions.ageAtConsultTime_weight_kg_m.bottom = 0.95;
amd_stats.dimensions.ageAtConsultTime_weight_kg_m.left = 0.03;
amd_stats.dimensions.ageAtConsultTime_weight_kg_m.right = 0.97;
amd_stats.dimensions.ageAtConsultTime_weight_kg_m.vtop = 89;
amd_stats.dimensions.ageAtConsultTime_weight_kg_m.vbottom = 2;
amd_stats.dimensions.ageAtConsultTime_weight_kg_m.vleft = 0;
amd_stats.dimensions.ageAtConsultTime_weight_kg_m.vright = 20;
amd_stats.dimensions.ageAtConsultTime_weight_kg_f = {};
amd_stats.dimensions.ageAtConsultTime_weight_kg_f.top = 0.05;
amd_stats.dimensions.ageAtConsultTime_weight_kg_f.bottom = 0.95;
amd_stats.dimensions.ageAtConsultTime_weight_kg_f.left = 0.03;
amd_stats.dimensions.ageAtConsultTime_weight_kg_f.right = 0.97;
amd_stats.dimensions.ageAtConsultTime_weight_kg_f.vtop = 75;
amd_stats.dimensions.ageAtConsultTime_weight_kg_f.vbottom = 2;
amd_stats.dimensions.ageAtConsultTime_weight_kg_f.vleft = 0;
amd_stats.dimensions.ageAtConsultTime_weight_kg_f.vright = 20;
amd_stats.dimensions.ageAtConsultTime_weight_kg_null = {};
amd_stats.dimensions.ageAtConsultTime_weight_kg_null.top = 0.05;
amd_stats.dimensions.ageAtConsultTime_weight_kg_null.bottom = 0.95;
amd_stats.dimensions.ageAtConsultTime_weight_kg_null.left = 0.03;
amd_stats.dimensions.ageAtConsultTime_weight_kg_null.right = 0.97;
amd_stats.dimensions.ageAtConsultTime_weight_kg_null.vtop = 89;
amd_stats.dimensions.ageAtConsultTime_weight_kg_null.vbottom = 2;
amd_stats.dimensions.ageAtConsultTime_weight_kg_null.vleft = 0;
amd_stats.dimensions.ageAtConsultTime_weight_kg_null.vright = 20;
amd_stats.dimensions.ageAtConsultTime_height_cm_m = {};
amd_stats.dimensions.ageAtConsultTime_height_cm_m.top = 0.05;
amd_stats.dimensions.ageAtConsultTime_height_cm_m.bottom = 0.95;
amd_stats.dimensions.ageAtConsultTime_height_cm_m.left = 0.03;
amd_stats.dimensions.ageAtConsultTime_height_cm_m.right = 0.97;
amd_stats.dimensions.ageAtConsultTime_height_cm_m.vtop = 186;
amd_stats.dimensions.ageAtConsultTime_height_cm_m.vbottom = 47;
amd_stats.dimensions.ageAtConsultTime_height_cm_m.vleft = 0;
amd_stats.dimensions.ageAtConsultTime_height_cm_m.vright = 20;
amd_stats.dimensions.ageAtConsultTime_height_cm_f = {};
amd_stats.dimensions.ageAtConsultTime_height_cm_f.top = 0.05;
amd_stats.dimensions.ageAtConsultTime_height_cm_f.bottom = 0.95;
amd_stats.dimensions.ageAtConsultTime_height_cm_f.left = 0.03;
amd_stats.dimensions.ageAtConsultTime_height_cm_f.right = 0.97;
amd_stats.dimensions.ageAtConsultTime_height_cm_f.vtop = 172;
amd_stats.dimensions.ageAtConsultTime_height_cm_f.vbottom = 46;
amd_stats.dimensions.ageAtConsultTime_height_cm_f.vleft = 0;
amd_stats.dimensions.ageAtConsultTime_height_cm_f.vright = 20;
amd_stats.dimensions.ageAtConsultTime_height_cm_null = {};
amd_stats.dimensions.ageAtConsultTime_height_cm_null.top = 0.05;
amd_stats.dimensions.ageAtConsultTime_height_cm_null.bottom = 0.95;
amd_stats.dimensions.ageAtConsultTime_height_cm_null.left = 0.03;
amd_stats.dimensions.ageAtConsultTime_height_cm_null.right = 0.97;
amd_stats.dimensions.ageAtConsultTime_height_cm_null.vtop = 186;
amd_stats.dimensions.ageAtConsultTime_height_cm_null.vbottom = 46;
amd_stats.dimensions.ageAtConsultTime_height_cm_null.vleft = 0;
amd_stats.dimensions.ageAtConsultTime_height_cm_null.vright = 20;
amd_stats.dimensions.height_cm_weight_kg_m = {};
amd_stats.dimensions.height_cm_weight_kg_m.top = 0.05;
amd_stats.dimensions.height_cm_weight_kg_m.bottom = 0.95;
amd_stats.dimensions.height_cm_weight_kg_m.left = 0.03;
amd_stats.dimensions.height_cm_weight_kg_m.right = 0.97;
amd_stats.dimensions.height_cm_weight_kg_m.vtop = 26;
amd_stats.dimensions.height_cm_weight_kg_m.vbottom = 10;
amd_stats.dimensions.height_cm_weight_kg_m.vleft = 80;
amd_stats.dimensions.height_cm_weight_kg_m.vright = 120;
amd_stats.dimensions.height_cm_weight_kg_f = {};
amd_stats.dimensions.height_cm_weight_kg_f.top = 0.05;
amd_stats.dimensions.height_cm_weight_kg_f.bottom = 0.95;
amd_stats.dimensions.height_cm_weight_kg_f.left = 0.03;
amd_stats.dimensions.height_cm_weight_kg_f.right = 0.97;
amd_stats.dimensions.height_cm_weight_kg_f.vtop = 26;
amd_stats.dimensions.height_cm_weight_kg_f.vbottom = 9;
amd_stats.dimensions.height_cm_weight_kg_f.vleft = 80;
amd_stats.dimensions.height_cm_weight_kg_f.vright = 120;
amd_stats.dimensions.height_cm_weight_kg_null = {};
amd_stats.dimensions.height_cm_weight_kg_null.top = 0.05;
amd_stats.dimensions.height_cm_weight_kg_null.bottom = 0.95;
amd_stats.dimensions.height_cm_weight_kg_null.left = 0.03;
amd_stats.dimensions.height_cm_weight_kg_null.right = 0.97;
amd_stats.dimensions.height_cm_weight_kg_null.vtop = 26;
amd_stats.dimensions.height_cm_weight_kg_null.vbottom = 9;
amd_stats.dimensions.height_cm_weight_kg_null.vleft = 80;
amd_stats.dimensions.height_cm_weight_kg_null.vright = 120;
amd_stats.dimensions.ageAtConsultTime_bmi_m = {};
amd_stats.dimensions.ageAtConsultTime_bmi_m.top = 0.05;
amd_stats.dimensions.ageAtConsultTime_bmi_m.bottom = 0.95;
amd_stats.dimensions.ageAtConsultTime_bmi_m.left = 0.03;
amd_stats.dimensions.ageAtConsultTime_bmi_m.right = 0.97;
amd_stats.dimensions.ageAtConsultTime_bmi_m.vtop = 31;
amd_stats.dimensions.ageAtConsultTime_bmi_m.vbottom = 14;
amd_stats.dimensions.ageAtConsultTime_bmi_m.vleft = 2;
amd_stats.dimensions.ageAtConsultTime_bmi_m.vright = 20;
amd_stats.dimensions.ageAtConsultTime_bmi_f = {};
amd_stats.dimensions.ageAtConsultTime_bmi_f.top = 0.05;
amd_stats.dimensions.ageAtConsultTime_bmi_f.bottom = 0.95;
amd_stats.dimensions.ageAtConsultTime_bmi_f.left = 0.03;
amd_stats.dimensions.ageAtConsultTime_bmi_f.right = 0.97;
amd_stats.dimensions.ageAtConsultTime_bmi_f.vtop = 32;
amd_stats.dimensions.ageAtConsultTime_bmi_f.vbottom = 13;
amd_stats.dimensions.ageAtConsultTime_bmi_f.vleft = 2;
amd_stats.dimensions.ageAtConsultTime_bmi_f.vright = 20;
amd_stats.dimensions.ageAtConsultTime_bmi_null = {};
amd_stats.dimensions.ageAtConsultTime_bmi_null.top = 0.05;
amd_stats.dimensions.ageAtConsultTime_bmi_null.bottom = 0.95;
amd_stats.dimensions.ageAtConsultTime_bmi_null.left = 0.03;
amd_stats.dimensions.ageAtConsultTime_bmi_null.right = 0.97;
amd_stats.dimensions.ageAtConsultTime_bmi_null.vtop = 31;
amd_stats.dimensions.ageAtConsultTime_bmi_null.vbottom = 13;
amd_stats.dimensions.ageAtConsultTime_bmi_null.vleft = 2;
amd_stats.dimensions.ageAtConsultTime_bmi_null.vright = 20;

// TODO: rework the stat system
// /**
//  * @param {number} xlow - x low
//  * @param {number} xhigh - x high
//  * @param {number} ylow - y low
//  * @param {number} yhigh - y high
//  * @param {number} point - x point
//  * @returns {number} y low
//  */
// function interpolate(xlow, xhigh, ylow, yhigh, point) {
//     // y = a * x + b
//     const a = (yhigh - ylow) / (xhigh - xlow);
//     const b = yhigh - a * xhigh;
//     return a * point + b;
// }

// for(const k of Object.keys(amd_stats.dimensions)) {
//     const img = amd_stats.dimensions[k];
//     img.x_axis = {
//         low: interpolate(img.left, img.right, img.vleft, img.vright, 0),
//         high: interpolate(img.left, img.right, img.vleft, img.vright, 1),
//     };
//     img.y_axis = {
//         low: interpolate(img.bottom, img.top, img.vbottom, img.vtop, 0),
//         high: interpolate(img.bottomleft, img.top, img.vbottom, img.vtop, 1)
//     };
//     console.log(img);
// }

deepFreeze(amd_stats);
