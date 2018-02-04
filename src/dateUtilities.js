import moment from 'moment';

export function getCurrentWeek() {
  return moment().week()
}

export function getWeekDays(week) {
  var startOfWeek = moment().week(week).startOf('isoWeek');
  var endOfWeek = moment().week(week).endOf('isoWeek');

  var days = [];
  var day = startOfWeek;

  while (day <= endOfWeek) {
    days.push(day);
    day = day.clone().add(1, 'd');
  }

  return days;
}
