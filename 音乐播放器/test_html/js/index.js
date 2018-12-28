(function (w) {
    function Controls(config) {
        this.timer = null;
        if (config) {
            this.init(config)
        }
    }

    Controls.prototype = {
        constructor: Controls,
        init(config) {
            this.music = document.querySelector(".music");
            this.songContainer = document.querySelector(".songContainer");
            this.cover = document.querySelector(".cover");
            this.musicName = document.querySelector(".name");
            this.musicAuthor = document.querySelector(".singer");
            this.musicTime = document.querySelector(".Ttime");
            this.musicBtn = document.querySelector(".ply-btn")
            this.songs = config.songs;
            this.hideControl();
            this.initList();
            this.addEvent();

        },

        // 隐藏音乐默认控件 
        hideControl() {
            this.music.controls = false;
        },

        // 初始化音乐列表
        initList() {
            let songLen = this.songs.length;
            for (let i = 0; i < songLen; i++) {
                let song = this.songs[i]
                let firstSong = i + 1;
                this.li = document.createElement("li");
                this.li.className = "song";
                this.li_span_number = document.createElement("span");
                this.li_span_number.className = "no";
                this.li_span_number.innerHTML = i + 1;
                this.li_span_name = document.createElement("span");
                this.li_span_name.className = "songer";
                this.li_span_name.innerHTML = song.name;
                this.li_span_author = document.createElement("span");
                this.li_span_author.className = "songSinger";
                this.li_span_author.innerHTML = song.author;
                this.songContainer.append(this.li);
                this.li.append(this.li_span_number);
                this.li.append(this.li_span_name);
                this.li.append(this.li_span_author);
                if (firstSong == 1) {
                    this.li.className = "song active";
                    this.cover.src = this.songs[i].cover;
                    this.musicName.innerHTML = this.songs[i].name;
                    this.musicAuthor.innerHTML = this.songs[i].author;
                    this.music.src = this.songs[i].src;
                }
            }
        },
        //事件的绑定
        addEvent() {
            var that = this;
            //获取的播放的时长
            this.music.oncanplay = function () {
                that.calTtime();
            }
            this.musicBtn.addEventListener("click", function () {
                that.startMusic();
            })
        },
        calTtime() {
            let time = this.music.duration;
            let min = parseInt(time / 60);
            let sec = parseInt(time - min * 60)
            this.musicTime.innerHTML = min + ":" + sec;
        },
        startMusic() {
            if (this.music.paused || this.music.ended) {
                this.play();
            } else {
                this.paused();
            }
        },
        play() {
            this.music.play();
            this.animets(this.musicBtn, {
                left: "20px"
            });
            this.cover.className = "blur"
        },
        paused() {
            this.music.pause();
            this.animets(
                this.musicAuthor, {
                    left: "-30px"
                }
            );
            this.cover.className = "";
        },
        animets(ele, json, fn){
            clearInterval(ele.timer);
            ele.time = function(){

            }
        }
    }
    w.Controls = Controls;
})(window);