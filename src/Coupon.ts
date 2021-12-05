export default class Coupon {

	constructor (readonly code: string, readonly percentage: number, readonly expirationDate?: Date) {
	}

    isExpired(): boolean {
        return this.expirationDate && this.expirationDate < new Date();
    }
}