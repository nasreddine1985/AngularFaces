var app = angular.module('angularfaces', []);

app.directive('angularfacesmessage', function() {
  return {
    restrict: 'E',
    transclude: true,
    scope: {},
    controller: function($scope, $element) {
    				var fieldId = $element.attr('af-for');
    				if (fieldId) {
    					fieldId=fieldId.replace(":", "\\:");
    				}
    				$scope.af_for=fieldId;
//    				$scope.myField = $("#"+$scope.af_for);
    				$scope.myField = $("[name='"+$scope.af_for+"']");
    				$scope.servermessage=$element.attr("servermessage");
    				
    				
    				var name = $scope.myField.name;
    				
    				var p = $scope.myField.parentElement;
    				var count=1;
    				while (null != p)
    				{
    					var pname = p.name;
    					if (pname) {
    						name = pname + "." + name;
    					}
    					p=p.parentElement;
    				}
    				$scope.prefix=name;
    				$scope.serverMessageVisible = function() {
						if ($scope.myField.hasClass("pristine")) {
							return "true";
						}
    					return "false"; 
    				};
    				$scope.message= function() { 
						if ($scope.myField.hasClass("ng-invalid-min")) {
							var min = $scope.myField.attr("min");
							var msg = angularFacesMessages["This number must be at least {}."];
							msg=msg.replace("{}", min);
							return msg;
						}
						if ($scope.myField.hasClass("ng-invalid-max")) {
							var max = $scope.myField.attr("max");
							var msg = angularFacesMessages["This number must be less or equal {}."];
							msg=msg.replace("{}", max);
							return msg;
						}
						if ($scope.myField.hasClass("ng-invalid-number")) {
							var msg = angularFacesMessages["Please enter a valid number."];
							return msg;
						}
						if ($scope.myField.hasClass("ng-invalid-required")) {
							var msg = angularFacesMessages["Please fill out this field."];
							return msg;
						}
						
						if ($scope.myField.hasClass("integer")) {
							var msg = angularFacesMessages["Please enter a valid integer number."];
							return msg;
						}
						if ($scope.myField.hasClass("ng-invalid-minlength")) {
							var min = $scope.myField.attr("ng-minlength");
							var msg = angularFacesMessages["At least {} characters required."];
							msg=msg.replace("{}", min);
							return msg;
						}
						if ($scope.myField.hasClass("ng-invalid-maxlength")) {
							var max = $scope.myField.attr("ng-maxlength");
							var msg = angularFacesMessages["{} characters accepted at most."];
							msg=msg.replace("{}", max);
							return msg;
						}

						
						
						if ($scope.servermessage) return $scope.servermessage;
						if ($scope.myField.hasClass("ng-invalid")) {
							var msg = angularFacesMessages["A validation rule is violated."];
							return msg;
						}
    					return "";
    				};
    			},
    template: '<span>{{message()}}</span>',
    replace: true
	};
});

// Todo: check whether this directive works
var INTEGER_REGEXP = /^\-?\d*$/;
app.directive('integer', function() {
	return {
		require : 'ngModel',
		link : function(scope, elm, attrs, ctrl) {
			ctrl.$parsers.unshift(function(viewValue) {
				if (INTEGER_REGEXP.test(viewValue)) {
					// it is valid
					ctrl.$setValidity('integer', true);
					return viewValue;
				} else {
					// it is invalid, return undefined (no model update)
					ctrl.$setValidity('integer', false);
					return undefined;
				}
			});
		}
	};
});



