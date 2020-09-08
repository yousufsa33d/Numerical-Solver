$(document).on("pagecreate", "#mainpage", function () {
    // event listener for value input box
    // var blinkingInterval = ''
    let valueInputBoxPopup = document.getElementById('valueInputBoxPopup');
    let valueInputBox = document.getElementById('valueInputBox');
    $('#valueInputBox').on('click', function (event) {
        $(this).addClass('custom-input-box-focused');
        $('#keyboardpopup').popup('open');
        $('#valueInputBox').removeClass('custom-input-box-focused');
        valueInputBoxPopup.setAttribute('data-value', valueInputBox.getAttribute('data-value') + '|');
        updateBox();
    });

    // clsoing keyboard pop up 
    $('#keyboardCancelBtn').on('click', function () {
        $('#keyboardpopup').popup('close');
        $('#valueInputBox').removeClass('custom-input-box-focused');
    });

    document.getElementById('KeyboardDoneBtn').addEventListener('click', function () {
        let value = valueInputBoxPopup.getAttribute('data-value');
        value = value.replace('|', '');
        valueInputBox.innerHTML = '`' + value + '`';
        valueInputBox.setAttribute('data-value', value);
        // REMOVING ALERT IF ANY
        if (value != '') {
            valueInputBox.classList.remove('border-danger');
            document.getElementById('knownAlert').classList.add('d-none');
        };
        MathJax.typeset();
        $('#keyboardpopup').popup('close');
    });

    // event listeners for keyboard buttons
    document.getElementById('keyboardSevenBtn').addEventListener('click', function () {
        let value = valueInputBoxPopup.getAttribute('data-value');
        value = value.replace('|', '7|');
        valueInputBoxPopup.setAttribute('data-value', value);
        updateBox();
    });
    document.getElementById('keyboardEightBtn').addEventListener('click', function () {
        let value = valueInputBoxPopup.getAttribute('data-value');
        value = value.replace('|', '8|');
        valueInputBoxPopup.setAttribute('data-value', value);
        updateBox();
    });
    document.getElementById('keyboardNineBtn').addEventListener('click', function () {
        let value = valueInputBoxPopup.getAttribute('data-value');
        value = value.replace('|', '9|');
        valueInputBoxPopup.setAttribute('data-value', value);
        updateBox();
    });
    document.getElementById('keyboardAllClearBtn').addEventListener('click', function () {
        valueInputBoxPopup.setAttribute('data-value', '|');
        updateBox();
    });
    document.getElementById('keyboardClearBtn').addEventListener('click', function () {
        let value = valueInputBoxPopup.getAttribute('data-value');
        if (value !== '|') {
            let previousChar = value[ value.indexOf('|') - 1 ];
            // removing one character
            let regex = /[0-9.-]/;
            if (regex.test(previousChar)) {
                value = value.replace(previousChar + '|', '|');
                valueInputBoxPopup.setAttribute('data-value', value);
                updateBox();
            }
            // removing xx
            else if ((value[ value.indexOf('|') - 2 ] + previousChar) === 'xx') {
                value = value.replace('xx|', '|');
                valueInputBoxPopup.setAttribute('data-value', value);
                updateBox();
            }
            // removing pi
            else if ((value[ value.indexOf('|') - 2 ] + previousChar) === 'pi') {
                value = value.replace('pi|', '|');
                valueInputBoxPopup.setAttribute('data-value', value);
                updateBox();
            }
            else if (previousChar === '(') {
                // removing sqrt
                let sqrt = value.slice(value.indexOf('|') - 5, value.indexOf('|') - 1);
                let tenPower = value.slice(value.indexOf('|') - 6, value.indexOf('|') - 1);
                if (sqrt + '(' === 'sqrt(') {
                    let find = false;
                    let newValue = '';
                    let brackets = 0;
                    for (let char = 0; char < value.length; char++) {
                        if (char >= value.indexOf('|')) {
                            if (find) {
                                newValue += value[ char ];
                            }
                            else {
                                if (value[ char ] == '(') {
                                    brackets++;
                                }
                                else if (value[ char ] == ')') {
                                    if (brackets == 0) {
                                        find = true;
                                        newValue += '|' + value[ char ];
                                    }
                                    else {
                                        brackets--;
                                    }
                                }
                            }
                        }
                        else {
                            newValue += value[ char ];
                        }
                    }
                    value = newValue.replace('sqrt(|)', '|');
                    valueInputBoxPopup.setAttribute('data-value', value);
                    updateBox();
                }
                else if (tenPower + '(' === 'xx10^(') {
                    let find = false;
                    let newValue = '';
                    let brackets = 0;
                    for (let char = 0; char < value.length; char++) {
                        if (char >= value.indexOf('|')) {
                            if (find) {
                                newValue += value[ char ];
                            }
                            else {
                                if (value[ char ] == '(') {
                                    brackets++;
                                }
                                else if (value[ char ] == ')') {
                                    if (brackets == 0) {
                                        find = true;
                                        newValue += '|' + value[ char ];
                                    }
                                    else {
                                        brackets--;
                                    }
                                }
                            }
                        }
                        else {
                            newValue += value[ char ];
                        }
                    }
                    value = newValue.replace('xx10^(|)', '|');
                    valueInputBoxPopup.setAttribute('data-value', value);
                    updateBox();
                }
                else if (value[ value.indexOf('|') - 2 ] + '(' === '^(') {
                    let find = false;
                    let newValue = '';
                    let brackets = 0;
                    for (let char = 0; char < value.length; char++) {
                        if (char >= value.indexOf('|')) {
                            if (find) {
                                newValue += value[ char ];
                            }
                            else {
                                if (value[ char ] == '(') {
                                    brackets++;
                                }
                                else if (value[ char ] == ')') {
                                    if (brackets == 0) {
                                        find = true;
                                        newValue += '|' + value[ char ];
                                    }
                                    else {
                                        brackets--;
                                    }
                                }
                            }
                        }
                        else {
                            newValue += value[ char ];
                        }
                    }
                    value = newValue.replace('^(|)', '|');
                    valueInputBoxPopup.setAttribute('data-value', value);
                    updateBox();
                }
            }
            else if (previousChar === ')') {
                value = value.replace(')|', '|)');
                valueInputBoxPopup.setAttribute('data-value', value);
                updateBox();
            }
        }
    });
    document.getElementById('keyboardFourBtn').addEventListener('click', function () {
        let value = valueInputBoxPopup.getAttribute('data-value');
        value = value.replace('|', '4|');
        valueInputBoxPopup.setAttribute('data-value', value);
        updateBox();
    });
    document.getElementById('keyboardFiveBtn').addEventListener('click', function () {
        let value = valueInputBoxPopup.getAttribute('data-value');
        value = value.replace('|', '5|');
        valueInputBoxPopup.setAttribute('data-value', value);
        updateBox();
    });
    document.getElementById('keyboardSixBtn').addEventListener('click', function () {
        let value = valueInputBoxPopup.getAttribute('data-value');
        value = value.replace('|', '6|');
        valueInputBoxPopup.setAttribute('data-value', value);
        updateBox();
    });
    document.getElementById('keyboardMinusBtn').addEventListener('click', function () {
        let value = valueInputBoxPopup.getAttribute('data-value');
        value = value.replace('|', '-|');
        valueInputBoxPopup.setAttribute('data-value', value);
        updateBox();
    });
    document.getElementById('keyboardMultiplyBtn').addEventListener('click', function () {
        let value = valueInputBoxPopup.getAttribute('data-value');
        value = value.replace('|', 'xx|');
        valueInputBoxPopup.setAttribute('data-value', value);
        updateBox();
    });
    document.getElementById('keyboardOneBtn').addEventListener('click', function () {
        let value = valueInputBoxPopup.getAttribute('data-value');
        value = value.replace('|', '1|');
        valueInputBoxPopup.setAttribute('data-value', value);
        updateBox();
    });
    document.getElementById('keyboardTwoBtn').addEventListener('click', function () {
        let value = valueInputBoxPopup.getAttribute('data-value');
        value = value.replace('|', '2|');
        valueInputBoxPopup.setAttribute('data-value', value);
        updateBox();
    });
    document.getElementById('keyboardThreeBtn').addEventListener('click', function () {
        let value = valueInputBoxPopup.getAttribute('data-value');
        value = value.replace('|', '3|');
        valueInputBoxPopup.setAttribute('data-value', value);
        updateBox();
    });
    document.getElementById('keyboardRootBtn').addEventListener('click', function () {
        let value = valueInputBoxPopup.getAttribute('data-value');
        value = value.replace('|', 'sqrt(|)');
        valueInputBoxPopup.setAttribute('data-value', value);
        updateBox();
    });
    document.getElementById('keyboardXpowerBtn').addEventListener('click', function () {
        let value = valueInputBoxPopup.getAttribute('data-value');
        value = value.replace('|', '^(|)');
        valueInputBoxPopup.setAttribute('data-value', value);
        updateBox();
    });
    document.getElementById('keyboardZeroBtn').addEventListener('click', function () {
        let value = valueInputBoxPopup.getAttribute('data-value');
        value = value.replace('|', '0|');
        valueInputBoxPopup.setAttribute('data-value', value);
        updateBox();
    });
    document.getElementById('keyboardDotBtn').addEventListener('click', function () {
        let value = valueInputBoxPopup.getAttribute('data-value');
        value = value.replace('|', '.|');
        valueInputBoxPopup.setAttribute('data-value', value);
        updateBox();
    });
    document.getElementById('keyboardPieBtn').addEventListener('click', function () {
        let value = valueInputBoxPopup.getAttribute('data-value');
        value = value.replace('|', 'pi|');
        valueInputBoxPopup.setAttribute('data-value', value);
        updateBox();
    });
    document.getElementById('keyboardLeftArrowBtn').addEventListener('click', function () {
        let value = valueInputBoxPopup.getAttribute('data-value');
        if (value !== '|') {
            let previousChar = value[ value.indexOf('|') - 1 ];
            let regex = /[0-9.-]/;
            if (regex.test(previousChar)) {
                value = value.replace(previousChar + '|', '|' + previousChar);
                valueInputBoxPopup.setAttribute('data-value', value);
                updateBox();
            }
            // xx
            else if ((value[ value.indexOf('|') - 2 ] + previousChar) === 'xx') {
                value = value.replace('xx|', '|xx');
                valueInputBoxPopup.setAttribute('data-value', value);
                updateBox();
            }
            // pi
            else if ((value[ value.indexOf('|') - 2 ] + previousChar) === 'pi') {
                value = value.replace('pi|', '|pi');
                valueInputBoxPopup.setAttribute('data-value', value);
                updateBox();
            }
            else if (previousChar === '(') {
                // removing sqrt
                let sqrt = value.slice(value.indexOf('|') - 5, value.indexOf('|') - 1);
                console.log(sqrt)
                if (sqrt + '(' === 'sqrt(') {
                    value = value.replace('sqrt(|)', '|');
                    value = value.replace('sqrt(|', '|sqrt(');
                    valueInputBoxPopup.setAttribute('data-value', value);
                    updateBox();
                }
                else if (value[ value.indexOf('|') - 2 ] + '(' === '^(') {
                    value = value.replace('^(|)', '|');
                    value = value.replace('^(|', '|^(');
                    valueInputBoxPopup.setAttribute('data-value', value);
                    updateBox();
                }
            }
            else if (previousChar === ')') {
                value = value.replace(')|', '|)');
                valueInputBoxPopup.setAttribute('data-value', value);
                updateBox();
            }
        };
    });
    document.getElementById('keyboardRightArrowBtn').addEventListener('click', function () {
        let value = valueInputBoxPopup.getAttribute('data-value');
        if (value !== '|') {
            let nextChar = value[ value.indexOf('|') + 1 ];
            let regex = /[0-9.-]/;
            let sqrt = value.slice(value.indexOf('|') + 1, value.indexOf('|') + 5);
            let power = value[ value.indexOf('|') + 1 ];
            if (regex.test(nextChar)) {
                value = value.replace('|' + nextChar, nextChar + '|');
                valueInputBoxPopup.setAttribute('data-value', value);
                updateBox();
            }
            // xx
            else if ((nextChar + value[ value.indexOf('|') + 2 ]) === 'xx') {
                value = value.replace('|xx', 'xx|');
                valueInputBoxPopup.setAttribute('data-value', value);
                updateBox();
            }
            // pi
            else if ((nextChar + value[ value.indexOf('|') + 2 ]) === 'pi') {
                value = value.replace('|pi', 'pi|');
                valueInputBoxPopup.setAttribute('data-value', value);
                updateBox();
            }
            else if (sqrt + '(' === 'sqrt(') {
                value = value.replace('|sqrt(', 'sqrt(|');
                valueInputBoxPopup.setAttribute('data-value', value);
                updateBox();
            }
            else if (power + '(' === '^(') {
                value = value.replace('|^(', '^(|');
                valueInputBoxPopup.setAttribute('data-value', value);
                updateBox();
            }
            else if (nextChar === ')') {
                value = value.replace('|)', ')|');
                valueInputBoxPopup.setAttribute('data-value', value);
                updateBox();
            }
        };
    });
    document.getElementById('keyboardTenPowerBtn').addEventListener('click', function () {
        let value = valueInputBoxPopup.getAttribute('data-value');
        value = value.replace('|', 'xx10^(|)');
        valueInputBoxPopup.setAttribute('data-value', value);
        updateBox();
    });
    // document.getElementById('keyboardSinBtn').addEventListener('click', function () {
    //     console.log('keyboard clicked');
    // });
    document.getElementById('keyboardCosBtn').addEventListener('click', function () {
        // let value = valueInputBoxPopup.getAttribute('data-value');
        // value = value.replace('|', 'pi|');
        // valueInputBoxPopup.setAttribute('data-value', value);
        // updateBox();
    });
    document.getElementById('keyboardTanBtn').addEventListener('click', function () {
        // let value = valueInputBoxPopup.getAttribute('data-value');
        // value = value.replace('|', 'tan|');
        // valueInputBoxPopup.setAttribute('data-value', value);
        // updateBox();
    });
    document.getElementById('keyboardLogBtn').addEventListener('click', function () {
        // let value = valueInputBoxPopup.getAttribute('data-value');
        // value = value.replace('|', 'log|');
        // valueInputBoxPopup.setAttribute('data-value', value);
        // updateBox();
    });

    // updating box
    function updateBox() {
        let valueInputBoxPopup = document.getElementById('valueInputBoxPopup');
        valueInputBoxPopup.innerHTML = '`' + valueInputBoxPopup.getAttribute('data-value') + '`';
        MathJax.typeset();
    }
});