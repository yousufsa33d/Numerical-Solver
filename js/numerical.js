class Numerical {
  static Data = {
    force: {
      units: ["N"],
      SIunit: "N",
      mathHtml: "\\f\\o\\r\\c\\e",
      symbol: "\\F",
    },
    acceleration: {
      units: ["ms^(-2)"],
      SIunit: "ms^(-2)",
      mathHtml: "\\a\\c\\c\\e\\l\\e\\r\\a\\t\\i\\o\\n",
      symbol: "\\a",
    },
    velocity: {
      units: ["ms^(-1)", "kmh^(-1)", "feet/sec"],
      SIunit: "ms^(-1)",
      mathHtml: "\\v\\e\\l\\o\\c\\i\\t\\y",
      symbol: "\\v",
    },
    mass: {
      units: ["kg", "g"],
      SIunit: "kg",
      mathHtml: "\\m\\a\\s\\s",
      symbol: "\\m",
    },
    "vector magnitude": {
      units: [" "],
      SIunit: " ",
      mathHtml: "\\v\\e\\c\\t\\o\\r\\ \\m\\a\\g\\n\\i\\t\\u\\d\\e",
      symbol: "\\A",
    },
    "vector x-component": {
      units: [" "],
      SIunit: " ",
      mathHtml: "\\v\\e\\c\\t\\o\\r\\ \\x\\-\\c\\o\\m\\p\\o\\n\\e\\n\\t",
      symbol: "\\A_x",
    },
    "vector y-component": {
      units: [" "],
      SIunit: " ",
      mathHtml: "\\v\\e\\c\\t\\o\\r\\ \\y\\-\\c\\o\\m\\p\\o\\n\\e\\n\\t",
      symbol: "\\A_y",
    },
    angle: {
      units: ["\\d\\e\\g\\r\\e\\e", "radian"],
      SIunit: "radian",
      mathHtml: "\\a\\n\\g\\l\\e",
      symbol: "theta",
    },
    displacement: {
      units: ["m", "km", "cm", "mm"],
      SIunit: "m",
      mathHtml: "\\d\\i\\s\\p\\l\\a\\c\\e\\m\\e\\n\\t",
      symbol: "d",
    },
    time: {
      units: ["s", "\\m\\i\\n\\u\\t\\e", "hour"],
      SIunit: "s",
      mathHtml: "\\t\\i\\m\\e",
      symbol: "t",
    },
  };
  static Formula = {
    force: {
      "newton 2nd law of motion": {
        data: ["acceleration", "mass"],
        solve: function (dataObject) {
          let acceleration = dataObject.known["acceleration"].value;
          let mass = dataObject.known["mass"].value;
          let unit = Numerical.Data["force"].SIunit;
          let steps = [
            `\\F = ma`,
            `\\F = ${mass} xx ${acceleration}`,
            `\\F = #${mass} xx ${acceleration}# ${unit}`,
          ];
          let html = Numerical.getHTML(steps);
          dataObject.known["force"] = {
            value: Numerical.evaluate(
              dataObject.known.mass.value +
                "*" +
                dataObject.known.acceleration.value
            ),
            unit: Numerical.Data.force.SIunit,
          };
          dataObject.unknown = dataObject.unknown.filter(function (el) {
            return el != "force";
          });
          return [html, dataObject];
        },
      },
    },
    "vector magnitude": {
      "vector magnitude formula": {
        data: ["vector y-component", "vector x-component"],
        solve: function (dataObject) {
          let vectorXComponent = dataObject.known["vector x-component"].value;
          let vectorYComponent = dataObject.known["vector y-component"].value;
          let unit = Numerical.Data["vector magnitude"].SIunit;
          let steps = [
            `A = sqrt((\\A_x)^(2) + (\\A_y)^(2))`,
            `A = sqrt((${vectorXComponent})^(2) + (${vectorYComponent})^(2))`,
            `A = sqrt(#(${vectorXComponent})^(2)# + #(${vectorYComponent})^(2)#)`,
            `A = sqrt(#(${vectorXComponent})^(2) + (${vectorYComponent})^(2)#)`,
            `A = #sqrt((${vectorXComponent})^(2) + (${vectorYComponent})^(2))# ${unit}`,
          ];
          let html = Numerical.getHTML(steps);
          dataObject.known["vector magnitude"] = {
            value: Numerical.evaluate(
              `sqrt((${vectorXComponent})^(2) + (${vectorYComponent})^(2))`
            ),
            unit: Numerical.Data["vector magnitude"].SIunit,
          };
          dataObject.unknown = dataObject.unknown.filter(function (el) {
            return el != "vector magnitude";
          });
          return [html, dataObject];
        },
      },
      "vector x-component formula": {
        data: ["vector x-component", "angle"],
        solve: function (dataObject) {
          let angle = dataObject.known["angle"].value;
          let vectorXComponent = dataObject.known["vector x-component"].value;
          let unit = Numerical.Data["vector magnitude"].SIunit;
          let steps = [
            `A_x = A cos theta`,
            `A = a_x/(cos theta)`,
            `A = ${vectorXComponent}/(cos(${angle}))`,
            `A = #${vectorXComponent}/(cos(${angle}))# ${unit}`,
          ];
          let html = Numerical.getHTML(steps);
          dataObject.known["vector magnitude"] = {
            value: Numerical.evaluate(`${vectorXComponent}/(cos(${angle}))`),
            unit: unit,
          };
          dataObject.unknown = dataObject.unknown.filter(function (el) {
            return el != "vector magnitude";
          });
          return [html, dataObject];
        },
      },
      "vector y-component formula": {
        data: ["vector y-component", "angle"],
        solve: function (dataObject) {
          let angle = dataObject.known["angle"].value;
          let vectorYComponent = dataObject.known["vector y-component"].value;
          let unit = Numerical.Data["vector magnitude"].SIunit;
          let steps = [
            `A_y = A sin theta`,
            `A = A_y / (sin theta)`,
            `A = ${vectorYComponent} / (sin (${angle}))`,
            `A = ${vectorYComponent} / (#sin (${angle})#)`,
            `A = #${vectorYComponent} / (sin (${angle}))# ${unit}`,
          ];
          let html = Numerical.getHTML(steps);
          dataObject.known["vector magnitude"] = {
            value: Numerical.evaluate(`${vectorYComponent} / (sin (${angle}))`),
            unit: unit,
          };
          dataObject.unknown = dataObject.unknown.filter(function (el) {
            return el != "vector magnitude";
          });
          return [html, dataObject];
        },
      },
    },
    "vector x-component": {
      "vector magnitude formula": {
        data: ["vector magnitude", "vector y-component"],
        solve: function (dataObject) {
          let vectorMagnitude = dataObject.known["vector magnitude"].value;
          let vectorYComponent = dataObject.known["vector y-component"].value;
          let unit = Numerical.Data["vector x-component"].SIunit;
          let steps = [
            `A = sqrt((\\A_x)^(2) + (\\A_y)^(2))`,
            `A_x = sqrt((\\A)^(2) - (\\A-y)^(2))`,
            `A_x = sqrt((${vectorMagnitude})^(2) - (${vectorYComponent})^(2))`,
            `A_x = sqrt(#(${vectorMagnitude})^(2)# - #(${vectorYComponent})^(2)#)`,
            `A_x = sqrt(#(${vectorMagnitude})^(2) - (${vectorYComponent})^(2)#)`,
            `A_x = #sqrt((${vectorMagnitude})^(2) - (${vectorYComponent})^(2))# ${unit}`,
          ];
          let html = Numerical.getHTML(steps);
          dataObject.known["vector x-component"] = {
            value: Numerical.evaluate(
              `sqrt((${vectorMagnitude})^(2) - (${vectorYComponent})^(2))`
            ),
            unit: Numerical.Data["vector x-component"].SIunit,
          };
          dataObject.unknown = dataObject.unknown.filter(function (el) {
            return el != "vector x-component";
          });
          return [html, dataObject];
        },
      },
      "vector direction formula": {
        data: ["vector y-component", "angle"],
        solve: function (dataObject) {
          let angle = dataObject.known["angle"].value;
          let vectorYComponent = dataObject.known["vector y-component"].value;
          let unit = Numerical.Data["vector x-component"].SIunit;
          let steps = [
            `theta = tan^(-1)(A_y/A_x)`,
            `A_x = A_y/(tan theta)`,
            `A_x = ${vectorYComponent}/(tan ${angle})`,
            `A_x = #${vectorYComponent}/(tan(${angle}))# ${unit}`,
          ];
          let html = Numerical.getHTML(steps);
          dataObject.known["vector x-component"] = {
            value: Numerical.evaluate(`${vectorYComponent}/(tan(${angle}))`),
            unit: unit,
          };
          dataObject.unknown = dataObject.unknown.filter(function (el) {
            return el != " vector x-component ";
          });
          return [html, dataObject];
        },
      },
      "vector x-component formula": {
        data: ["vector magnitude", "angle"],
        solve: function (dataObject) {
          let angle = dataObject.known["angle"].value;
          let vectorMagnitude = dataObject.known["vector magnitude"].value;
          let unit = Numerical.Data["vector x-component"].SIunit;
          let steps = [
            `A_x = A cos theta`,
            `A_x = ${vectorMagnitude} cos(${angle})`,
            `A_x = #${vectorMagnitude} cos(${angle})# ${unit}`,
          ];
          let html = Numerical.getHTML(steps);
          dataObject.known["vector x-component"] = {
            value: Numerical.evaluate(`${vectorMagnitude} cos(${angle})`),
            unit: unit,
          };
          dataObject.unknown = dataObject.unknown.filter(function (el) {
            return el != "vector x-component";
          });
          return [html, dataObject];
        },
      },
    },
    "vector y-component": {
      "vector magnitude formula": {
        data: ["vector magnitude", "vector x-component"],
        solve: function (dataObject) {
          let vectorMagnitude = dataObject.known["vector magnitude"].value;
          let vectorXComponent = dataObject.known["vector x-component"].value;
          let unit = Numerical.Data["vector y-component"].SIunit;
          let steps = [
            `A = sqrt((\\A_x)^(2) + (\\A_y)^(2))`,
            `A_y = sqrt((\\A)^(2) - (\\A-x)^(2))`,
            `A_y = sqrt((${vectorMagnitude})^(2) - (${vectorXComponent})^(2))`,
            `A_y = sqrt(#(${vectorMagnitude})^(2)# - #(${vectorXComponent})^(2)#)`,
            `A_y = sqrt(#(${vectorMagnitude})^(2) - (${vectorXComponent})^(2)#)`,
            `A_y = #sqrt((${vectorMagnitude})^(2) - (${vectorXComponent})^(2))# ${unit}`,
          ];
          let html = Numerical.getHTML(steps);
          dataObject.known["vector y-component"] = {
            value: Numerical.evaluate(
              `sqrt((${vectorMagnitude})^(2) - (${vectorXComponent})^(2))`
            ),
            unit: Numerical.Data["vector y-component"].SIunit,
          };
          dataObject.unknown = dataObject.unknown.filter(function (el) {
            return el != "vector y-component";
          });
          return [html, dataObject];
        },
      },
      "vector direction formula": {
        data: ["vector x-component", "angle"],
        solve: function (dataObject) {
          let vectorXComponent = dataObject.known["vector x-component"].value;
          let angle = dataObject.known["angle"].value;
          let unit = Numerical.Data["vector y-component"].SIunit;
          let steps = [
            `theta = tan^(-1)(A_y/A_x)`,
            `A_y = \\A_x tan theta`,
            `A_y = ${vectorXComponent} tan(${angle})`,
            `A_y = #${vectorXComponent} tan(${angle})# ${unit}`,
          ];
          let html = Numerical.getHTML(steps);
          dataObject.known["vector y-component"] = {
            value: Numerical.evaluate(`${vectorXComponent} tan(${angle})`),
            unit: unit,
          };
          dataObject.unknown = dataObject.unknown.filter(function (el) {
            return el != "vector y-component";
          });
          return [html, dataObject];
        },
      },
      "vector y-component formula": {
        data: ["vector magnitude", "angle"],
        solve: function (dataObject) {
          let angle = dataObject.known["angle"].value;
          let vectorMagnitude = dataObject.known["vector magnitude"].value;
          let unit = Numerical.Data["vector y-component"].SIunit;
          let steps = [
            `A_y = A sin theta`,
            `A_y = ${vectorMagnitude} sin (${angle})`,
            `A_y = ${vectorMagnitude} (#sin (${angle})#)`,
            `A_y = #${vectorMagnitude} sin (${angle})# ${unit}`,
          ];
          let html = Numerical.getHTML(steps);
          dataObject.known["vector y-component"] = {
            value: Numerical.evaluate(`${vectorMagnitude} sin (${angle})`),
            unit: unit,
          };
          dataObject.unknown = dataObject.unknown.filter(function (el) {
            return el != "vector y-component";
          });
          return [html, dataObject];
        },
      },
    },
    angle: {
      "vector direction formula": {
        data: ["vector y-component", "vector x-component"],
        solve: function (dataObject) {
          let vectorYComponent = dataObject.known["vector y-component"].value;
          let vectorXComponent = dataObject.known["vector x-component"].value;
          let unit = Numerical.Data["angle"].SIunit;
          let steps = [
            `theta = tan^(-1)(A_y/A_x)`,
            `theta = tan^(-1)(${vectorYComponent}/${vectorXComponent})`,
            `theta = tan^(-1)(#${vectorYComponent}/${vectorXComponent}#)`,
            `theta = #tan^(-1)(${vectorYComponent}/${vectorXComponent})# ${unit}`,
          ];
          let html = Numerical.getHTML(steps);
          dataObject.known["angle"] = {
            value: Numerical.evaluate(
              `tan^(-1)(${vectorYComponent}/${vectorXComponent})`
            ),
            unit: unit,
          };
          dataObject.unknown = dataObject.unknown.filter(function (el) {
            return el != "angle";
          });
          return [html, dataObject];
        },
      },
      "vector x-component formula": {
        data: ["vector x-component", "vector magnitude"],
        solve: function (dataObject) {
          let vectorXComponent = dataObject.known["vector x-component"].value;
          let vectorMagnitude = dataObject.known["vector magnitude"].value;
          let unit = Numerical.Data["angle"].SIunit;
          let steps = [
            `A_x = A cos theta`,
            `theta = cos^(-1)(A_x/A)`,
            `theta = cos^(-1)(${vectorXComponent}/${vectorMagnitude})`,
            `theta = cos^(-1)(#${vectorXComponent}/${vectorMagnitude}#)`,
            `theta = #cos^(-1)(${vectorXComponent}/${vectorMagnitude})# ${unit}`,
          ];
          let html = Numerical.getHTML(steps);
          dataObject.known["angle"] = {
            value: Numerical.evaluate(
              `cos^(-1)(${vectorXComponent}/${vectorMagnitude})`
            ),
            unit: unit,
          };
          dataObject.unknown = dataObject.unknown.filter(function (el) {
            return el != "angle";
          });
          return [html, dataObject];
        },
      },
      "vector y-component formula": {
        data: ["vector y-component", "vector magnitude"],
        solve: function (dataObject) {
          let vectorYComponent = dataObject.known["vector y-component"].value;
          let vectorMagnitude = dataObject.known["vector magnitude"].value;
          let unit = Numerical.Data["angle"].SIunit;
          let steps = [
            `A_y = A sin theta`,
            `theta = cos^(-1)(A_y / A)`,
            `theta = cos^(-1)(${vectorYComponent} / ${vectorMagnitude})`,
            `theta = cos^(-1)(#${vectorYComponent} / ${vectorMagnitude}#)`,
            `theta = #cos^(-1)(${vectorYComponent} / ${vectorMagnitude})#`,
          ];
          let html = Numerical.getHTML(steps);
          dataObject.known["angle"] = {
            value: Numerical.evaluate(
              `cos^(-1)(${vectorYComponent} / ${vectorMagnitude})`
            ),
            unit: unit,
          };
          dataObject.unknown = dataObject.unknown.filter(function (el) {
            return el != "angle";
          });
          return [html, dataObject];
        },
      },
    },
    velocity: {
      "velocity formula": {
        data: ["displacement", "time"],
        solve: function (dataObject) {
          let displacement = dataObject.known["displacement"].value;
          let time = dataObject.known["time"].value;
          let unit = Numerical.Data["velocity"].SIunit;
          let steps = [
            `v = d/t`,
            `v = ${displacement}/(${time})`,
            `v = #${displacement}/(${time})# ${unit}`,
          ];
          let html = Numerical.getHTML(steps);
          dataObject.known["velocity"] = {
            value: Numerical.evaluate(`${displacement}/(${time})`),
            unit: unit,
          };
          dataObject.unknown = dataObject.unknown.filter(function (el) {
            return el != "velocity";
          });
          return [html, dataObject];
        },
      },
      "acceleration formula": {
        data: ["acceleration", "time"],
        solve: function (dataObject) {
          let acceleration = dataObject.known["acceleration"].value;
          let time = dataObject.known["time"].value;
          let unit = Numerical.Data["velocity"].SIunit;
          let steps = [
            `a = v / t`,
            `v = a t`,
            `v = ${acceleration} xx ${time}`,
            `v = #${acceleration} xx ${time}# ${unit}`,
          ];
          let html = Numerical.getHTML(steps);
          dataObject.known["velocity"] = {
            value: Numerical.evaluate(`${acceleration} xx ${time}`),
            unit: unit,
          };
          dataObject.unknown = dataObject.unknown.filter(function (el) {
            return el != "velocity";
          });
          return [html, dataObject];
        },
      },
      "acceleration formula putting velocity": {
        data: ["acceleration", "displacement"],
        solve: function (dataObject) {
          let acceleration = dataObject.known["acceleration"].value;
          let displacement = dataObject.known["displacement"].value;
          let unit = Numerical.Data["velocity"].SIunit;
          let steps = [
            `a = v / t`,
            `\\p\\u\\t\\t\\i\\n\\g\\ t = d / v`,
            `v = sqrt(a d)`,
            `v = sqrt(${acceleration} xx ${displacement})`,
            `v = sqrt(#${acceleration} xx ${displacement}#)`,
            `v = #sqrt(${acceleration} xx ${displacement})#`,
          ];
          let html = Numerical.getHTML(steps);
          dataObject.known["velocity"] = {
            value: Numerical.evaluate(
              `sqrt(${acceleration} xx ${displacement})`
            ),
            unit: unit,
          };
          dataObject.unknown = dataObject.unknown.filter(function (el) {
            return el != "velocity";
          });
          return [html, dataObject];
        },
      },
    },
    displacement: {
      "velocity formula": {
        data: ["velocity", "time"],
        solve: function (dataObject) {
          let time = dataObject.known["time"].value;
          let velocity = dataObject.known["velocity"].value;
          let unit = Numerical.Data["displacement"].SIunit;
          let steps = [
            `v = d/t`,
            `d = vt`,
            `d = ${velocity} xx ${time}`,
            `d = #${velocity} xx ${time}# ${unit}`,
          ];
          let html = Numerical.getHTML(steps);
          dataObject.known["displacement"] = {
            value: Numerical.evaluate(`${velocity} xx ${time}`),
            unit: unit,
          };
          dataObject.unknown = dataObject.unknown.filter(function (el) {
            return el != "displacement";
          });
          return [html, dataObject];
        },
      },
      "acceleration formula putting velocity": {
        data: ["acceleration", "time"],
        solve: function (dataObject) {
          let time = dataObject.known["time"].value;
          let acceleration = dataObject.known["acceleration"].value;
          let unit = Numerical.Data["displacement"].SIunit;
          let steps = [
            `a = v / t`,
            `\p\\u\\t\\t\\i\\n\\g\\ v = d / t`,
            `d = a t^(2)`,
            `d = ${acceleration} xx ${time}^(2)`,
            `d = ${acceleration} xx #${time}^(2)#`,
            `d = #${acceleration} xx (${time}^(2))# ${unit}`,
          ];
          let html = Numerical.getHTML(steps);
          dataObject.known["displacement"] = {
            value: Numerical.evaluate(`${acceleration} xx (${time}^(2))`),
            unit: unit,
          };
          dataObject.unknown = dataObject.unknown.filter(function (el) {
            return el != "displacement";
          });
          return [html, dataObject];
        },
      },
      "acceleration formula putting time": {
        data: ["velocity", "acceleration"],
        solve: function (dataObject) {
          let velocity = dataObject.known["velocity"].value;
          let acceleration = dataObject.known["acceleration"].value;
          let unit = Numerical.Data["displacement"].SIunit;
          let steps = [
            `a = v / t`,
            `\\p\\u\\t\\t\\i\\n\\g\\ t = d / v`,
            `d = (v^(2)) / a`,
            `d = (${velocity}^(2)) / (${acceleration})`,
            `d = (#${velocity}^(2))# / (${acceleration})`,
            `d = #(${velocity}^(2)) / (${acceleration})# ${unit}`,
          ];
          let html = Numerical.getHTML(steps);
          dataObject.known["displacement"] = {
            value: Numerical.evaluate(`(${velocity}^(2)) / (${acceleration})`),
            unit: unit,
          };
          dataObject.unknown = dataObject.unknown.filter(function (el) {
            return el != "displacement";
          });
          return [html, dataObject];
        },
      },
    },
    time: {
      "velocity formula": {
        data: ["displacement", "velocity"],
        solve: function (dataObject) {
          let displacement = dataObject.known["displacement"].value;
          let velocity = dataObject.known["velocity"].value;
          let unit = Numerical.Data["time"].SIunit;
          let steps = [
            `v = d/t`,
            `t = d / v`,
            `t = ${displacement} / (${velocity})`,
            `t = #${displacement} / (${velocity})# ${unit}`,
          ];
          let html = Numerical.getHTML(steps);
          dataObject.known["time"] = {
            value: Numerical.evaluate(`${displacement} / (${velocity})`),
            unit: unit,
          };
          dataObject.unknown = dataObject.unknown.filter(function (el) {
            return el != "time";
          });
          return [html, dataObject];
        },
      },
      "acceleration formula": {
        data: ["velocity", "acceleration"],
        solve: function (dataObject) {
          let velocity = dataObject.known["velocity"].value;
          let acceleration = dataObject.known["velocity"].value;
          let unit = Numerical.Data["time"].SIunit;
          let steps = [
            `a = v / t`,
            `t = v / a`,
            `t = ${velocity} / (${acceleration})`,
            `t = #${velocity} / (${acceleration})# ${unit}`,
          ];
          let html = Numerical.getHTML(steps);
          dataObject.known["time"] = {
            value: Numerical.evaluate(`${velocity} / (${acceleration})`),
            unit: unit,
          };
          dataObject.unknown = dataObject.unknown.filter(function (el) {
            return el != "time";
          });
          return [html, dataObject];
        },
      },
      "acceleration formula putting velocity": {
        data: ["displacement", "acceleration"],
        solve: function (dataObject) {
          let displacement = dataObject.known["displacement"].value;
          let acceleration = dataObject.known["acceleration"].value;
          let unit = Numerical.Data["time"].SIunit;
          let steps = [
            `a = v / t`,
            `\p\\u\\t\\t\\i\\n\\g\\ v = d / t`,
            `t = sqrt(d / a)`,
            `t = sqrt(${displacement} / (${acceleration}))`,
            `t = sqrt(#${displacement} / (${acceleration})#)`,
            `t = #sqrt(${displacement} / (${acceleration}))# ${unit}`,
          ];
          let html = Numerical.getHTML(steps);
          dataObject.known["time"] = {
            value: Numerical.evaluate(
              `sqrt(${displacement} / (${acceleration}))`
            ),
            unit: unit,
          };
          dataObject.unknown = dataObject.unknown.filter(function (el) {
            return el != "time";
          });
          return [html, dataObject];
        },
      },
    },
    acceleration: {
      "acceleration formula": {
        data: ["velocity", "time"],
        solve: function (dataObject) {
          let velocity = dataObject.known["velocity"].value;
          let time = dataObject.known["time"].value;
          let unit = Numerical.Data["acceleration"].SIunit;
          let steps = [
            `a = v / t`,
            `a = ${velocity} / (${time})`,
            `a = #${velocity} / (${time})# ${unit}`,
          ];
          let html = Numerical.getHTML(steps);
          dataObject.known["acceleration"] = {
            value: Numerical.evaluate(`${velocity} / (${time})`),
            unit: unit,
          };
          dataObject.unknown = dataObject.unknown.filter(function (el) {
            return el != "acceleration";
          });
          return [html, dataObject];
        },
      },
      "acceleration formula putting velocity": {
        data: ["displacement", "time"],
        solve: function (dataObject) {
          let time = dataObject.known["time"].value;
          let displacement = dataObject.known["displacement"].value;
          let unit = Numerical.Data["acceleration"].SIunit;
          let steps = [
            `a = v / t`,
            `\\p\\u\\t\\t\\i\\n\\g\\ v = d/t`,
            `a = d / (t^(2))`,
            `a = ${displacement} / (${time}^(2))`,
            `a = ${displacement} / (#${time}^(2)#)`,
            `a = #${displacement} / (${time}^(2))# ${unit}`,
          ];
          let html = Numerical.getHTML(steps);
          dataObject.known["acceleration"] = {
            value: Numerical.evaluate(`${displacement} / (${time}^(2))`),
            unit: unit,
          };
          dataObject.unknown = dataObject.unknown.filter(function (el) {
            return el != "acceleration";
          });
          return [html, dataObject];
        },
      },
      "acceleration formula putting time": {
        data: ["velocity", "displacement"],
        solve: function (dataObject) {
          let velocity = dataObject.known["velocity"].value;
          let displacement = dataObject.known["displacement"].value;
          let unit = Numerical.Data["acceleration"].SIunit;
          let steps = [
            `a = v / t`,
            `\\p\\u\\t\\t\\i\\n\\g\\ t = d / v`,
            `a = (v^(2)) / d`,
            `a = (${velocity}^(2)) / ${displacement}`,
            `a = #(${velocity}^(2))# / ${displacement}`,
            `a = #(${velocity}^(2)) / ${displacement}# ${unit}`,
          ];
          let html = Numerical.getHTML(steps);
          dataObject.known["acceleration"] = {
            value: Numerical.evaluate(`(${velocity}^(2)) / ${displacement}`),
            unit: unit,
          };
          dataObject.unknown = dataObject.unknown.filter(function (el) {
            return el != "acceleration";
          });
          return [html, dataObject];
        },
      },
    },
  };
  static Units = {
    mass: {
      g: 0.001,
    },
    angle: {
      "\\d\\e\\g\\r\\e\\e": "pi/180",
    },
    velocity: {
      "kmh^(-1)": 3.6,
      "feet/sec": 3.281,
    },
    displacement: {
      km: 1000,
      cm: 0.01,
      mm: 0.001,
    },
    time: {
      "\\m\\i\\n\\u\\t\\e": 60,
      hour: 3600,
    },
  };
  static validValue(value) {
    value = value.replace(/xx/g, "*");
    try {
      math.evaluate(value);
      return true;
    } catch (err) {
      return false;
    }
  }
  static evaluate(expr) {
    expr = expr.replace(/xx/g, "*");
    expr = expr.replace(/tan\^\(-1\)/g, "atan");
    expr = expr.replace(/cos\^\(-1\)/g, "acos");
    console.log(expr);
    let ans = math.evaluate(expr).toString();
    if (ans.includes("e")) {
      ans = Number(ans);
      ans = ans.toExponential(3).toString();
      ans = ans.split("e");
      ans = ans[0] + "xx10^(" + Number(ans[1]) + ")";
    } else if (Number(ans) > 10000 && Number(ans) != "infinity") {
      ans = Number(ans);
      ans = ans.toExponential(3).toString();
      ans = ans.split("e");
      ans = ans[0] + "xx10^(" + Number(ans[1]) + ")";
    } else if (Number(ans) < 0.1 && Number(ans) != 0) {
      ans = Number(ans);
      ans = ans.toExponential(3).toString();
      ans = ans.split("e");
      ans = ans[0] + "xx10^(" + Number(ans[1]) + ")";
    }
    if (!ans.includes("xx10^(")) {
      ans = math.round(ans, 3).toString();
    }
    return ans;
  }
  static getData(dataObject) {
    let knownData = dataObject.known;
    let unknownData = dataObject.unknown;
    let html =
      '<li data-role="list-divider"><p class="text-center"><strong>`Data`</strong></p></li>';
    for (let data in knownData) {
      if (knownData[data].unit == Numerical.Data[data].SIunit) {
        html += `<li><p><strong>\` ${Numerical.Data[data].symbol} = ${Numerical.Data[data].mathHtml} = ${knownData[data].value} ${knownData[data].unit}\`</strong></p></li>`;
      } else {
        let expr = `${knownData[data].value} * ${
          Numerical.Units[data][knownData[data].unit]
        }`;
        html += `<li><p><strong>\` ${Numerical.Data[data].symbol} = ${
          Numerical.Data[data].mathHtml
        } = ${knownData[data].value} ${knownData[data].unit} = ${this.evaluate(
          expr
        )} ${Numerical.Data[data].SIunit}\`</strong></p></li>`;
        knownData[data].value = this.evaluate(expr);
        knownData[data].unit = Numerical.Data[data].SIunit;
      }
    }
    for (let data of unknownData) {
      html += `<li><p><strong>\`${Numerical.Data[data].symbol} = ${Numerical.Data[data].mathHtml} = ?\`</strong></p></li>`;
    }
    return [html, dataObject];
  }
  static getHTML(steps) {
    let html = "";
    for (let step of steps) {
      while (step.includes("#")) {
        let start = false;
        let expr = "";
        for (let char of step) {
          if (!start) {
            if (char == "#") {
              start = true;
            }
          } else {
            if (char == "#") {
              break;
            } else {
              expr += char;
            }
          }
        }
        console.log(expr);
        // alert('')
        step = step.replace(`#${expr}#`, Numerical.evaluate(expr));
      }
      html += `<li style="max-width: 100%; overflow-x: auto;"><strong>\`${step}\`</strong></li>`;
    }
    return html;
  }
}
