import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
// export class QuizComponent implements OnInit {
//   questions: string[] = ['Question 1', 'Question 2', 'Question 3']; // Example questions
//   currentQuestionIndex: number = 0;
//   quizEnded: boolean = false;
//   timer: number = 15;
//   timerInterval: any;
//   score: number = 0;
//   overallScore: number = 0;

//   ngOnInit(): void {
//     this.startTimer();
//   }

//   ngOnDestroy(): void {
//     clearInterval(this.timerInterval);
//   }

//   startTimer() {
//     this.timerInterval = setInterval(() => {
//       this.timer--;
//       if (this.timer <= 0 || this.quizEnded) {
//         clearInterval(this.timerInterval);
//         this.nextQuestion();
//       }
//     }, 1000);
//   }

//   nextQuestion() {
//     this.currentQuestionIndex++;
//     if (this.currentQuestionIndex >= this.questions.length) {
//       this.quizEnded = true;
//       this.calculateOverallScore();
//     } else {
//       this.timer = 15;
//       this.startTimer();
//     }
//   }

//   submitAnswer() {
//     const questionScore = this.timer; // Score based on time left
//     this.score += questionScore;
//     clearInterval(this.timerInterval); // Stop timer for this question
//     this.nextQuestion();
//   }

//   calculateOverallScore() {
//     // Calculate overall score based on individual question scores
//     this.overallScore = this.score;
//   }
// }

export class QuizComponent implements OnInit {
  currentQuestionIndex: number = 0;

  quizEnded: boolean = false;
  timer: number = 15; // Assuming timer starts with 60 seconds
  score: number = 0;
  timerInterval: any;
  questions: any[] = [
    {
      question: 'What is the capital of France?',
      options: ['Paris', 'London', 'Berlin', 'Rome'],
      answer: 'Paris'
    },
    {
      question: 'What is the capital of France?',
      options: ['Paris', 'London', 'Berlin', 'Rome'],
      answer: 'Paris'
    },
    {
      question: 'What is the capital of France?',
      options: ['Paris', 'London', 'Berlin', 'Rome'],
      answer: 'Paris'
    },
    // Add more questions here...
  ];
  selectedOption: string = '';

  constructor() { }

  ngOnInit(): void {
    // Start timer countdown
    setInterval(() => {
      if (this.timer > 0 && !this.quizEnded) {
        this.timer--;
      }
    }, 1000);
  }

  // submitAnswer(): void {
  //   if (this.selectedOption === this.questions[this.currentQuestionIndex].answer) {
  //     this.score++;
  //   }
  //   this.currentQuestionIndex++;
  //   if (this.currentQuestionIndex === this.questions.length) {
  //     this.quizEnded = true;
  //     this.score++;
  //   }
  //   this.selectedOption = ''; 
  // }

  submitAnswer(selectedOption: any) {
       const questionScore = this.timer;
       if (this.selectedOption === this.questions[this.currentQuestionIndex].answer) {
           this.score++;
           }
         clearInterval(this.timerInterval); // Stop timer for this question
      this.nextQuestion();
     }
     nextQuestion() {
          this.currentQuestionIndex++;
          if (this.currentQuestionIndex >= this.questions.length) {
            this.quizEnded = true;
            
          } else {
            this.timer = 15;
            
          }
        }
}