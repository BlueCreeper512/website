document.addEventListener("DOMContentLoaded", () => {
    const activateWeb = document.querySelector("activate-web");
    const userAgent = navigator.userAgent;
    if (!activateWeb) return;

    let os = "OS";

    if (userAgent.indexOf("Windows") !== -1) os = "Windows";
    else if (userAgent.indexOf("Macintosh") !== -1) os = "macOS";
    else if (userAgent.indexOf("Linux") !== -1) os = "Linux";
    else if (userAgent.indexOf("Android") !== -1) os = "Android";
    else if (userAgent.indexOf("CrOS") !== -1) os = "ChromeOS";
    else if (userAgent.indexOf("OpenBSD") !== -1) os = "OpenBSD";
    else if (userAgent.indexOf("Unix") !== -1) os = "Unix";
    else if (userAgent.indexOf("FreeBSD") !== -1) os = "FreeBSD";
    else if (userAgent.indexOf("NetBSD") !== -1) os = "NetBSD";
    else if (userAgent.indexOf("SunOS") !== -1) os = "Solaris";
    else if (userAgent.indexOf("Gentoo") !== -1) os = "Gentoo";
    else if (/iPhone|iPad|iPod/.test(userAgent)) os = "iOS";

    activateWeb.name = os;
});
