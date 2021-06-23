const leaders = {
  'C방' : [ 'Cpp', '러리', '룰루', '뽀로로', '양사', '코양' ],
  '자바방' : [ '러리', 'Cpp', '양사', '코양' ],
  '파이썬방' : [ '코양', 'Cpp', '깃고', '러리', '룰루', '양사' ],
  '웹방' : [ '코양', 'Cpp', '러리', '뽀로로', '양사', '녹치' ],
  '견적방' : [ '양사', 'Cpp', '깃고', '러리', '코양' ],
  '작곡방' : [ '양사', 'Mute Jack', 'KI-D', '블루링', '조담' ]
}

exports.leaders = leaders;

exports.getLeadersByRoom = (room) => {
  if(room == "운영위방") {
    return "테스트중입니다";
  }
  return leaders[room].join(', ') + '\n신고 #신고 /신고';
}