export interface HistoryItem {
    levelSelected: number;
    operationSelected: string;

    date: Date;

    firstNumber?: number;
    secondNumber?: number;
    result?: number;

    userResult?: number | null;
    isCorrect?: boolean;
}
