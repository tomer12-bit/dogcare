<?php
/*
  Screen 2 - Add Action (DogCare)
  This page:
  1. Connects to MySQL database (PDO)
  2. Displays a form for adding a new action (walk/feeding/treatment)
  3. Inserts the action into the table 'actions'
  4. Shows user feedback after saving
*/

/* ---------- DATABASE CONNECTION (PDO) ---------- */
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
$host = "127.0.0.1";          // MySQL host
$port = "3306";               // MySQL port (important in hosting)
$user = "tomerai2";           // DB username
$pass = "N0S9LwhUuDFD";       // DB password
$dbname = "tomerai2_dogcare"; // DB name

$msg = ""; // feedback message

try {

    // Create PDO connection
    $pdo = new PDO(
        "mysql:host=$host;port=$port;dbname=$dbname;charset=utf8mb4",
        $user,
        $pass,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
        ]
    );

} catch (Exception $e) {
    die("DB ERROR: " . $e->getMessage());
}


/* ---------- HANDLE FORM SUBMIT (POST) ---------- */

if ($_SERVER["REQUEST_METHOD"] === "POST") {

    // Read form values
    $type = $_POST["action_type"] ?? "";
    $date = $_POST["action_datetime"] ?? "";
    $duration = $_POST["duration_minutes"] ?? "";
    $food = $_POST["food_grams"] ?? null;
    $by = $_POST["performed_by"] ?? "";
    $notes = $_POST["notes"] ?? "";

    /*
      Insert action into database
      Prepared statements prevent SQL injection
    */
   $stmt = $pdo->prepare("
  INSERT INTO actions
  (action_type, action_datetime, duration_minutes, food_grams, performed_by, notes)
  VALUES (:t, :dt, :dur, :food, :by, :notes)");
  $stmt->execute([
  ":t" => $type,
  ":dt" => $date,
  ":dur" => ($duration === "" ? 0 : (int)$duration),
  ":food" => ($food === "" ? 0 : (int)$food),
  ":by" => $by,
  ":notes" => ($notes === "" ? "" : $notes)
  ]);

    $msg = "הפעולה נשמרה בהצלחה";
    
}
?>

<!doctype html>
<html lang="he" dir="rtl">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>DogCare - שמירת פעולה</title>
  <link rel="stylesheet" href="../css/form.css">
</head>
<body class="app-bg">

<main class="container">
  <section class="card">
    <h2><?php echo htmlspecialchars($msg); ?></h2>

    <div style="margin-top:12px;">
      <a href="form.html">חזרה לטופס</a>
      <span style="margin:0 8px;">|</span>
      <a href="../index.html">חזרה לדף הבית</a>
    </div>
  </section>
</main>

</body>
</html>

