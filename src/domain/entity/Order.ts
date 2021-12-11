import Coupon from "./Coupon";
import Cpf from "./Cpf";
import DefaultFreightCalculator from './DefaultFreightCalculator';
import FreightCalculator from './FreightCalculator';
import Item from "./Item";
import OrderItem from "./OrderItem";

export default class Order {
	cpf: Cpf;
	private orderItems: OrderItem[];
	coupon: Coupon | undefined;
	private freight: number;

	constructor (cpf: string, readonly date: Date = new Date(), readonly freightCalculator: FreightCalculator = new DefaultFreightCalculator()) {
		this.cpf = new Cpf(cpf);
		this.orderItems = [];
		this.freight = 0;
	}

	addItem (item: Item, quantity: number) {
		this.freight += this.freightCalculator.calculate(item) * quantity;
		this.orderItems.push(new OrderItem(item.idItem, item.price, quantity));
	}

	addCoupon (coupon: Coupon) {
        if(coupon.isValid(this.date)) this.coupon = coupon;
	}

	getFreight () {
		return this.freight;
	}

	getTotal () {
		let total = 0;
		for (const orderItem of this.orderItems) {
			total += orderItem.getTotal();
		}
		if (this.coupon) {
			total -= (total * this.coupon.percentage) / 100;
		}
		total += this.getFreight();
		return total;
	}
}