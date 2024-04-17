<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Twoje Bingo</title>
    <link rel="stylesheet" href="styleBingo.css">
    <script src="bingoJs.js" defer></script>
    <script src="script.js" defer></script>

</head>
<body>
    <?php 
        function createBingoArray($size) {
            $bingoArray = [];
            for($i = 1; $i <= $size * $size; $i++){
                $bingoArray[$i - 1] = $_POST['input' . $i];
            }
            return $bingoArray;
        }

        $isLargeBingo = isset($_POST['input15']);
        $bingoNumbers = createBingoArray($isLargeBingo ? 5 : 3);
        // shuffle($bingoNumbers);
        $bingoNumbersJSON = json_encode($bingoNumbers);
    ?>
    <div id="dane" data-associated-tab='<?php echo htmlspecialchars($bingoNumbersJSON); ?>'></div>
    <div class="table-wrapper">
        <table id="table"></table>
        <p id="resultBingo"></p></body>
    </div>
</html>