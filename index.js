const configInput = () => {
  const input = document.querySelector('label > input');

  input.addEventListener('keydown', (e) => {
    input.value = ''

    const buttons = document.querySelectorAll('div > button');
    buttons.forEach(btn => {
      btn.innerHTML = e[btn.id];
    })
  })
}

const configButtons = () => {
  const buttons = document.querySelectorAll('div > button');
  buttons.forEach(btn => {
    const copy = async () => {
      const data = await chrome.storage.sync.get();

      const text = data.dev && btn.id !== 'keyCode'? `'${btn.innerHTML}'` : btn.innerHTML;
      navigator.clipboard.writeText(text);
    
      const animateClick = () => {
        msg = document.querySelector('#msg');
        msg.innerHTML = 'copied !!!';
    
        btn.style.transform = 'scale(1.1)'
    
        setTimeout(() => {
          msg.innerHTML = '';
          btn.style.transform = 'scale(1)'
        }, .5*1000);
      }
      animateClick();
    }
    btn.addEventListener('click', async () => {
      btn.innerHTML !== '...'? await copy() : null;
    })
  })
}

const configModes = () => {
  const modes = document.querySelectorAll('li');

  alterThemeMode = (isDark) => {
    const themesColor = {
      // [dark, light] //
      main: ['#1a1932', '#fff'],
      second: ['#fff', '#1a1932'],
      third: ['#db3ffd', '#ed7614']
    }

    const root = document.documentElement;
    const index = isDark? 0 : 1;

    Object.keys(themesColor).forEach(key => {
      console.log(key, themesColor[key][index])
      root.style.setProperty(`--${key}-color`, themesColor[key][index])
    })
  }

  modes.forEach(async mode => {
    const data = await chrome.storage.sync.get();
    const id = mode.id;
    mode.dataset.active = `${data[id]}`
    id === 'theme'? alterThemeMode(data[id]) : null;

    mode.addEventListener('click', () => {
      const isActive = mode.dataset.active === 'true';
      mode.dataset.active = `${!isActive}`;
      id === 'theme'? alterThemeMode(!isActive) : null;

      chrome.storage.sync.set({ [id]: !isActive });
    })
  })
}

const init = () => {
  configInput();
  configButtons();
  configModes();
}

init();