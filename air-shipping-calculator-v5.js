$(document).ready(function () {
  const INTERNATIONAL_RATE_PER_KG = 18;
  const MIN_INTERNATIONAL_SHIPPING_COST = 25;

  const HOME_DELIVERY_RATE_PER_KG = 0.60;
  const MIN_HOME_DELIVERY_CHARGE = 3;

  const SHIPMENT_PROTECTION_MIN_VALUE = 100;
  const SHIPMENT_PROTECTION_PERCENTAGE = 5;

  const VOLUMETRIC_DIVISOR = 366;

  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  });

  const weightFormatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });

  function getInputNumber($input) {
    return parseFloat($input.val()) || 0;
  }

  function isValidInput($input) {
    return getInputNumber($input) > 0;
  }

  function updateInputBorder($input, isValid) {
    $input.css({
      'border-color': isValid ? '#737373' : 'red'
    });
  }

  function calculateVolumetricWeight(packageLength, packageWidth, packageHeight) {
    return (packageLength * packageWidth * packageHeight) / VOLUMETRIC_DIVISOR;
  }

  function calculateInternationalShippingCost(chargeableWeight) {
    const internationalShippingCost = chargeableWeight * INTERNATIONAL_RATE_PER_KG;

    return Math.max(
      internationalShippingCost,
      MIN_INTERNATIONAL_SHIPPING_COST
    );
  }

  function calculateHomeDeliveryCost(chargeableWeight) {
    const homeDeliveryCost = chargeableWeight * HOME_DELIVERY_RATE_PER_KG;

    return Math.max(
      homeDeliveryCost,
      MIN_HOME_DELIVERY_CHARGE
    );
  }

  function calculateShipmentProtectionCost(shipmentValue) {
    if (shipmentValue < SHIPMENT_PROTECTION_MIN_VALUE) {
      return 0;
    }

    return (shipmentValue * SHIPMENT_PROTECTION_PERCENTAGE) / 100;
  }

  function getCheckboxInput($element) {
    if ($element.is('input[type="checkbox"]')) {
      return $element;
    }

    const $childCheckbox = $element.find('input[type="checkbox"]').first();

    if ($childCheckbox.length) {
      return $childCheckbox;
    }

    const $parentCheckbox = $element
      .closest('label, .w-checkbox, .w-checkbox-field')
      .find('input[type="checkbox"]')
      .first();

    if ($parentCheckbox.length) {
      return $parentCheckbox;
    }

    return $();
  }

  function initializeShippingCalculator(calculatorElement) {
    const $calculator = $(calculatorElement);

    const $lengthInput = $calculator.find('.js-length-input');
    const $widthInput = $calculator.find('.js-width-input');
    const $heightInput = $calculator.find('.js-height-input');
    const $actualWeightInput = $calculator.find('.js-actual-weight-input');

    const $homeDeliveryCheckbox = getCheckboxInput(
      $calculator.find('.js-home-delivery-checkbox')
    );

    const $shipmentProtectionCheckbox = getCheckboxInput(
      $calculator.find('.js-shipment-protection-checkbox')
    );

    const $shipmentProtectionField = $calculator.find('.js-shipment-protection-field');
    const $shipmentProtectionInput = $calculator.find('.js-shipment-protection-input');

    const $actualWeightOutput = $calculator.find('.js-actual-weight-output');
    const $volumetricWeightOutput = $calculator.find('.js-volumetric-weight-output');
    const $internationalCostOutput = $calculator.find('.js-international-cost-output');
    const $homeDeliveryCostOutput = $calculator.find('.js-home-delivery-cost-output');
    const $shipmentProtectionCostOutput = $calculator.find('.chk-shipment-protection-val, .js-shipment-protection-cost-output');
    const $totalCostOutput = $calculator.find('.js-total-cost-output');

    const $costNote = $calculator.find('.note__about-cost');

    function updateCalculator() {
      const isLengthValid = isValidInput($lengthInput);
      const isWidthValid = isValidInput($widthInput);
      const isHeightValid = isValidInput($heightInput);
      const isActualWeightValid = isValidInput($actualWeightInput);

      updateInputBorder($lengthInput, isLengthValid);
      updateInputBorder($widthInput, isWidthValid);
      updateInputBorder($heightInput, isHeightValid);
      updateInputBorder($actualWeightInput, isActualWeightValid);

      const isShipmentProtectionSelected =
        $shipmentProtectionCheckbox.is(':checked');

      $shipmentProtectionField.toggle(isShipmentProtectionSelected);

      const shipmentProtectionInputValue = isShipmentProtectionSelected
        ? getInputNumber($shipmentProtectionInput)
        : 0;

      const shipmentProtectionCost = isShipmentProtectionSelected
        ? calculateShipmentProtectionCost(shipmentProtectionInputValue)
        : 0;

      $shipmentProtectionCostOutput.text(
        currencyFormatter.format(shipmentProtectionCost)
      );

      const allRequiredFieldsValid =
        isLengthValid &&
        isWidthValid &&
        isHeightValid &&
        isActualWeightValid;

      if (!allRequiredFieldsValid) {
        $costNote.hide();
        return;
      }

      const packageLength = getInputNumber($lengthInput);
      const packageWidth = getInputNumber($widthInput);
      const packageHeight = getInputNumber($heightInput);
      const actualWeight = getInputNumber($actualWeightInput);

      const volumetricWeight = calculateVolumetricWeight(
        packageLength,
        packageWidth,
        packageHeight
      );

      const chargeableWeight = Math.max(
        actualWeight,
        volumetricWeight
      );

      const internationalShippingCost =
        calculateInternationalShippingCost(chargeableWeight);

      const homeDeliveryCost =
        calculateHomeDeliveryCost(chargeableWeight);

      const isHomeDeliverySelected =
        $homeDeliveryCheckbox.is(':checked');

      const finalTotalCost = isHomeDeliverySelected
        ? internationalShippingCost + homeDeliveryCost + shipmentProtectionCost
        : internationalShippingCost + shipmentProtectionCost;

      $actualWeightOutput.text(`${weightFormatter.format(actualWeight)} KG`);

      $volumetricWeightOutput.text(
        `${weightFormatter.format(volumetricWeight)} KG`
      );

      $internationalCostOutput.text(
        currencyFormatter.format(internationalShippingCost)
      );

      $homeDeliveryCostOutput.text(
        currencyFormatter.format(homeDeliveryCost)
      );

      $totalCostOutput.text(
        currencyFormatter.format(finalTotalCost)
      );

      $costNote.show();
    }

    $lengthInput.on('input', updateCalculator);
    $widthInput.on('input', updateCalculator);
    $heightInput.on('input', updateCalculator);
    $actualWeightInput.on('input', updateCalculator);
    $shipmentProtectionInput.on('input', updateCalculator);

    $homeDeliveryCheckbox.on('change', updateCalculator);

    $shipmentProtectionCheckbox.on('change', function () {
      const isChecked = $(this).is(':checked');

      $shipmentProtectionField.toggle(isChecked);

      if (!isChecked) {
        $shipmentProtectionInput.val('');
        $shipmentProtectionCostOutput.text(currencyFormatter.format(0));
      }

      updateCalculator();
    });

    $shipmentProtectionField.hide();
    $shipmentProtectionCostOutput.text(currencyFormatter.format(0));
    $costNote.hide();
  }

  $('.air-shipping-calculator').each(function () {
    initializeShippingCalculator(this);
  });
});
