<?
	require($_SERVER["DOCUMENT_ROOT"]."/bitrix/header.php");
	$APPLICATION->SetTitle("Акты сверки");
?>
<? $APPLICATION->IncludeComponent(
	"clientlab:act.collation", 
	".default", 
	array(
		"COMPONENT_TEMPLATE" => ".default",
		"TITLE" => "Заказать акт сверки",
		"COMPOSITE_FRAME_MODE" => "A",
		"COMPOSITE_FRAME_TYPE" => "AUTO"
	),
	false
);?>
<?require($_SERVER["DOCUMENT_ROOT"]."/bitrix/footer.php");?>