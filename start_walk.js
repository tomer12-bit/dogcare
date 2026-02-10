// הקובץ אחראי על ניהול לוגיקת טיול: התחלה, סיום וטיימר

window.onload = function () {

  // שליפת כל האלמנטים הדרושים מה־HTML
  var btnStart = document.getElementById("btnStartWalk"); // כפתור התחלת טיול
  var btnEnd = document.getElementById("btnEndWalk");     // כפתור סיום טיול
  var timerEl = document.getElementById("walkTimer");     // תצוגת הטיימר
  var stateEl = document.getElementById("walkState");     // תצוגת מצב הטיול
  var goalEl = document.getElementById("walkGoal");       // select של מטרה
  var timerCard = document.getElementById("timerCard");   // כרטיס הטיימר (לעיצוב)
  var indicator = document.getElementById("walkIndicator"); // אינדיקציה ויזואלית לפעילות

  // בדיקה שכל האלמנטים קיימים לפני המשך הרצה
  if (!btnStart || !btnEnd || !timerEl || !stateEl || !goalEl || !timerCard || !indicator) {
    return;
  }

  // משתנים לניהול זמן והאינטרוול
  var seconds = 0;        // סופר שניות שעברו
  var intervalId = null; // מזהה של setInterval

  // פונקציה שממירה שניות לפורמט דקות:שניות
  function formatTime(totalSeconds) {
    var m = Math.floor(totalSeconds / 60); // חישוב דקות
    var s = totalSeconds % 60;             // חישוב שניות

    var mm = (m < 10) ? ("0" + m) : ("" + m); // הוספת 0 אם צריך
    var ss = (s < 10) ? ("0" + s) : ("" + s);

    return mm + ":" + ss; // החזרת הזמן בפורמט mm:ss
  }

  // פונקציה להתחלת טיול
  function startWalk() {

    // מניעת התחלה כפולה אם הטיימר כבר רץ
    if (intervalId !== null) return;

    // איפוס הטיימר
    seconds = 0;
    timerEl.innerHTML = formatTime(seconds);

    // עדכון טקסט מצב
    stateEl.innerHTML = "טיול פעיל";

    // הוספת מחלקת CSS לעיצוב מצב פעיל
    timerCard.classList.add("walk-active");

    // הצגת אינדיקציה ויזואלית
    indicator.style.display = "flex";

    // ניהול מצב כפתורים
    btnStart.disabled = true;
    btnEnd.disabled = false;

    // הפעלת טיימר שמתעדכן כל שנייה
    intervalId = setInterval(function () {
      seconds++;
      timerEl.innerHTML = formatTime(seconds);
    }, 1000);
  }

  // פונקציה לסיום טיול
  function endWalk() {

    // אם אין טיימר פעיל – אין מה לעצור
    if (intervalId === null) return;

    // עצירת הטיימר
    clearInterval(intervalId);
    intervalId = null;

    // קריאת ערך המטרה מה־select
    var goalText = "";
    if (goalEl.value === "short") goalText = " | מטרה: קצר";
    if (goalEl.value === "normal") goalText = " | מטרה: רגיל";
    if (goalEl.value === "long") goalText = " | מטרה: ארוך";

    // הצגת סיכום הטיול במצב
    stateEl.innerHTML = "הטיול הסתיים (" + formatTime(seconds) + ")" + goalText;

    // הסרת עיצוב של מצב פעיל
    timerCard.classList.remove("walk-active");
    indicator.style.display = "none";

    // החזרת מצב כפתורים
    btnStart.disabled = false;
    btnEnd.disabled = true;

    // מעבר לדף היסטוריה לאחר השהיה קצרה
    setTimeout(function () {
      window.location.href = "history.html";
    }, 800);
  }

  // חיבור פונקציות לאירועי לחיצה
  btnStart.onclick = startWalk;
  btnEnd.onclick = endWalk;
};
