$( document ).ready(function() {
    $(function() {
        var start = moment().subtract(30, 'days');
        var end = moment();
    
        function cb(start, end) {
            $('#reportrange span').html(start.format('DD.MM.YYYY') + ' - ' + end.format('DD.MM.YYYY'));
        }
    
        $('#reportrange').daterangepicker({
            startDate: start,
            endDate: end,
            applyButtonClasses: "btn-default",
            cancelClass: "btn",
            ranges: {
               'Месяц': [moment().subtract(31, 'days'), moment()],
               'Квартал': [moment().subtract(92, 'days'), moment()],
               'Год': [moment().subtract(366, 'days'), moment()],
            },
            locale: {
                applyLabel: "Выбрать",
                cancelLabel: "Отмена",
                customRangeLabel: "Произвольный",
                daysOfWeek: [
                "Вск",
                "Пн",
                "Вт",
                "Ср",
                "Чт",
                "Пт",
                "Суб"
            ],
            monthNames: [
                "Январь",
                "Февраль",
                "Март",
                "Апрель",
                "Май",
                "Июнь",
                "Июль",
                "Август",
                "Сентябрь",
                "Октябрь",
                "Ноябрь",
                "Декабрь"
            ],
            firstDay: 1
            }
        }, cb);
    
        cb(start, end);
    
    });

    (function ($) {
        $.fn.buttonLoader = function (action) {
            var self = $(this);
            if (action == 'start') {
                if ($(self).attr("disabled") == "disabled") {
                    e.preventDefault();
                }
                $('.has-spinner').attr("disabled", "disabled");
                $(self).attr('data-btn-text', $(self).text());
                $(self).html('<span class="spinner"><i class="fa fa-spinner fa-spin"></i></span>Загрузка');
                $(self).addClass('active');
            }
            if (action == 'stop') {
                $(self).html($(self).attr('data-btn-text'));
                $(self).removeClass('active');
                $('.has-spinner').removeAttr("disabled");
            }
        }
    })(jQuery);
    

    $( ".act-collation .btn" ).click(function() {
        var INN = $('.act-collation input[name="INN"]').val();
        $(this).buttonLoader('start');
        if ($(this).hasClass('code-tt-btn')) {
            $.ajax({
                url: '/ajax/act-collation.php',
                method: 'post',
                dataType: 'html',
                data: {INN: INN, action: "CodeTT"},
                success: function(data){
                    $( ".act-collation .btn" ).buttonLoader('stop');
                    if (data != 'error') {
                        var TT = JSON.parse(data);
                        var html = '';
                        for(var i = 0; i < TT.length; i++) {
                            html += '<option value="'+TT[i][0]+'">'+TT[i][1]+'</option>';
                        }
                        $(".act-collation .codeTT, .act-collation #reportrange").fadeIn();
                        $(".act-collation .codeTT select").html(html);
                        $( ".act-collation .btn" ).removeClass('code-tt-btn');
                        $( ".act-collation .btn" ).html('Отправить');
                        $( ".act-collation .error" ).fadeOut();
                    }
                    else {
                        $( ".act-collation .error" ).html('Неверный ИНН. Обратитесь к менеджеру').fadeIn();
                    }
                }
            });
        }
        else {
            var CodeTT = $('.act-collation select').val();
            var Date = $('.act-collation #reportrange span').text();
            var Email = $('.act-collation input[name="EMAIL"]').val();
            Date = Date.replace(/\s+/g, '');
            Date = Date.split('-');
            $.ajax({
                url: '/ajax/act-collation.php',
                method: 'post',
                dataType: 'html',
                data: {INN: INN, CodeTT: CodeTT, DATE_START: Date[0], DATE_END: Date[1], EMAIL: Email},
                success: function(data){
                    $( ".act-collation .btn" ).buttonLoader('stop');
                    console.log(data);
                    if (data == '"success"') {
                        $( ".act-collation .btn" ).addClass('disabled');
                        $( ".act-collation .btn" ).html('Отправлено');
                        $( ".act-collation .error" ).fadeOut();
                    }
                    else {
                        $( ".act-collation .error" ).html('Выберите другой диапазон дат').fadeIn();
                    }
                }
            });
        }
    });
});