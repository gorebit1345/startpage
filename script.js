/**
 * Modern Dark Glassmorphism Startpage Application Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- Default State ---
  const DEFAULT_SHORTCUTS = [
    { id: '1', key: 'gemini', title: 'Gemini', url: 'https://gemini.google.com', icon: 'gemini' },
    { id: '2', key: 'civitai', title: 'Civitai Red', url: 'https://civitai.red/', icon: 'civitai' },
    { id: '3', key: 'huggingface', title: 'Hugging Face', url: 'https://huggingface.co', icon: 'huggingface' },
    { id: '4', key: 'fmhy', title: 'FMHY', url: 'https://fmhy.net', icon: 'fmhy' }
  ];

  const SEARCH_ENGINES = {
    brave: {
      name: 'Brave',
      url: 'https://search.brave.com/search?q=',
      placeholder: 'Search with Brave or enter URL...'
    },
    yandex: {
      name: 'Yandex',
      url: 'https://yandex.com/search/?text=',
      placeholder: 'Search with Yandex or enter URL...'
    }
  };

  // --- App State ---
  let state = {
    userName: localStorage.getItem('startpage_username') || 'Friend',
    timeFormat: localStorage.getItem('startpage_timeformat') || '12',
    theme: localStorage.getItem('startpage_theme') || 'violet',
    searchEngine: localStorage.getItem('startpage_searchengine') || 'brave',
    focus: localStorage.getItem('startpage_focus') || '',
    shortcuts: JSON.parse(localStorage.getItem('startpage_v4_shortcuts')) || DEFAULT_SHORTCUTS,
    todos: JSON.parse(localStorage.getItem('startpage_todos')) || []
  };

  // --- DOM Elements ---
  const clockEl = document.getElementById('clock');
  const greetingEl = document.getElementById('greeting');
  const dateEl = document.getElementById('date');
  const searchForm = document.getElementById('searchForm');
  const searchInput = document.getElementById('searchInput');
  const engineBtns = document.querySelectorAll('.engine-btn');
  const shortcutsGrid = document.getElementById('shortcutsGrid');
  const openAddShortcutBtn = document.getElementById('openAddShortcutBtn');
  const shortcutModal = document.getElementById('shortcutModal');
  const closeShortcutModal = document.getElementById('closeShortcutModal');
  const cancelShortcutBtn = document.getElementById('cancelShortcutBtn');
  const shortcutForm = document.getElementById('shortcutForm');
  const shortcutIdInput = document.getElementById('shortcutId');
  const shortcutTitleInput = document.getElementById('shortcutTitle');
  const shortcutUrlInput = document.getElementById('shortcutUrl');
  const shortcutIconInput = document.getElementById('shortcutIcon');

  const focusInput = document.getElementById('focusInput');
  const todoForm = document.getElementById('todoForm');
  const todoInput = document.getElementById('todoInput');
  const todoList = document.getElementById('todoList');
  const taskCounter = document.getElementById('taskCounter');

  const openSettingsBtn = document.getElementById('openSettingsBtn');
  const settingsModal = document.getElementById('settingsModal');
  const closeSettingsModal = document.getElementById('closeSettingsModal');
  const userNameInput = document.getElementById('userNameInput');
  const timeFormatSelect = document.getElementById('timeFormatSelect');
  const themeSwatches = document.querySelectorAll('.theme-swatch');
  const exportDataBtn = document.getElementById('exportDataBtn');
  const resetDefaultsBtn = document.getElementById('resetDefaultsBtn');

  // --- Initialization ---
  function init() {
    // Auto-migrate Civitai Red URL if stored as civitai.com
    state.shortcuts.forEach(s => {
      if (s.title.toLowerCase().includes('civitai') && !s.url.includes('civitai.red')) {
        s.url = 'https://civitai.red/';
      }
    });

    applyTheme(state.theme);
    setSearchEngine(state.searchEngine);
    updateClock();
    setInterval(updateClock, 1000);
    renderShortcuts();
    renderTodos();
    focusInput.value = state.focus;

    userNameInput.value = state.userName;
    timeFormatSelect.value = state.timeFormat;

    setupEventListeners();
  }

  // --- Theme Management ---
  function applyTheme(themeName) {
    state.theme = themeName;
    document.documentElement.setAttribute('data-theme', themeName);
    localStorage.setItem('startpage_theme', themeName);

    themeSwatches.forEach(swatch => {
      if (swatch.dataset.theme === themeName) {
        swatch.classList.add('active');
      } else {
        swatch.classList.remove('active');
      }
    });
  }

  // --- Clock & Greeting ---
  function updateClock() {
    const now = new Date();
    let hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    let ampm = '';

    if (state.timeFormat === '12') {
      ampm = hours >= 12 ? ' PM' : ' AM';
      hours = hours % 12 || 12;
    }

    const timeString = `${String(hours).padStart(2, '0')}:${minutes}:${seconds}${ampm}`;
    clockEl.textContent = timeString;

    // Greeting logic
    const currentHour = now.getHours();
    let greetingText = 'Good evening';
    if (currentHour < 12) {
      greetingText = 'Good morning';
    } else if (currentHour < 18) {
      greetingText = 'Good afternoon';
    }

    greetingEl.textContent = `${greetingText}, ${state.userName}`;

    // Date formatting
    const options = { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' };
    dateEl.textContent = now.toLocaleDateString(undefined, options);
  }

  // --- Search Functionality ---
  function setSearchEngine(engineKey) {
    if (!SEARCH_ENGINES[engineKey]) engineKey = 'brave';
    state.searchEngine = engineKey;
    localStorage.setItem('startpage_searchengine', engineKey);

    engineBtns.forEach(btn => {
      if (btn.dataset.engine === engineKey) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    searchInput.placeholder = SEARCH_ENGINES[engineKey].placeholder;
  }

  searchForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const query = searchInput.value.trim();
    if (!query) return;

    // Check if input is a valid direct URL
    const urlPattern = /^(https?:\/\/)?([\w\-]+\.)+[\w\-]+(\/[^\s]*)?$/i;
    if (urlPattern.test(query)) {
      const targetUrl = query.startsWith('http://') || query.startsWith('https://') ? query : `https://${query}`;
      window.location.href = targetUrl;
    } else {
      const engine = SEARCH_ENGINES[state.searchEngine];
      window.location.href = `${engine.url}${encodeURIComponent(query)}`;
    }
  });

  engineBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      setSearchEngine(btn.dataset.engine);
    });
  });

  // Hotkey '/' to focus search input
  document.addEventListener('keydown', (e) => {
    if (e.key === '/' && document.activeElement !== searchInput && document.activeElement.tagName !== 'INPUT') {
      e.preventDefault();
      searchInput.focus();
    } else if (e.key === 'Escape') {
      closeModal(shortcutModal);
      closeModal(settingsModal);
    }
  });

  // --- Shortcuts Management ---
  function renderShortcuts() {
    shortcutsGrid.innerHTML = '';

    state.shortcuts.forEach((item) => {
      const card = document.createElement('a');
      card.className = 'shortcut-card';
      card.href = item.url;
      card.target = '_self';

      let domain = '';
      try {
        domain = new URL(item.url).hostname;
      } catch (e) {
        domain = item.url;
      }

      let customSvg = null;
      if (typeof CUSTOM_ICONS !== 'undefined') {
        if (item.key && CUSTOM_ICONS[item.key]) {
          customSvg = CUSTOM_ICONS[item.key];
        } else {
          const titleLower = item.title.toLowerCase();
          if (titleLower.includes('gemini')) customSvg = CUSTOM_ICONS.gemini;
          else if (titleLower.includes('civitai')) customSvg = CUSTOM_ICONS.civitai;
          else if (titleLower.includes('hugging') || titleLower.includes('hf')) customSvg = CUSTOM_ICONS.huggingface;
          else if (titleLower.includes('fmhy')) customSvg = CUSTOM_ICONS.fmhy;
        }
      }

      let iconContent = '';
      if (customSvg) {
        iconContent = customSvg;
      } else if (item.icon && item.icon.length <= 4 && (!typeof CUSTOM_ICONS !== 'undefined' || !CUSTOM_ICONS[item.icon])) {
        iconContent = item.icon;
      } else {
        const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
        iconContent = `<img src="${faviconUrl}" alt="${item.title}" onerror="this.onerror=null; this.parentNode.innerText='🌐'">`;
      }

      card.innerHTML = `
        <button class="shortcut-delete-btn" data-id="${item.id}" title="Remove Shortcut">&times;</button>
        <div class="shortcut-icon-wrapper">${iconContent}</div>
        <div class="shortcut-title">${escapeHtml(item.title)}</div>
      `;

      // Handle delete button click without opening link
      const delBtn = card.querySelector('.shortcut-delete-btn');
      delBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        deleteShortcut(item.id);
      });

      shortcutsGrid.appendChild(card);
    });

    saveShortcuts();
  }

  function deleteShortcut(id) {
    state.shortcuts = state.shortcuts.filter(s => s.id !== id);
    renderShortcuts();
  }

  function saveShortcuts() {
    localStorage.setItem('startpage_v4_shortcuts', JSON.stringify(state.shortcuts));
  }

  shortcutForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = shortcutTitleInput.value.trim();
    let url = shortcutUrlInput.value.trim();
    const icon = shortcutIconInput.value.trim();

    if (!title || !url) return;

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }

    const newShortcut = {
      id: Date.now().toString(),
      title,
      url,
      icon
    };

    state.shortcuts.push(newShortcut);
    renderShortcuts();
    closeModal(shortcutModal);
    shortcutForm.reset();
  });

  openAddShortcutBtn.addEventListener('click', () => openModal(shortcutModal));
  closeShortcutModal.addEventListener('click', () => closeModal(shortcutModal));
  cancelShortcutBtn.addEventListener('click', () => closeModal(shortcutModal));

  // --- Daily Focus & Tasks ---
  focusInput.addEventListener('input', (e) => {
    state.focus = e.target.value;
    localStorage.setItem('startpage_focus', state.focus);
  });

  function renderTodos() {
    todoList.innerHTML = '';
    let completedCount = 0;

    state.todos.forEach((todo, index) => {
      if (todo.completed) completedCount++;

      const li = document.createElement('li');
      li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
      li.innerHTML = `
        <div class="todo-content">
          <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''} data-index="${index}">
          <span class="todo-text">${escapeHtml(todo.text)}</span>
        </div>
        <button class="todo-del-btn" data-index="${index}">&times;</button>
      `;

      todoList.appendChild(li);
    });

    taskCounter.textContent = `${completedCount} of ${state.todos.length} done`;
    localStorage.setItem('startpage_todos', JSON.stringify(state.todos));
  }

  todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (!text) return;

    state.todos.push({ text, completed: false });
    todoInput.value = '';
    renderTodos();
  });

  todoList.addEventListener('click', (e) => {
    if (e.target.classList.contains('todo-checkbox')) {
      const idx = e.target.dataset.index;
      state.todos[idx].completed = e.target.checked;
      renderTodos();
    } else if (e.target.classList.contains('todo-del-btn')) {
      const idx = e.target.dataset.index;
      state.todos.splice(idx, 1);
      renderTodos();
    }
  });

  // --- Settings Modal ---
  openSettingsBtn.addEventListener('click', () => openModal(settingsModal));
  closeSettingsModal.addEventListener('click', () => closeModal(settingsModal));

  userNameInput.addEventListener('input', (e) => {
    state.userName = e.target.value.trim() || 'Friend';
    localStorage.setItem('startpage_username', state.userName);
    updateClock();
  });

  timeFormatSelect.addEventListener('change', (e) => {
    state.timeFormat = e.target.value;
    localStorage.setItem('startpage_timeformat', state.timeFormat);
    updateClock();
  });

  themeSwatches.forEach(swatch => {
    swatch.addEventListener('click', () => {
      applyTheme(swatch.dataset.theme);
    });
  });

  exportDataBtn.addEventListener('click', () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(state, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `startpage_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  });

  resetDefaultsBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to reset all startpage data to defaults?')) {
      localStorage.clear();
      state = {
        userName: 'Friend',
        timeFormat: '12',
        theme: 'violet',
        searchEngine: 'brave',
        focus: '',
        shortcuts: DEFAULT_SHORTCUTS,
        todos: []
      };
      init();
      closeModal(settingsModal);
    }
  });

  // --- Modal Helpers ---
  function openModal(modal) {
    modal.classList.add('active');
  }

  function closeModal(modal) {
    modal.classList.remove('active');
  }

  function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
  }

  // Run initialization
  init();
});
