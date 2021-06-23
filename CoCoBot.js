/*
Copyright 2020. Cat Coding Committee
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

const wrongWords = require('wrong_words.js');
const roomLeaders = require('room_leaders.js');
const commands = require('commands.js');

const ROOM = commands.ROOM;
const KEY = commands.KEY;
const advertisement = wrongWords.advertisement
const cuss = wrongWords.cuss;

const limitedLen = 60; // 광고 키워드 탐지 기준

function response(room, msg, sender, isGroupChat, replier, ImageDB) {
    if(commands.isValidRoom(room)) return;

    //욕, 광고 감지 코드
    if (room === ROOM.COMPOSITION) {
        if (msg.length > limitedLen) {
            for (var i = 0; i < advertisement.length; i++) {
                if (msg.indexOf(advertisement[i]) != -1) {
                    replier.reply("문제의 키워드를 발견했습니다\n닉네임 : " + sender);
                    replier.reply(roomLeaders.getLeadersByRoom(room));
                    break;
                }
            }
        }
    
        for(var i = 0; i < cuss.length; i++) {
            if(msg.indexOf(cuss[i]) != -1) {
                replier.reply("문제의 키워드를 발견했습니다(" + cuss[i] + ")\n" + "\n닉네임 : " + sender);
                replier.reply(roomLeaders.getLeadersByRoom(room));
                break;
            }
        }
    }
    else {
        for (var i = 0; i < KEY.keyCnt; i++) {
            if (msg.indexOf(KEY.getKey[i]) != -1 && room != "운영위방") {
                replier.reply(
                    "로그방",
                    "홍보키 사용 : " + "\n" +
                    "감지 위치 : " + room + "\n" +
                    "닉네임 : " + sender + "\n" +
                    "사용된 키 : " + KEY.getKey[i]
                );
                KEY.useKey(i);
                return;
            }
        }

        if (msg.length > limitedLen) {
            for (var i = 0; i < advertisement.length; i++) {
                if (msg.indexOf(advertisement[i]) != -1) {
                    replier.reply(
                        "로그방",
                        "광고 감지" + "\n" +
                        "감지 위치 : " + room + "\n" +
                        "닉네임 : " + sender + "\n" +
                        "키워드 : " + advertisement[i] + "\n" +
                        roomLeaders.getLeadersByRoom(room)
                    );
                    replier.reply("로그방", "문제의 메세지" + "\n" + msg);
                }
            }
        }
        
        for(var i = 0; i < cuss.length; i++) {
            if(msg.indexOf(cuss[i]) != -1) {
                replier.reply("문제의 키워드를 발견했습니다.");
                replier.reply(
                    "로그방", 
                    "욕설 감지" + "\n" + 
                    "감지 위치 : " + room + "\n" + 
                    "닉네임 : " + sender + "\n" +
                    "키워드 : " + cuss[i] + "\n" + 
                    roomLeaders.getLeadersByRoom(room)
                );
                replier.reply("로그방", "문제의 메세지" + "\n" + msg);
            }
        }
    }

    let msg = commands.execCommand(room, sender, msg);
    if(msg !== null) {
        replier.reply(msg);
    }
}