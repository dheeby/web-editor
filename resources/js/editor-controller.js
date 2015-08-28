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

		$scope.changeTheme = function() {
			$scope.textEditorWindow.setOption("theme", $scope.selectedTheme.name);
		}

		$scope.languageOptions = [
			{name : "Java", editor : "text/x-java"},
			{name : "C", editor: "text/x-csrc"},
			{name : "C++", editor: "text/x-c++src"},
			{name : "Objective-C", editor: "text/x-objectivec"},
			{name : "Scala", editor: "text/x-scala"}
		];

		$scope.selectedLanguage = $scope.languageOptions[0];

		$scope.themeOptions = [
			{name : "3024-day"},
			{name : "3024-night"},
			{name : "abcdef"},
			{name : "ambiance"},
			{name : "base16-dark"},
			{name : "base16-light"},
			{name : "blackboard"},
			{name : "cobalt"},
			{name : "colorforth"},
			{name : "dracula"},
			{name : "eclipse"},
			{name : "elegant"},
			{name : "erlang-dark"},
			{name : "icecoder"},
			{name : "lesser-dark"},
			{name : "liquibyte"},
			{name : "material"},
			{name : "mbo"},
			{name : "mdn-like"},
			{name : "midnight"},
			{name : "monokai"},
			{name : "neat"},
			{name : "neo"},
			{name : "night"},
			{name : "paraiso-dark"},
			{name : "paraiso-light"},
			{name : "pastel-on-dark"},
			{name : "rubyblue"},
			{name : "seti"},
			{name : "solarized dark"},
			{name : "solarized light"},
			{name : "the-matrix"},
			{name : "tomorrow-night-bright"},
			{name : "tomorrow-night-eighties"},
			{name : "ttcn"},
			{name : "twilight"},
			{name : "vibrant-ink"},
			{name : "xq-dark"},
			{name : "xq-light"},
			{name : "yeti"},
			{name : "zenburn"}
		];

		$scope.selectedTheme = $scope.themeOptions[0];
	});


})();