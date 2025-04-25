const testCase1 = {
    "keys": {
        "n": 4,
        "k": 3
    },
    "1": {
        "base": "10",
        "value": "4"
    },
    "2": {
        "base": "2",
        "value": "111"
    },
    "3": {
        "base": "10",
        "value": "12"
    },
    "6": {
        "base": "4",
        "value": "213"
    }
};

const testCase2 = {
    "keys": {
        "n": 10,
        "k": 7
    },
    "1": {
        "base": "6",
        "value": "13444211440455345511"
    },
    "2": {
        "base": "15",
        "value": "aed7015a346d63"
    },
    "3": {
        "base": "15",
        "value": "6aeeb69631c227c"
    },
    "4": {
        "base": "16",
        "value": "e1b5e05623d881f"
    },
    "5": {
        "base": "8",
        "value": "316034514573652620673"
    },
    "6": {
        "base": "3",
        "value": "2122212201122002221120200210011020220200"
    },
    "7": {
        "base": "3",
        "value": "20120221122211000100210021102001201112121"
    },
    "8": {
        "base": "6",
        "value": "20220554335330240002224253"
    },
    "9": {
        "base": "12",
        "value": "45153788390a1255483"
    },
    "10": {
        "base": "7",
        "value": "1101613130313526312514143"
    }
};

function decodeValue(value, base) {
    return BigInt(parseInt(value, base));
}

function lagrangeInterpolation(points, k) {
    let constant = 0n;
    for (let i = 0; i < k; i++) {
        let { x, y } = points[i];
        x = BigInt(x);
        y = BigInt(y);
        let numerator = y;
        let denominator = 1n;
        for (let j = 0; j < k; j++) {
            if (i !== j) {
                let xj = BigInt(points[j].x);
                numerator *= (0n - xj);
                denominator *= (x - xj);
            }
        }
        if (denominator < 0n) {
            denominator = -denominator;
            numerator = -numerator;
        }
        constant += (numerator + denominator - 1n) / denominator;
    }
    return constant < 0n ? -constant : constant;
}

function processTestCase(data) {
    const { n, k } = data.keys;
    const points = [];
    for (let key in data) {
        if (key !== 'keys') {
            const x = parseInt(key);
            const { base, value } = data[key];
            const y = decodeValue(value, parseInt(base));
            points.push({ x, y });
        }
    }
    if (points.length < k) {
        throw new Error('Not enough points to reconstruct the polynomial');
    }
    return lagrangeInterpolation(points.slice(0, k), k);
}

function main() {
    console.log(processTestCase(testCase1).toString());
    console.log(processTestCase(testCase2).toString());
}

main();