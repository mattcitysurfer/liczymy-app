import { Component } from '@angular/core';

@Component({
  selector: 'app-counting',
  templateUrl: './counting.component.html',
  styleUrls: ['./counting.component.css']
})
export class CountingComponent {
  levalSelected: number = 10;
  operationSelected: string = "ADD";
  mathOperator = "+";

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
  
    let random1 = Math.floor(Math.random() * (this.levalSelected - 1)) + 1;
    let random2 = Math.floor(Math.random() * (this.levalSelected - random1));


    if (this.operationSelected === "ADD") {
      this.firstNumber = random1;
      this.secondNumber = random2;
      this.result = random1 + random2;
      this.mathOperator = "+";
    } else if (this.operationSelected === "SUBTRACT") {
      this.firstNumber = random1 + random2;
      this.secondNumber = random1;
      this.result = random2;
      this.mathOperator = "-";
    }

    console.log(this.result);
  }
}
