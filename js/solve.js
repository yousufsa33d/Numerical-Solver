$(document).on("pagecreate", "#mainpage", function () {
  let data = document.getElementById("data");
  let solveBtn = document.getElementById("solveBtn");
  let errorDetail = document.getElementById("errorDetail");
  solveBtn.addEventListener("click", function () {
    if (data.querySelectorAll(".data").length == 0) {
      errorDetail.innerHTML =
        "There is no data to solve. Please check and try again.";
      $("#errorPopup").popup("open");
    } else if (data.querySelectorAll('.data[data-value="?"]').length == 0) {
      errorDetail.innerHTML =
        "There is no unknown data to solve. Please check and try again.";
      $("#errorPopup").popup("open");
    } else {
      let dataObject = {
        unknown: [],
        known: {},
      };
      for (let childData of data.children) {
        if (childData.getAttribute("data-value") == "?") {
          dataObject.unknown.push(childData.getAttribute("data-data"));
        } else {
          dataObject.known[childData.getAttribute("data-data")] = {
            value: childData.getAttribute("data-value"),
            unit: childData.getAttribute("data-unit"),
          };
        }
      }
      let getData = Numerical.getData(dataObject);
      let html = getData[0];
      html +=
        '<li data-role="list-divider"><p class="text-center"><strong>`Solution`</strong></p></li>';
      dataObject = getData[1];
      let solution = document.getElementById("solution");
      let unknownLength = dataObject.unknown.length;
      let formula; // initializing formula for further use
      for (let index = 0; index < unknownLength; index++) {
        formula = foundFormula(dataObject);
        if (formula == "noFormula") {
          break;
        } else {
          let formulaSolve = formula.solve(dataObject);
          html += formulaSolve[0];
          dataObject = formulaSolve[1];
        }
      }
      if (formula == "noFormula") {
        errorDetail.innerHTML =
          "There is no formula according to your data stay tune for update.";
        $("#errorPopup").popup("open");
      } else {
        solution.innerHTML = html;
        $("#solution").listview("refresh");
        // only showing solution box
        $("#inputDataBox").hide();
        $("#DataBox").hide();
        $("#solutionBox").show();
        data.innerHTML = `<li><a  class="text-decoration-none">
                <p class="text-center">\`No\\ Data\`</p>
                </a></li>`;
        $("#data").listview("refresh");
        MathJax.typeset();
      }
    }
  });
  let solveanotherBtn = document.getElementById("solveanotherBtn");
  solveanotherBtn.addEventListener("click", function () {
    $("#inputDataBox").show();
    $("#DataBox").show();
    $("#solutionBox").hide();
  });
  function foundFormula(dataObject) {
    for (let unknownData of dataObject.unknown) {
      let formulas = Numerical.Formula[unknownData];
      if (formulas == undefined) {
        break;
      } else {
        for (let formula in formulas) {
          for (let dataKnown of formulas[formula].data) {
            if (!Object.keys(dataObject.known).includes(dataKnown)) {
              break;
            }
            if (
              formulas[formula].data.indexOf(dataKnown) ==
              formulas[formula].data.length - 1
            ) {
              return formulas[formula];
            }
          }
        }
      }
    }
    return "noFormula";
  }
});
