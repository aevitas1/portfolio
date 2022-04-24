"use strict";
class Card {
    constructor(cardObject) {
        this.card1 = cardObject.card1;
        this.card2 = cardObject.card2;
        this.set = cardObject.set;
        this.sound = cardObject.sound;
    }
};

let myCardArray = [];
fetch("js/cards.json")
.then(response => response.json())
.then(data => {
    myCardArray = data.map(card => new Card(card));
    memoryGame();
    let top = document.querySelector('.bottom-container');
    let buttonDiv = document.createElement("div");
    buttonDiv.setAttribute("class", "buttonDiv");
    let newButton = document.createElement("i");
    newButton.setAttribute("onclick", "muteAudio");
    newButton.setAttribute("id", "muteAudio"); 
    newButton.setAttribute("class", "fas fa-volume-up");
    if (window.localStorage.getItem('volume') == 'off') {
        newButton.setAttribute("class", "fas fa-volume-mute");
    }
    buttonDiv.appendChild(newButton);
    top.appendChild(buttonDiv);
    newButton.addEventListener("click", function () {
        if (newButton.className == ('fas fa-volume-up')) {
            newButton.className = ('fas fa-volume-mute');
            window.localStorage.setItem('volume', 'off');
        } else {
            newButton.className = ('fas fa-volume-up');
            window.localStorage.setItem('volume', 'on');
        }
    });
});




function memoryGame() {
    player();
    const ArrayShuffle = {
        shuffle: function (array) {
            let m = array.length, t, i;
            while (m) {
                i = Math.floor(Math.random() * m--);
                t = array[m];
                array[m] = array[i];
                array[i] = t;
            }
            return array;
        }
    };
    const myField = document.getElementById('field');
    myField.addEventListener("click", onClickCard);
    document.onload = onSelectFieldSize();
    let shuffledDeck = ArrayShuffle.shuffle(myCardArray);
    let hsTracker = [];
    let moves = 0;
    let successTurns = 0;
    let avgTurns = 0;
    function onSelectFieldSize() {
        const dropDown = document.getElementById('select-options');
        let slicedDeck = [];
        let boardClass = '';
        dropDown.addEventListener('change', (e) => {
            switch (e.target.value) {
                case "4": slicedDeck = shuffledDeck.slice(0, 8);
                    boardClass = 'board4';
                    hsTracker = ['8', '4'];
                    resetGame();
                    ; break;
                case "5": slicedDeck = shuffledDeck.slice(0, 12);
                    boardClass = 'board5';
                    hsTracker = ['12', '5'];
                    resetGame();
                    ; break;
                case "6": slicedDeck = shuffledDeck.slice(0, 18);
                    boardClass = 'board6';
                    hsTracker = ['18', '6'];
                    resetGame();
                    ; break;
            }
            let myCardSet = slicedDeck;
            myCardSet = myCardSet.concat(slicedDeck);
            myCardSet = ArrayShuffle.shuffle(myCardSet);
            populateField(myCardSet, boardClass);
        })
    };
    function populateField(myCardSet, boardClass) {
        myField.innerHTML = '';
        myCardSet.forEach(card => {
            let newTile = document.createElement("div");
            let newCard = document.createElement("img");
            newTile.setAttribute("class", boardClass);
            newTile.setAttribute("draggable", "false");
            newTile.setAttribute("ondragstart", "return false");
            let imageURL = "memory_assets/img/" + card.card1 + ".jpg";
            newCard.setAttribute("src", imageURL);
            newCard.setAttribute("name", card.card1);
            newCard.setAttribute("set", card.set);
            newTile.appendChild(newCard);
            myField.appendChild(newTile);
            let cardCover = document.createElement("img");
            cardCover.setAttribute("class", "covered");
            cardCover.setAttribute("src", "memory_assets/img/cover.png");
            newTile.appendChild(cardCover);
        })
    };
    class Timer {
        constructor(element) {
            this.elapsed = null;
            this.paused = false;
            this.m = 0;
            this.s = 0;
            this.ms = 0;
            this.element = document.getElementById('timer');
        }
        startTimer(timestamp) {
            this.paused = false;
            window.requestAnimationFrame(this.updateTimer.bind(this));
        }
        pauseTimer() {
            this.paused = true;
        }
        resetTimer() {
            this.m = 0;
            this.s = 0;
            this.ms = 0;
            this.element.textContent = '00:00:000';
        }
        updateTimer(timestamp) {
            if (this.paused == true) {
                return;
            }
            const change = timestamp - this.elapsed;
            this.elapsed += change;
            this.ms += change;
            if (this.ms >= 999) {
                this.s++;
                this.ms = 0;
            }
            if (this.s >= 60) {
                this.m++;
                this.s = 0;
            }
            this.element.textContent = `${this.m.toString().padStart(2, "0")}:${this.s.toString().padStart(2, "0")}:${Math.round(this.ms).toString().padStart(3, "0")}`;
            window.requestAnimationFrame(this.updateTimer.bind(this));
        }
    }
    let t = new Timer();
    const attempts = document.getElementById('attempts');
    const success = document.getElementById('success');
    const average = document.getElementById('average');
    function keepScore() {
        if (successTurns != 0) {
            avgTurns = moves / successTurns;
            function roundToTwo(avgTurns) {
                return +(Math.round(avgTurns + "e+2") + "e-2");
            }
            average.innerHTML = roundToTwo(avgTurns);
        }
        attempts.innerHTML = moves;
        success.innerHTML = successTurns;
        let showTimer = document.getElementById('timer');
        let getEasyHS = window.localStorage.getItem('easyHS');
        let getNormalHS = window.localStorage.getItem('normalHS');
        let getHardHS = window.localStorage.getItem('hardHS');
        let showEasyHS = document.getElementById('easyHS');
        let showMediumHS = document.getElementById('mediumHS');
        let showHardHS = document.getElementById('hardHS');
        if (successTurns == hsTracker[0]) {
            t.pauseTimer();
            switch (hsTracker[1]) {
                case "4": if (getEasyHS == null) {
                    window.localStorage.setItem('easyHS', showTimer.innerText);
                    showEasyHS.innerHTML = showTimer.innerText;
                    return;
                }
                    if (showTimer.innerText < getEasyHS) {
                        window.localStorage.setItem('easyHS', showTimer.innerText)
                        showEasyHS.innerHTML = showTimer.innerText;
                    }
                    ; break;
                case "5":
                    if (getNormalHS == null) {
                        window.localStorage.setItem('normalHS', showTimer.innerText);
                        showMediumHS.innerHTML = showTimer.innerText;
                        return;
                    }
                    if (showTimer.innerText < getNormalHS) {
                        window.localStorage.setItem('normalHS', showTimer.innerText)
                        showMediumHS.innerHTML = showTimer.innerText;
                    }
                    ; break;
                case "6": if (getHardHS == null) {
                    window.localStorage.setItem('hardHS', showTimer.innerText);
                    showHardHS.innerHTML = showTimer.innerText;
                    return;
                }
                    if (showTimer.innerText < getHardHS) {
                        window.localStorage.setItem('hardHS', showTimer.innerText)
                        showHardHS.innerHTML = showTimer.innerText;
                    }
                    break;
            }
        }
    }






    function player() {
        let firstHS = window.localStorage.getItem('easyHS');
        let secondHS = window.localStorage.getItem('normalHS');
        let thirdHS = window.localStorage.getItem('hardHS');
        let easyHS = document.getElementById('easyHS');
        let mediumHS = document.getElementById('mediumHS');
        let hardHS = document.getElementById('hardHS');
        if (firstHS == null) {
            easyHS.innerHTML = 'None'
        } else {
            easyHS.innerHTML = firstHS;
        }

        if (secondHS == null) {
            mediumHS.innerHTML = 'None'
        } else {
            mediumHS.innerHTML = secondHS;
        }
        if (thirdHS == null) {
            hardHS.innerHTML = 'None'
        } else {
            hardHS.innerHTML = thirdHS;
        }
    }





    function animalSounds(event) {
        let muteBtn = document.getElementById('muteAudio');
        if (event.target != document.getElementById('field')) {
            let audio = new Audio('memory_assets/snd/' + event.target.parentNode.firstChild.getAttribute('name') + '.wav');
            audio.play();
            if (muteBtn.className == ('fas fa-volume-up')) {
                audio.muted = false;
            } else {
                audio.muted = true;
            }
        }
    };




    let turnedCards = [];
    function onClickCard(event) {
        if (event.target.className == 'covered') {
            t.startTimer();
            event.target.className = 'uncovered';
            animalSounds(event);
            turnedCards.push(event.target.parentNode.firstChild);
            evaluateMatch();
        };
        animalSounds(event);
    };




    function evaluateMatch() {
        let card1Check = turnedCards[0];
        let card2Check = turnedCards[1];
        if (turnedCards.length == 2) {
            if (card1Check.getAttribute('set') == card2Check.getAttribute('set')) {
                moves++;
                successTurns++;
                keepScore();
                card1Check.style.animation = 'matchSuccess 1s ease-out';
                card2Check.style.animation = 'matchSuccess 1s ease-out';
                setTimeout(() => {
                    card1Check.parentNode.style.visibility = 'hidden';
                    card2Check.parentNode.style.visibility = 'hidden';
                }, 500);
            }
            else {
                moves++;
                keepScore();
                card2Check.style.animation = 'matchError 1s ease-out';
                card1Check.style.animation = 'matchError 1s ease-out';
                setTimeout(() => {
                    card1Check.style.animation = '';
                    card2Check.style.animation = '';
                    card1Check.parentNode.lastChild.className = 'covered';
                    card2Check.parentNode.lastChild.className = 'covered';
                }, 500);

            }
            myField.removeEventListener("click", onClickCard);
            setTimeout(() => {
                myField.addEventListener("click", onClickCard);
                turnedCards.length = 0;
            }, 500);
        }
    }
    function resetGame() {
        t.pauseTimer();
        t.resetTimer();
        moves = 0;
        successTurns = 0;
        avgTurns = 0;
        average.innerHTML = '0';
        attempts.innerHTML = '0';
        success.innerHTML = '0';
    } 
}
let resetBtn = document.getElementById('reset-highscores');
resetBtn.addEventListener('click', function () {
    if (confirm('Are you sure you want to delete your highscores?')) {
        window.localStorage.removeItem('easyHS');
        window.localStorage.removeItem('normalHS');
        window.localStorage.removeItem('hardHS');
        document.getElementById('easyHS').innerText = 'None';
        document.getElementById('mediumHS').innerText = 'None';
        document.getElementById('hardHS').innerText = 'None';
    } else { 
        return
    }
})    