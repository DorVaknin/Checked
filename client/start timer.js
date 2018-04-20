
var timerId = 0;

var qrcode, num;
function changeCode() {
	qrcode.clear();
	qrcode.makeCode(window.location.origin + "/checked?num=" + num);
	num++;
}

function qrStart() {
	if (timerId != 0) return;
	qrcode = new QRCode(document.getElementById("qrcode"), {
		width: 300,
		height: 300
	});
	num = 1;
	changeCode();
	timerId = window.setInterval(changeCode, 2000);

	$("#text").
		on("blur", function () {
			changeCode();
		}).
		on("keydown", function (e) {
			if (e.keyCode == 13) {
				changeCode();
			}
		});
}
function qrStop() {
	window.clearInterval(timerId);
}

function startChecked() {
	// This function calls the server to start the timer
	$.get("/checkedStart", qrStart());
}