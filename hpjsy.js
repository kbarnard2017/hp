function updateSoftware(version, trs) {
    for (var i = 2; i < trs.length-1; i++) {
        var tds = trs[i].getElementsByTagName("td");
        var filename = tds[0].innerHTML;
        var usages = getUsages(filename, version);
        tds[2].innerHTML = parseFloat(usages[1]).toFixed(0);
        tds[3].innerHTML = parseFloat(usages[2]).toFixed(0);
        tds[4].innerHTML = parseFloat(usages[3]).toFixed(0);
        tds[5].innerHTML = parseFloat(usages[0]).toFixed(0);
    }
}
function removeComma(str) {
    while (str.indexOf(",") > -1) {
        var index = str.indexOf(",");
        var first = str.substring(0, index);
        var last = str.substring(index + 1, str.length);
        str = first + last;
    }
    return str;
}
function addProcs() {
    var toAdd = [];
    var parent = document;
    recurAdd(parent, toAdd);
}
function recurAdd(parent, toAdd) {
    var nextButton;
    var as = parent.getElementsByTagName("a");
    for (var i = 0; i < as.length; i++) if (as[i].childNodes[0].nodeValue == "Next") nextButton = as[i];
    var nBHref = nextButton.href;
    var table = parent.getElementsByName("frm_files")[0].getElementsByTagName("table")[0];
    var numProcs = 0;
    for (var numberOfRows = table.rows.length, i = 3; i<numberOfRows-2; i++) {
        if (parent != document) toAdd.push(table.getElementsByTagName("tr")[i]);
        numProcs++;
    }
    if (numProcs > 0) {
        var nextFrame = parent.createElement("iframe");
        nextFrame.src = nBHref+"&disable=1";
        nextFrame.style.display="none";
        nextFrame.onload = function() {
            recurAdd(nextFrame.contentWindow.document, toAdd);
        };
        parent.body.appendChild(nextFrame);
    }
    else {
        for (var i = 0; i < toAdd.length; i++) {
            var newNode = document.importNode(toAdd[i], true);
            var table = document.getElementsByName("frm_files")[0].getElementsByTagName("table")[0];
            var trs = table.getElementsByTagName("tr");
            var beforeNode;
            for (var l = 0; l < trs.length; l++) if (trs[l].innerHTML.indexOf("Tasks")>-1) beforeNode = trs[l];
            table.getElementsByTagName("tbody")[0].insertBefore(newNode, beforeNode);
        }
    }
}
function calcCost(gold) {
    var nr_hours = document.getElementsByName("nr_hours")[0], x_times = document.getElementsByName("x_times")[0], targ = document.getElementById("targ");
    var hours = nr_hours.value;
    var times = x_times.value;
    var mult = 100;
    if (gold) mult = 80;
    targ.innerHTML = "Estimated cost: "+hours*times*mult+" HPD";
}
function getUsages(filename, version) {
    var hd = 0, cpu = 0, mem = 0, band = 0;
    switch (filename) {
        case "Firewall Protect":{  hd = 7.50;  mem = 3000;  cpu = 50;  band = 0; break; }
        case "Firewall Bypass":{  hd = 37.50;  mem = 7000;  cpu = 80;  band = 0; break; }
        case "Password Protect":{  hd = 8.50;  mem = 5000;  cpu = 100;  band = 0; break; }
        case "Password Break":{  hd = 84.96;  mem = 12500;  cpu = 200;  band = 0; break; }
        case "Hide Files":{  hd = 100.00;  mem = 9000;  cpu = 100;  band = 0; break; }
        case "Unhide Files":{  hd = 200.00;  mem = 9000;  cpu = 100;  band = 0; break; }
        case "Encryptor":{  hd = 341.80;  mem = 30000;  cpu = 600;  band = 0; break; }
        case "Decryptor":{  hd = 439.45;  mem = 40000;  cpu = 900;  band = 0; break; }
        case "SpyWare":{  hd = 50.00;  mem = 900;  cpu = 300;  band = 0; break; }
        case "Anti-SpyWare":{  hd = 100.00;  mem = 22500;  cpu = 150;  band = 0; break; }
        case "Malware Logic Bomb":{  hd = 585.94;  mem = 5000;  cpu = 300;  band = 0; break; }
        case "Malware Overload Bomb":{  hd = 976.56;  mem = 7000;  cpu = 550;  band = 0; break; }
        case "Malware Anti-Virus":{  hd = 200.00;  mem = 1500;  cpu = 300;  band = 0; break; }
        case "Adware Spam Daemon":{  hd = 100.00;  mem = 5000;  cpu = 50;  band = 3; break; }
        case "Adware Anti-Virus":{  hd = 174.22;  mem = 10000;  cpu = 250;  band = 0; break; }
        case "File Share Virus":{  hd = 3200.00;  mem = 10000;  cpu = 250;  band = 50; break; }
        case "File Share Anti-Virus":{  hd = 1000.00;  mem = 20000;  cpu = 500;  band = 0; break; }
        case "Sniffer Daemon":{  hd = 151.17;  mem = 3000;  cpu = 50;  band = 0; break; }
        case "IP Cloaker":{  hd = 151.17;  mem = 6000;  cpu = 100;  band = 0; break; }
        case "IP Scanner":{  hd = 369.53;  mem = 10000;  cpu = 200;  band = 0; break; }
        case "Scan Blocker":{  hd = 200.00;  mem = 10000;  cpu = 200;  band = 0; break; }
        case "Data uplink hijack":{  hd = 395.31;  mem = 20000;  cpu = 300;  band = 0; break; }
        case "Data hijack Anti-Virus":{  hd = 200.00;  mem = 30000;  cpu = 500;  band = 0; break; }
        case "Log Deleter":{  hd = 5.00;  mem = 1000;  cpu = 30;  band = 0; break; }
        case "Log UnDeleter":{  hd = 15.00;  mem = 3000;  cpu = 50;  band = 0; break; }
        case "Virus breaker":{  hd = 174.21;  mem = 11500;  cpu = 300;  band = 0; break; }
        case "Faith Anti-Virus":{  hd = 20000.00;  mem = 1200000;  cpu = 20000;  band = 0; break; }
        case "Virus Identifier":{  hd = 17.42;  mem = 1150;  cpu = 30;  band = 0; break; }
        case "Process Tracer":{  hd = 174.22;  mem = 92000;  cpu = 2400;  band = 0; break; }
        case "Revelation Virus":{  hd = 20000.00;  mem = 600000;  cpu = 10000;  band = 400; break; }
        case "Robber Baron Virus":{  hd = 96000.00;  mem = 300000;  cpu = 7500;  band = 1500; break; }
        case "Robber Baron Anti-Virus":{  hd = 30000.00;  mem = 600000;  cpu = 15000;  band = 0; break; }
        case "Remote Attack Disruptor":{  hd = 174.22;  mem = 92000;  cpu = 2400;  band = 0; break; }
        case "IP Leech":{  hd = 75.00;  mem = 1350;  cpu = 450;  band = 0; break; }
        case "IP Leech Anti-Virus":{  hd = 150.00;  mem = 21600;  cpu = 225;  band = 0; break; }
        case "Remote Virus Injector":{  hd = 4000.00;  mem = 125000;  cpu = 2500;  band = 2; break; }
        case "RV Injector Anti-Virus":{  hd = 4000.00;  mem = 250000;  cpu = 5000;  band = 0; break; }
        case "Overload Signer":{  hd = 174.21;  mem = 92000;  cpu = 2400;  band = 0; break; }
        case "Mutant Revelation Virus":{  hd = 96000.00;  mem = 3000000;  cpu = 50000;  band = 2000; break; }
        case "MutantR Accelerator":{  hd = 174.21;  mem = 92000;  cpu = 2400;  band = 100; break; }
        case "MutantR Decelerator":{  hd = 174.21;  mem = 278000;  cpu = 9600;  band = 0; break; }
        case "MutantR Acc Stopper":{  hd = 174.21;  mem = 46000;  cpu = 1200;  band = 0; break; }
        case "MutantR Dec Stopper":{  hd = 174.21;  mem = 46000;  cpu = 1200;  band = 0; break; }
    }
    hd *= version/0.1;
    mem *= version/0.1;
    cpu *= version/0.1;
    band *= version/0.1;
    band = band.toFixed(2);
    var usages = [hd, cpu, mem, band];
    return usages;
}
function removeDTA() {
    var as = document.getElementsByTagName("a");
    var spls = [];
    for (var i = 0; i < as.length; i++) if (as[i].getAttribute("href").indexOf("action=support")>-1 || as[i].getAttribute("href").indexOf("affiliate")>-1) spls.push(as[i]);
    var cont = spls.length==3;
    if (cont) {
        spls[2].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.removeChild(spls[2].parentNode.parentNode.parentNode.parentNode.parentNode.parentNode);
        var fs = document.getElementsByTagName("fieldset")[0];
        if (new String(document.location.href).indexOf("?action=gate")>-1) {
            fs.removeChild(fs.childNodes[2]);
            fs.removeChild(fs.childNodes[2]);
            fs.removeChild(fs.childNodes[2]);
            fs.removeChild(fs.childNodes[2]);
            fs.removeChild(fs.childNodes[2]);
        }
        if (new String(document.location.href).indexOf("?action=ip_db")>-1) {
            fs.removeChild(fs.childNodes[2]);
        }
        if (new String(document.location.href).indexOf("?action=manage_tr")>-1) {
            fs.removeChild(fs.childNodes[2]);
        }
        if (new String(document.location.href).indexOf("?action=ability")>-1) {
            fs.removeChild(fs.childNodes[2]);
            fs.removeChild(fs.childNodes[2]);
            fs.removeChild(fs.childNodes[2]);
            fs.removeChild(fs.childNodes[2]);
            fs.removeChild(fs.childNodes[2]);
        }
        if (new String(document.location.href).indexOf("?action=software")>-1) {
            fs.removeChild(fs.childNodes[2]);
            fs.removeChild(fs.childNodes[2]);
            fs.removeChild(fs.childNodes[2]);
        }
        if (new String(document.location.href).indexOf("?action=hardware")>-1) {
            fs.removeChild(fs.childNodes[2]);
            fs.removeChild(fs.childNodes[2]);
            fs.removeChild(fs.childNodes[2]);
        }
        if (new String(document.location.href).indexOf("&action=pvp_board")>-1) {
            fs.removeChild(fs.childNodes[2]);
            fs.removeChild(fs.childNodes[2]);
        }
        if (new String(document.location.href).indexOf("?action=messages")>-1) {
            fs.removeChild(fs.childNodes[2]);
            fs.removeChild(fs.childNodes[2]);
        }
        if (new String(document.location.href).indexOf("?action=finances")>-1) {
            fs.removeChild(fs.childNodes[2]);
        }
        if (new String(document.location.href).indexOf("?action=research")>-1) {
            fs.removeChild(fs.childNodes[2]);
            fs.removeChild(fs.childNodes[2]);
            fs.removeChild(fs.childNodes[2]);
        }
        if (new String(document.location.href).indexOf("?action=stock_market")>-1) {
            fs.removeChild(fs.childNodes[2]);
            fs.removeChild(fs.childNodes[2]);
            fs.removeChild(fs.childNodes[2]);
        }
        if (new String(document.location.href).indexOf("?action=mission")>-1) {
            fs.removeChild(fs.childNodes[2]);
        }
        if (new String(document.location.href).indexOf("?action=faction")>-1) {
            fs.removeChild(fs.childNodes[2]);
            fs.removeChild(fs.childNodes[2]);
            fs.removeChild(fs.childNodes[2]);
            fs.removeChild(fs.childNodes[2]);
            fs.removeChild(fs.childNodes[2]);
        }
        if (new String(document.location.href).indexOf("?action=friend_list")>-1) {
            fs.removeChild(fs.childNodes[2]);
        }
    }
}
function postload() {
    // Postload processing in scope of document
    alert("postload called");
}
