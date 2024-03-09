import { Component, ViewChild, ElementRef } from '@angular/core';
import { HistoryItem } from '../models/history-item';

@Component({
  selector: 'app-counting',
  templateUrl: './counting.component.html',
  styleUrls: ['./counting.component.css']
})
export class CountingComponent {
  @ViewChild('userResultInput')
  userResultInput!: ElementRef;

  isCheckButtonDisabled: boolean = false;

  levelSelected: number = 10;
  operationSelected: string = "ADD";
  displayHistory: boolean = false;

  firstNumber: number = 0;
  secondNumber: number = 0;
  result: number = 0;

  userResult: number | null = null;
  displayedIconPath: string = "";

  historyItems: HistoryItem[] = [];

  ngOnInit(): void {
    this.loadConfigurations();
    this.loadHistory();
    this.generateNumbers();
    this.changeIcon('question');
  }

  checkAnswer() {
    if(this.result === this.userResult) {
      this.changeIcon('correct');
      this.isCheckButtonDisabled = true;
    } else {
      this.changeIcon('incorrect');
    }

    this.saveHistoryItem();
    this.saveHistory();
  }

  nextExample() {
    this.generateNumbers();
    this.userResult = null;
    this.saveConfigurations();
    this.userResultInput.nativeElement.focus();
    this.isCheckButtonDisabled = false;
    this.changeIcon('question');
  }

  cleanHistory() {
    this.historyItems = [];
    this.saveHistory();
  }

  getMathOperation(item: HistoryItem) {
    return item.firstNumber + " " + this.toOperator(item.operationSelected) + " " + item.secondNumber + " ="
  }

  getCurrentMathOperation() {
    return this.firstNumber + " " + this.toOperator(this.operationSelected) + " " + this.secondNumber + " ="
  }

  toOperator(operationSelected: string) {
    switch(operationSelected) {
      case "ADD": return "+"
      case "SUBTRACT": return "-"
      case "MULTIPLY": return "*"
      case "DIVIDE": return ":"

      default: return "?"
    }
  }

  private generateNumbers() {
    if (this.levelSelected <= 1) {
      throw new Error('Maximum sum must be greater than 1 to get two positive numbers.');
    }

    let randoms = this.generateRandoms();
    let random1 = randoms[0];
    let random2 = randoms[1];

    if (this.operationSelected === "ADD") {
      this.setUpForAdd(random1, random2);
    } else if (this.operationSelected === "SUBTRACT") {
      this.setUpForSubtract(random1, random2);
    } else if (this.operationSelected === "MULTIPLY") {
      this.setUpForMultiply(random1, random2);
    } else if (this.operationSelected === "DIVIDE") {
      this.setUpForDivide(random1, random2);
    } else {
      throw new Error('Operation out of the scope.');
    }

    console.log(this.getCurrentOperation());
  }

  private generateRandoms():number[] {
    let random1;
    let random2;

    if (this.operationSelected === "ADD" || this.operationSelected ===  "SUBTRACT") {
      random1 = Math.floor(Math.random() * (this.levelSelected - 1)) + 1;
      random2 = Math.floor(Math.random() * (this.levelSelected - random1)) + 1;
    } else if (this.operationSelected === "MULTIPLY" || this.operationSelected ===  "DIVIDE"){
      random1 = Math.floor(Math.random() * Math.sqrt(this.levelSelected)) + 2;
      random2 = Math.floor(Math.random() * Math.sqrt(this.levelSelected)) + 2;
      if (random1 * random2 > this.levelSelected) {
        console.warn('try again: ' + random1 + ' * ' + random2 + ' = ' + (random1 * random2));
        return this.generateRandoms();
      }
    } else {
      throw new Error('Operation out of the scope.');
    }

    return Date.now() % 2 == 0 ? [random1, random2] : [random2, random1];
  }

  private setUpForAdd(random1: number, random2: number) {
    this.firstNumber = random1;
    this.secondNumber = random2;
    this.result = random1 + random2;
  }

  private setUpForSubtract(random1: number, random2: number) {
    this.firstNumber = random1 + random2;
    this.secondNumber = random1;
    this.result = random2;
  }

  private setUpForMultiply(random1: number, random2: number) {
    this.firstNumber = random1;
    this.secondNumber = random2;
    this.result = random1 * random2;
  }

  private setUpForDivide(random1: number, random2: number) {
    this.firstNumber = random1 * random2;
    this.secondNumber = random1;
    this.result = random2;
  }

  private getCurrentOperation(): string {
    return (
        this.firstNumber + " " +
        this.toOperator(this.operationSelected) + " " +
        this.secondNumber + " " +
        "= " +
        this.result + " "
      );
  }

  private saveHistoryItem(): void {
    let historyItem: HistoryItem = {
      levelSelected: this.levelSelected,
      operationSelected: this.operationSelected,
      firstNumber: this.firstNumber,
      secondNumber: this.secondNumber,
      result: this.result,
      userResult: this.userResult,
      isCorrect: this.result == this.userResult,
      date: new Date()
    }

    this.historyItems.unshift(historyItem);
  }

  private changeIcon(iconName: string) {
    this.displayedIconPath = `/assets/img/icon-${iconName}.png`;
  }

  private loadHistory() {
    let historyString = localStorage.getItem("history");
    if(historyString) {
      let history = JSON.parse(historyString);
      this.historyItems = history;
    }
  }

  private saveHistory() {
    localStorage.setItem("history", JSON.stringify(this.historyItems));
  }

  private loadConfigurations() {
    let configurationsString = localStorage.getItem("configurations");
    if(configurationsString) {
      let configurations = JSON.parse(configurationsString);
      this.levelSelected = configurations.levelSelected;
      this.operationSelected = configurations.operationSelected;
      this.displayHistory = configurations.displayHistory;
    }
  }

  private saveConfigurations() {
    let configurations = {
      levelSelected: this.levelSelected,
      operationSelected: this.operationSelected,
      displayHistory: this.displayHistory
    }
    localStorage.setItem("configurations", JSON.stringify(configurations));
  }
}
