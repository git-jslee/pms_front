import moment from "moment";

function PeriodRate(startdate, plan_enddate) {
  const diff_date = moment(plan_enddate).diff(startdate, 'days')
  const diff_date_today = moment().diff(startdate, 'days')
  // console.log('>>>>dfff_date>>>>', diff_date)
  // console.log('>>>>dfff_date_today>>>>', diff_date_today)
  const value = (100 * (diff_date_today / diff_date))

  return Math.round(value)

}

const calRiskLevel = ({ issue, list }) => {
  let issue_total = 0;
  let plan_total = 0;
  let progress_total = 0;
  
  const startdate = list.startdate;
  const plan_enddate = list.attributes.plan_enddate;
  const project_progress = list.project_progress;
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
  // 진행률..
  const periodRate = PeriodRate(startdate, plan_enddate)
  console.log('>>>>1-1.return value>>>>', periodRate)
  if (periodRate >= 100) {
    // 종료예정일 초과시..2점..5일 초과시마다..추가 2점
    const diff = moment().diff(plan_enddate, 'days')
    progress_total += Math.floor((1 + (diff / 5)) * 2)
  } else if (project_progress < periodRate) {
    //
    console.log('>>>>1-2.periodRate>>>>', periodRate)
    progress_total += Math.floor((periodRate - project_progress) / 5)

  }

  //
  const _issue = issue_total >= 5 ? 5 : issue_total;
  const _plan = plan_total >= 5 ? 5 : plan_total;
  const _progress = progress_total >= 10 ? 10 : progress_total;
  return { issue: _issue, plan: _plan, progress: _progress };
};

export default calRiskLevel;
