// world 시계 (Home 화면)
<!-- //
var timerID ;
function tzone(tz, os, ds, cl)
{
this.ct = new Date(0) ;                // datetime
this.tz = tz ;                // code
this.os = os ;                // GMT offset
this.ds = ds ;                // has daylight savings
this.cl = cl ;                // font color
}

function UpdateClocks() {
// www.timeanddate.com/worldclock
var ct = new Array(
new tzone('', +9, 0, '#003663'),
new tzone('', +8, 0, '#003663'),
new tzone('', -5, 1, '#003663'),
new tzone('', +5.5, 0, '#003663')) ;

var dt = new Date() ;        // [GMT] time according to machine clock
var startDST = new Date(dt.getFullYear(), 3, 1) ;
while (startDST.getDay() != 0)
startDST.setDate(startDST.getDate() + 1) ;

var endDST = new Date(dt.getFullYear(), 9, 31) ;
while (endDST.getDay() != 0)
endDST.setDate(endDST.getDate() - 1) ;

var ds_active ;                // DS currently active
if (startDST < dt && dt < endDST)
ds_active = 1 ;
else
ds_active = 0 ;

// Adjust each clock offset if that clock has DS and in DS.
for(n=0 ; n<ct.length ; n++)
if (ct[n].ds == 1 && ds_active == 1) ct[n].os++ ;

// compensate time zones
gmdt = new Date() ;
for (n=0 ; n<ct.length ; n++)
ct[n].ct = new Date(gmdt.getTime() + ct[n].os * 3600 * 1000) ;
document.all.Clock0.innerHTML =
'<font color="' + ct[0].cl + '">' + ct[0].tz + ClockString(ct[0].ct) + '</font>' ;
document.all.Clock1.innerHTML =
'<font color="' + ct[1].cl + '">' + ct[1].tz + ClockString(ct[1].ct) + '</font>' ;
document.all.Clock2.innerHTML =
'<font color="' + ct[2].cl + '">' + ct[2].tz + ClockString(ct[2].ct) + '</font>' ;
document.all.Clock3.innerHTML =
'<font color="' + ct[3].cl + '">' + ct[3].tz + ClockString(ct[3].ct) + '</font>' ;
timerID = window.setTimeout("UpdateClocks()", 1001) ;
}
function ClockString(dt) {
var stemp ;
var dt_hour = dt.getUTCHours() ;
var dt_minute = dt.getUTCMinutes() ;
var dt_second = dt.getUTCSeconds() ;
if (dt_hour < 10)
dt_hour = '0' + dt_hour ;
if (dt_minute < 10)
dt_minute = '0' + dt_minute ;
if (dt_second < 10)
dt_second = '0' + dt_second ;
stemp = ' ' + dt_hour + ":" + dt_minute + ":" + dt_second ;
return stemp ;
}
//  End -->
