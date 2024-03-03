import { Component } from '@angular/core';

@Component({
  selector: 'app-counting',
  templateUrl: './counting.component.html',
  styleUrls: ['./counting.component.css']
})
export class CountingComponent {
  firstNumber: number = 0;
  secondNumber: number = 0;
  result: number = 0;
  userResult: number | null = null;
  feedbackMessage: string = "";

  ngOnInit(): void {
    this.generateNumbers(100);
  }

  checkResult() {
    if(this.result === this.userResult) {
      this.feedbackMessage = "Poprawna odpowiedź";
    } else {
      this.feedbackMessage = "Niepoprawna odpowiedź";
    }
  }

  newNumbers() {
    this.generateNumbers(100);
  }

  private generateNumbers(maxSum: number) {
    if (maxSum <= 1) {
      throw new Error('Maximum sum must be greater than 1 to get two positive numbers.');
    }
  
    this.firstNumber = Math.floor(Math.random() * (maxSum - 1)) + 1;
    this.secondNumber = Math.floor(Math.random() * (maxSum - this.firstNumber));
    this.result = this.firstNumber + this.secondNumber;
  }
}
