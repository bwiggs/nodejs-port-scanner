#!/usr/bin/env node

POPULAR_PORTS = {
	"1":	"TCP Port Service Multiplexer (TCPMUX)",
	"5":	"Remote Job Entry (RJE)",
	"7":	"ECHO",
	"18" :	"Message Send Protocol (MSP)",
	"20" :	"FTP -- Data",
	"21" :	"FTP -- Control",
	"22" :	"SSH Remote Login Protocol",
	"23" :	"Telnet",
	"25" :	"Simple Mail Transfer Protocol (SMTP)",
	"29" :	"MSG ICP",
	"37" :	"Time",
	"42" :	"Host Name Server (Nameserv)",
	"43" :	"WhoIs",
	"49" :	"Login Host Protocol (Login)",
	"53" :	"Domain Name System (DNS)",
	"69" :	"Trivial File Transfer Protocol (TFTP)",
	"70" :	"Gopher Services",
	"79" :	"Finger",
	"80" :	"HTTP",
	"103" :	"X.400 Standard",
	"108" :	"SNA Gateway Access Server",
	"109" :	"POP2",
	"110" :	"POP3",
	"115" :	"Simple File Transfer Protocol (SFTP)",
	"118" :	"SQL Services",
	"119" :	"Newsgroup (NNTP)",
	"137" :	"NetBIOS Name Service",
	"139" :	"NetBIOS Datagram Service",
	"143" :	"Interim Mail Access Protocol (IMAP)",
	"150" :	"NetBIOS Session Service",
	"156" :	"SQL Server",
	"161" :	"SNMP",
	"179" :	"Border Gateway Protocol (BGP)",
	"190" :	"Gateway Access Control Protocol (GACP)",
	"194" :	"Internet Relay Chat (IRC)",
	"197" :	"Directory Location Service (DLS)",
	"389" :	"Lightweight Directory Access Protocol (LDAP)",
	"396" :	"Novell Netware over IP",
	"443" :	"HTTPS",
	"444" :	"Simple Network Paging Protocol (SNPP)",
	"445" :	"Microsoft-DS",
	"458" :	"Apple QuickTime",
	"546" :	"DHCP Client",
	"547" :	"DHCP Server",
	"563" :	"SNEWS",
	"569" :	"MSN",
	"1080" :	"Socks"
};

var net = require('net');
var argv = require('optimist')
	.usage("Scan a host for open ports.\nUsage: $0 [target]")
	.options('p', {
		alias: 'port',
		describe: "the port number[s] to scan. Seperate with commas."
	})
	.demand(1)
	.argv;

// process the ports argument
var PORTS = (function() {
	if(typeof argv.p === "number") return [argv.p,];
	if(typeof argv.p === "string") return argv.p.split(',');
	return Object.keys(POPULAR_PORTS);
})();

OPEN_PORTS = [];
CLOSED_PORTS = [];

// scan each port in the list
PORTS.forEach(scanPort);

function scanPort(port) {
	console.log("Scanning: " + port);
		try {
			net.connect(port, argv._, onPortOpen).on('error', onPortClosed);
	} catch(e) {
		console.log(e);
	}
}

function onPortOpen(one, two) {
	console.log(one);
	console.log(two);
		OPEN_PORTS+=port;
		console.log(POPULAR_PORTS[port]);
		var description = POPULAR_PORTS[port] || "unknown";
		console.log(description);
		console.log(argv._ + ":" + port + " open (" + description + ")");
		this.destroy();	
}

function onPortClosed() {
	CLOSED_PORTS+=port;
}
