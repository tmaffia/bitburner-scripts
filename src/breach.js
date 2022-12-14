const hackScript = 'superhack.js';

/** @param {NS} ns */
export async function main(ns) {
	const target = ns.args[0];
	
	if (!ns.hasRootAccess(target)) {
		const portsRequired = ns.getServerNumPortsRequired(target);
		ns.print(portsRequired + ' ports required to be opened on server: ' + target);
		
		switch(portsRequired) {
			case 0:
				await getBackdoorAccess(ns, target);
				break;
			case 1:
				if (ns.ls('home').includes('BruteSSH.exe')) {
					ns.brutessh(target);		
					await getBackdoorAccess(ns, target);
					break;
				} else {
					ns.tprintf('Cannot breach: %1$s without BruteSSH.exe', target);
					return;
				}
			case 2:
				if (ns.ls('home').includes('FTPCrack.exe')) {
					ns.brutessh(target);
					ns.ftpcrack(target);
					await getBackdoorAccess(ns, target);
					break;
				} else {
					ns.tprintf('Cannot breach: %1$s without FTPCrack.exe', target);
					return;
				}
			case 3:
				if (ns.ls('home').includes('relaySMTP.exe')) {
					ns.brutessh(target);
					ns.ftpcrack(target);
					ns.relaysmtp(target);
					await getBackdoorAccess(ns, target);
					break;
				} else {
					ns.tprintf('Cannot breach: %1$s without RelaySMTP.exe', target);
					return;
				}
			case 4:
				if (ns.ls('home').includes('HTTPWorm.exe')) {
					ns.brutessh(target);
					ns.ftpcrack(target);
					ns.relaysmtp(target);
					ns.httpworm(target);
					await getBackdoorAccess(ns, target);
					break;
				} else {
					ns.tprintf('Cannot breach: %1$s without HTTPWorm.exe', target);
					return;
				}
			case 5:
				if (ns.ls('home').includes('SQLInject.exe')) {
					ns.brutessh(target);
					ns.ftpcrack(target);
					ns.relaysmtp(target);
					ns.httpworm(target);
					ns.sqlinject(target);
					await getBackdoorAccess(ns, target);
					break;
				} else {
					ns.tprintf('Cannot breach: %1$s without SQLInject.exe', target);
					return;
				}
		}
	} else {
		if (ns.hasRootAccess(target)) {
		}
	}
}

async function getBackdoorAccess(ns, target) {
	if (ns.getHackingLevel() >= ns.getServerRequiredHackingLevel(target)) {
		await ns.nuke(target);
		// await ns.singularity.connect(target);
		// await ns.installBackdoor();
		await ns.print('backdoor and root access achieved for: ' + target);
	} else {
		 ns.print('Required hacking level too high on: ' + target);
	}
}