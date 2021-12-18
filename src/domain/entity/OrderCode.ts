export default class OrderCode {
    readonly value: string;

    constructor(private date: Date, private sequence: number) {
        if(!date) throw new Error('Invalid date');
        if(!sequence) throw new Error('Invalid sequence');
        const year = date.getFullYear();
        const sequence8Char = `${sequence}`.padStart(8, "0");
        this.value = `${year}${sequence8Char}`;
    }
}