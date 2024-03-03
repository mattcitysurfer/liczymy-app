import { Component } from '@angular/core';

@Component({
  selector: 'app-counting',
  templateUrl: './counting.component.html',
  styleUrls: ['./counting.component.css']
})
export class CountingComponent {
  firstNumber: number | null = null;
  secondNumber: number | null = null;
  result: number = 0;

  userResult: number | null = null;
  feedbackMessage: string = "";

  ngOnInit(): void {
    let numbers: number[] = this.generateNumbers(100);
    this.firstNumber = numbers[0];
    this.secondNumber = numbers[1];
    this.result = this.firstNumber + this.secondNumber;
  }

  checkResult() {
    if(this.result === this.userResult) {
      this.feedbackMessage = "Poprawna odpowiedź";
    } else {
      this.feedbackMessage = "Niepoprawna odpowiedź";
    }
  }

  private generateNumbers(maxSum: number): [number, number] {
    if (maxSum <= 1) {
      throw new Error('Maximum sum must be greater than 1 to get two positive numbers.');
    }
  
    const firstNumber = Math.floor(Math.random() * (maxSum - 1)) + 1;
    const secondNumber = Math.floor(Math.random() * (maxSum - firstNumber));
  
    return [firstNumber, secondNumber];
  }
}
