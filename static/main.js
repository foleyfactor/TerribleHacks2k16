$(document).ready(function() {
	setTimeout(start, 3000);
});

function stringToArray(str) {
	return str.split(", ");
}

function arrayToString(arr) {
	str = "";
	for (var i=0; i<arr.length; i++) {
		str += arr[i] + ", ";
	}
	return str.slice(0, str.length-2);
}

function swap(arr, i) {
	var t = arr[i];
	arr[i] = arr[i+1];
	arr[i+1] = t;
	return arr;
}

function poll(arr, i, j) {
	$.get("http://127.0.0.1:5000/twitch", function(data) {
		bubble(arr, i, j, JSON.parse(data));
	});
}

function equal(a1, a2) {
	if (a1.length != a2.length) {
		return false;
	}

	for (var i=0; i<a1.length; i++) {
		if (a1[i] != a2[i]) {
			return false;
		}
	}
	return true;
}

function copy(arr){
	var n = []
	for (var i=0; i<arr.length; i++) {
		n.push(arr[i]);
	}
	return n;
}

function bubble(arr, i, j, sw) {
	var elem = $("#test");
	elem.text(arrayToString(arr));
	if (j == i) {
		bubble(arr, i-1, 0, sw);
	} else if (i == -1) {
		var a2 = copy(arr);
		if equal(arr, a2) {
			return;
		} else {
			bubble(arr, arr.length-1, 0, elem);
		}
	} else {
		if (sw) {
			console.log(arr[j], arr[j+1]);
			arr = swap(arr, j);
			elem.scramble(arrayToString(arr));
		}
		setTimeout(() => poll(arr, i, j+1), 2500);
	}
}

function start() {
	var arr = stringToArray($("#test").text());
	var elem = $("#test");
	bubble(arr, arr.length-1, 0, elem);
	// for (var i=arr.length-1; i>=0; i--) {
	// 	for (var j=0; j<i; j++) {
	// 		if (arr[j] > arr[j+1]) {
	// 			console.log(arr[j], arr[j+1]);
	// 			arr = swap(arr, j);
	// 			elem.scramble(arrayToString(arr));
	// 		}
	// 	}
	// }
}