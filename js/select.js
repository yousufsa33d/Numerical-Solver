$(document).on("pagecreate", "#mainpage", function () {
    let dataList = document.getElementById('dataList');
    let knownData_button = document.getElementById('knownData-button');
    knownData_button.addEventListener('click', function () {
        dataList.innerHTML = '';
        let data = Object.keys(Numerical.Data);
        data.sort();
        for (let key of data) {
            let option = document.createElement('li');
            option.setAttribute('data-value', key);
            option.innerHTML = `<li data-value="${key}" class="data">
                                    <a href="#" class="text-decoration-none">
                                    <p class="text-center text-black">${key}</p>
                                    </a>
                                </li>`
            dataList.appendChild(option);
        };
        $('#dataList').listview('refresh');
        $('#selectPopUp').popup('open');
    });

    let unknownData_button = document.getElementById('unknownData-button');
    unknownData_button.addEventListener('click', function () {
        dataList.innerHTML = '';
        let data = Object.keys(Numerical.Data);
        data.sort();
        for (let key of data) {
            let option = document.createElement('li');
            option.setAttribute('data-value', key);
            option.innerHTML = `<li data-value="${key}" class="data">
                                    <a href="#" class="text-decoration-none">
                                    <p class="text-center text-black">${key}</p>
                                    </a>
                                </li>`
            dataList.appendChild(option);
        };
        $('#dataList').listview('refresh');
        $('#selectPopUp').popup('open');
    });

    $('#selectPopUp').on("click", "#dataList li", function () {
        if (this.getAttribute('data-role') != 'list-divider') {
            if (valueKnownFlipSwitch.checked) {
                unknownData_button.setAttribute('data-value', this.getAttribute('data-value'));
                unknownData_button.children[ 0 ].innerHTML = this.getAttribute('data-value');
                // removing alert if any
                unknownData_button.classList.remove('border-danger');
                document.getElementById('unknownAlert').classList.add('d-none');
            }
            else {
                // setting value to known Data
                knownData_button.setAttribute('data-value', this.getAttribute('data-value'));
                knownData_button.children[ 0 ].innerHTML = this.getAttribute('data-value');
                // removing alert if any
                knownData_button.classList.remove('border-danger');
                document.getElementById('knownAlert').classList.add('d-none');
                // setting unit box
                let units = Numerical.Data[ this.getAttribute('data-value') ].units;
                let unitsHtml = '';
                for (let unit of units) {
                    unitsHtml += `<li data-value="${unit}" class="data">
                <a href="#" class="text-decoration-none">
                <p class="text-center text-black">` + '`' + unit + '`' + `</p>
                </a>
            </li>`
                };
                unitList.innerHTML = unitsHtml;
                knownUnit_button.setAttribute('data-value', 'noValue');
                knownUnit_button.children[ 0 ].innerHTML = '--Select Unit--';
                $('#unitList').listview('refresh');
                MathJax.typeset();
            };
            $('#selectPopUp').popup('close');
        }
    });


    // for unit known pop up show
    let knownUnit_button = document.getElementById('knownUnit-button');
    let unitList = document.getElementById('unitList');
    knownUnit_button.addEventListener('click', function () {
        $('#unitSelectPopup').popup('open');
    });

    $('#unitSelectPopup').on("click", "#unitList li.data", function () {
        knownUnit_button.setAttribute('data-value', this.getAttribute('data-value'));
        knownUnit_button.children[ 0 ].innerHTML = '`' + this.getAttribute('data-value') + '`';
        // removing alert if any
        knownUnit_button.classList.remove('border-danger');
        document.getElementById('knownAlert').classList.add('d-none');
        MathJax.typeset();
        $('#unitSelectPopup').popup('close');
    });
});