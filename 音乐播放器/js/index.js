(function (w) {
    function Controls(config) {
        //记录静音前一次音量长度
        this.lastVol = null;
        //歌曲列表隐藏/显示标记
        this.listShowFlag = 0;
        //当前播放歌曲序号
        this.songIndex = 0;
        //播放模式定时器
        this.timer = null;
        //播放模式标记
        this.modeFlag = 0;
        if (config) {
            this.init(config);
        }
    }
    Controls.prototype = {
        constructor: Controls,
        init(config) {
            this.music = document.querySelector('.music');
            this.plyBtn = document.querySelector('.ply-btn');
            this.pIcon = this.plyBtn.getElementsByTagName('i')[0];
            this.Ttime = document.querySelector('.Ttime');
            this.Ctime = document.querySelector('.Ctime');
            this.noVol = document.querySelector('.noVol');
            this.vIcon = this.noVol.getElementsByTagName('i')[0];
            this.vol = document.querySelector('.vol');
            this.nowVol = document.querySelector('.nowVol');
            this.progressBar = document.querySelector('.progressBar');
            this.progress = document.querySelector('.progress');
            this.cover = document.querySelector('.cover');
            this.songName = document.querySelector('.name');
            this.author = document.querySelector('.singer');
            this.songContainer = document.querySelector('.songContainer');
            this.menu = document.querySelector('.menu');
            this.preSongBtn = document.querySelector('.preSongBtn');
            this.nextSongBtn = document.querySelector('.nextSongBtn');
            this.playMode = document.querySelector('.playMode');
            this.modeIcon = this.playMode.getElementsByTagName('i')[0];
            this.songs = config.songs;
            //隐藏原生控件
            this.hideControls();
            //初始化音乐列表
            this.initialList();
            //设置默认循环
            this.listCircle();
            //绑定事件
            this.addEvent();
            //默认音量0.5
            this.music.volume = 0.5;
            this.songContainerHeight = parseInt(this.getStyle(this.songContainer, 'height'));
        },
        hideControls() {
            this.music.controls = false;
        },
        /* 
            实例化音乐列表
        */
        initialList() {
            //for循环初始化所有获取到的数据并且展示出来    this.songs.length就是或取得数据
            for (let i = 0; i < this.songs.length; i++) {
                let song = this.songs[i];
                console.log(song)
                let li = document.createElement('li');
                li.className = "song";
                let index = document.createElement('span');
                index.className = "no";
                index.innerHTML = i + 1 + '.';
                let songer = document.createElement('span');
                songer.className = "songer";
                songer.innerHTML = song.name;
                let auhtora = document.createElement('span');
                auhtora.className = "songSinger";
                auhtora.innerHTML = song.author;
                li.appendChild(index);
                li.appendChild(songer);
                li.appendChild(auhtora);
                this.songContainer.appendChild(li);
                let a = i + 1;
                //这个if判断语句就是初始化第一条数据为第一条播放的音乐
                if (a == 1) {
                    this.songName.innerHTML = song.name;
                    this.author.innerHTML = song.author;
                    this.music.setAttribute('src', song.src);
                    this.cover.setAttribute('src', song.cover);
                }
            }
            this.songItems = document.getElementsByClassName('song');
            this.songItems[0].className += " active";
        },
        //事件的绑定
        addEvent() {
            var that = this;
            //控制暂停还是播放
            this.plyBtn.addEventListener('click', function () {
                that.PlayorPause();
            })
            //控制音乐播放的进度条
            this.progressBar.onclick = function (e) {
                that.setCtime(e);
            }
            //获取的播放的时长
            this.music.oncanplay = function () {
                that.calTtime();
            }
            //当你再点击进度条的时候音乐会随着进度条的长度进行播放音乐
            this.music.ontimeupdate = function () {
                that.changerTime();
            }
            //控制播放的模式分为随机播放, 单曲循环， 循环播放， 默认的列表播放
            this.playMode.onclick = function () {
                that.changeMode();
            }
            //这个是当你点击preSongBth的时候播放上一条音乐
            this.preSongBtn.onclick = function () {
                that.preSong();
            }
            //这个是当你点击nextSongBth的时候播放下一条音乐
            this.nextSongBtn.onclick = function () {
                that.nextSong();
            }
            //这个的作用就是用来控制音乐的大小
            this.noVol.onclick = function () {
                that.toggleleMute();
            }
            //这个的作用就是用来获取音乐大小的进度条来设置音乐的大小
            this.vol.onclick = function (e) {
                that.setVol(e);
            }
            //用来隐藏显示音乐列表
            this.menu.onclick = function () {
                that.toggleList();
            }
            //循环音乐列表，当音乐列表中的一首歌别点击的时候触发changeSong这个函数
            for (let i = 0; i < this.songItems.length; i++) {
                let songItem = this.songItems[i];
                songItem.onclick = function () {
                    that.changeSong(i);
                }
            }
        },
        //控制音乐的暂停和播放
        PlayorPause() {
            //判断音乐暂停或者是音乐结束
            if (this.music.paused || this.music.ended) {
                //结果是正确的话触发下面的函数
                this.toPlay();
            } else {
                //结果是错误的话就触发一下的函数
                this.toPause();
            } 
        },
        //音乐的开始播放
        toPlay() {
            this.music.play();
            this.pIcon.className = "icon-pause";
            this.animate(this.plyBtn, {
                left: 20
            });
            this.cover.className = "blur";
        },
        //音乐的暂停播放
        toPause() {
            this.music.pause();
            this.pIcon.className = "icon-play";
            this.animate(this.plyBtn, {
                left: -30
            });
            this.cover.className = "";
        },
        calTtime() {
            //定义变量duration 获取音乐的时长
            let duration = this.music.duration;
            
            let min = parseInt(duration / 60);
            let sec = parseInt(duration - min * 60);
            // if (sec < 10) {
            //     sec = '0' + sec;
            // }
            this.Ttime.innerHTML = min + ": " + sec;
            console.log("as");
        },
        changerTime() {
            let currentTime = this.music.currentTime;
            let scaling = currentTime / this.music.duration;
            let min = parseInt(currentTime / 60);
            let sec = parseInt(currentTime - min * 60);
            if (sec < 10) {
                sec = '0' + sec;
            }
            this.Ctime.innerHTML = min + ': ' + sec;
            this.progress.style.width = this.progressBar.offsetWidth * scaling + "px";
        },
        setCtime(e) {
            let length = e.offsetX;
            let scaling = length / (this.progressBar.offsetWidth);
            this.animate(this.progress, {
                width: length
            });
            this.music.currentTime = this.music.duration * scaling;
            console.log("aa???")
        },
        toggleleMute() {
            var that = this;
            this.music.muted = !this.music.muted;
            if (this.nowVol.style.width != "0px") {
                this.lastVol = this.nowVol.offsetWidth;
                this.animate(this.nowVol, {
                    width: 0
                });
                this.vIcon.className = "icon-volume-mute2";
            } else {
                this.animate(this.nowVol, {
                    width: this.lastVol
                });
                this.setvIcon();
            }
        },
        setVol(e) {
            let length = e.offsetX;
            let scaling = length / (this.vol.offsetWidth);
            this.animate(this.nowVol, {
                width: length
            });
            this.music.volume = scaling;
            this.setvIcon();
        },
        setvIcon() {
            if (this.music.volume > 0 && this.music.volume <= 0.1) {
                this.vIcon.className = "icon-volume-mute";
            } else if (this.music.volume > 0.1 && this.music.volume <= 0.4) {
                this.vIcon.className = "icon-volume-low";
            } else if (this.music.volume > 0.4 && this.music.volume <= 0.7) {
                this.vIcon.className = "icon-volume-medium"
            } else if (this.music.volume > 0.7 && this.music.volume <= 1) {
                this.vIcon.className = "icon-volume-high";
            } else {
                this.vIcon.className = "icon-volume-medium";
            }
        },
        changeSong(index) {
            this.songIndex = index;
            this.music.pause();
            this.music.src = this.songs[index].src;
            this.cover.setAttribute('src', this.songs[index].cover);
            this.songName.innerHTML = this.songs[index].name;
            this.author.innerHTML = this.songs[index].author;
            this.toPlay();
            this.addAcitveClass(this.songItems[index]);
        },
        addAcitveClass(li) {
            for (let i = 0; i < this.songItems.length; i++) {
                let songItem = this.songItems[i];
                songItem.className = "song";
            }
            li.className += " active";
        },
        preSong() {
            if (this.modeFlag != 2) {
                if (this.songIndex === 0) {
                    this.songIndex = this.songs.length;
                }
                this.songIndex = this.songIndex - 1;
            } else {
                let rd = Math.random() * this.songs.length;
                this.songIndex = Math.floor(rd);
            }
            this.changeSong(this.songIndex);
        },
        nextSong() {
            if (this.modeFlag != 2) {
                this.songIndex = this.songIndex + 1;
                if (this.songIndex === this.songs.length) {
                    this.songIndex = 0;
                }
            } else {
                let rd = Math.random() * this.songs.length;
                this.songIndex = Math.floor(rd);
            }
            this.changeSong(this.songIndex);
        },
        changeMode() {
            if (this.modeFlag === 0) {
                this.modeFlag = 1;
                this.oneCircle();
            } else if (this.modeFlag === 1) {
                this.modeFlag = 2;
                this.listRandom();
            } else if (this.modeFlag === 2) {
                this.modeFlag = 3;
                this.orderPlay();
            } else if (this.modeFlag === 3) {
                this.modeFlag = 0;
                this.listCircle();
            }
        },
        listCircle() {
            clearInterval(this.timer);
            this.modeIcon.className = "icon-loop";
            var that = this;
            this.timer = setInterval(function () {
                if (that.music.ended) {
                    that.songIndex = that.songIndex + 1;
                    if (that.songIndex == that.songs.length) {
                        that.songIndex = 0;
                    }
                    that.changeSong(that.songIndex);
                }
            }, 1500);
        },
        oneCircle() {
            clearInterval(this.timer);
            this.modeIcon.className = "icon-loop2";
            var that = this;
            this.timer = setInterval(function () {
                if (that.music.ended) {
                    that.changeSong(that.songIndex)
                }
            }, 1000);
        },
        listRandom() {
            clearInterval(this.timer);
            this.modeIcon.className = "icon-shuffle";
            var that = this;
            this.timer = setInterval(function () {
                if (that.music.ended) {
                    let rd = Math.random() * that.songs.length;
                    that.songIndex = Math.floor(rd);
                    that.changeSong(that.songIndex);
                }
            }, 1000)
        },
        orderPlay() {
            clearInterval(this.timer);
            this.modeIcon.className = "icon-repeat_one"
            var that = this;
            this.timer = setInterval(function () {
                if (that.music.ended) {
                    that.songIndex = that.songIndex + 1;
                    if (that.songIndex === that.songIndex.length) {
                        clearInterval(that.timer);
                        return;
                    }
                    that.changeSong(that.songIndex)
                }
            }, 1000)
        },
        toggleList() {
            if (this.listShowFlag == 0) {
                this.animate(this.songContainer, { height: 0, opacity: 0 });
                this.listShowFlag = 1;
            } else {
                this.animate(this.songContainer, { height: this.songContainerHeight, opacity: 100 });
                this.listShowFlag = 0;
            }
        },
        animate(ele, json, fn) {
            //首先清除定时器
            clearInterval(ele.timer);
            var that = this;
            ele.timer = setInterval(function () {
                //开闭原则
                var bool = true;
                //遍历属性和值，分别单独处理json
                //k:属性名 json[k]:属性值
                for (var k in json) {
                    var leader;
                    //获取当前属性值,如果没有则设为0
                    //如果是透明度属性取值方式不同
                    if (k === "opacity") {
                        if (!that.getStyle(ele, k)) {
                            leader = 100;
                        } else {
                            leader = that.getStyle(ele, k) * 100;
                        }
                        //leader = parseInt(that.getStyle(ele,k))*100||1;//最后还要用1乘100也就是100
                    } else {
                        leader = parseInt(that.getStyle(ele, k)) || 0;
                    }
                    //获取步长,，步长会随着leader的增大而减小，使得动画更平缓
                    var step = (json[k] - leader) / 10;
                    //二次处理步长，判断正负
                    step = step > 0 ? Math.ceil(step) : Math.floor(step);
                    leader = leader + step;
                    //赋值给属性
                    //特殊情况特殊赋值
                    if (k === "opacity") {
                        //最后除以100变成[0,1]之间的数
                        ele.style["opacity"] = leader / 100;
                        //兼容IE678
                        ele.style.filter = "alpha(opacity=" + leader + ")";
                    } else if (k === "zIndex") {
                        //如果是层级 就一次性赋值，没有理由，需求！
                        ele.style.zIndex = json[k];
                    } else {
                        ele.style[k] = leader + "px";
                    }
                    //直到这里运动完毕后定时器却并没有清除，需手动清除
                    //而不是等下一次移动再清除，太被动，且占内存
                    //清除定时器
                    //判断每一个属性的目标值和当前值的差是否大于步长
                    //如果大于步长说明还没到目标值(考虑小数)
                    /*if(Math.abs(json[k]-leader)>Math.abs(step)){
                     bool=false;
                     }*/
                    //不考虑小数
                    if (json[k] !== leader) {
                        bool = false;
                    }
                }
                if (bool) {
                    clearInterval(ele.timer);
                    if (fn) {
                        fn();
                    }
                }
            }, 20);
        },
        getStyle(ele, attr) {
            if (window.getComputedStyle) {
                return window.getComputedStyle(ele, null)[attr];
            }
            return ele.currentStyle[attr];
        }
    }
    w.Controls = Controls;
})(window)