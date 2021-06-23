/*
Copyright 2020. Cat Coding Committee
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

const wrongWords = require('wrong_words.js');
const roomLeaders = require('room_leaders.js');

const limitedLen = 60; // 광고 키워드 탐지 기준
const roomList = ["운영위방", "C방", "자바방", "파이썬방", "웹방", "견적방", "작곡방"];

const keylist = [];
let key_cnt = 0;
    
let player = null;
    
function response(room, msg, sender, isGroupChat, replier, ImageDB) {
    if(roomList.indexOf(room) == -1) return;

    var len = msg.length;
    
    //욕, 광고 감지 코드
    const advertisement = wrongWords.advertisement
    const cuss = wrongWords.cuss;

    if (room == "작곡방") {
        if (len > limitedLen) {
            for (var i = 0; i < advertisement.length; i++) {
                if (msg.indexOf(advertisement[i]) != -1) {
                    replier.reply("문제의 키워드를 발견했습니다\n닉네임 : " + sender);
                    replier.reply(roomBangjang(room));
                    break;
                }
            }
        }
    
        for(var i = 0; i < cuss.length; i++) {
            if(msg.indexOf(cuss[i]) != -1) {
                replier.reply("문제의 키워드를 발견했습니다(" + cuss[i] + ")\n" + "\n닉네임 : " + sender);
                replier.reply(roomBangjang(room));
                break;
            }
        }
    }
    else {
        const Detecting = 1;

        for (var i = 0; i < keylist.length; i++) {
            if (msg.indexOf(keylist[i]) != -1 && room != "3학년5반" && room != "운영위방") {
                replier.reply(
                    "로그방",
                    "홍보키 사용 : " + "\n" +
                    "감지 위치 : " + room + "\n" +
                    "닉네임 : " + sender + "\n" +
                    "사용된 키 : " + keylist[i]
                    );
                keylist.splice(i, 1);
                Detecting = 0;
            }
        }

        if (len > limitedLen) {
            for (var i = 0; i < advertisement.length; i++) {
                if (msg.indexOf(advertisement[i]) != -1 && room != "3학년5반" && Detecting != 0) {
                    replier.reply(
                        "로그방",
                        "광고 감지" + "\n" +
                        "감지 위치 : " + room + "\n" +
                        "닉네임 : " + sender + "\n" +
                        "키워드 : " + advertisement[i] + "\n" +
                        roomBangjang(room));
                    replier.reply(
                        "로그방",
                        "문제의 메세지" + "\n" + msg);
                }
            }
        }

        
        for(var i = 0; i < cuss.length; i++) {
            if(msg.indexOf(cuss[i]) != -1 && room != "3학년5반") {
                replier.reply("문제의 키워드를 발견했습니다.");
                replier.reply(
                "로그방", 
                "욕설 감지" + "\n" + 
                "감지 위치 : " + room + "\n" + 
                "닉네임 : " + sender + "\n" +
                "키워드 : " + cuss[i] + "\n" + 
                roomBangjang(room));
                replier.reply(
                "로그방", 
                "문제의 메세지" + "\n" + msg);
            }
        }
    }
    var day = new Date();

    if (room != "3학년5반") {
        // 도움말
        if (msg == "/help") {
            replier.reply(
                "/help" + "\n" + "명령어에 대한 도움말 정보를 제공합니다." + "\n" +
                "/채팅방 목록" + "\n" + "고코위의 모든 채팅방 링크를 표시합니다." + "\n" +
                "/서버 상태" + "\n" + "코코의 정보 및 상태를 표시합니다." + "\n" +
                "/서버 개발자" + "\n" + "코코봇의 개발자를 알려줍니다." + "\n" +
                "/깃허브" + "\n" + "관리자들의 깃허브 주소를 알려줍니다.");
            if (room == "운영위방") {
                replier.reply(
                    "관리자 전용 기능" + "\n\n" +
                    "코코야" + "\n" + "기분에 따라 대답하는 온도차가 큽니다." + "\n" +
                    "/가위바위보" + "\n" + "가위바위보를 합니다." + "\n" +
                    "/날짜" + "\n" + "오늘의 날짜를 알려줍니다." + "\n" +
                    "/시간" + "\n" + "현재 시각을 알려줍니다." + "\n" +
                    "/짖어" + "\n" + "짖습니다." + "\n" +
                    "/호출" + "\n" + "관리자들의 호출 명령어를 알려줍니다.");
            }
        }

        // 기본 명령어 모음
        if (msg == "/채팅방 목록") {
            replier.reply(
                "클릭시 방 목록 보기                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    " + "\n\n" +
                "저희는 여러 개의 방과 같이 활동하는 개발자 연합입니다. 다른 종류의 언어를 질문하고 싶으시면 밑의 링크를 타시길 바랍니다." + "\n\n" +
                "네이버카페(공통) - https://cafe.naver.com/codecat" + "\n\n" +
                "디스코드(공통) - https://discord.gg/cZ5r5PRTX5" + "\n\n" +
                "C언어, C#, C++, 게임 엔진 - https://open.kakao.com/o/ghFjlzr" + "\n\n" +
                "자바, 안드로이드 - https://open.kakao.com/o/goAvtbOb" + "\n\n" +
                "파이썬(ML), R - https://open.kakao.com/o/gWvnqvF" + "\n\n" +
                "웹 - https://open.kakao.com/o/gm2yL8kb" + "\n\n" +
                "조립, 견적, pc문제 - https://open.kakao.com/o/gEI0jymb");
        }

        if (msg == "/서버 상태") {
            replier.reply(
                "봇 버전 : " + Bot.getVersion() + "\n" +
                "자바스크립트 버전 : " + Bot.getJsVersion() + "\n" +
                "모델명: " + Device.getModelName() + "\n" +
                "안드로이드 버전: " + Device.getAndroidVersion() + "\n" +
                "안드로이드 API: " + Device.getApiLevel() + "\n" +
                "배터리 잔량: " + Device.getBatteryLevel() + "% \n" +
                "배터리 온도: " + Device.getBatteryTemp() + "°C" + "\n" +
                "상태: ON" + "\n" +
                "이름: 코코"
            );
        }

        if (msg == "/서버 개발자") {
            replier.reply("개발자: 암고, 양사, 코양, 고수\n관리자: 코양\n운영: 고양이들의 코딩 위원회(C-3)\nCopyright 2020-2021. Cat Coding Committee. All rights reserved.");
        }

        if (msg == "/깃허브") {
            replier.reply(
                "코양이 위원장 - https://github.com/easycastle" + "\n" +
                "양 사 - https://github.com/sat0317" + "\n" +
                "러 리 - https://github.com/Coalery" + "\n" +
                "고 수 - https://github.com/cpprhtn" + "\n" +
                "깃 고 - https://github.com/NewPremium" + "\n" +
                "암 고 - https://github.com/azure-06" + "\n" +
                "루 - https://github.com/Lu175" + "\n" +
                "뽀 로 로 - https://github.com/paxbun" + "\n" +
                "녹 색 치 킨 - https://github.com/IceJack");
            replier.reply("다들 한번씩 놀러오세요~");
        }
    }

    // 관리자 명령어 모음
    if (room == "운영위방") {
        if (msg == "코코야") {
            var answer = Math.floor(Math.random() * 4);
            if (answer == 0) {
                replier.reply("네?");
            }
            else if (answer == 1) {
                replier.reply("뭐");
            }
            else if (answer == 2) {
                replier.reply("아 왜 불러ㅡㅡ");
            }
            else if (answer == 3) {
                replier.reply("멍멍!");
            }
        }

        if (msg == "/가위바위보") {
            replier.reply("가위바위보 게임을 시작합니다.\n가위, 바위, 보 중 하나를 내주세요.");
            player = sender;
        }
        if ((player == sender) && (msg == "가위" || msg == "바위" || msg == "보")) {
            var result = Math.floor(Math.random() * 3);
            if (result == 0) {
                if (msg == "가위") {
                    replier.reply("저는 바위를 냈습니다.\n개한테 지냐ㅋ");
                }
                else if (msg == "바위") {
                    replier.reply("저는 보를 냈습니다.\n개한테 지냐ㅋ");
                }
                else if (msg == "보") {
                    replier.reply("저는 가위를 냈습니다.\n개한테 지냐ㅋ");
                }
            }
            else if (result == 1) {
                replier.reply("저는 " + msg + "를 냈습니다.\n비겼습니다.");
            }
            else if (result == 2) {
                if (msg == "가위") {
                    replier.reply("저는 보를 냈습니다.\n당신이 이겼습니다.");
                }
                else if (msg == "바위") {
                    replier.reply("저는 가위를 냈습니다.\n당신이 이겼습니다.");
                }
                else if (msg == "보") {
                    replier.reply("저는 바위를 냈습니다.\n당신이 이겼습니다.");
                }
            }
            player = null;
        }

        if (msg == "/날짜") {
            replier.reply("오늘은 " + (day.getMonth() + 1) + "월 " + day.getDate() + "일 입니다.");
        }

        if (msg == "/시간") {
            replier.reply("지금은 " + day.getHours() + "시 " + day.getMinutes() + "분 " + day.getSeconds() + "초입니다.");
        }

        if (msg == "/짖어") {
            replier.reply("왈왈!");
        }

        if (msg == "/호출") {
            replier.reply(
                "C방" + "\n" +
                "→ C, c, 씨" + "\n" +
                "자바방 " + "\n" +
                "→ JAVA, java, 자바" + "\n" +
                "파이썬방" + "\n" +
                "→ python, py, 파이썬" + "\n" +
                "웹방" + "\n" +
                "→ 웹" + "\n" +
                "견적방" + "\n" +
                "→ 견적");
        }

        if (msg == "/고코위") {
            replier.reply("코양 양사 러리 깃고 Cpp 룰루 암고 Lu175 뽀로로 녹치");
            replier.reply("어셈블!!!!!!!");
        }

        if (((msg == "/C") || (msg == "/c") || (msg == "/씨") || (msg == "/cpp") || (msg == "/C") || (msg == "/C"))) {
            replier.reply("Cpp 러리 룰루 뽀로로 양사 코양");
            replier.reply("C 어셈블!!!!!!!");
        }

        if (((msg == "/JAVA") || (msg == "/java") || (msg == "/자바"))) {
            replier.reply("러리 Cpp 양사 코양");
            replier.reply("자바 어셈블!!!!!!!");
        }

        if (((msg == "/python") || (msg == "/py") || (msg == "/파이썬"))) {
            replier.reply("코양 Cpp 깃고 러리 룰루 양사");
            replier.reply("파이썬 어셈블!!!!!!!");
        }

        if (msg == "/웹") {
            replier.reply("코양 Cpp 러리 뽀로로 양사 녹치");
            replier.reply("웹 어셈블!!!!!!!");
        }

        if (msg == "/견적") {
            replier.reply("양사 Cpp 깃고 러리 코양");
            replier.reply("견적 어셈블!!!!!!!");
        }
        
        if (msg == "/키생성") {
            replier.reply("생성할 키 갯수 (1~3사이 숫자 입력)");
            player = sender;
        }
        if ((player == sender) && (msg == "1" || msg == "2" || msg == "3")) {
            key_cnt = Number(msg);
            var max = 16777216;
            var min = 1048576;
            var key = Math.floor(Math.random() * (max - min)) + min;
            key = key.toString(16);
            replier.reply(
                "아래 주어지는 키 번호는 홍보가 허용된 글에만 사용이 가능합니다" + "\n" +
                "아래 주어진 키를 홍보 글의 최상단에 붙여 넣어주세요." + "\n" +
                key_cnt + "회 홍보시 해당 키는 효력이 사라지며, 재홍보를 원할 시 다시 키를 재발급 받아야 합니다." + "\n\n" +
                "발급 키 : " + key);
            for (var i = 0; i < key_cnt; i++)
                keylist.push(key);

            player = null;
        }

        if (msg == "/키목록") {
            if (keylist.length == 0) {
                replier.reply("생성된 키가 없습니다.");
            }
            replier.reply(keylist);
        }
    }
}