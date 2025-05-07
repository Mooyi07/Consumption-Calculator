const baseP = document.getElementsByClassName("basePrice");

updateBasePrice(0); // Initialize with 0
formulaVal(0); // Initialize with 0

function updateBasePrice(value) {
    const formattedValue = value.toFixed(2);
    for (let i = 0; i < baseP.length; i++) {
        baseP[i].innerHTML = formattedValue;
    }
}

function showHint(str) {
    initialVal = str.length ? parseFloat(str) : 0;
    updateBasePrice(initialVal);
    formulaVal(initialVal);
}

function formulaVal(value) {
    const charges = {
        distCharge: 0.2748, suppCharge: 0.4140, meterCharge: 0.3460, rfsc: 0.1518,
        genCharge: 7.1897, transCharge: 1.5632, sysLossCharge: 1.0241, lrc: 0.0007,
        vatGen: 0.5602, vatTransRate: 0.1200, vatSysLoss: 0.0900, npcStrandDebts: 0.0428,
        missionaryElect: 0.1949, enviroCharge: 0.0044, fitAllow: 0.1189, seniorCitSub: 0.0010
    };

    function setValue(id, amount) {
        document.getElementById(id).innerHTML = amount.toFixed(2);
        return amount;
    }

    const nepcrc = setValue("npc", 
        setValue("distCharge", charges.distCharge * value) +
        setValue("suppCharge", charges.suppCharge * value) +
        setValue("meterCharge", charges.meterCharge * value) +
        setValue("rfsc", charges.rfsc * value) + 5);

    const suppRC = setValue("src", 
        setValue("genCharge", charges.genCharge * value) +
        setValue("transCharge", charges.transCharge * value) +
        setValue("sysLossCharge", charges.sysLossCharge * value));

    const subsidies = setValue("subsidies", 
        setValue("lrc", charges.lrc * value) + charges.seniorCitSub);

    setValue("vatGen", charges.vatGen * value);
    setValue("vatTrans", charges.vatTransRate * suppRC);
    setValue("vatSystLoss", charges.vatSysLoss * value);
    setValue("vatOtherCharge", charges.vatTransRate * (nepcrc + subsidies));
    setValue("vatDSM", nepcrc + subsidies);
    setValue("npcStrandDebts", charges.npcStrandDebts * value);
    setValue("missionaryElect", charges.missionaryElect * value);
    setValue("enviroCharge", charges.enviroCharge * value);
    setValue("fitAllow", charges.fitAllow * value);

    document.getElementById("totalBill").innerHTML = '₱ ' + number_format(
        nepcrc + subsidies + suppRC + (charges.vatGen * value) + (charges.vatTransRate * suppRC) + 
        (charges.vatSysLoss * value) + (charges.vatTransRate * (nepcrc + subsidies)) +
        (charges.npcStrandDebts * value) + (charges.missionaryElect * value) +
        (charges.enviroCharge * value) + (charges.fitAllow * value), 2);
}

function number_format(number, decimals = 2, dec_point = '.', thousands_sep = ',') {
    return number.toLocaleString(undefined, { minimumFractionDigits: decimals, maximumFractionDigits: decimals });
}
