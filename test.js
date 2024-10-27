"use strict";
let students = [
  { name: "Zephaniah", scores: [100, 96, 99, 92] },
  { name: "Pursalane", scores: [92, 89, 96, 100, 94] },
  { name: "Siddalee", scores: [86, 72, 92] },
  { name: "Ian", scores: [98, 84, 89, 100, 100, 76] },
  { name: "Elisha", scores: [89, 100] },
  { name: "Ezra", scores: [100, 99, 100, 87] },
];

let student;
for (student of students) {
  let score;
  let avg = 0;
  // ---for of loop
  for (score of student.scores) {
    avg = avg + score;
  }
  //  -----for loop
  // for(let i = 0; i < student.scores.length; i++){
  //     avg = avg + student.scores[i]
  // }

  avg = (avg / student.scores.length).toFixed(2);
  console.log(student.name, avg);
}

// Zephaniah 96.75
// Pursalane 94.20
// Siddalee 83.33
// Ian 91.17
// Elisha 94.50
// Ezra 96.50
