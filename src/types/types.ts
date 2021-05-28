interface Interval {
    min: number;
    max: number;
    step: number;
    defaultValue: number;
}

export interface Constraints {
    amountInterval: Interval;
    termInterval: Interval;
}