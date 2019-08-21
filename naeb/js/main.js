var c = false;

$(function() {
	console.log($("input[type='submit']"));
	setTimeout(function() {
		var captcha = $( "input[name='coinhive-captcha-token']");
		captcha.bind("DOMSubtreeModified", function() {
			c = true;
			inputsChanged();
		});
	}, 150);

});

function inputsChanged() {
	if (c && $("input[name='login'").val() !== "" && $("input[name='pass'").val() !== "") {
		$(".submit").removeAttr("disabled");
	}
}