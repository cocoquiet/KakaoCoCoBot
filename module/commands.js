const ROOM = {
  ADMIN: '운영위방',
  C: 'C방',
  JAVA: '자바방',
  PYTHON: '파이썬방',
  WEB: '웹방',
  HARDWARE: '견적방',
  COMPOSITION: '작곡방'
};

const keylist = [];

let player = null;

// 가위바위보
function rsp(playerMsg) {
  var result = Math.floor(Math.random() * 3);
  if (result == 0) {
    if (msg == "가위") {
      return "저는 바위를 냈습니다.\n개한테 지냐ㅋ";
    }
    else if (msg == "바위") {
      return "저는 보를 냈습니다.\n개한테 지냐ㅋ";
    }
    else if (msg == "보") {
      return "저는 가위를 냈습니다.\n개한테 지냐ㅋ";
    }
  }
  else if (result == 1) {
    return "저는 " + msg + "를 냈습니다.\n비겼습니다.";
  }
  else if (result == 2) {
    if (msg == "가위") {
       return "저는 보를 냈습니다.\n당신이 이겼습니다.";
    }
    else if (msg == "바위") {
      return "저는 가위를 냈습니다.\n당신이 이겼습니다.";
    }
    else if (msg == "보") {
      return"저는 바위를 냈습니다.\n당신이 이겼습니다.";
    }
  }
  player = null;
}

// 매개변수로 들어온 문자열이 숫자인가?
function isNumeric(data) {
  return !isNaN(Number(data));
}

// 기본 구조
// '명령어': {
//   allow: [ 해당 명령어를 사용할 방들의 열거형들 ]
//   msg: (room, sender, args) => {
//     return '해당 명령어의 답변';
//   }
// }
// 답변 같은 경우, 세미콜론으로 구분하여 반환하면 따로 보낸다.
const commands = {
  '/help': {
    allow: [ ROOM.ADMIN, ROOM.C, ROOM.JAVA, ROOM.PYTHON, ROOM.WEB, ROOM.HARDWARE, ROOM.COMPOSITION ],
    msg: (room, sender, args) => {
      result = "/help" + "\n" + "명령어에 대한 도움말 정보를 제공합니다." + "\n" +
               "/채팅방 목록" + "\n" + "고코위의 모든 채팅방 링크를 표시합니다." + "\n" +
               "/서버 상태" + "\n" + "코코의 정보 및 상태를 표시합니다." + "\n" +
               "/서버 개발자" + "\n" + "코코봇의 개발자를 알려줍니다." + "\n" +
               "/깃허브" + "\n" + "관리자들의 깃허브 주소를 알려줍니다.";
      
      if (room === ROOM.ADMIN) {
        result += ";" +
                  "관리자 전용 기능" + "\n\n" +
                  "코코야" + "\n" + "기분에 따라 대답하는 온도차가 큽니다." + "\n" +
                  "/가위바위보" + "\n" + "가위바위보를 합니다." + "\n" +
                  "/날짜" + "\n" + "오늘의 날짜를 알려줍니다." + "\n" +
                  "/시간" + "\n" + "현재 시각을 알려줍니다." + "\n" +
                  "/짖어" + "\n" + "짖습니다." + "\n" +
                  "/호출" + "\n" + "관리자들의 호출 명령어를 알려줍니다.";
      }

      return result;
    }
  },
  '/채팅방': {
    allow: [ ROOM.ADMIN, ROOM.C, ROOM.JAVA, ROOM.PYTHON, ROOM.WEB, ROOM.HARDWARE, ROOM.COMPOSITION ],
    msg: (room, sender, args) => {
      if(args[0] !== '목록') return null;
      return "클릭시 방 목록 보기                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    " + "\n\n" +
             "저희는 여러 개의 방과 같이 활동하는 개발자 연합입니다. 다른 종류의 언어를 질문하고 싶으시면 밑의 링크를 타시길 바랍니다." + "\n\n" +
             "네이버카페(공통) - https://cafe.naver.com/codecat" + "\n\n" +
             "디스코드(공통) - https://discord.gg/cZ5r5PRTX5" + "\n\n" +
             "C언어, C#, C++, 게임 엔진 - https://open.kakao.com/o/ghFjlzr" + "\n\n" +
             "자바, 안드로이드 - https://open.kakao.com/o/goAvtbOb" + "\n\n" +
             "파이썬(ML), R - https://open.kakao.com/o/gWvnqvF" + "\n\n" +
             "웹 - https://open.kakao.com/o/gm2yL8kb" + "\n\n" +
             "조립, 견적, pc문제 - https://open.kakao.com/o/gEI0jymb";
    }
  },
  '/서버': {
    allow: [ ROOM.ADMIN, ROOM.C, ROOM.JAVA, ROOM.PYTHON, ROOM.WEB, ROOM.HARDWARE, ROOM.COMPOSITION ],
    msg: (room, sender, args) => {
      if(args[0] === '상태') {
        return "봇 버전 : " + Bot.getVersion() + "\n" +
              "자바스크립트 버전 : " + Bot.getJsVersion() + "\n" +
              "모델명: " + Device.getModelName() + "\n" +
              "안드로이드 버전: " + Device.getAndroidVersion() + "\n" +
              "안드로이드 API: " + Device.getApiLevel() + "\n" +
              "배터리 잔량: " + Device.getBatteryLevel() + "% \n" +
              "배터리 온도: " + Device.getBatteryTemp() + "°C" + "\n" +
              "상태: ON" + "\n" +
              "이름: 코코";
      } else if(args[0] === '개발자') {
        return "개발자: 암고, 양사, 코양, 고수, 러리" + "\n" +
               "관리자: 코양" + "\n" +
               "운영: 고양이들의 코딩 위원회(C-3)" + "\n" +
               "Copyright 2020-2021. Cat Coding Committee. All rights reserved.";
      }
    }
  },
  '/깃허브': {
    allow: [ ROOM.ADMIN, ROOM.C, ROOM.JAVA, ROOM.PYTHON, ROOM.WEB, ROOM.HARDWARE, ROOM.COMPOSITION ],
    msg: (room, sender, args) => {
      return "코양이 위원장 - https://github.com/easycastle" + "\n" +
             "양 사 - https://github.com/sat0317" + "\n" +
             "러 리 - https://github.com/Coalery" + "\n" +
             "고 수 - https://github.com/cpprhtn" + "\n" +
             "깃 고 - https://github.com/NewPremium" + "\n" +
             "암 고 - https://github.com/azure-06" + "\n" +
             "루 - https://github.com/Lu175" + "\n" +
             "뽀 로 로 - https://github.com/paxbun" + "\n" +
             "녹 색 치 킨 - https://github.com/IceJack" + ";" +
             "다들 한번씩 놀러오세요~";
    }
  },
  '코코야': {
    allow: [ ROOM.ADMIN ],
    msg: (room, sender, args) => {
      let answer = [ '네?', '뭐', '아 왜 불러ㅡㅡ', '멍멍!' ];
      let rand = Math.floor(Math.random() * answer.length);
      return answer[rand];
    }
  },
  '/가위바위보': {
    allow: [ ROOM.ADMIN ],
    msg: (room, sender, args) => {
      player = sender;
      return "가위바위보 게임을 시작합니다.\n가위, 바위, 보 중 하나를 내주세요.";
    }
  },
  '가위': {
    allow: [ ROOM.ADMIN ],
    msg: (room, sender, args) => {
      return rsp('가위');
    }
  },
  '바위': {
    allow: [ ROOM.ADMIN ],
    msg: (room, sender, args) => {
      return rsp('바위');
    }
  },
  '보': {
    allow: [ ROOM.ADMIN ],
    msg: (room, sender, args) => {
      return rsp('보');
    }
  },
  '/날짜': {
    allow: [ ROOM.ADMIN ],
    msg: (room, sender, args) => {
      const day = new Date();
      return "오늘은 " + (day.getMonth() + 1) + "월 " + day.getDate() + "일 입니다.";
    }
  },
  '/시간': {
    allow: [ ROOM.ADMIN ],
    msg: (room, sender, args) => {
      const day = new Date();
      return "지금은 " + day.getHours() + "시 " + day.getMinutes() + "분 " + day.getSeconds() + "초입니다.";
    }
  },
  '/짖어': {
    allow: [ ROOM.ADMIN ],
    msg: (room, sender, args) => {
      return "왈왈!";
    }
  },
  '/호출': {
    allow: [ ROOM.ADMIN ],
    msg: (room, sender, args) => {
      return "C방" + "\n" +
             "→ C, c, 씨, cpp" + "\n" +
             "자바방 " + "\n" +
             "→ JAVA, java, 자바" + "\n" +
             "파이썬방" + "\n" +
             "→ python, py, 파이썬" + "\n" +
             "웹방" + "\n" +
             "→ 웹" + "\n" +
             "견적방" + "\n" +
             "→ 견적";
    }
  },
  '/고코위': {
    allow: [ ROOM.ADMIN ],
    msg: (room, sender, args) => {
      return "코양 양사 러리 깃고 Cpp 룰루 암고 Lu175 뽀로로 녹치" + ";" +
             "어셈블!!!!!!!";
    }
  },
  '/C': {
    allow: [ ROOM.ADMIN ],
    msg: (room, sender, args) => "Cpp 러리 룰루 뽀로로 양사 코양;C 어셈블!!!!!!!"
  },
  '/c': {
    allow: [ ROOM.ADMIN ],
    msg: (room, sender, args) => "Cpp 러리 룰루 뽀로로 양사 코양;C 어셈블!!!!!!!"
  },
  '/씨': {
    allow: [ ROOM.ADMIN ],
    msg: (room, sender, args) => "Cpp 러리 룰루 뽀로로 양사 코양;C 어셈블!!!!!!!"
  },
  '/cpp': {
    allow: [ ROOM.ADMIN ],
    msg: (room, sender, args) => "Cpp 러리 룰루 뽀로로 양사 코양;C 어셈블!!!!!!!"
  },
  '/JAVA': {
    allow: [ ROOM.ADMIN ],
    msg: (room, sender, args) => "러리 Cpp 양사 코양;자바 어셈블!!!!!!!"
  },
  '/java': {
    allow: [ ROOM.ADMIN ],
    msg: (room, sender, args) => "러리 Cpp 양사 코양;자바 어셈블!!!!!!!"
  },
  '/자바': {
    allow: [ ROOM.ADMIN ],
    msg: (room, sender, args) => "러리 Cpp 양사 코양;자바 어셈블!!!!!!!"
  },
  '/python': {
    allow: [ ROOM.ADMIN ],
    msg: (room, sender, args) => "코양 Cpp 깃고 러리 룰루 양사;파이썬 어셈블!!!!!!!"
  },
  '/py': {
    allow: [ ROOM.ADMIN ],
    msg: (room, sender, args) => "코양 Cpp 깃고 러리 룰루 양사;파이썬 어셈블!!!!!!!"
  },
  '/파이썬': {
    allow: [ ROOM.ADMIN ],
    msg: (room, sender, args) => "코양 Cpp 깃고 러리 룰루 양사;파이썬 어셈블!!!!!!!"
  },
  '/웹': {
    allow: [ ROOM.ADMIN ],
    msg: (room, sender, args) => "코양 Cpp 러리 뽀로로 양사 녹치;웹 어셈블!!!!!!!"
  },
  '/견적': {
    allow: [ ROOM.ADMIN ],
    msg: (room, sender, args) => "양사 Cpp 깃고 러리 코양;견적 어셈블!!!!!!!"
  },
  '/키생성': {
    allow: [ ROOM.ADMIN ],
    msg: (room, sender, args) => {
      const max = 16777216;
      const min = 1048576;

      if(!isNumeric(args[0])) {
        return "숫자를 입력해주세요."
      }

      let key_cnt = Number(args[0]);
      let key = Math.floor(Math.random() * (max - min)) + min;
      key = key.toString(16);
      
      for (let i = 0; i < key_cnt; i++)
          keylist.push(key);

      return "아래 주어지는 키 번호는 홍보가 허용된 글에만 사용이 가능합니다" + "\n" +
             "아래 주어진 키를 홍보 글의 최상단에 붙여 넣어주세요." + "\n" +
             key_cnt + "회 홍보시 해당 키는 효력이 사라지며, 재홍보를 원할 시 다시 키를 재발급 받아야 합니다." + "\n\n" +
             "발급 키 : " + key;
    }
  },
  '/키목록': {
    allow: [ ROOM.ADMIN ],
    msg: (room, sender, args) => {
      if (keylist.length == 0) {
        return "생성된 키가 없습니다.";
      }
      return keylist.join(', ');
    }
  }
}

function useKey(idx) {
  keylist.splice(idx, 1);
}

function isValidRoom(room) {
  for(let r in ROOM) {
      if(ROOM[r] === room) {
          return true;
      }
  }
  return false;
}

function execCommand(room, sender, msg) {
  let split = msg.split(' ');

  let command = split[0];
  let args = split.slice(1);

  let cmdObj = commands[command];

  if(cmdObj === undefined) return null; // 찾을 수 없는 명령어
  if(cmdObj.allow.indexOf(room) === -1) return null; // 명령어를 사용할 수 없는 방

  return cmdObj.msg(room, sender, args);
}

exports.ROOM = ROOM;
exports.isValidRoom = isValidRoom;
exports.KEY = {
  useKey: useKey,
  keyCnt: () => keylist.length,
  getKey: (idx) => keylist[idx]
};
exports.execCommand = execCommand;