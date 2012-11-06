#!/usr/bin/env node

POPULAR_PORTS = [];
POPULAR_PORTS[1] =	"TCP Port Service Multiplexer (TCPMUX)";
POPULAR_PORTS[5] =	"Remote Job Entry (RJE)";
POPULAR_PORTS[7] =	"ECHO";
POPULAR_PORTS[18] =	"Message Send Protocol (MSP)";
POPULAR_PORTS[20] =	"FTP -- Data";
POPULAR_PORTS[21] =	"FTP -- Control";
POPULAR_PORTS[22] =	"SSH Remote Login Protocol";
POPULAR_PORTS[23] =	"Telnet";
POPULAR_PORTS[25] =	"Simple Mail Transfer Protocol (SMTP)";
POPULAR_PORTS[29] =	"MSG ICP";
POPULAR_PORTS[37] =	"Time";
POPULAR_PORTS[42] =	"Host Name Server (Nameserv)";
POPULAR_PORTS[43] =	"WhoIs";
POPULAR_PORTS[49] =	"Login Host Protocol (Login)";
POPULAR_PORTS[53] =	"Domain Name System (DNS)";
POPULAR_PORTS[69] =	"Trivial File Transfer Protocol (TFTP)";
POPULAR_PORTS[70] =	"Gopher Services";
POPULAR_PORTS[79] =	"Finger";
POPULAR_PORTS[80] =	"HTTP";
POPULAR_PORTS[103] =	"X.400 Standard";
POPULAR_PORTS[108] =	"SNA Gateway Access Server";
POPULAR_PORTS[109] =	"POP2";
POPULAR_PORTS[110] =	"POP3";
POPULAR_PORTS[115] =	"Simple File Transfer Protocol (SFTP)";
POPULAR_PORTS[118] =	"SQL Services";
POPULAR_PORTS[119] =	"Newsgroup (NNTP)";
POPULAR_PORTS[137] =	"NetBIOS Name Service";
POPULAR_PORTS[139] =	"NetBIOS Datagram Service";
POPULAR_PORTS[143] =	"Interim Mail Access Protocol (IMAP)";
POPULAR_PORTS[150] =	"NetBIOS Session Service";
POPULAR_PORTS[156] =	"SQL Server";
POPULAR_PORTS[161] =	"SNMP";
POPULAR_PORTS[179] =	"Border Gateway Protocol (BGP)";
POPULAR_PORTS[190] =	"Gateway Access Control Protocol (GACP)";
POPULAR_PORTS[194] =	"Internet Relay Chat (IRC)";
POPULAR_PORTS[197] =	"Directory Location Service (DLS)";
POPULAR_PORTS[389] =	"Lightweight Directory Access Protocol (LDAP)";
POPULAR_PORTS[396] =	"Novell Netware over IP";
POPULAR_PORTS[443] =	"HTTPS";
POPULAR_PORTS[444] =	"Simple Network Paging Protocol (SNPP)";
POPULAR_PORTS[445] =	"Microsoft-DS";
POPULAR_PORTS[458] =	"Apple QuickTime";
POPULAR_PORTS[546] =	"DHCP Client";
POPULAR_PORTS[547] =	"DHCP Server";
POPULAR_PORTS[563] =	"SNEWS";
POPULAR_PORTS[569] =	"MSN";
POPULAR_PORTS[1080] =	"Socks";

var net = require('net');
var argv = require('optimist')
	.usage("Scan a host for open ports.\nUsage: $0 [target]")
	.options('p', {
		alias: 'port',
		describe: "the port number to scan",
		default: POPULAR_PORTS
	})
	.demand(1)
	.argv;

// check that the PORTS from the user are either a list of numbers or a single number
var PORTS = typeof argv.p === "number" ? [argv.p] : argv.p.split(",");

// convert everything to numbers
for(var i = 0; i < PORTS.length; i++) { PORTS[i] = +PORTS[i]; }
PORTS.sort(function(a,b){return a-b;});

OPEN_PORTS = [];
CLOSED_PORTS = [];

// scan each port in the list
POPULAR_PORTS.forEach(function(service, port) {
	console.log("Scanning: " + port);
	try {
		net.connect(port, argv._, function() {
			OPEN_PORTS+=port;
			console.log(POPULAR_PORTS[port]);
			var description = POPULAR_PORTS[port] || "unknown";
			console.log(description);
			console.log(argv._ + ":" + port + " open (" + description + ")");
			this.destroy();
		}).on('error', function(){
			CLOSED_PORTS+=port;
		});
	} catch(e) { console.log(e); }
});
