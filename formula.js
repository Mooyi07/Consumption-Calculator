const baseP = document.getElementsByClassName("basePrice");

updateBasePrice(0); // Initialize with 0
formulaVal(0);      // Initialize with 0

// Optional: debounce for input field
let debounceTimer;
function debounceShowHint(str) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => showHint(str), 300);
}


function updateBasePrice(value) {
    const formattedValue = value.toFixed(2);
    for (let i = 0; i < baseP.length; i++) {
        baseP[i].innerHTML = formattedValue;
    }
}

function showHint(str) {
    const initialVal = str.length ? parseFloat(str) : 0;
    updateBasePrice(initialVal);
    formulaVal(initialVal);
}

function setValue(id, amount) {
    const el = document.getElementById(id);
    if (el) el.innerHTML = amount.toFixed(2);
    return amount;
}

function charge(id, rate, base) {
    return setValue(id, rate * base);
}

function formulaVal(value) {
    const charges = {
        distCharge: 0.2748, suppCharge: 0.4140, meterCharge: 0.3460, rfsc: 0.1518,
        genCharge: 7.1897, transCharge: 1.5632, sysLossCharge: 1.0241, lrc: 0.0007,
        vatGen: 0.5602, vatTransRate: 0.1200, vatSysLoss: 0.0900, npcStrandDebts: 0.0428,
        missionaryElect: 0.1949, enviroCharge: 0.0044, fitAllow: 0.1189, seniorCitSub: 0.0010
    };

    const nepcrc = setValue("npc",
        charge("distCharge", charges.distCharge, value) +
        charge("suppCharge", charges.suppCharge, value) +
        charge("meterCharge", charges.meterCharge, value) +
        charge("rfsc", charges.rfsc, value) + 5
    );

    const suppRC = setValue("src",
        charge("genCharge", charges.genCharge, value) +
        charge("transCharge", charges.transCharge, value) +
        charge("sysLossCharge", charges.sysLossCharge, value)
    );

    const subsidies = setValue("subsidies",
        charge("lrc", charges.lrc, value) + charges.seniorCitSub
    );

    charge("vatGen", charges.vatGen, value);
    charge("vatTrans", charges.vatTransRate, suppRC);
    charge("vatSystLoss", charges.vatSysLoss, value);

    const vatOther = charges.vatTransRate * (nepcrc + subsidies);
    setValue("vatOtherCharge", vatOther);

    setValue("vatDSM", nepcrc + subsidies);

    charge("npcStrandDebts", charges.npcStrandDebts, value);
    charge("missionaryElect", charges.missionaryElect, value);
    charge("enviroCharge", charges.enviroCharge, value);
    charge("fitAllow", charges.fitAllow, value);

    const total = nepcrc + subsidies + suppRC +
        charges.vatGen * value +
        charges.vatTransRate * suppRC +
        charges.vatSysLoss * value +
        vatOther +
        charges.npcStrandDebts * value +
        charges.missionaryElect * value +
        charges.enviroCharge * value +
        charges.fitAllow * value;

    document.getElementById("totalBill").innerHTML = formatCurrency(total);
}

function formatCurrency(value) {
    return '₱ ' + number_format(value, 2);
}

function number_format(number, decimals = 2, dec_point = '.', thousands_sep = ',') {
    return number.toLocaleString(undefined, {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals
    });
}
