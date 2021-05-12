<? if(!defined("B_PROLOG_INCLUDED") || B_PROLOG_INCLUDED!==true)die();?>
    <div class="row act-collation">
      <?if(!empty($arResult['TITLE'])):?>
        <h5><?=$arResult['TITLE']?></h5>
      <?endif;?>
      <input name="INN" value ="<?=$arResult["INN"]?>" type="hidden">
      <input name="EMAIL" value ="<?=$arResult["EMAIL"]?>" type="hidden">
      <div id="reportrange" style="display: none; background: #fff; cursor: pointer; padding: 5px 10px; border: 1px solid #ccc; width: 100%">
          <i class="fa fa-calendar"></i>&nbsp;
          <span></span> <i class="fa fa-caret-down"></i>
      </div>
      <div class="codeTT" style="display: none;">
        <select name="codeTT">

        </select>
      </div>
      <div class="error"></div>
      <span class="btn btn-default has-spinner code-tt-btn"><?=GetMessage('ADRESS_POINTS_TITLE');?></span>
  </div>
