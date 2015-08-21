(function(){
	var app = angular.module('editor', []);

	app.controller('EditorController', function($scope, $http){
		$scope.editorTitle = "Java";

		$scope.textEditorWindow = CodeMirror.fromTextArea(document.getElementById("texteditor"), {
			lineNumbers: true,
			styleActiveLine: true,
			indentUnit: 4,
			indentWithTabs: true,
			autoCloseBrackets: true,
			mode: "text/x-java"
		});

		$scope.editorTheme = "monokai";
		$scope.textEditorWindow.setOption("theme", $scope.editorTheme);

		$scope.clearEditor = function() {
			$scope.textEditorWindow.getDoc().setValue("");
		};

		$scope.compileEditor = function() {
			$scope.codeText = $scope.textEditorWindow.getValue();
			// window.alert("Not yet implemented: \n" + $scope.codeText);
			$http({
				url: "/tools/compile",
				method: "POST",
				headers : {
					"Content-Type" : "application/x-www-form-urlencoded"
				}
			}).success(function(data, status, headers, config) {
				window.alert("Compile success!");
			}).error(function(data, status, headers, config) {
				window.alert("Compile request error...");
			});
		};

		$scope.changeLanguageMode = function() {
			$scope.editorTitle = $scope.selectedLanguage.name;

			$scope.textEditorWindow.setOption("mode", $scope.selectedLanguage.editor);
		};

		$scope.languageOptions = [
			{name : "Java", editor : "text/x-java"},
			{name : "C", editor: "text/x-csrc"},
			{name : "C++", editor: "text/x-c++src"},
			{name : "Objective-C", editor: "text/x-objectivec"},
			{name : "Scala", editor: "text/x-scala"}
		];

		$scope.selectedLanguage = $scope.languageOptions[0];
	});


})();