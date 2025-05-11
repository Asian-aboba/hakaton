// Показати першу фразу героя на 4 секунди
setTimeout(() => {
    document.getElementById('first-phrase').style.display = 'none';
  
    // Після зникнення фрази — зʼявляється фон та відьма
    document.getElementById('yard').style.backgroundImage = "url('gorod.png')";
    document.getElementById('witch-image').style.display = 'block';
  }, 4000);
  
  let clickedItems = 0;
  const items = document.querySelectorAll('.magic-item');
  
  items.forEach(item => {
    item.addEventListener('click', () => {
      if (!item.classList.contains('clicked')) {
        item.classList.add('clicked');
        clickedItems++;
      }
  
      if (clickedItems === 3) {
        startTransition();
      }
    });
  });
  
  function startTransition() {
    document.getElementById('fade').style.opacity = '1';
  
    setTimeout(() => {
      document.getElementById('yard').style.display = 'none';
      document.getElementById('fade').style.opacity = '0';
      document.getElementById('house').style.display = 'block';
      document.getElementById('dialogue-box').style.display = 'block';
      nextLine(); // Запускаємо перший діалог
    }, 3000);
  }
  
  const dialogue = [
    "Відьма: Ну що там? Зібрав все, що потрібно? Чи ти настількі незграбний, що навіть це не зробив?",
    "Ти: Знайшов, знайшов, а ти давай готуй своє зілля.",
    "Відьма:Ну що? Готовий піти за артифактами?.",
    "Ти: Звісно готовий! Я не такий боязливий як ти!",
    "Відьма: Добре. ",
    "Ти: А чому ти сама не підеш за цими артифактами?",
    "Відьма: Тому що не молода вже для такого",
    "Ти: Ага, не молода вона вже.",
    "Відьма: бери своє зілля та йді до Deva's Valley"
  ];
  
  let lineIndex = 0;
  let typingSpeed = 40; // мілісекунд на символ
  
  function nextLine() {
    const text = document.getElementById('dialogue-text');
    const button = document.getElementById('next-btn');
    button.disabled = true;
    text.textContent = '';
  
    if (lineIndex < dialogue.length) {
      let currentText = dialogue[lineIndex];
      let charIndex = 0;
  
      let typeInterval = setInterval(() => {
        text.textContent += currentText.charAt(charIndex);
        charIndex++;
  
        if (charIndex === currentText.length) {
          clearInterval(typeInterval);
          lineIndex++;
  
          // Активувати кнопку через 1 секунду
          setTimeout(() => {
            button.disabled = false;
          }, 1000);
        }
      }, typingSpeed);
    } else {
      // Кінець діалогу — показуємо завершення рівня
      showEndOfLevel();
    }
  }
  
  function showEndOfLevel() {
    const dialogueBox = document.getElementById('dialogue-box');
    const text = document.getElementById('dialogue-text');
    const button = document.getElementById('next-btn');
  
    text.innerHTML = "🔮 <strong>Рівень 2 завершено!</strong><br>Ти отримав магічний еліксир і зробив перший крок до артефактів.";
    button.style.display = 'none';
  
    const backButton = document.createElement('button');
    backButton.textContent = "🏠 Головне меню";
    backButton.onclick = () => {
      window.location.href = 'index.html';
    };
  
    const nextLevelButton = document.createElement('button');
    nextLevelButton.textContent = "➡️ Перейти до рівня 3";
    nextLevelButton.style.marginLeft = '10px';
    nextLevelButton.onclick = () => {
      window.location.href = 'kvest3.html';
    };
  
    dialogueBox.appendChild(backButton);
    dialogueBox.appendChild(nextLevelButton);
  }
  
  function goToWitchHouse() {
    fadeToBlack(() => {
      document.body.style.backgroundImage = "url('https://img6.arthub.ai/64ad2ece-4da6.webp')";
  
      const witchImage = document.getElementById('vedma.png');
      if (witchImage) {
        witchImage.style.display = 'block';
      }
  
      document.getElementById('dialogue-box').style.display = 'block';
      nextLine();
    });
  }
  