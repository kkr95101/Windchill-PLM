/*----------------------------------------------------------------------------
 * 수정일      요청자  수정자  수정사유
 *----------------------------------------------------------------------------
 * 2007.09.15  KJK    KJK  New Creating
 *---------------------------------------------------------------------------*/
/*****************************************************************************
* Title                 : cookie.js
* @author               : jgkim@digiteki.com
* @date                 : 2007.10.15
* @Description          : Cookie Control
* @Copyright            : DIGITEKI. Ltd.
******************************************************************************/


function GetCookie(name)
{
    var arg = name + "=";
    var alen = arg.length;
    var clen = document.cookie.length;
    var i = 0;

    while (i < clen) {
        var j = i + alen;
        if (document.cookie.substring(i, j) == arg)
            return getCookieVal(j);
        i = document.cookie.indexOf(" ", i) + 1;
        if (i == 0) break;
    }
    return null;
}

function getCookieVal(offset) {
    var endstr = document.cookie.indexOf(";", offset);
    if (endstr == -1)
        endstr = document.cookie.length;
    return unescape(document.cookie.substring(offset, endstr));
}

function SetCookie(name, value)
{
    var argv = SetCookie.arguments;
    var argc = SetCookie.arguments.length;
    var expires = (argc > 2) ? argv[2] : null;
    var domain = (argc > 4) ? argv[4] : null;
    var secure = (argc > 5) ? argv[5] : false;
    var path = "/"; //allows the tree to remain open across pages with diff names & paths

    document.cookie = name + "=" + escape(value) +
                      ((expires == null) ? "" : ("; expires=" + expires.toGMTString())) +
                      ((path == null) ? "" : ("; path=" + path)) +
                      ((domain == null) ? "" : ("; domain=" + domain)) +
                      ((secure == true) ? "; secure" : "");
}

function ExpireCookie(name)
{
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = GetCookie(name);
    name = CookieBranding(name)
    document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString();
}