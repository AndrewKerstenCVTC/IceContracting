window.onload = function () {
	var memberKeys = ['fName', 'lName', 'phone', 'email', 'usfsaId', 'coach', 'membership'];
	var params = window.location.search.substr(1).split('&');
	var validParams = getValidParameters(params, memberKeys);
	var summary = document.getElementById('member-in');
	var selectedSessions = getSelectedSessions(params);
	var member = false;
	
	for (var param in validParams) {
		if (param == 'membership') {
			if (validParams[param] == 'on') {
				document.getElementById('clubMember').checked = true;
				member = true;
			} else {
				document.getElementById('nonMember').checked = true;
			}
		}
		var elem = document.getElementById(param);
		if (elem) {
			elem.value = validParams[param];
		}
	}
	
	getSessionTimes(selectedSessions)
	.then(function(sessionDetails) {
		buildSessionList(sessionDetails);
		var total = calculateTotal(sessionDetails);
		var totalSpan = document.getElementById('orderTotal');
		totalSpan.innerHTML = '$' + total.toFixed(2);
	});
}

function calculateTotal(sessions, member) {
	var total = 0;
	
	for (var i = 0; i < sessions.length; ++i) {
		var rate = 0;
		if (member) {
			switch(sessions[i].type) {
				case 'c':
					rate = 16.00;
					break;
				case 'f':
					rate = 11.50;
					break;
				case 'm':
					rate = 6.50;
					break;
			}
		} else {
			switch(sessions[i].type) {
				case 'c':
					rate = 18.00;
					break;
				case 'f':
					rate = 13.00;
					break;
				case 'm':
					rate = 7.00;
					break;
			}
		}
		total += rate;
	}
	
	return total;
}

function buildSessionList(sessions) {
	var table = document.getElementById('session-times');
	for (var i = 0; i < sessions.length; ++i) {
		var ref = table.getElementsByTagName('tbody')[0];
		var row = ref.insertRow(ref.rows.length);
		row.insertCell(0).appendChild(document.createTextNode(iceSkate()));
		row.insertCell(1).appendChild(document.createTextNode(toDate(sessions[i].date)));
		row.insertCell(2).appendChild(document.createTextNode(toTime(sessions[i].date)));
		row.insertCell(3).appendChild(document.createTextNode(sessions[i].type.toUpperCase()));
	}
}

function getSessionTimes(selected) {
    let url = new URL("http://199.223.235.232:8080/IceServer/Sessions");
    let now = new Date(Date.now());
    url.search = new URLSearchParams({
        "start": new Date(now.getFullYear(), now.getMonth(), 1).getTime(),
        "end": new Date(now.getFullYear(), now.getMonth() + 1, 1).getTime()
    });
	return fetch(url.toString())
    .then(function(response) {
      return response.json();
    })
    .then(function(sessions) {
    	var sessionDetails = [];
    	for (var i = 0; i < selected.length; ++i) {
    		for (var x = 0; x < sessions.length; ++x) {
    			if (sessions[x].id == selected[i]) {
    				sessionDetails.push(sessions[x]);
    			}
    		}
    	}
    	return sessionDetails;
    });
}

function iceSkate() {
	return '⛸️';
}

function toDate(d) {
	return new Date(d).toLocaleDateString('en-US', {month: "long", day: "2-digit"});
}

function toTime(t) {
	return new Date(t).toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit', hour12: true});
}

function getSelectedSessions(params) {
	var s = [];
	for (var i = 0; i < params.length; ++i) {
		var p=params[i].split('=', 2);
		if (p[0] == 'session') {
			s.push(p[1]);
		}
	}
	return s;
}

function getValidParameters(params, validKeys) {
    if (params == "") return {};
    var b = {};
    for (var i = 0; i < params.length; ++i) {
        var p=params[i].split('=', 2);
        if (validKeys.includes(p[0])) {
	        if (p.length == 1)
	            b[p[0]] = "";
	        else
	            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
        }
    }
    return b;
}

function createNode(node, text) {
	var node = document.createElement(node);
	var text = document.createTextNode(text);
	node.appendChild(text);
	return node;
}

// IceContracting/agile_fa_2018_IceContracting/Front%20end/summary.html?fName=jordan&lName=wisniewski&phone=7159554894&email=jordan@email.com&usfsaId=234234&coach=coachA&clubMember=true&nonMember=false