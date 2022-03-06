const calWorkTime = (list) => {
  const changeObject = list.map((value) => {
    return {
      id: value.project.id,
      name: value.project.name,
      worktime: value.workingTime,
    };
  });

  const result = changeObject.reduce((acc, current) => {
    // 일치하는 index 없을때 객체 추가
    const _findIndex = acc.findIndex(({ id }) => id === current.id);
    if (_findIndex === -1) {
      acc = [...acc, current];
      // 중복발생시 worktime 더하기
    } else {
      acc[_findIndex].worktime += current.worktime;
    }
    return acc;
  }, []);
  return result;
};

export default calWorkTime;
