//http://eisabainyo.net/demo/jquery.calendar-widget.php

(function ($) {

    function calendarWidget(el, params) {

        var now = new Date();
        var thismonth = now.getMonth();
        var thisyear = now.getYear() + 1900;

        var opts = {
            month: thismonth,
            year: thisyear
        };

        $.extend(opts, params);

        var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        var dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'];
        month = i = parseInt(opts.month);
        year = parseInt(opts.year);
        var m = 0;
        var table = '';

        // next month
        if (month == 11) {
            var next_month = '<button data-icon="arrow-r" data-inline="true" data-iconpos="notext" id="nextMonth" class="changeMonth">' + (year + 1) + '-0</button>';
            //var next_month = '<a href="#' + (year + 1) + '-0">nextMonth</a>';
            //var next_month = '<a href="?month=' + 1 + '&amp;year=' + (year + 1) + '" title="' + monthNames[0] + ' ' + (year + 1) + '">' + monthNames[0] + ' ' + (year + 1) + '</a>';
        } else {
            var next_month = '<button data-icon="arrow-r" data-inline="true" data-iconpos="notext" id="nextMonth" class="changeMonth">' + year + '-' + (month + 1) +  '</button>';
            //var next_month = '<a href="#' + year + '-' + (month + 1) + '">nextMonth</a>';
            //var next_month = '<a href="?month=' + (month + 2) + '&amp;year=' + (year) + '" title="' + monthNames[month + 1] + ' ' + (year) + '">' + monthNames[month + 1] + ' ' + (year) + '</a>';
        }

        // previous month
        if (month == 0) {
            var prev_month = '<button data-icon="arrow-l" data-inline="true" data-iconpos="notext" id="prevMonth" class="changeMonth">' + (year - 1) + '-11</button>';
            //var prev_month = '<a href="#' + (year - 1) + '-11">prevMonth</a>';
            //var prev_month = '<a href="?month=' + 12 + '&amp;year=' + (year - 1) + '" title="' + monthNames[11] + ' ' + (year - 1) + '">' + monthNames[11] + ' ' + (year - 1) + '</a>';
        } else {
            var prev_month = '<button data-icon="arrow-l" data-inline="true" data-iconpos="notext" id="prevMonth" class="changeMonth">' + year + '-' +  (month-1) + '</button>';
            //var prev_month = '<a href="#' + year + '-' + (month - 1) + '">prevMonth</a>';
            //var prev_month = '<a href="?month=' + (month) + '&amp;year=' + (year) + '" title="' + monthNames[month - 1] + ' ' + (year) + '">' + monthNames[month - 1] + ' ' + (year) + '</a>';
        }

        table += ('<h3 id="current">' + monthNames[month] + ' ' + year + '</h3>');
        table += ('<h4 id="current-month" class="invisible">' + month + '</h4>');
        table += ('<h4 id="current-year" class="invisible">' + year + '</h4>');
        // uncomment the following lines if you'd like to display calendar month based on 'month' and 'view' paramaters from the URL
        //table += ('<div class="nav-prev">' + prev_month + '</div>');
        //table += ('<div class="nav-next">' + next_month + '</div>');
        table += (prev_month + next_month);

        table += ('<table class="calendar-month coder" ' + 'id="calendar-month' + i + ' " cellspacing="0">');
        //table += ('<table data-role="table" class="calendar-month " ' + 'id="calendar-month' + i + ' " cellspacing="0">');

        table += '<tr>';

        for (d = 0; d < 7; d++) {
            table += '<th class="weekday">' + dayNames[d] + '</th>';
        }

        table += '</tr>';

        var days = getDaysInMonth(month, year);
        var firstDayDate = new Date(year, month, 1);
        var firstDay = firstDayDate.getDay();

        var prev_days = getDaysInMonth(month, year);
        var firstDayDate = new Date(year, month, 1);
        var firstDay = firstDayDate.getDay();

        var prev_m = month == 0 ? 11 : month - 1;
        var prev_y = prev_m == 11 ? year - 1 : year;
        var prev_days = getDaysInMonth(prev_m, prev_y);
        firstDay = (firstDay == 0 && firstDayDate) ? 7 : firstDay;

        var i = 0;
        for (j = 0; j < 42; j++) {
            var cellDay;
            var cellID;
            /*
                        if ((j < firstDay)) {
                            cellDay = prev_days - firstDay + j + 1;
                            cellID = getCellID(year, month, cellDay);
                            table += ('<td class="other-month" id="' + cellID + '"><div><span class="day">' + cellDay + '</span></div><div style="height:10px;background:red;"></div></td>');
                        } else if ((j >= firstDay + getDaysInMonth(month, year))) {
                            i = i + 1;
                            cellDay = i;
                            cellID = getCellID(year, month + 2, cellDay);
                            table += ('<td class="other-month" id="' + cellID + '"><span class="day">' + cellDay + '</span></td>');
                        } else {
                            cellDay = j - firstDay + 1;
                            cellID = getCellID(year, month + 1, cellDay);
                            table += ('<td class="current-month day' + cellDay + '" id="' + cellID + '"><span class="day">' + cellDay + '</span></td>');
                        }
            */
            if ((j < firstDay)) {
                cellDay = prev_days - firstDay + j + 1;
                cellID = getCellID(year, month, cellDay);
            } else if ((j >= firstDay + getDaysInMonth(month, year))) {
                i = i + 1;
                cellDay = i;
                cellID = getCellID(year, month + 2, cellDay);
            } else {
                cellDay = j - firstDay + 1;
                cellID = getCellID(year, month + 1, cellDay);
            }

            var dataStr = localStorage.getItem("periodStamp");
            var allStamp = JSON.parse(dataStr);
            var hasStamp = false;
            if(allStamp){
                for (var k = 0 ; k < allStamp.length; k++) {
                    if (cellID == allStamp[k]) {
                        hasStamp = true;
                    }
                }
            }

            if (hasStamp) {
                var cellClass = "red";
            } else {
                var cellClass = "";
            }

            //Ç±Ç±Ç≈åvéZÇµÇƒê∂óùì˙Ç©î€Ç©ÇÃÉNÉâÉXÇí«â¡

            table += ('<td class="' + cellClass + '" id="' + cellID + '"><span class="day">' + cellDay + '</span><div class="obi"></div></td>');

            if (j % 7 == 6) table += ('</tr>');
        }

        table += ('</table>');

        el.html(table);

        //åéÇÃà⁄ìÆ
        $('.changeMonth').on('click', function () {
            var date = $(this).text().split("-");
            $("#calendar").html();
            $("#calendar").calendarWidget({
                month: date[1],
                year: date[0]
            });
            refreshButtons();
        });

        //é¿ç€ÇÃê∂óùì˙ÇÃï€ë∂
        $('.coder td').on('click', function () {
            var dataStr = localStorage.getItem("periodStamp");
            var allStamp = JSON.parse(dataStr);
            if (!allStamp) {
                allStamp = new Array();
            }
            var currentStamp = $(this).attr("id");
            var currentStampIndex = allStamp.indexOf(currentStamp);
            if (currentStampIndex < 0) {
                $(this).addClass("red");
                allStamp.push(currentStamp);
            } else {
                $(this).removeClass("red");
                allStamp.splice(currentStampIndex, 1);
            }
            var str = JSON.stringify(allStamp);
            localStorage.setItem("periodStamp", str);
        });

        refreshButtons();

    }

    function getCellID(year, month, day) {
        return year + "-" + month + "-" + day;
    }

    function getDaysInMonth(month, year) {
        var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if ((month == 1) && (year % 4 == 0) && ((year % 100 != 0) || (year % 400 == 0))) {
            return 29;
        } else {
            return daysInMonth[month];
        }
    }

    function refreshButtons() {
        $(".changeMonth").button().button("refresh");
    }

    // jQuery plugin initialisation
    $.fn.calendarWidget = function (params) {
        calendarWidget(this, params);
        return this;
    };

})(jQuery);