window.onload = function () {
	var memberKeys = ['fName', 'lName', 'phone', 'email', 'usafid', 'coach', 'clubMember', 'nonMember'];
	var sessionKeys = [];
	var params = window.location.search.substr(1).split('&');
	var validParams = getValidParameters(params, memberKeys);
	var summary = document.getElementById('summary-container');

	for (var param in validParams) {
		summary.appendChild(createNode('li', param + ': ' + validParams[param]));
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

// file:///D:/Development/Java/workspace/IceContracting/agile_fa_2018_IceContracting/Front end/summary.html?fName=jordan&lName=wisniewski&phone=7159554894&email=jordan@email.com&usafid=234234&coach=coachA&clubMember=true&nonMember=false