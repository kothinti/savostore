$( document ).ready(function() {
const INTERNATIONAL_RATE_PER_KG = 18;
const HOME_DELIVERY_RATE_PER_KG = 0.60;
const MIN_HOME_DELIVERY_CHARGE = 3;
const VOLUMETRIC_DIVISOR = 366;
const MIN_INTERNATIONAL_SHIPPING_COST = 25;

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

function inputHasValue($input) {
  return $.trim($input.val()) !== '';
}

function updateInputBorder($input, isValid) {
  $input.css({
    'border-color': isValid ? '#737373' : 'red'
  });
}

function calculateVolumetricWeight(length, width, height) {
  return (length * width * height) / VOLUMETRIC_DIVISOR;
}

function calculateHomeDeliveryCost(chargeableWeight) {
  const homeDeliveryCost = chargeableWeight * HOME_DELIVERY_RATE_PER_KG;
  return Math.max(homeDeliveryCost, MIN_HOME_DELIVERY_CHARGE);
}

function calculateInternationalShippingCost(chargeableWeight) {
	const internationalShippingCost = calculateInternationalShippingCost(chargeableWeight);

  return Math.max(
    internationalShippingCost,
    MIN_INTERNATIONAL_SHIPPING_COST
  );
}
function initializeShippingCalculator(calculatorElement) {
  const $calculator = $(calculatorElement);

  const $lengthInput = $calculator.find('.js-length-input');
  const $widthInput = $calculator.find('.js-width-input');
  const $heightInput = $calculator.find('.js-height-input');
  const $actualWeightInput = $calculator.find('.js-actual-weight-input');

  const $actualWeightOutput = $calculator.find('.js-actual-weight-output');
  const $volumetricWeightOutput = $calculator.find('.js-volumetric-weight-output');
  const $internationalCostOutput = $calculator.find('.js-international-cost-output');
  const $homeDeliveryCostOutput = $calculator.find('.js-home-delivery-cost-output');
  const $totalCostOutput = $calculator.find('.js-total-cost-output');

  const $homeDeliveryCheckbox = $calculator.find('.js-home-delivery-checkbox');
  const $shipmentProtectionCheckbox = $calculator.find('.js-shipment-protection-checkbox');

  const $costNote = $calculator.find('.note__about-cost');

  function updateCalculator() {
    const hasLength = inputHasValue($lengthInput);
    const hasWidth = inputHasValue($widthInput);
    const hasHeight = inputHasValue($heightInput);
    const hasActualWeight = inputHasValue($actualWeightInput);

    updateInputBorder($lengthInput, hasLength);
    updateInputBorder($widthInput, hasWidth);
    updateInputBorder($heightInput, hasHeight);
    updateInputBorder($actualWeightInput, hasActualWeight);

    const allRequiredFieldsFilled =
      hasLength &&
      hasWidth &&
      hasHeight &&
      hasActualWeight;

    if (!allRequiredFieldsFilled) {
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

    const chargeableWeight = Math.max(actualWeight, volumetricWeight);

    const internationalShippingCost =
      chargeableWeight * INTERNATIONAL_RATE_PER_KG;

    const homeDeliveryCost =
      calculateHomeDeliveryCost(chargeableWeight);

    const shipmentProtectionCost = $shipmentProtectionCheckbox.is(':checked')
      ? parseFloat($shipmentProtectionCheckbox.attr('data-shipment-protection-cost')) || 0
      : 0;

    const finalTotalCost = $homeDeliveryCheckbox.is(':checked')
      ? internationalShippingCost + homeDeliveryCost + shipmentProtectionCost
      : internationalShippingCost + shipmentProtectionCost;

    $actualWeightOutput.text(`${actualWeight} KG`);
    $volumetricWeightOutput.text(`${weightFormatter.format(volumetricWeight)} KG`);

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

  $calculator.on('input change', 'input', updateCalculator);
}

$('.js-shipping-calculator').each(function () {
  initializeShippingCalculator(this);
});
	
});
