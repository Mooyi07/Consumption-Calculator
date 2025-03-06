const baseP = document.getElementsByClassName("basePrice");
  for (let i = 0; i < baseP.length; i++){
    baseP[i].innerHTML = (0).toFixed(2);
}
formulaVal(0);
function showHint(str){
  if (str.length == 0){
    return 0;
  }
  initialVal = parseFloat(str);
  for (let i = 0; i < baseP.length; i++){
    baseP[i].innerHTML = parseFloat(initialVal).toFixed(2);
  }
  formulaVal(initialVal); 
}
function formulaVal(value){
  // NEPC RELATED CHARGES
  var distributionCharge = document.getElementById("distCharge").innerHTML = (0.2748 * value).toFixed(2);
  var supplyCharge = document.getElementById("suppCharge").innerHTML = (0.4140 * value).toFixed(2);
  var meteringCharge = document.getElementById("meterCharge").innerHTML = (0.3460 * value).toFixed(2);
  var rfsc = document.getElementById("rfsc").innerHTML = (0.1518 * value).toFixed(2);
  var nepcrc = document.getElementById("npc").innerHTML = (parseFloat(distributionCharge) + parseFloat(supplyCharge) + parseFloat(meteringCharge) + parseFloat(rfsc) + 5).toFixed(2);

  // SUPPLIER RELATED CHARGES
  var generationCharge = document.getElementById("genCharge").innerHTML = (7.3141 * value).toFixed(2);
  var transmissionCharge = document.getElementById("transCharge").innerHTML = (1.3272 * value).toFixed(2);
  var systemLossCharge = document.getElementById("sysLossCharge").innerHTML = (0.9543 * value).toFixed(2);
  var suppRC = document.getElementById("src").innerHTML = (parseFloat(generationCharge) + parseFloat(transmissionCharge) + parseFloat(systemLossCharge)).toFixed(2);

  // SUBSIDIES
  var lifelineRateCharge = document.getElementById("lrc").innerHTML = (0.0006 * value).toFixed(2);
  var seniorCitizenSubsidy = document.getElementById("seniorCitSub").innerHTML = (0.05).toFixed(2);
  var subsidies = document.getElementById("subsidies").innerHTML = (parseFloat(lifelineRateCharge) + parseFloat(seniorCitizenSubsidy)).toFixed(2);

  // GOVERNMENT CHARGES
  var vatonGeneration = document.getElementById("vatGen").innerHTML = (0.5129 * value).toFixed(2);
  document.getElementById("vatOnTrans").innerHTML = transmissionCharge;
  var vatonTransmission = document.getElementById("vatTrans").innerHTML = (0.1200 * parseFloat(transmissionCharge)).toFixed(2); 
  var vatonSystemLoss = document.getElementById("vatSystLoss").innerHTML = (0.0765 * value).toFixed(2);
  document.getElementById("vatDSM").innerHTML = (parseFloat(nepcrc) + parseFloat(subsidies)).toFixed(2);
  var vatDSMandOtherCharges = document.getElementById("vatOtherCharge").innerHTML = (0.1200 * (parseFloat(nepcrc) + parseFloat(subsidies))).toFixed(2); 
  var npcStrandedDebts = document.getElementById("npcStrandDebts").innerHTML = (0.0428 * value).toFixed(2);
  var missionaryElectrification = document.getElementById("missionaryElect").innerHTML = (0.1805 * value).toFixed(2);
  var enviromentalCharge = document.getElementById("enviroCharge").innerHTML = (0.0017 * value).toFixed(2);
  var fitAllowance = document.getElementById("fitAllow").innerHTML = (0.0838 * value).toFixed(2);

  // TOTAL CURRENT BILL AMOUNT
  document.getElementById("totalBill").innerHTML = '₱ ' + number_format((parseFloat(fitAllowance) + parseFloat(enviromentalCharge) + parseFloat(missionaryElectrification) + parseFloat(npcStrandedDebts) + parseFloat(vatDSMandOtherCharges) + parseFloat(vatonSystemLoss) + parseFloat(nepcrc) + parseFloat(subsidies) + parseFloat(suppRC) + parseFloat(vatonGeneration) + parseFloat(vatonTransmission)), 2);
}
function number_format(number, decimals, dec_point, thousands_sep) {
    // *     example: number_format(1234.56, 2, ',', ' ');
    // *     return: '1 234,56'
    number = (number + '').replace(',', '').replace(' ', '');
    var n = !isFinite(+number) ? 0 : +number,
      prec = !isFinite(+decimals) ? 0 : Math.abs(decimals),
      sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
      dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
      s = '',
      toFixedFix = function(n, prec) {
        var k = Math.pow(10, prec);
        return '' + Math.round(n * k) / k;
      };
    // Fix for IE parseFloat(0.55).toFixed(0) = 0;
    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    if (s[0].length > 3) {
      s[0] = s[0].replace(/\B(?=(?:\d{3})+(?!\d))/g, sep);
    }
    if ((s[1] || '').length < prec) {
      s[1] = s[1] || '';
      s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
  }