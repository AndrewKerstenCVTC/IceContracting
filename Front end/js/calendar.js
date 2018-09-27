function buildCalendar(year, month) {
	let dateFirst = new Date(year, month, 1);
	let dateLast = new Date(year, month + 1, 0);

	let monthShortName = dateFirst.toLocaleString("en-us", { month: "short" });

	let html = "";

	html += '<table><thead><tr><th colspan="7">'
	html += dateFirst.toLocaleString("en-us", { month: "long" });
	html += '</th></tr></thead><tbody><tr><td>Sunday</td><td>Monday</td><td>Tuesday</td><td>Wednesday</td><td>Thursday</td><td>Friday</td><td>Saturday</td></tr>';

	let dates = [];

	// Pad the table at the start of the month
	for (let i = 0; i < dateFirst.getDay(); i++) {
		dates.push("");
	}

	for (let i = 1; i <= dateLast.getDate(); i++) {
		dates.push(i);

		if (dates.length == 7) {
			addRow(dates);
			dates = [];
		}
	}

	// Pad the table at the end of the month
	if (dates.length > 0) {
		while (dates.length < 7) {
			dates.push("");
		}
		addRow(dates);
	}

	html += '</tbody></table>'

	document.write(html);

	function addRow(dates) {
		html += '<tr>';

		for (let d in dates) {
			addCell(dates[d]);
		}

		html += '</tr>';
	}

	function addCell(date) {
		if (!date) {
			html += '<td></td>';
			return;
		}

		html += '<td id="';
		html += monthShortName + date;
		html += '">';
		html += date;
		html += '</td>';
	}
}