// Функція для того, щоб текст з'являвся по буквах
function typeText(text, elementId, callback) {
    const element = document.getElementById(elementId);
    element.textContent = ""; // очищаємо текст перед тим, як почати
    let index = 0;
    const delay = 5000 / text.length; // вираховуємо затримку для кожного символу

    // Додаємо кожен символ по черзі з інтервалом
    const typing = setInterval(() => {
        element.textContent += text.charAt(index); // додаємо наступний символ
        index++;
        if (index === text.length) {
            clearInterval(typing); // коли весь текст додано, зупиняємо
            if (callback) callback(); // якщо є callback, то викликаємо його
        }
    }, delay);
}

// Массив з усіма діалогами
const dialogues = [
    {
        text: "ХТО ЦЕ ТУТ ІДЕ?? Що ти тут робиш? Хоча це не важливо, якщо ти тут то ти мені і допоможеш!",
        answers: [
            { text: "Я заблукав, а ти ще хто? Відьма?", next: 1 },
            { text: "Я заблукав, а ти ще хто? Якщо це так то я тобі не буду допомагати!", next: 2 }
        ]
    },
    {
        text: "Це не важливо головне, що ти тут є! Значить ти меді і допоможеш! Як тебе звати путнику?!",
        answers: [
            { text: "Я Денис, а ти?", next: 3 },
            { text: "Це не має значення. Що ти хочеш?", next: 3 }
        ]
    },
    {
        text: "Заблкував він, ха-ха-ха! Так, я відьма, але ти будеш мені допомагати бо в тебе не буде вибору.",
        answers: [
            { text: "Це погроза?", next: 3 },
            { text: "Гаразд, що я маю зробити?", next: 3 }
        ]
    },
    {
        text: "Мені потрібна допомога з пошуком артефактів. Вони в лісі, де повно небезпек.",
        answers: [
            { text: "Я не боюсь, покажи шлях!", next: 4 },
            { text: "Що це за артефакти?", next: 5 }
        ]
    },
    {
        text: "Сміливо. Але ти маєш бути обережним — не всі повертаються звідти.",
        answers: [
            { text: "Я готовий ризикнути!", next: 6 },
            { text: "Може, ти підеш замість мене?", next: 6 }
        ]
    },
    {
        text: "Артефакти — це чарівні каміння, що дає силу керувати вітром та ще багато чого. вони зникли багато років тому.",
        answers: [
            { text: "Звучить цікаво. Де їх шукати?", next: 6 },
            { text: "Можливо, це пастка?", next: 6 }
        ]
    },
    {
        text: "Добре, ти мене переконав. Але є ще дещо: спочатку треба пройти випробування.",
        answers: [
            { text: "Я згоден, які випробування?", next: 7 },
            { text: "Може, краще обійтись без випробувань?", next: 7 }
        ]
    },
    {
        text: "Ти сміливий, але й дурний. Без зілля тобі не обійтись. Хочеш рецепт?",
        answers: [
            { text: "Так, розкажи!", next: 8 },
        ]
    },
    {
        text: "Добре, слухай уважно: піди до мене на задній двір і візьми їх на городі.",
        answers: [
            { text: "Уже йду шукати!", next: null }
        ]
    },
    {
        text: "Без рецепту в тебе шансів майже нема... Але хай буде по-твоєму.",
        answers: [
            { text: "Все одно спробую", next: null },
            { text: "Може, повернуся пізніше", next: null }
        ]
    },
    {
        text: "Добре, слухай уважно: піди до мене на задній двір і візьми їх на городі",
        answers: [
            { text: "Звучить страшно... Але піду!", next: null },
            { text: "Ні, краще залишусь з відьмою", next: null }
        ]
    }
];

// Функція для відображення діалогу за індексом
function showDialogue(index) {
    const dialogue = dialogues[index]; // беремо поточний діалог
    const textElement = document.getElementById('character-text');
    const answersContainer = document.getElementById('answers');

    // Викликаємо функцію для поетапного виведення тексту
    typeText(dialogue.text, 'character-text', () => {
        answersContainer.innerHTML = ""; // очищуємо кнопки для відповідей

        // Якщо є варіанти відповідей, то показуємо їх
        if (dialogue.answers && dialogue.answers.length > 0) {
            answersContainer.style.display = 'block'; // показуємо блок з кнопками
            dialogue.answers.forEach(answer => {
                const button = document.createElement('button'); // створюємо кнопку
                button.textContent = answer.text; // додаємо текст до кнопки
                button.onclick = () => {
                    // якщо є наступний діалог, переходимо до нього
                    if (answer.next !== null) {
                        showDialogue(answer.next);
                    } else {
                        // якщо це кінцева відповідь, ховаємо кнопки і показуємо кінцеве повідомлення
                        answersContainer.style.display = 'none';
                        typeText("Кінець цього діалогу. Але пригоди тільки починаються...", 'character-text', () => {
                            showReturnButton(); // показуємо кнопку для повернення
                        });
                    }
                };
                answersContainer.appendChild(button); // додаємо кнопку до контейнера
            });
        } else {
            answersContainer.style.display = 'none'; // якщо відповідей нема, ховаємо блок з кнопками
        }
    });
}

// Функція для показу кнопки повернення в меню
function showReturnButton() {
    const answersContainer = document.getElementById('answers');
    answersContainer.innerHTML = ""; // очищуємо кнопки

    const returnButton = document.createElement('button'); // створюємо кнопку повернення
    returnButton.textContent = "Повернутися в меню"; // текст кнопки
    returnButton.onclick = () => {
        window.location.href = "index.html"; // переходимо на головну сторінку
    };
    answersContainer.appendChild(returnButton); // додаємо кнопку до контейнера
    answersContainer.style.display = 'block'; // показуємо кнопку
}

// Починаємо з першого діалогу, коли сторінка повністю завантажиться
document.addEventListener("DOMContentLoaded", () => {
    showDialogue(0);
});
