let NOW_background_theme = 'snow'; // 之後要製作 設定-主題 時會用到

function openFolder(folderId) {
  console.log('資料夾被點擊:', folderId);  // 用來檢查是否有觸發事件
  // 顯示視窗並載入資料夾內容
  const window = document.getElementById('window');
  const windowContent = document.getElementById('window-content');

  const folder_show = {
    "folder1":
      `
        <p>個人簡介(尚未撰寫)</p>
      `,
    
    "folder2":
      `
        <p>個人作品(尚未撰寫)</p>
      `,
    
    "setting":
      // 當 setting 被點擊時顯示 Mac 設定視窗
      `
        <h2 style="margin-top: 0;">設定</h2>
        <div id="setting_window_content" class="setting_window_content">
          <div class="setting_left_panel">
            <ul>
              <li id="setting_theme_setting" onclick="setting_loadSettingContent('theme')">主題設定</li>
              <li id="setting_volume_setting" onclick="setting_loadSettingContent('volume')">音量設定</li>
              <li id="setting_wifi_setting" onclick="setting_loadSettingContent('references')">參考資料</li>
            </ul>
          </div>
          <div class="setting_right_panel" id="setting_right_content">
            <!-- 預設右側內容區 -->
            <h2>選擇一個項目</h2>
            <p>目前功能尚未完善，若有想法，歡迎告訴我
              DC: kkallen#9939
            </p>
          </div>
        </div>
      `
  }

  // 根據資料夾名稱顯示對應的內容
  if (folderId === "setting") {
    windowContent.style.display = 'block';  // 顯示內容
  }
  windowContent.innerHTML = folder_show[folderId];  // 使用 innerHTML 顯示 HTML 內容
  
  // 顯示視窗
  window.style.display = 'block';
}

function closeWindow() {
  const window = document.getElementById('window');
  window.style.display = 'none';  // 隱藏視窗，模擬關閉視窗功能
}

// setting 內容
function setting_loadSettingContent(setting) {
  const setting_right_content = document.getElementById('setting_right_content');

  const background_theme = {
    'light': '光明主題(尚未製作)',
    'dark': '暗黑主題(尚未製作)',
    'snow': '下雪',
    'spring': '春天(尚未製作)',
    'summer': '夏天(尚未製作)',
    'fall': '秋天(尚未製作)',
  };

  const setting_settingsContent = {
    theme: `
      <h2>主題設定</h2>
      <div class="setting_mac_setting_item">
        <label for="setting_theme">主題</label>
        <select id="setting_theme" onchange="updateBackgroundTheme()"> 
          ${Object.entries(background_theme).map(([value, label]) => `
            <option value="${value}" ${value === NOW_background_theme ? 'selected' : ''}>${label}</option>
          `).join('')}
        </select>

      </div>
    `,
    volume: `
      <h2>音量設定</h2>
      <div class="setting_mac_setting_item">
        <label for="setting_volume">音量</label>
        <input type="range" id="setting_volume" min="0" max="100" step="1" value="50">
      </div>
    `,
    references: `
      <h2>參考資料</h2>
      <div class="setting_references-content">
        <p>以下是本專案的參考資料：</p>
        <ul>
          <li>下雪效果: <a href="https://www.w3schools.com/" target="_blank">W3Schools</a></li>
          <li>介面靈感: <a href="https://www.apple.com/macos/" target="_blank">Apple macOS</a></li>
          <li>JavaScript 語法: <a href="https://developer.mozilla.org/" target="_blank">MDN Web Docs</a></li>
        </ul>
        <p>其他資源：</p>
        <ul>
          <li>範例程式碼: <a href="https://github.com/" target="_blank">GitHub</a></li>
          <li>學習資源: <a href="https://www.freecodecamp.org/" target="_blank">freeCodeCamp</a></li>
          <li>設計靈感: <a href="https://dribbble.com/" target="_blank">Dribbble</a></li>
        </ul>
      </div>
    `
  };

  setting_right_content.innerHTML = setting_settingsContent[setting];  // 依選擇項目更新右側內容
}

// 根據 NOW_background_theme 進行更新
function updateBackgroundTheme() {
  const setting_theme = document.getElementById('setting_theme');
  NOW_background_theme = setting_theme.value;  // 更新 NOW_background_theme 為選擇的值
  
  // 根據 NOW_background_theme 的值執行相應操作，比如開始下雪
  if (NOW_background_theme === 'snow') {
    createSnow(30);  // 呼叫創建雪花的函數
  } else {
    removeSnow();  // 如果選擇非 'snow'，則移除雪花
  }
}