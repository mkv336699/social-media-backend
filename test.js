var intToRoman = function (num) {
    const NUMERICS = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
    const ROMANS = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
    let answer = "", i = 0;

    while (num > 0) {
        if (num >= NUMERICS[i]) {
            answer += ROMANS[i];
            num -= NUMERICS[i]
        } else {
            i++;
        }
    }

    return answer;
};

console.log(
    intToRoman(20)
);