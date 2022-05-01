const weekNumOfMonth = (date) => {
  var WEEK_KOR = ['첫째주', '둘째주', '셋째주', '넷째주', '다섯째주'];
  var THURSDAY_NUM = 4; // 첫째주의 기준은 목요일(4)이다. (https://info.singident.com/60)
  console.log(date);

  var firstDate = new Date(date.getFullYear(), date.getMonth(), 1);
  var firstDayOfWeek = firstDate.getDay();

  var firstThursday = 1 + THURSDAY_NUM - firstDayOfWeek; // 첫째주 목요일
  if (firstThursday <= 0) {
    firstThursday = firstThursday + 7; // 한주는 7일
  }
  var untilDateOfFirstWeek = firstThursday - 7 + 3; // 월요일기준으로 계산 (월요일부터 한주의 시작)
  var weekNum = Math.ceil((date.getDate() - untilDateOfFirstWeek) / 7) - 1;

  if (weekNum < 0) {
    // 첫째주 이하일 경우 전월 마지막주 계산
    var lastDateOfMonth = new Date(date.getFullYear(), date.getMonth(), 0);
    var result = Util.Date.weekNumOfMonth(lastDateOfMonth);
    return result;
  }

  return [WEEK_KOR[weekNum], date.getMonth() + 1 + '월'];
};
