$(document).ready(function(){
  // let $app = $('#app');
  // let $topBar = $('<div id="top-bar"><span id="title">Unit Converter</span></div>');
  // let $contentContainer = $('<div id="content-container"></div>');
  // let $unitSelector = $('<ul id="unit-selector"></ul>');
  let $unitSelector = $('#unit-selector');
  // let $inOutContainer = $('<div id="in-out-container"></div>');
  // let $inputContainer = $('<div id="input-container"></div>');
  // let $outputContainer = $('<div id="output-container"></div>');

  // $app.append($topBar);
  // $app.append($contentContainer);
  // $contentContainer.append($unitSelector)
  // $contentContainer.append($inOutContainer)
  // $inOutContainer.append($inputContainer)
  // $inOutContainer.append($outputContainer);
  console.log(JSON.stringify(allUnits));

  const changeUnitType = function(e) {
    $('.unit-type').removeClass('selected');
    $(e.target).addClass('selected');
    console.log(e.target.innerHTML);
    renderLeftUnits(e.target.innerHTML);
  }

  const renderLeftUnits = function(unitType) {
    unitType = unitType || 'length';
    $('.left-selections-container li').remove();
    for (let key in allUnits[unitType].subtypes) {
      let $li = $('<li class="unit-subtypes"></li>');
      $($li).html(key);
      $('.left-selections-container').append($li);
    }
  }

  const renderUnitSelector = function() {
    let unitTypes = ['length', 'weight', 'volume', 'speed', 'time'];
    unitTypes.forEach((e, i) => {
      let $listItem = $('<li class="unit-type"></li>');
      if (i === 0) {
        $listItem.addClass('selected')
      }
      $listItem.html(e);
      $listItem.click(changeUnitType);
      $unitSelector.append($listItem);
    });
  }

  renderLeftUnits();
  renderUnitSelector();
});