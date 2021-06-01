'use strict';

{
  // 現在の時刻を取得し年号と月を取得。
  const today = new Date();
  let year = today.getFullYear();
  let month = today.getMonth();

  // 先月末の日付を取得し今月の1日の曜日を取得。
  // 今月表示の余った曜日の先月末表示分を取得。
  function getCalenderHead() {
    const dates = [];
    const firstDate = new Date(year, month, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();

    for (let i = 0; i < firstDay; i++) {
      dates.unshift({
        date: firstDate - i,
        isToday: false,
        isDisabled: true,
      });
    }
    return dates;
  }

  // 今月末の日付を取得。
  // 今月の1日から月末の日付を取得。
  // 年号と月が現在と同じで今日の日付の場合クラスを付与。
  function getCalenderBody() {
    const dates = [];
    const lastDate = new Date(year, month + 1, 0).getDate();

    for (let i = 1; i <= lastDate; i++) {
      dates.push({
        date: i,
        isToday: false,
        isDisabled: false,
      });
    }

    if (year === today.getFullYear() && month === today.getMonth()) {
      dates[today.getDate() - 1].isToday = true;
    }

    return dates;
  }

  // 今月末の日付の曜日を取得。
  // 今月表示の余った曜日の来月始表示分を取得。
  function getCalenderFoot() {
    const dates = [];
    const endDay = new Date(year, month + 1, 0).getDay();

    for (let i = 1; i < 7 - endDay; i++) {
      dates.push({
        date: i,
        isToday: false,
        isDisabled: true,
      });
    }

    return dates;
  }

  // htmlのtbodyを取得。
  // 繰り返し表示されるtbodyの最初の要素を削除。
  function clearCalender() {
    const tbody = document.querySelector("tbody");

    while (tbody.firstChild) {
      tbody.removeChild(tbody.firstChild);
    }
  }

  // titleIDを取得し現在表示中の年月を挿入。
  function renderTitle() {
    const title = `${year}/${String(month + 1).padStart(2, "0")}`;

    document.getElementById("title").textContent = title;
  }

  // 上の表示する先月末、今月、来月始を代入。
  // 先月末、今月、来月始を7で割り折り返し地点を出し配置。
  // 行にtrタグを作成し列にtdタグを作成しそれぞれに配置された数字を挿入しクラスを2つ付与しtrタグにtdタグを挿入しhtmlのtbodyタグを取得しtrタグを挿入。
  function renderWeeks() {
    const dates = [
      ...getCalenderHead(),
      ...getCalenderBody(),
      ...getCalenderFoot(),
    ];
    const weeks = [];
    const weekCount = dates.length / 7;

    for (let i = 0; i < weekCount; i++) {
      weeks.push(dates.splice(0, 7));
    }

    weeks.forEach(week => {
      const tr = document.createElement("tr");
      week.forEach(date => {
        const td = document.createElement("td");

        td.textContent = date.date;
        if (date.isToday) {
          td.classList.add("today");
        }
        if (date.isDisabled) {
          td.classList.add("disabled");
        }

        tr.appendChild(td);
      });
      document.querySelector("tbody").appendChild(tr);
    });
  }

  // 上の3つの関数を代入。
  function createCalender() {
    clearCalender();
    renderTitle();
    renderWeeks();
  }

  // prevIDを取得しクリックイベントを付与。
  // 1月ずつ減っていき1月を超えたら前年の12月に戻る。
  document.getElementById("prev").addEventListener("click", () => {
    month--;
    if (month < 0) {
      year--;
      month = 11;
    }

    createCalender();
  });

  // nextIDを取得しクリックイベントを付与。
  // 1月ずつ増えていき12月を超えたら来年の1月に進む。
  document.getElementById("next").addEventListener("click", () => {
    month++;
    if (month > 11) {
      year++;
      month = 0;
    }

    createCalender();
  });

  // todayIDを取得しクリックイベントを付与。
  // 現在の年月に戻る。
  document.getElementById("today").addEventListener("click", () => {
    year = today.getFullYear();
    month = today.getMonth();

    createCalender();
  });

  createCalender();

}
