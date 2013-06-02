/*
＜htmlの変更点＞
・jsound.jsとlovestudy_photo.jsの読み込み
・写真にid=photoを追加
・スイッチにid=switchを追加
・ボタンにid=history,id=dateを追加
*/


$(function () {
    //debug用
    localStorage.clear();

    //起動時
    $('#photo').css('width', '460px').css('height', '613px');
    var used = localStorage.getItem('used');
    if (!used) {
        localStorage.setItem('used', '1');
        $('#meter').hide();
        $('#photo').attr('src', './static/img/initial0.jpg');
        $('#photo').attr('mode', 'event');
        $('#photo').attr('clickSound', 'dummy');
        $('#photo').after('<p startSound="initial0" id="playSound"></p>');
        setAudio();
        sessionStorage.setItem("event_num", "1");
        sessionStorage.setItem("event_name", "initial");
    }
    else {
        initalPhotoSetup();
    }
    setAudio();

    //スイッチ切り替え
    $('#switch').on('change', function () {
        //音声出力
        if ($('#switch').val() == 'yes') {
            var scene = 'study0';
            var sound = 'on';
        } else {
            var scene = 'play0';
            var sound = 'off';
        }
        $('#playSound').remove();
        setAudio();
        $('#photo').after('<p startSound="' + sound + '" id="playSound"></p>');

        //写真変更
        $('#photo').fadeOut("fast", function () {
            $(this).attr('src', './static/img/' + scene + '.jpg');
            $(this).fadeIn();
        });
        $('#photo').attr('clickSound', scene);
        setAudio();
    });

    //デートボタン
    $('#date').on('click', function () {
        $('#meter').hide();
        $('#playSound').remove();
        setAudio();
        sessionStorage.setItem("scene", $("#photo").attr('clickSound'));
        $('#photo').fadeOut("slow", function () {
            $(this).attr('src', './static/img/date0.jpg');
            $(this).fadeIn();
        });
        $('#photo').attr('mode', 'event');
        $('#photo').attr('clickSound', 'dummy');
        $('#photo').after('<p startSound="date0" id="playSound"></p>');
        setAudio();
        sessionStorage.setItem("event_num","1");
        sessionStorage.setItem("event_name","date");
    });


    //写真タップ
    $('#photo').on('click', function () {
        var mode = $(this).attr('mode');
        //ルート画面
        if (mode == 'route') {
            $('#playSound').remove();
            setAudio();
            var currentPhoto = $(this).attr('src')
            var currentIndex = $(this).attr('src').indexOf('.jpg') - 1;
            var currentNum = currentPhoto.substring(currentIndex, currentIndex + 1);
            var nextNum = (parseInt(currentNum) + 1) % 2;
            var nextPhoto = currentPhoto.replace(currentNum, nextNum);
            var scene = currentPhoto.replace('./static/img/', '').replace(currentNum, '').replace('.jpg', '');
            $(this).fadeOut("fast", function () {
                $(this).attr("src", nextPhoto);
                $(this).fadeIn();
            });
            $('#photo').attr('clickSound', scene + nextNum);
            setAudio();

        //履歴画面
        } else if (mode == 'history') {
            backToRoute();

        //イベント画面
        } else if (mode == 'event') {
            var event_num = sessionStorage.getItem("event_num");
            var event_name = sessionStorage.getItem("event_name");
            $('#playSound').remove();
            setAudio();
            if (event_num !== '3') {
                $('#photo').fadeOut("slow", function () {
                    $(this).attr('src', './static/img/' + event_name + event_num + '.jpg');
                    $(this).fadeIn();
                });
                $('#photo').after('<p startSound="' + event_name + event_num + '" id="playSound"></p>');
                setAudio();
                sessionStorage.setItem("event_num", parseInt(event_num) + 1);
            } else {
                var scene = sessionStorage.getItem("scene");
                if (scene) {
                    backToRoute();
                } else {
                    initalPhotoSetup();
                }
            }
        }
    });

    //履歴ボタン
    $('#history').on('click', function () {
        $('#meter').hide();
        $('#playSound').remove();
        setAudio();
        sessionStorage.setItem("scene", $("#photo").attr('clickSound'));
        $('#photo').fadeOut("slow", function () {
            $(this).attr('src', './static/img/history.jpg');
            $(this).fadeIn();
        });
        $('#photo').attr('mode', 'history');
        $('#photo').attr('clickSound', 'dummy');
        setAudio();
    });

})

function initalPhotoSetup() {
    $('#meter').show();
    if ($('#switch').val() == 'yes') {
        var photo = './static/img/study0.jpg';
        $('#photo').attr('clickSound', 'study0');
    } else {
        var photo = './static/img/play0.jpg';
        $('#photo').attr('clickSound', 'play0');
    }
    $('#photo').fadeOut("slow", function () {
        $(this).attr('src', photo);
        $(this).fadeIn();
    });
    $('#photo').attr('mode', 'route');
    setAudio();
}

function backToRoute() {
    $('#meter').show();
    var scene = sessionStorage.getItem("scene");
    $('#photo').fadeOut("slow", function () {
        $(this).attr('src', './static/img/' + scene + '.jpg');
        $(this).fadeIn();
    });
    $('#photo').attr('mode', 'route');
    $('#photo').attr('clickSound', scene);
    setAudio();
}


