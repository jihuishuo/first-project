export function formateTime(time: number) {
  //年月日时分秒
  if (!time) return "";
  let data = new Date(time);
  let year: string | number = data.getFullYear();
  let month: string | number = data.getMonth() + 1;
  let day: string | number = data.getDate();
  let hours: string | number = data.getHours();
  let minute: string | number = data.getMinutes();
  let second: string | number = data.getSeconds();
  month = month < 10 ? "0" + month : month;
  day = day < 10 ? "0" + day : day;
  hours = hours < 10 ? "0" + hours : hours;
  minute = minute < 10 ? "0" + minute : minute;
  second = second < 10 ? "0" + second : second;
  return `${year}-${month}-${day} ${hours}:${minute}:${second}`;
}
export function formateDate(time: number) {
  if (!time) return "";
  let num = new Date(time); // console.log(num);

  let year: string | number = num.getFullYear();
  let month: string | number = num.getMonth() + 1;
  let date: string | number = num.getDate();

  month = month < 10 ? "0" + month : month;
  date = date < 10 ? "0" + date : date;
  return `${year}-${month}-${date}`;
}
