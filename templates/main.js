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

function bubble(arr, i, j) {
	var elem = $("#test");
	elem.text(arrayToString(arr));
	if (j == i) {
		bubble(arr, i-1, 0);
	} else if (i == -1) {
		return;
	} else {
		if (arr[j] > arr[j+1]) {
			console.log(arr[j], arr[j+1]);
			arr = swap(arr, j);
			elem.scramble(arrayToString(arr));

			setTimeout(() => bubble(arr, i, j+1), 2500);
		} else {
			bubble(arr, i, j+1);
		}
	}
}

function start() {
	console.log("started");
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

	console.log(arr);
}