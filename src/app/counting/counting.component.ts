import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-counting',
  templateUrl: './counting.component.html',
  styleUrls: ['./counting.component.css']
})
export class CountingComponent {
  @ViewChild('userResultInput')
  userResultInput!: ElementRef;

  levelSelected: number = 10;
  operationSelected: string = "ADD";

  firstNumber: number = 0;
  secondNumber: number = 0;
  result: number = 0;

  userResult: number | null = null;
  displayedMathOperator: string = "";
  displayedIconPath: string = "";

  ngOnInit(): void {
    this.loadConfigurations();
    this.generateNumbers();
    this.changeIcon('question');
  }

  checkAnswer() {
    if(this.result === this.userResult) {
      this.changeIcon('correct');
    } else {
      this.changeIcon('incorrect');
    }
  }

  nextExample() {
    this.generateNumbers();
    this.userResult = null;
    this.saveConfigurations();
    this.userResultInput.nativeElement.focus();
    this.changeIcon('question');
  }

  private generateNumbers() {
    if (this.levelSelected <= 1) {
      throw new Error('Maximum sum must be greater than 1 to get two positive numbers.');
    }

    let randoms = this.generateRandoms();
    let random1 = randoms[0];
    let random2 = randoms[1];

    if (this.operationSelected === "ADD") {
      this.firstNumber = random1;
      this.secondNumber = random2;
      this.result = random1 + random2;
      this.displayedMathOperator = "+";
    } else if (this.operationSelected === "SUBTRACT") {
      this.firstNumber = random1 + random2;
      this.secondNumber = random1;
      this.result = random2;
      this.displayedMathOperator = "-";
    } else if (this.operationSelected === "MULTIPLY") {
      this.firstNumber = random1;
      this.secondNumber = random2;
      this.result = random1 * random2;
      this.displayedMathOperator = "*";
    } else if (this.operationSelected === "DIVIDE") {
      this.firstNumber = random1 * random2;
      this.secondNumber = random1;
      this.result = random2;
      this.displayedMathOperator = "/";
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

  private getCurrentOperation(): string {
    return (
        this.firstNumber + " " +
        this.displayedMathOperator + " " +
        this.secondNumber + " " +
        "= " +
        this.result + " "
      );
  }

  private changeIcon(iconName: string) {
    this.displayedIconPath = `/assets/img/icon-${iconName}.png`;
  }

  private loadConfigurations() {
    let configurationsString = localStorage.getItem("configurations");
    if(configurationsString) {
      let configurations = JSON.parse(configurationsString);
      this.levelSelected = configurations.levelSelected;
      this.operationSelected = configurations.operationSelected;
    }
  }

  private saveConfigurations() {
    let configurations = {
      levelSelected: this.levelSelected,
      operationSelected: this.operationSelected
    }
    localStorage.setItem("configurations", JSON.stringify(configurations));
  }
}
