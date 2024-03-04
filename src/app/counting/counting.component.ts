import { Component } from '@angular/core';

@Component({
  selector: 'app-counting',
  templateUrl: './counting.component.html',
  styleUrls: ['./counting.component.css']
})
export class CountingComponent {
  levalSelected: number = 10;

  firstNumber: number = 0;
  secondNumber: number = 0;
  result: number = 0;

  userResult: number | null = null;
  feedbackMessage: string  | null = null;

  ngOnInit(): void {
    this.generateNumbers();
  }

  checkResult() {
    if(this.result === this.userResult) {
      this.feedbackMessage = "Poprawna odpowiedź";
    } else {
      this.feedbackMessage = "Niepoprawna odpowiedź";
    }
  }

  newNumbers() {
    this.generateNumbers();
    this.userResult = null;
    this.feedbackMessage = null;

  }

  private generateNumbers() {
    if (this.levalSelected <= 1) {
      throw new Error('Maximum sum must be greater than 1 to get two positive numbers.');
    }
  
    this.firstNumber = Math.floor(Math.random() * (this.levalSelected - 1)) + 1;
    this.secondNumber = Math.floor(Math.random() * (this.levalSelected - this.firstNumber));
    this.result = this.firstNumber + this.secondNumber;
  }
}
