$(document).ready(function(){
  let $unitSelector = $('#unit-selector');

  $('#input-field-left').on('input', function(e){
    let thisVal = e.target.value;
    let inputUnit = $('.unit-subtype-left.selected').html();
    let outputUnit  = $('.unit-subtype-right.selected').html();
    let otherVal = calculateConversion(thisVal, inputUnit, outputUnit);
    $('#input-field-right').val(otherVal);
  });

  $('#input-field-right').on('input', function(e){
    let thisVal = e.target.value;
    let inputUnit = $('.unit-subtype-right.selected').html();
    let outputUnit  = $('.unit-subtype-left.selected').html();
    let otherVal = calculateConversion(thisVal, inputUnit, outputUnit);
    $('#input-field-left').val(otherVal);
  });

  const calculateConversion = function(inputVal, inputUnit, outputUnit) {
    let outputVal;
    let unitType = $('.unit-type.selected').html();
    console.log('calculating...');
    console.log(inputVal, inputUnit, 'to', outputUnit);

    // Formula for calculating conversion based on measure_unit;
    outputVal = allUnits[unitType].subtype[inputUnit] * inputVal / allUnits[unitType].subtype[outputUnit];

    // Round to 3 decimal places
    return Math.round(outputVal * 1000) / 1000;
  }

  const changeUnitType = function(e) {
    $('.unit-type').removeClass('selected');
    $(e.target).addClass('selected');
    renderUnits(e.target.innerHTML);
  }

  const changeUnit = function(e) {
    // TODO: maybe make a better way to find subTypeClass
    // that can account for the classList being in a
    // different order. Even needed? 🤔

    // side1 and unit1 are what is being clicked, calculated and changed.
    // side2 and unit2 are the other side that stays constant.
    let side1 = e.target.classList[0].split('-')[2];
    let side2 = side1 === 'right' ? 'left' : 'right';
    let inputField1 = '#input-field-' + side1;
    let inputField2 = '#input-field-' + side2;
    let subtypeClass = '.' + e.target.classList[0];
    // console.log(e.target.classList)
    // console.log(subtypeClass)
    // console.log(side)
    $(subtypeClass).removeClass('selected');
    $(e.target).addClass('selected');

    // let inputUnit1 = '.unit-subtype-' + side1 + '.selected'
    // let inputUnit2 = '.unit-subtype-' + side2 + '.selected';
    // console.log('inputUnit1', inputUnit1)
    // console.log('inputUnit2', inputUnit2)
    let inputUnit = $('.unit-subtype-'+side2+'.selected').html();
    let outputUnit = $('.unit-subtype-'+side1+'.selected').html();
    console.log(inputUnit, outputUnit)
    console.log(inputField1)
    let outputVal;
    // calculateConversion();
    // console.log(calculateConversion($(inputField2).val(), inputUnit, outputUnit))
    $(inputField1).val(calculateConversion($(inputField2).val(), inputUnit, outputUnit));
  }

  const renderUnits = function(unitType) {
    // Here we render the units on both the left
    // and right unit list containers under the
    // number input field
    unitType = unitType || 'length';
    $('.left-selections-container li').remove();
    $('.right-selections-container li').remove();

    let counter = 0;
    for (let key in allUnits[unitType].subtype) {
      let $liLeft = $('<li class="unit-subtype-left"></li>');
      let $liRight = $('<li class="unit-subtype-right"></li>');
      $liLeft.html(key);
      $liRight.html(key);
      // Set default selected units
      if (counter === 0) {
        $liLeft.addClass('selected');
      }
      if (counter === 1) {
        $liRight.addClass('selected');
      }
      $liLeft.click(changeUnit);
      $liRight.click(changeUnit);
      $('.right-selections-container').append($liRight);
      $('.left-selections-container').append($liLeft);
      counter++;
    }
  }

  const renderUnitTypes = function() {
    let unitTypes = [];
    for (let key in allUnits) {
      unitTypes.push(key);
    }
    unitTypes.sort();
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

  renderUnits();
  renderUnitTypes();
});


  // jQuery method of creating elements, easier to just do in HTML
  // let $app = $('#app');
  // let $topBar = $('<div id="top-bar"><span id="title">Unit Converter</span></div>');
  // let $contentContainer = $('<div id="content-container"></div>');
  // let $unitSelector = $('<ul id="unit-selector"></ul>');
  // let $inOutContainer = $('<div id="in-out-container"></div>');
  // let $inputContainer = $('<div id="input-container"></div>');
  // let $outputContainer = $('<div id="output-container"></div>');


  // $app.append($topBar);
  // $app.append($contentContainer);
  // $contentContainer.append($unitSelector)
  // $contentContainer.append($inOutContainer)
  // $inOutContainer.append($inputContainer)
  // $inOutContainer.append($outputContainer);
