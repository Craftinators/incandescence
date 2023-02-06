import * as os from "os";

const _regexes: RegExp[] = [
    new RegExp("^xterm"), // xterm, PuTTY, Mintty
    new RegExp("^rxvt"), // RXVT
    new RegExp("^eterm"), // Eterm
    new RegExp("^screen"), // GNU screen, tmux
    new RegExp("tmux"), // tmux
    new RegExp("^vt100"), // DEC VT series
    new RegExp("^vt102"), // DEC VT series
    new RegExp("^vt220"), // DEC VT series
    new RegExp("^vt320"), // DEC VT series
    new RegExp("ansi"), // ANSI
    new RegExp("scoansi"), // SCO ANSI
    new RegExp("cygwin"), // Cygwin, MinGW
    new RegExp("linux"), // Linux console
    new RegExp("konsole"), // Konsole
    new RegExp("bvterm"), // Bitvise SSH Client
    new RegExp("^st-256color"), // Suckless Simple Terminal, st
];

// ANSI Detector
function terminal_detect() {
    const terminal = process.env["TERM"] // Environment.GetEnvironmentVariable
    if (!terminal || terminal.trim().length === 0) // String.isNullOrWhitespace
        return false;
    return _regexes.some(regexp => regexp.test(terminal));
}

function detect() {
    if (!process.stdout.isTTY)
        return false;
    return false

}

function windows() {
    if (process.platform === 'win32') { // RuntimeInformation.IsOSPlatform
        const osRelease = os.release().split('.');
        if (
            parseInt(osRelease[0] ?? "", 10) >= 10 && // major version
            parseInt(osRelease[2] ?? "", 10) >= 14393 // build number
        ) {
            return true;
        }

        // if (isMinGW()) { // Create myself
        if (true) {
            // https://github.com/keqingrong/is-mingw/blob/master/index.js
            // return execSync('uname', {encoding: 'utf-8'}).toLowerCase().includes('mingw');
            return true;
        }
    }

    const isConEmuAnsiOn = (process.env.ConEmuANSI || '').toLowerCase() === 'on';
    if (isConEmuAnsiOn) {
        return true;
    }

    return false;
}

terminal_detect();
detect();
windows();