<? if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();
global $USER;
if(is_object($USER))
{
    $rsUser = CUser::GetList($by, $order, array("ID" => $USER->GetID(),), array("SELECT" => array("UF_INN",),));
    if($arUser = $rsUser->Fetch())
    $arResult['INN'] = $arUser["UF_INN"];
    $arResult['EMAIL'] = $USER->GetEmail();
}
$arResult['TITLE'] = $arParams["TITLE"];
$this->IncludeComponentTemplate();
?>