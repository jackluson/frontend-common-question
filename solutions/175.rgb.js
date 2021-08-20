function rgb2hex(str) {
  const reg = /^rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)$/;
  return str.replace(reg, (_, $1, $2, $3) => {
    const firstByte = parseInt($1).toString(16).padStart(2, 0).toUpperCase();
    const secondByte = parseInt($2).toString(16).padStart(2, 0).toUpperCase();
    const thridByte = parseInt($3).toString(16).padStart(2, 0).toUpperCase();
    return `#${firstByte}${secondByte}${thridByte}`;
  });
}

function rgb2hexV2(str) {
  // const reg = /^rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)$/;
  const matchRes = str.match(/\d+/g);
  console.log("matchRes", matchRes);
  return matchRes.reduce(
    (pre, cur) => pre + parseInt(cur).toString(16).padStart(2, 0).toUpperCase(),
    "#"
  );
}

let inputStr = "rgb(255, 255, 255)";

let res = rgb2hexV2(inputStr);
console.log("res", res);

// console.log((11).toString(16).padStart(2, 0));
