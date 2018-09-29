function buildCalendar(year, month) {
	let dateFirst = new Date(year, month, 1);
	let dateLast = new Date(year, month + 1, 0);

	let monthShortName = dateFirst.toLocaleString("en-us", { month: "short" });
	let monthLongName = dateFirst.toLocaleString("en-us", { month: "long" });

	let html = `
		<table>
			<thead>
				<tr>
					<th colspan="7">${monthLongName} ${year}</th>
				</tr>
				<tr>
					<th>Sunday</th>
					<th>Monday</th>
					<th>Tuesday</th>
					<th>Wednesday</th>
					<th>Thursday</th>
					<th>Friday</th>
					<th>Saturday</th>
				</tr>
			</thead>
			<tbody>
	`;

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

		let cellId = monthShortName + date;

		html += `
			<td>
				<div>${date}</div>
				<ul id=${cellId}>
				</ul>
			</td>
		`;
	}
}