/*
Copyright 2020. Cat Coding  Committee
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

const keylist = [];

function roomBangjang(room) {
    if(room == "운영위방") {
        return "테스트중입니다";
    }
    if(room == "C방") {
        return "Cpp, 러리, 룰루, 뽀로로, 양사, 코양" + "\n신고 #신고 /신고";
    }
    if(room === "자바방") {
        return "러리, Cpp, 양사, 코양" + "\n신고 #신고 /신고";
        }
    if(room == "파이썬방") {
        return "코양, Cpp, 깃고, 러리, 룰루, 양사" + "\n신고 #신고 /신고";
    }
    if(room == "웹방") {
        return "코양, Cpp, 러리, 뽀로로, 양사, 녹치" + "\n신고 #신고 /신고";
    }
    if(room == "견적방") {
        return "양사, Cpp, 깃고, 러리, 코양" + "\n신고 #신고 /신고";
    }
    if(room == "작곡방") {
        return "양사, Mute Jack, KI-D, 블루링, 조담" + "\n신고 #신고 /신고";
    }
}
    
    var player = null;
    
function response(room, msg, sender, isGroupChat, replier, ImageDB) {
    var roomList = ["운영위방", "C방", "자바방", "파이썬방", "웹방", "견적방", "작곡방"];

    //욕, 광고 감지 코드
    var advertisement = ["www1.president.go.kr", "http://bit.ly/2S28qnj", "소다방", "합법", "제태크", "재테크", "선착순", "성인방송", "성인 방송", "섹시", "수익", "야동", "t.me","band.", "광고", "가리기", "갱뱅", "NO모", "배팅", "결혼 등급", "투자금", "급전", "무료수신거부", "홍보대행", "고객만족", "시노스", "베팅", "파워볼", "미니게임", "카지노", "주식", "원금보장", "원금 보장", "홍보", "twitch", "사례"];
    
    var cuss = [
    "10새리", "10세리", "10쉐이", "10쉑", "10스", "10쌔", "10쌔기", "10쎄", "10창", "10탱", 
    "18것", "18넘", "18놈", "18뇬", "18럼", "18롬", "18새", "18색", "18세끼", "18세리", "18섹", "18쉑", "18스", 
    "18아", 
    "https://open.kakao.com/o/ghdaOkDc", 
    "갈보년", "같은년", "같은뇬", "개같", "개구라", "개년", "개놈", "개뇬", "개대중", "개독", "개돼중", "개랄", 
    "개보지", "개뻥", "개새", "개색", "개섀끼", "개세", "개소", "개쇳기", "개수작", "개쉐", "개쉑", "개쉽", "개스끼", 
    "개시키", "개십새", "개쐑", "개쑈", "개씹", "개아들", 
    "개자슥", "개자지", "개접", "개좆", "개좌식", "개허접", "걔새", "걔수작", "걔시끼", "걔시키", "걔썌", "거지같", 
    "게색기", "게색끼", "광뇬", "구녕", "ㄲㅣ", 
    "노무노무", "노무딱", "노무짱", "노짱", "놈현", "뉘뮈", "뉘미럴", "느금", "니귀미", "니기미", "니미", "니미랄", 
    "니미럴", "니미씹", "니미요", "니아배", "니아베", "니아비", "니애미", "니어매", "니어메", "니어미", "니에미", 
    "니엠", "닝기리", "닝기미", 
    "닥쳐", "닭쳐", "뎡신", "돈놈", "돌아이", "돌은놈", "되질래", "뒈져", "뒈진", "뒈질", 
    "뒤질래", "등신", "디져라", "디진다", "디질래", "따식", "때놈", "또라이", "똘아이", "뙈놈", "뙤놈", 
    "뙨넘", "뙨놈", "뚜쟁", "뛰발", "띄발", "띠바", "띠발", "띠발", "띠밤", "띠불", "띠ㅋ발", "띠팔", 
    "메친넘", "메친놈", "미췬", "미친넘", "미친년", "미친놈", "미친스까이", "미틴", 
    "바랄년", "뱅마", "뱅신", "벼엉신", "병쉰", "병신", "병자", "부랄", "부럴", "불알", "불할", "붙어먹", "뷰웅", 
    "븅", "븅신", "빌어먹", "빙시", "빙신", "빠구리", "빠굴", "빠큐", "뻐큐", "뻑큐", "뽁큐", 
    "ㅅㅂ", "ㅅㅐ", "상넘이", "상놈을", "상놈의", "상놈이", "새갸", "새기", "새꺄", "새끼", 
    "새키", "색끼", "생쑈", "세갸", "세꺄", "세끼", "섹스", "셰끼", "쉐기", "쉐끼", "쉐리", "쉐에기", "쉐키", "쉑", 
    "쉨", "쉬발", "쉬밸", "쉬벌", "쉬뻘", "쉬펄", "쉽알", "스패킹", "스팽", "시끼", "시댕", "시뎅", "시랄", "시바", 
    "시발", "시벌", "시부랄", "시부럴", "시부레", "시부리", "시불", "시브랄", "시팍", "시팔", 
    "시펄", "심탱", "십8", "십라", "십새", "십세", "십쉐", "십쉐이", "십스키", "십쌔", "십창", "십탱", 
    "싶알", "ㅆ1발", "ㅆㅂ", "ㅆ앙", "ㅆㅍ", "ㅆㅣ", "싸가지", "싹아지", "쌉년", "쌍넘", "쌍년", "쌍놈", "쌍뇬", 
    "쌔끼", "쌕", "쌩쑈", "쌴년", "썅", "썡쇼", "써벌", "썩을년", "썩을놈", "쎄꺄", "쎄엑", "쒸벌", 
    "쒸뻘", "쒸팔", "쒸펄", "쓰바", "쓰박", "쓰발", "쓰벌", "쓰팔", "씁새", "씁얼", "씌발", "씌파", "씨1발", "씨8", 
    "씨끼", "씨댕", "씨뎅", "씨바", "씨바랄", "씨박", "씨발", "씨방새", "씨방세", "씨밸", "씨뱅", "씨벌", "씨벨", 
    "씨봉", "씨봉알", "씨부랄", "씨부럴", "씨부렁", "씨부리", "씨불", "씨붕", "씨브랄", "씨빠", "씨빨", "씨뽀랄", 
    "씨앙", "씨ㅋ발", "씨파", "씨팍", "씨팔", "씨펄", "씸년", "씸뇬", "씹같", "씹년", "씹뇬", "씹방", 
    "씹보지", "씹새", "씹새리", "씹세", "씹쉐", "씹스키", "씹쌔", "씹이", "씹자지", "씹질", 
    "씹창", "씹탱", "씹퇭", "씹팔", "씹할", "씹헐", 
    "아가리", "아갈통", "아구창", "아구통", "아굴", "앰창", "양넘", "양년", "양놈", "엄창", "엠병", "엠창", "여물통", 
    "엿같", "옘병", "옘빙", "왜년", "왜놈", "욤병", "육갑", "은년", "을년", "응디", "이기야", "이년", 
    "이새키", "이스끼", 
    "ㅈㄲ", "ㅈㄴ", "ㅈㄹ", "자슥", "잡것", "잡넘", "잡년", "잡놈", "저년", "접년", "젖밥", "조까", 
    "조까치", "조낸", "조또", "조빠", "조쟁이", "조지냐", "조진다", "조질래", "조찐", "존나", "존니", "존만", 
    "좀물", "좁년", "좁밥", "좃까", "좃또", "좃만", "좃밥", "좃이", "좃찐", "좆", "좇같", "좇이", 
    "주글", "주데이", "주뎅", "주둥아리", "주둥이", "죽고잡", "죽통", "쥐랄", "쥐롤", "쥬디", 
    "지랄", "지럴", "지롤", "지미랄", "쪼다", "쫍빱", "찌랄", 
    "창녀", "창년", 
    "캐년", "캐놈", "캐스끼", "캐스키", "캐시키", 
    "ㅍㅏ", "팔럼", "퍽큐", 
    "호로놈", "호로색", "호로쉑", "호로스까이", "호로스키", "후라들", "후래자식", "후레", "후뢰", 
    "凸"];

    for(var i = 0; i < roomList.length; i++) {
        if(room == roomList[i]) {
            if(room == "작곡방") { 
                for(var i = 0; i < advertisement.length; i++) {
                    if(msg.indexOf(advertisement[i]) != -1 && len > 60) {
                        replier.reply("문제의 키워드를 발견했습니다\n닉네임 : " + sender);
                        replier.reply(roomBangjang(room));
                        break;
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
                for(var i = 0; i < advertisement.length; i++) {
                    if(msg.indexOf(advertisement[i]) != -1 && len > 60 && room != "3학년5반") {
                        replier.reply(
                        "로그방", 
                        "욕설 감지" + "\n" + 
                        "감지 위치 : " + room + "\n" + 
                        "닉네임 : " + sender + "\n" + 
                        "키워드 : " + advertisement[i] + "\n" + 
                        roomBangjang(room));
                        replier.reply(
                        "로그방", 
                        "문제의 메세지" + "\n" + msg);
                    }
                }

                for (var i = 0; i < keylist.length; i++) {
                    if (msg.indexOf(keylist[i]) != -1 && len > 60 && room != "3학년5반") {
                        replier.reply(
                            "로그방",
                            "욕설 감지" + "\n" +
                            "감지 위치 : " + room + "\n" +
                            "닉네임 : " + sender + "\n" +
                            "사용된 키 : " + keylist[i] + "\n" +
                            roomBangjang(room));
                        keylist.splice(msg.indexOf(keylist[i]), 1);
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


            // 도움말
            if(msg == "/help" && room != "3학년5반") {
                replier.reply(
                "/help"  + "\n"+ "명령어에 대한 도움말 정보를 제공합니다." + "\n"+ 
                "/채팅방 목록"  + "\n"+ "고코위의 모든 채팅방 링크를 표시합니다." + "\n" + 
                "/서버 상태"  + "\n"+ "코코의 정보 및 상태를 표시합니다." + "\n" + 
                "/서버 개발자"  + "\n"+ "코코봇의 개발자를 알려줍니다." + "\n" + 
                "/깃허브"  + "\n"+ "관리자들의 깃허브 주소를 알려줍니다."); 
                if(room == "운영위방") {
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
            if(msg == "/채팅방 목록" && room != "3학년5반") {
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

            if(msg == "/서버 상태" && room != "3학년5반") { 
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

            if(msg == "/서버 개발자" && room != "3학년5반") { 
                replier.reply("개발자: 암고, 양사, 코양\n관리자: 코양\n운영: 고양이들의 코딩 위원회(C-3)\nCopyright 2020-2021. Cat Coding Committee. All rights reserved.");
            }

            if(msg == "/깃허브" && room != "3학년5반") {
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


            // 관리자 명령어 모음
            if((msg == "코코야") && (room == "운영위방")) {
                var answer = Math.floor(Math.random() * 4);
                if(answer == 0) {
                    replier.reply("네?");
                }
                else if(answer == 1) {
                    replier.reply("뭐");
                }
                else if(answer == 2) {
                    replier.reply("아 왜 불러ㅡㅡ");
                }
                else if(answer == 3) {
                    replier.reply("멍멍!");
                }
            }
            
            if((msg == "/가위바위보") && (room == "운영위방")) {
                replier.reply("가위바위보 게임을 시작합니다.\n가위, 바위, 보 중 하나를 내주세요.");
                player = sender;
            }
            if((player == sender) && (msg == "가위" || msg == "바위" || msg == "보")) {
                var result = Math.floor(Math.random() * 3);
                if(result == 0) {
                    if(msg == "가위") {
                        replier.reply("저는 바위를 냈습니다.\n개한테 지냐ㅋ");
                    }
                    else if(msg == "바위") {
                        replier.reply("저는 보를 냈습니다.\n개한테 지냐ㅋ");
                    }
                    else if(msg == "보") {
                        replier.reply("저는 가위를 냈습니다.\n개한테 지냐ㅋ");
                    }
                }
                else if(result == 1) {
                    replier.reply("저는 " + msg + "를 냈습니다.\n비겼습니다.");
                }
                else if(result == 2) {
                    if(msg == "가위") {
                        replier.reply("저는 보를 냈습니다.\n당신이 이겼습니다.");
                    }
                    else if(msg == "바위") {
                        replier.reply("저는 가위를 냈습니다.\n당신이 이겼습니다.");
                    }
                    else if(msg == "보") {
                        replier.reply("저는 바위를 냈습니다.\n당신이 이겼습니다.");
                    }
                }
                player = null;
            }

            if((msg == "/날짜") && (room == "운영위방")) {
                replier.reply("오늘은 " + (day.getMonth() + 1) + "월 " + day.getDate() + "일 입니다.");
            }

            if((msg == "/시간") && (room == "운영위방")) {
                replier.reply("지금은 " + day.getHours() + "시 " + day.getMinutes() + "분 " + day.getSeconds() + "초입니다.");
            }

            if((msg == "/짖어") && (room == "운영위방")) {
                replier.reply("왈왈!");
            }

            if((msg == "/호출") && (room == "운영위방")) {
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

            if((msg == "/고코위") && (room == "운영위방")) {
                replier.reply("코양 양사 러리 깃고 Cpp 룰루 암고 Lu175 뽀로로 녹치");
                replier.reply("어셈블!!!!!!!");
            }

            if(((msg == "/C") || (msg == "/c") || (msg == "/씨") || (msg == "/cpp") || (msg == "/C") || (msg == "/C"))&& (room == "운영위방")) {
                replier.reply("Cpp 러리 룰루 뽀로로 양사 코양");
                replier.reply("C 어셈블!!!!!!!");
            }

            if(((msg == "/JAVA") || (msg == "/java") || (msg == "/자바")) && (room == "운영위방")) {
                replier.reply("러리 Cpp 양사 코양");
                replier.reply("자바 어셈블!!!!!!!");
            }

            if(((msg == "/python") || (msg == "/py") || (msg == "/파이썬")) && (room == "운영위방")) {
                replier.reply("코양 Cpp 깃고 러리 룰루 양사");
                replier.reply("파이썬 어셈블!!!!!!!");
            }

            if((msg == "/웹") && (room == "운영위방")) {
                replier.reply("코양 Cpp 러리 뽀로로 양사 녹치");
                replier.reply("웹 어셈블!!!!!!!");
            }

            if((msg == "/견적") && (room == "운영위방")) {
                replier.reply("양사 Cpp 깃고 러리 코양");
                replier.reply("견적 어셈블!!!!!!!");
            }

            if ((msg == "/키생성") && (room = "운영위방")) {
                var max = 16777216;
                var min = 1048576;
                var key = Math.floor(Math.random() * (max - min)) + min;
                key = key.toString(16);
                replier.reply("키 생성: " + key);
                keylist.push(key);
            }

            if ((msg == "/키목록") && (room = "운영위방")) {
                replier.reply(keylist);
            }
        }
    }
}