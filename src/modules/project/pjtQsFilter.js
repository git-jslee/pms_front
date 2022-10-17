const pjtQsFilter = (selectedBt, filterContract, filterTeam, value) => {
  let newBtn;
  let newFilterContract;
  let newFilterTeam;
  let newPjtFilter;
  if (value === '매출-전체') {
    if (selectedBt[0] === 'bt0') return;
    newBtn = ['bt0', selectedBt[1], selectedBt[2]];
    newFilterContract = [{}];
    newFilterTeam = null;
    newPjtFilter = [...filterTeam];
    // setSelectedBt(['bt0', selectedBt[1], selectedBt[2]]);
    // setFilterContract([{}]);
    // setPjtFilter([...filterTeam]);
  } else if (value === '매출') {
    if (selectedBt[0] === 'bt1') return;
    const filter = [{ price: { $ne: 0 } }];
    newBtn = ['bt1', selectedBt[1], 'bt0'];
    newFilterContract = filter;
    newFilterTeam = null;
    newPjtFilter = [...filterTeam, ...filter];
    // setSelectedBt(['bt1', selectedBt[1], 'bt0']);
    // setFilterContract(filter);
    // setPjtFilter([...filterTeam, ...filter]);
  } else if (value === '비매출') {
    if (selectedBt[0] === 'bt2') return;
    const filter = [{ price: { $eq: 0 } }];
    newBtn = ['bt2', selectedBt[1], 'bt0'];
    newFilterContract = filter;
    newFilterTeam = null;
    newPjtFilter = [...filterTeam, ...filter];
    // setSelectedBt(['bt2', selectedBt[1], 'bt0']);
    // setFilterContract(filter);
    // setPjtFilter([...filterTeam, ...filter]);
  } else if (value === '계약-전체') {
    if (selectedBt[2] === 'bt0') return;
    const filter = [{ price: { $ne: 0 } }];
    newBtn = ['bt1', selectedBt[1], 'bt0'];
    newFilterContract = filter;
    newFilterTeam = null;
    newPjtFilter = [...filterTeam, ...filter];
    // setSelectedBt(['bt1', selectedBt[1], 'bt0']);
    // setFilterContract(filter);
    // setPjtFilter([...filterTeam, ...filter]);
  } else if (value === '계약') {
    if (selectedBt[2] === 'bt1') return;
    const filter = [{ price: { $ne: 0 } }, { contracted: { $eq: true } }];
    newBtn = ['bt1', selectedBt[1], 'bt1'];
    newFilterContract = filter;
    newFilterTeam = null;
    newPjtFilter = [...filterTeam, ...filter];
    // setSelectedBt(['bt1', selectedBt[1], 'bt1']);
    // setFilterContract(filter);
    // setPjtFilter([...filterTeam, ...filter]);
  } else if (value === '예정') {
    if (selectedBt[2] === 'bt2') return;
    const filter = [{ price: { $ne: 0 } }, { contracted: { $eq: false } }];
    newBtn = ['bt1', selectedBt[1], 'bt2'];
    newFilterContract = filter;
    newFilterTeam = null;
    newPjtFilter = [...filterTeam, ...filter];
    // setSelectedBt(['bt1', selectedBt[1], 'bt2']);
    // setFilterContract(filter);
    // setPjtFilter([...filterTeam, ...filter]);
  } else if (value === '사업-전체') {
    if (selectedBt[1] === 'bt0') return;
    // const filter = [{}];
    newBtn = [selectedBt[0], 'bt0', selectedBt[2]];
    newFilterContract = null;
    newFilterTeam = [{}];
    newPjtFilter = [...filterContract];
    // setSelectedBt([selectedBt[0], 'bt0', selectedBt[2]]);
    // setFilterTeam([{}]);
    // setPjtFilter([...filterContract]);
  } else if (value === '디자인') {
    if (selectedBt[1] === 'bt1') return;
    const filter = [{ scode_team: { id: { $eq: 1 } } }];
    newBtn = [selectedBt[0], 'bt1', selectedBt[2]];
    newFilterContract = null;
    newFilterTeam = filter;
    newPjtFilter = [...filterContract, ...filter];
    // setSelectedBt([selectedBt[0], 'bt1', selectedBt[2]]);
    // setFilterTeam(filter);
    // setPjtFilter([...filterContract, ...filter]);
  } else if (value === '영상') {
    if (selectedBt[1] === 'bt2') return;
    const filter = [{ scode_team: { id: { $eq: 5 } } }];
    newBtn = [selectedBt[0], 'bt2', selectedBt[2]];
    newFilterContract = null;
    newFilterTeam = filter;
    newPjtFilter = [...filterContract, ...filter];
    // setSelectedBt([selectedBt[0], 'bt2', selectedBt[2]]);
    // setFilterTeam(filter);
    // setPjtFilter([...filterContract, ...filter]);
  } else if (value === 'ICT') {
    if (selectedBt[1] === 'bt3') return;
    const filter = [{ scode_team: { id: { $eq: 2 } } }];
    newBtn = [selectedBt[0], 'bt3', selectedBt[2]];
    newFilterContract = null;
    newFilterTeam = filter;
    newPjtFilter = [...filterContract, ...filter];
    // setSelectedBt([selectedBt[0], 'bt3', selectedBt[2]]);
    // setFilterTeam(filter);
    // setPjtFilter([...filterContract, ...filter]);
  } else if (value === 'R&D') {
    if (selectedBt[1] === 'bt4') return;
    const filter = [{ scode_team: { id: { $eq: 6 } } }];
    newBtn = [selectedBt[0], 'bt4', selectedBt[2]];
    newFilterContract = null;
    newFilterTeam = filter;
    newPjtFilter = [...filterContract, ...filter];
    // setSelectedBt([selectedBt[0], 'bt4', selectedBt[2]]);
    // setFilterTeam(filter);
    // setPjtFilter([...filterContract, ...filter]);
  }
  return {
    newBtn: newBtn,
    newFilterContract: newFilterContract,
    newFilterTeam: newFilterTeam,
    newPjtFilter: newPjtFilter,
  };
};

export default pjtQsFilter;
