app.directive("canadaphone", function () {
    return {
        restrict: "A",
        require: "ngModel",
        link: function (scope, element, attr, ngModelCtrl) {
            var phoneParse = function (value) {
                var numbers = value && value.replace(/-/g, "");
                if (/^\d{10}$/.test(numbers)) {
                    return numbers;
                }
                return undefined;
            }
            var phoneFormat = function (input) {
                if (!input)
                    return input;
                if (input === "1") {
                    input = "";
                    return input;
                }
                input = input.replace(/\D/g, '');
                input = input.substring(0, 10);
                var size = input.length;
                if (size == 0) {
                    input = input;
                } else if (size < 4) {
                    input = '(' + input;
                } else if (size < 7) {
                    input = '(' + input.substring(0, 3) + ') ' + input.substring(3, 6);
                } else {
                    input = '(' + input.substring(0, 3) + ') ' + input.substring(3, 6) + ' - ' + input.substring(6, 10);
                }
                return input;
            }
            ngModelCtrl.$parsers.push(phoneParse);
            ngModelCtrl.$formatters.push(phoneFormat);

            element.bind("keyup", function () {
                var value = phoneFormat(element.val());
                ngModelCtrl.$setViewValue(value);
                ngModelCtrl.$render();
                scope.$apply();
            });
            var phoneFormatMatch = function (value) {
                var numbers = value && value.replace(/[^A-Z0-9]/ig, "");
                if (numbers.length != 10) {
                    return undefined;
                }
                return numbers
            }
            element.bind("blur", function () {
                var value = phoneFormatMatch(element.val());
                var isValid = !!value;
                if (isValid) {
                    ngModelCtrl.$setViewValue(value);
                } else {
                    ngModelCtrl.$setViewValue(null);
                }
                ngModelCtrl.$setValidity("telephone", isValid);
                scope.$apply();
            });
        }
    };
});