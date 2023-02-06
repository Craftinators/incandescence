import { execSync } from "node:child_process";
import * as process from "node:process";
import * as os from "node:os";

class ANSIDetector {
	private constructor() {}

	private static readonly TERMINAL_PATTERNS: Array<RegExp> = [
		/^xterm/, // xterm, PuTTY, Mintty
		/^rxvt/, // RXVT
		/^eterm/, // Eterm
		/^screen/, // GNU screen, tmux
		/tmux/, // tmux
		/^vt100/, // DEC VT series
		/^vt102/, // DEC VT series
		/^vt220/, // DEC VT series
		/^vt320/, // DEC VT series
		/ansi/, // ANSI
		/scoansi/, // SCO ANSI
		/cygwin/, // Cygwin, MinGW
		/linux/, // Linux console
		/konsole/, // Konsole
		/bvterm/, // Bitvise SSH Client
		/^st-256color/, // Suckless Simple Terminal, st
	];

	private static Windows = class {
		public static detect(): boolean {
			const version = ANSIDetector.Windows.parseReleaseVersion();

			if (version.major >= 10 && version.build >= 14393) return true;

			if (ANSIDetector.Windows.isMinGW()) return true;

			const conEmuANSI = process.env["ConEmuANSI"];
			if (conEmuANSI && conEmuANSI.toLowerCase() === "on") return true;
			if (process.env["ANSICON"]) return true;
			return false;
		}

		private static isMinGW(): boolean {
			try {
				return execSync("uname", { encoding: "utf-8" }).toLowerCase().includes("mingw");
			} catch (err) {
				return false;
			}
		}

		private static parseReleaseVersion(): { major: number; build: number } {
			const osRelease = os.release().split(".");
			return {
				major: parseInt(osRelease[0] ?? "", 10),
				build: parseInt(osRelease[2] ?? "", 10),
			};
		}
	};

	public static detect(): boolean {
		if (!process.stdout.isTTY) return false;
		return process.platform === "win32" ? ANSIDetector.Windows.detect() : ANSIDetector.detectFromTerminal();
	}

	private static detectFromTerminal(): boolean {
		const terminal = process.env["TERM"];
		if (!terminal) return false;
		return ANSIDetector.TERMINAL_PATTERNS.some((pattern) => pattern.test(terminal));
	}
}

export { ANSIDetector };
