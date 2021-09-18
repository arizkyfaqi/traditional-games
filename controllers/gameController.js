const catchAsync = require('./../utils/catchAsyc');
const db = require('../models');

let playedFirst = '';
let playedFirstInput = '';
let ronde = 1;
let resultArray = [];

const suit = (player1, player2) => {
  // console.log('player 1 input: ' + player1);
  // console.log('player 2 input: ' + player2);
  if (player1 === player2) return 'draw';
  else if (player1 === 'gunting') {
    if (player2 === 'kertas') return 'player 1';
    else if (player2 !== 'kertas') return 'player 2';
  } else if (player1 === 'batu') {
    return player2 === 'kertas' ? 'player 2' : 'player 1';
  } else if (player1 === 'kertas') {
    return player2 === 'batu' ? 'player 1' : 'player 2';
  }
};

const parse = (data) => {
  const res = {};
  data.forEach((item) => {
    Object.keys(item).map((key) => {
      if (!res[key]) {
        res[key] = item[key];
      } else {
        res[key] += item[key];
      }
    });
  });
  return res;
};

exports.createRoom = catchAsync(async (req, res, next) => {
  const room = await db.Room.create({
    name: req.body.name,
  });

  res.status(201).json({
    status: 'success',
    data: {
      room,
    },
  });
});

exports.fight = (req, res, next) => {
  const currentPlayer = req.user;

  //cek playerFirst
  if (playedFirst) {
    if (currentPlayer.id === playedFirst.id && playedFirstInput) {
      res.send('lu udah main, gantian ngapa!');
    } else {
      //save input player 2
      const playerSecondInput = req.body.option;
      let hasilSuit = suit(playedFirstInput, playerSecondInput);
      if (hasilSuit === 'draw') {
        resultArray.push({
          [playedFirst.id]: 0,
          [currentPlayer.id]: 0,
        });
      } else if (hasilSuit === 'player 1') {
        resultArray.push({
          [playedFirst.id]: 1,
          [currentPlayer.id]: 0,
        });
      } else if (hasilSuit === 'player 2') {
        resultArray.push({
          [playedFirst.id]: 0,
          [currentPlayer.id]: 1,
        });
      }

      playedFirst = '';
      playedFirstInput = '';
      if (ronde === 3) {
        ronde = 1;
        const cleanData = parse(resultArray);
        const { roomId } = req.params;
        let keys = Object.keys(cleanData);
        db.UserGameHistory.create({
          player_id: keys[0],
          room_id: roomId,
          RoomId: roomId,
          result: cleanData[keys[0]],
        })
          .then(() => {
            db.UserGameHistory.create({
              player_id: keys[1],
              room_id: roomId,
              RoomId: roomId,
              result: cleanData[keys[1]],
            })
              .then(() => {
                const temp = resultArray;
                resultArray = [];
                temp.push({
                  winner_id:
                    cleanData[keys[1]] > cleanData[keys[0]] ? keys[1] : keys[0],
                });
                res.send(temp);
              })
              .catch((e) => {
                console.log(`Error : ${e}`);
              });
          })
          .catch((e) => {
            console.log(`Error : ${e}`);
          });
      } else {
        ronde++;
        res.send(resultArray);
      }
    }
  } else {
    playedFirst = currentPlayer;
    playedFirstInput = req.body.option;
    res.send('menunggu input player lain!');
  }
};
