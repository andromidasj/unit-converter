$(document).ready(function(){
  let $unitSelector = $('#unit-selector');
  let $leftInputField = $('#input-field-left');
  let $rightInputField = $('#input-field-right');

  // Consolidated two functions to a single one,
  // and looks for class 'left' to correctly assign the
  // left and right fields that need to be updated.
  const updateInputField = function(e){
    let thisVal = e.target.value;

    if (_.contains(e.target.classList, 'left')) {
      var sideUpdated = 'left';
      var sideNotUpdated = 'right';
    } else {
      var sideUpdated = 'right';
      var sideNotUpdated = 'left';
    }

    let inputUnit = $(`.unit-subtype-${sideUpdated}.selected`).html();
    let outputUnit = $(`.unit-subtype-${sideNotUpdated}.selected`).html();
    let otherVal = calculateConversion(thisVal, inputUnit, outputUnit);

    $(`#input-field-${sideNotUpdated}`).val(otherVal == 0 ? '' : otherVal);
    // $(`#input-field-${sideUpdated}`).val(thisVal == 0 ? '' : thisVal);
    // $(`#input-field-${sideUpdated}`).val(!parseFloat(thisVal) ? thisVal : parseFloat(thisVal));
  }

  const calculateConversion = function(inputVal, inputUnit, outputUnit) {
    console.log('running calculateConv')
    let outputVal;
    let unitType = $('.unit-type-container.selected').attr('id');
    console.log('unitType:', unitType);
    // console.log('calculating:');
    // console.log(inputVal, inputUnit, 'to', outputUnit);

    // Formula for calculating conversion based on measure_unit;
    outputVal = allUnits[unitType].subtype[inputUnit] * inputVal / allUnits[unitType].subtype[outputUnit];

    // Round to 3 decimal places
    return Math.round(outputVal * 1000) / 1000;
  }

  const changeUnitType = function(e) {
    console.log(e.target);
    $('.unit-type-container').removeClass('selected');
    $(this).addClass('selected');
    console.log('id:', $(this).attr('id'))
    renderUnits($(this).attr('id'));
    $leftInputField.val('');
    $rightInputField.val('');
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

    $(subtypeClass).removeClass('selected');
    $(e.target).addClass('selected');

    let outputUnit = $('.unit-subtype-' + side1 + '.selected').html();
    let inputUnit  = $('.unit-subtype-' + side2 + '.selected').html();

    $(inputField1).val(calculateConversion($(inputField2).val(), inputUnit, outputUnit));
  }

  const renderUnits = function(unitType) {
    // Here we render the units on both the left
    // and right unit list containers
    // under the number input field

    unitType = unitType || 'length'; // Default to Length on refresh
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
        $liLeft.addClass('selected'); // First item on left will be default
      }
      if (counter === 1) {
        $liRight.addClass('selected'); // Second item on right will be default
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
      let $icon = $('<i></i>');
      let $listItem = $('<li class="unit-type"></li>');
      let $container = $('<div class="unit-type-container"></div>');
      if (i === 0) {
        $container.addClass('selected')
      }
      $icon.addClass(allUnits[e].icon);
      $listItem.html(e);
      $container.attr('id', e);
      $container.click(changeUnitType);
      $container.append($icon).append($listItem);
      $unitSelector.append($container);
    });
  }

  $leftInputField.on('input', updateInputField);
  $rightInputField.on('input', updateInputField);

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


  // $('#input-field-left').on('input', function(e){
  //   let thisVal = e.target.value;
  //   let inputUnit = $('.unit-subtype-left.selected').html();
  //   let outputUnit  = $('.unit-subtype-right.selected').html();
  //   let otherVal = calculateConversion(thisVal, inputUnit, outputUnit);
  //   $('#input-field-right').val(otherVal);
  // });

  // $('#input-field-right').on('input', function(e){
  //   let thisVal = e.target.value;
  //   console.log('classes on input field', e.target.classList);
  //   let inputUnit = $('.unit-subtype-right.selected').html();
  //   let outputUnit  = $('.unit-subtype-left.selected').html();
  //   let otherVal = calculateConversion(thisVal, inputUnit, outputUnit);
  //   $('#input-field-left').val(otherVal);
  // });