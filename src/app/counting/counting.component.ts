import { Component } from '@angular/core';

@Component({
  selector: 'app-counting',
  templateUrl: './counting.component.html',
  styleUrls: ['./counting.component.css']
})
export class CountingComponent {
  //TODO: save/load configurations using local storage
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
      this.feedbackMessage = 'Poprawna odpowiedź';
    } else {
      this.feedbackMessage = 'Niepoprawna odpowiedź';
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
  
    let randoms = this.generateRandoms();
    let random1 = randoms[0];
    let random2 = randoms[1];


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
    } else if (this.operationSelected === "MULTIPLY") {
      this.firstNumber = random1;
      this.secondNumber = random2;
      this.result = random1 * random2;
      this.mathOperator = "*";
    } else if (this.operationSelected === "DIVIDE") {
      this.firstNumber = random1 * random2;
      this.secondNumber = random1;
      this.result = random2;
      this.mathOperator = "/";
    } else {
      throw new Error('Operation out of the scope.');
    }

    console.log(this.getCurrentOperation());
  }

  private generateRandoms():number[] {
    let random1;
    let random2;

    if (this.operationSelected === "ADD" || this.operationSelected ===  "SUBTRACT") {
      random1 = Math.floor(Math.random() * (this.levalSelected - 1)) + 1;
      random2 = Math.floor(Math.random() * (this.levalSelected - random1)) + 1;
    } else if (this.operationSelected === "MULTIPLY" || this.operationSelected ===  "DIVIDE"){
      random1 = Math.floor(Math.random() * Math.sqrt(this.levalSelected)) + 2;
      random2 = Math.floor(Math.random() * Math.sqrt(this.levalSelected)) + 2;
      if (random1 * random2 > this.levalSelected) {
        console.warn('try again: ' + random1 + ' * ' + random2 + ' = ' + (random1 * random2));
        return this.generateRandoms();
      }
    } else {
      throw new Error('Operation out of the scope.');
    }

    return Date.now() % 2 == 0 ? [random1, random2] : [random2, random1];
  }

  private getCurrentOperation(): string {
    return (
        this.firstNumber + " " +
        this.mathOperator + " " +
        this.secondNumber + " " +
        "= " +
        this.result + " "
      );
  }
}