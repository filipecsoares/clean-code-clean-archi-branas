export default class Coupon {

	constructor (readonly code: string, readonly percentage: number, readonly expirationDate?: Date) {
	}

    isExpired(today: Date = new Date()): boolean {
        return this.expirationDate && this.expirationDate.getTime() < today.getTime();
    }

    isValid(today: Date = new Date()): boolean {
        return !this.isExpired(today);
    }
}