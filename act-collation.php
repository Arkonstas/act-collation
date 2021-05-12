<? 
require_once($_SERVER["DOCUMENT_ROOT"]."/bitrix/modules/main/include/prolog_before.php");
$username = "******";
$password = "*****";
if ($_POST['action'] == "CodeTT") {
    $host_api = "******?INN=" . $_POST['INN'];
} 
else {
    $host_api = "******?INN=" . $_POST['INN'] . "&CodeТТ=". $_POST['CodeTT'] ."&Data1=".$_POST['DATE_START']."&Data2=" . $_POST['DATE_END'].'&Email='. $_POST['EMAIL'];
}    
$agent = 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.88 Safari/537.36';
// авторизация

$ch = curl_init($host_api);   
// get запрос    
curl_setopt($ch, CURLOPT_USERPWD, $username . ":" . $password);  
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
curl_setopt($ch, CURLOPT_HEADER, false);
$html = curl_exec($ch);

if ($_POST['action'] == "CodeTT" && $html != 'null') {
    $htmls = explode(";", $html);
    $i = 0;
    foreach ($htmls as $key => $html) {
       $codeTT[$i][] = $html;
       if (($key % 2) != 0 && $key != 0) {
        $i ++;
       }
    }
    echo (json_encode($codeTT, JSON_UNESCAPED_UNICODE));
    
}
elseif ($html == 'success') {
        echo json_encode($html);
}
else 
{
    echo 'error';
}


