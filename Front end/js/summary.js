window.onload = function () {
	var memberKeys = ['fName', 'lName', 'phone', 'email', 'usfsaId', 'coach', 'clubMember', 'nonMember'];
	var sessionKeys = [];
	var params = window.location.search.substr(1).split('&');
	var validParams = getValidParameters(params, memberKeys);
	var summary = document.getElementById('member-in');

	for (var param in validParams) {
		var elem = document.getElementById(param);
		if (elem) {
			if (param == 'clubMember' || param == 'nonMember') {
				elem.checked = validParams[param];
			} else {
				elem.value = validParams[param];
			}
		}
	}
}

function getValidParameters(params, validKeys) {
    if (params == "") return {};
    var b = {};
    for (var i = 0; i < params.length; ++i)
    {
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