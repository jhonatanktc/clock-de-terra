const turn = Math.PI * 2;
const twentyFourthTurn = Math.PI / 12;
const fourthTurn = Math.PI / 2;
const options = {smallestUnit: 'minute'};

const clockDeTerraElm = document.body.querySelector('#clock-de-terra');
const faceAndNumbersElm = clockDeTerraElm.querySelector('#face-and-numbers');
const handsElm = clockDeTerraElm.querySelector('#hands');
const digitalClockElm = document.body.querySelector('#digital-clock');

const faceAndNumbersCtx = faceAndNumbersElm.getContext('2d');
faceAndNumbersCtx.strokeStyle = 'rgb(255 255 255)';
faceAndNumbersCtx.fillStyle = 'rgb(255 255 255)';
faceAndNumbersCtx.lineWidth = 7;
faceAndNumbersCtx.textBaseline = 'middle';
faceAndNumbersCtx.textAlign = 'center';

faceAndNumbersCtx.beginPath();
faceAndNumbersCtx.arc(500, 500, 330, 0, turn);
faceAndNumbersCtx.stroke();
faceAndNumbersCtx.beginPath();
faceAndNumbersCtx.arc(500, 500, 270, 0, turn);
faceAndNumbersCtx.stroke();

let number;
for (number = 0; number <= 23; number += 1) {
    faceAndNumbersCtx.beginPath();
    faceAndNumbersCtx.arc(
        500 + 330 * Math.cos(number * twentyFourthTurn),
        500 + 330 * Math.sin(number * twentyFourthTurn),
        7,
        0,
        turn
    );
    faceAndNumbersCtx.stroke();

    faceAndNumbersCtx.font = number % 6 === 0 ? '70px "Noto Sans"' : '42px "Noto Sans"';
    faceAndNumbersCtx.fillText(
        number.toString().padStart(2, '0'),
        500 + 400 * Math.cos(number * twentyFourthTurn - fourthTurn),
        505 + 400 * -Math.sin(number * twentyFourthTurn - fourthTurn)
    );
}

const handsCtx = handsElm.getContext('2d');
handsCtx.strokeStyle = 'rgb(255 255 255)';
handsCtx.fillStyle = 'rgb(255 255 255)';
handsCtx.lineWidth = 7;
handsCtx.lineCap = 'round';
handsCtx.textBaseline = 'middle';
handsCtx.textAlign = 'center';
handsCtx.font = '28px "Noto Sans"';

const update = function() {
    handsCtx.clearRect(0, 0, handsElm.width, handsElm.height);

    const utcNow = Temporal.Now.zonedDateTimeISO('UTC');
    const localNow = Temporal.Now.zonedDateTimeISO();

    let timezone;
    for (timezone = -11; timezone <= 12; timezone += 1) {
        handsCtx.strokeStyle = 'rgb(255 255 255 / 0.35)';
        handsCtx.beginPath();
        handsCtx.moveTo(500, 500);
        handsCtx.lineTo(
            500 + 300 * Math.cos((timezone + utcNow.hour + utcNow.minute / 60) * twentyFourthTurn),
            500 + 300 * -Math.sin((timezone + utcNow.hour + utcNow.minute / 60) * twentyFourthTurn)
        );
        handsCtx.stroke();

        handsCtx.strokeStyle = 'rgb(255 255 255 / 0.7)';
        handsCtx.beginPath();
        handsCtx.moveTo(500, 500);
        handsCtx.lineTo(
            500 + 270 * Math.cos((timezone + utcNow.hour + utcNow.minute / 60 + 0.5) * twentyFourthTurn),
            500 + 270 * -Math.sin((timezone + utcNow.hour + utcNow.minute / 60 + 0.5) * twentyFourthTurn)
        );
        handsCtx.stroke();
    
        handsCtx.fillText(
            `${timezone === 12 ? '±' : (timezone >= 0 ? '+' : '-')}${Math.abs(timezone).toString().padStart(2, '0')}`,
            500 + 240 * Math.cos((timezone + utcNow.hour + utcNow.minute / 60) * twentyFourthTurn - fourthTurn),
            500 + 240 * -Math.sin((timezone + utcNow.hour + utcNow.minute / 60) * twentyFourthTurn - fourthTurn)
        );
    }
    digitalClockElm.textContent = `${utcNow.toString(options)} 週 ${utcNow.dayOfWeek}\n${localNow.toString(options)} 週 ${localNow.dayOfWeek}`;
};

update();
setInterval(update, 60000);
