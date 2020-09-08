$(document).on("pagecreate", "#mainpage", function () {
    let data = document.getElementById('data');
    let knownAddDataBtn = document.getElementById('knownAddDataBtn');
    let knownData_button = document.getElementById('knownData-button');
    let valueInputBox = document.getElementById('valueInputBox');
    let knownUnit_button = document.getElementById('knownUnit-button');
    let knownAlert = document.getElementById('knownAlert');
    knownAddDataBtn.addEventListener('click', function () {
        if (knownData_button.getAttribute('data-value') != 'noValue' && valueInputBox.getAttribute('data-value') != '' && knownUnit_button.getAttribute('data-value') != 'noValue') {
            if (Numerical.validValue(valueInputBox.getAttribute('data-value'))) {
                // checking that there is no data in data box
                if (data.querySelector('li').getAttribute('data-data') == null) {
                    data.querySelector('li').remove();
                };
                // checking for data is already exist are not
                let lists = data.querySelectorAll('li');
                let exists = false;
                for (let list of lists) {
                    if (list.getAttribute('data-data') == knownData_button.getAttribute('data-value')) {
                        exists = true;
                        break;
                    }
                }
                if (!exists) {
                    // making li item for data and appending
                    let li = document.createElement('li');
                    li.classList.add('data');
                    li.setAttribute('data-data', knownData_button.getAttribute('data-value'));
                    li.setAttribute('data-value', valueInputBox.getAttribute('data-value'));
                    li.setAttribute('data-unit', knownUnit_button.getAttribute('data-value'));
                    let dataHtml = `<a  class="text-decoration-none">
                            <p class="text-center">\`${Numerical.Data[ knownData_button.getAttribute('data-value') ].symbol} = ${Numerical.Data[ knownData_button.getAttribute('data-value') ].mathHtml} = ${valueInputBox.getAttribute('data-value') + knownUnit_button.getAttribute('data-value')}\`</p></a>`
                    li.innerHTML = dataHtml;
                    data.appendChild(li);
                    $('#data').listview('refresh');
                    MathJax.typeset();
                    clearBoxes();
                }
                else {
                    document.getElementById('alreadyExistsData').innerHTML = knownData_button.getAttribute('data-value');
                    $('#alreadyExistsPopUp').popup('open');
                }
            }
            else {
                document.getElementById('errorDetail').innerHTML = 'Value is not valid. Please try again.';
                $('#errorPopup').popup('open');
                valueInputBox.classList.add('border-danger');
            }
        }
        else {
            if (knownData_button.getAttribute('data-value') == 'noValue') {
                knownData_button.classList.add('border-danger');
                knownAlert.classList.remove('d-none');
            };
            if (valueInputBox.getAttribute('data-value') == '') {
                valueInputBox.classList.add('border-danger');
                knownAlert.classList.remove('d-none');
            };
            if (knownUnit_button.getAttribute('data-value') == 'noValue') {
                knownUnit_button.classList.add('border-danger');
                knownAlert.classList.remove('d-none');
            };
        }
    });


    let unknownAddDataBtn = document.getElementById('unknownAddDataBtn');
    let unknownData_button = document.getElementById('unknownData-button');
    let unknownAlert = document.getElementById('unknownAlert');
    unknownAddDataBtn.addEventListener('click', function () {
        if (unknownData_button.getAttribute('data-value') == 'noValue') {
            unknownData_button.classList.add('border-danger');
            unknownAlert.classList.remove('d-none');
        }
        else {

            // checking that there is no data in data box
            if (data.querySelector('li').getAttribute('data-data') == null) {
                data.querySelector('li').remove();
            };
            // checking for data is already exist are not
            let lists = data.querySelectorAll('li');
            let exists = false;
            for (let list of lists) {
                if (list.getAttribute('data-data') == unknownData_button.getAttribute('data-value')) {
                    exists = true;
                    break;
                }
            }
            if (!exists) {
                // making li item for data and appending
                let li = document.createElement('li');
                li.classList.add('data');
                li.setAttribute('data-data', unknownData_button.getAttribute('data-value'));
                li.setAttribute('data-value', '?');
                let dataHtml = `<a  class="text-decoration-none">
                <p class="text-center">\`${Numerical.Data[ unknownData_button.getAttribute('data-value') ].symbol} = ${Numerical.Data[ unknownData_button.getAttribute('data-value') ].mathHtml} = ?\`</p></a>`
                li.innerHTML = dataHtml;
                data.appendChild(li);
                $('#data').listview('refresh');
                MathJax.typeset();
                clearBoxes();
            }
            else {
                document.getElementById('alreadyExistsData').innerHTML = unknownData_button.getAttribute('data-value')
                $('#alreadyExistsPopUp').popup('open');
            }


        }
    });

    // Swipe to remove data item
    $(document).on("swipeleft swiperight", "#data li.data", function (event) {
        var listitem = $(this),
            // These are the classnames used for the CSS transition
            dir = event.type === "swipeleft" ? "left" : "right",
            // Check if the browser supports the transform (3D) CSS transition
            transition = $.support.cssTransform3d ? dir : false;
        confirmAndDelete(listitem, transition);
    });

    function confirmAndDelete(listitem, transition) {
        // Highlight the list item that will be removed
        listitem.children(".ui-btn").addClass("ui-btn-active");
        // Show the confirmation popup
        $("#confirm").popup("open");
        // Proceed when the user confirms
        $("#confirm #yes").on("click", function () {
            // removing element after transition
            if (transition) {
                listitem.addClass(transition).on("webkitTransitionEnd transitionend otransitionend", function () {
                    listitem.remove();
                    // ...the list will be refreshed and the temporary class for border styling removed
                    $("#data").listview("refresh").find(".border-bottom").removeClass("border-bottom");
                    // if data 0 then input some data
                    if ($('#data').children().length === 0) {
                        let html = `<li><a  class="text-decoration-none">
                            <p class="text-center">\`No\\ Data\`</p>
                            </a></li>`;
                        $('#data').html(html)
                    };
                    $('#data').listview('refresh');
                    MathJax.typeset();
                }).prev("li").children("a").addClass("border-bottom").end().end().children(".ui-btn").removeClass("ui-btn-active");
            }
            // If it's not a touch device or the CSS transition isn't supported just remove the list item and refresh the list
            else {
                listitem.remove();
                $("#list").listview("refresh");
            }
        });
        // Remove active state and unbind when the cancel button is clicked
        $("#confirm #cancel").on("click", function () {
            listitem.children(".ui-btn").removeClass("ui-btn-active");
            $("#confirm #yes").off();
        });
    };

    // function for clearing boxes after adding data
    function clearBoxes() {
        knownData_button.setAttribute('data-value', 'noValue');
        knownData_button.children[ 0 ].innerHTML = '--Select Data--';
        knownData_button.classList.remove('border-danger');
        unknownData_button.setAttribute('data-value', 'noValue');
        unknownData_button.children[ 0 ].innerHTML = '--Select Data--';
        unknownData_button.classList.remove('border-danger');
        knownUnit_button.setAttribute('data-value', 'noValue');
        knownUnit_button.children[ 0 ].innerHTML = '--Select Unit--';
        knownUnit_button.classList.remove('border-danger');
        valueInputBox.setAttribute('data-value', '');
        valueInputBox.innerHTML = '';
        valueInputBox.classList.remove('border-danger');
        knownAlert.classList.add('d-none');
        unknownAlert.classList.add('d-none');
    }
});