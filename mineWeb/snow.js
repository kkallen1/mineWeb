const snowContainer = document.getElementById("snow-container");
const snowContent = ['&#10052', '&#10053', '&#10054']

const random = (num) => {
  return Math.floor(Math.random() * num);
};

const getRandomStyles = () => {
  const top = random(100);      // 起始位置
  const left = random(100);     // 起始位置
  const dur = random(10) + 10;  // 動畫持續時間
  const size = random(25) + 25; // 雪花大小
  return `
    top: -${top}%;
    left: ${left}%;
    font-size: ${size}px;
    animation-duration: ${dur}s;
  `;
};

const createSnow = (num) => {
  snowContainer.style.pointerEvents = "none"; // 禁用點擊事件，避免再次觸發
  for (var i = num; i > 0; i--) {
    var snow = document.createElement("div");
    snow.className = "snow";
    snow.style.cssText = getRandomStyles();
    snow.innerHTML = snowContent[random(3)]
    snowContainer.append(snow);
  }
  setTimeout(() => {
    snowContainer.style.pointerEvents = "auto"; // 恢復點擊事件
  }, 500); // 根據雪花生成的時間來設定延遲
}

const removeSnow = () => {
  snowContainer.style.opacity = "0";  // 隱藏容器，若需要可顯示
  setTimeout(() => {
    snowContainer.innerHTML = ''; // 清空雪花容器內容
    snowContainer.style.opacity = "1"; // 恢復顯示
  }, 1000)
};

window.addEventListener("load", () => {
  /* 測試用
  console.log("NOW_background_theme:", NOW_background_theme);
  */

  // 檢查 NOW_background_theme 是否為 'snow'
  if (NOW_background_theme === 'snow') {
    createSnow(30); // 只有當 NOW_background_theme 是 'snow' 時才創建雪花
  }
});

// 點擊背景(snow-container) 3 次，刪除/新增所有雪花
let clickCount = 0; // 記錄點擊次數
let snowRemoved = false; // 記錄雪花是否已經被移除
snowContainer.style.pointerEvents = "auto"; // 開啟點擊事件
snowContainer.addEventListener("click", () => {
  clickCount++; // 每次點擊後增加點擊次數
  
  /* 測試用
  console.log("clickCount:", clickCount); // 在每次點擊後輸出 clickCount
  console.log("snowRemoved:", snowRemoved); // 輸出 snowRemoved 變數
  */

  if (clickCount === 3) {
    if (snowRemoved) {
      snowContainer.style.opacity = "1";
      // 如果雪花已經被移除，則生成雪花
      createSnow(30);
      snowRemoved = false; // 重置雪花狀態
    } else {
      // 如果雪花尚未被移除，則移除雪花
      removeSnow();
      snowRemoved = true; // 設置雪花為已移除狀態
    }
    clickCount = 0; // 重置點擊次數
  }
});