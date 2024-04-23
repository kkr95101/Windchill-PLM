(function ($) {
    // 숫자 제외하고 모든 문자 삭제.
    $.fn.removeText = function(_v){
        //console.log("removeText: 숫자 제거 합니다.");
        if (typeof(_v)==="undefined")
        {
            $(this).each(function(){
                this.value = this.value.replace(/[^0-9]/g,'');
            });
        }
        else
        {
            return _v.replace(/[^0-9]/g,'');
        }
    };

    // number_format과 같은 효과.
    $.fn.numberFormat = function(_v){
        this.proc = function(_v){
            var tmp = '',
                number = '',
                cutlen = 3,
                comma = ','
                i = 0,
                len = _v.length,
                mod = (len % cutlen),
                k = cutlen - mod;

            for (i; i < len; i++)
            {
                number = number + _v.charAt(i);
                if (i < len - 1)
                {
                    k++;
                    if ((k % cutlen) == 0)
                    {
                        number = number + comma;
                        k = 0;
                    }
                }
            }
            return number;
        };

        var proc = this.proc;
        if (typeof(_v)==="undefined")
        {
            $(this).each(function(){
                this.value = proc($(this).removeText(this.value));
            });
        }
        else
        {
            return proc(_v);
        }
    };

    // 위 두개의 합성.
    // 콤마 불필요시 numberFormat 부분을 주석처리.
    $.fn.onlyNumberComma = function (p) {
        $(this).each(function(i) {
//            $(this).attr({'style':'text-align:right'});

            this.value = $(this).removeText(this.value);
            this.value = $(this).numberFormat(this.value);

            $(this).bind('keypress keyup',function(e){
                this.value = $(this).removeText(this.value);
                this.value = $(this).numberFormat(this.value);
            });
        });
    };

 // 위 두개의 합성.
    // 콤마 불필요시 numberFormat 부분을 주석처리.
    $.fn.onlyNumber = function (p) {
        alert("aaa");
        $(this).each(function(i) {
//            $(this).attr({'style':'text-align:right'});

            this.value = $(this).removeText(this.value);

            $(this).bind('keypress keyup',function(e){
                this.value = $(this).removeText(this.value);
            });
        });
    };

    // 숫자와 소수점 제외하고 모든 문자 삭제.
    $.fn.removeTextDot = function(_v){
        if ( typeof(_v) === "undefined" ) {
            $(this).each(function() {
                this.value = this.value.replace(/[^0-9.]/g,'');
            });
        }
        else {
            return _v.replace(/[^0-9.]/g,'');
        }
    };

    $.fn.onlyNumberDot = function (p) {
        $(this).each(function(i) {

            this.value = $(this).removeTextDot(this.value);

            $(this).bind('keypress keyup',function(e){
                this.value = $(this).removeTextDot(this.value);

                var charCode = (e.which) ? e.which : event.keyCode;
                var _pattern1 = /^\d.*/; // 숫자로 시작하는지 체크
                if ( ! _pattern1.test(this.value) ) {
                    if ( charCode == 46 ) {
                        return false;
                    }
                }

                var _pattern0 = /^\d*[.]\d*$/; // 현재 value값에 소수점(.) 이 있으면 . 입력불가
                if ( _pattern0.test(this.value) ) {
                    if ( charCode == 46 ) {
                        return false;
                    }
                }
            });


        });
    };

})(jQuery);