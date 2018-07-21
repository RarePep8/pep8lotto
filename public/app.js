window.onload = function() {
  const date = new Date();

  // 2. format the date to look normal to humans
  const monthIndex = date.getMonth(); // returns month 0-11
  const day = date.getDate();
  const year = date.getYear();
  // we need to create an array of strings for
  // each month name so we can format the entire date nicely
  // so months[0] is 'January' and months[11] is 'December'
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
];
  const dateElement = document.getElementById('month');
  const dateString = months[monthIndex] + ' ' + day;
  dateElement.innerHTML = dateString;
  /**
  console.log(day);
  console.log(year);
  **/

};