const calRiskLevel = ({ issue, list }) => {
  let issue_total = 0;
  let plan_total = 0;
  // risk - issue
  if (issue !== '') {
    issue.map((v) => {
      if (v.attributes.solved === true || v.attributes.risk === 'low') return;
      if (v.attributes.risk === 'medium') issue_total += 1;
      if (v.attributes.risk === 'high') issue_total += 3;
    });
  }
  // risk - 기준일..
  if (list.attributes.price !== 0 && list.base_day < list.total_plan) {
    console.log('====issue=======', list);
    plan_total += Math.floor((list.total_plan - list.base_day) / 5);
  }
  //
  const _issue = issue_total >= 6 ? 6 : issue_total;
  const _plan = plan_total >= 5 ? 5 : plan_total;
  return { issue: _issue, plan: _plan };
};

export default calRiskLevel;
