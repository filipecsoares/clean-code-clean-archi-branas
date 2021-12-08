import Coupon from "../src/Coupon";
import DefaultFreightCalculator from '../src/DefaultFreightCalculator';
import FixedFreightCalculator from '../src/FixedFreightCalculator';
import Item from "../src/Item";
import Order from "../src/Order";

test("Should create an order with valid cpf", function () {
	const cpf = "839.435.452-10";
	const order = new Order(cpf);
	const total = order.getTotal();
	expect(total).toBe(0);
});

test("Should throw if create an order with invalid cpf", function () {
	const cpf = "111.111.111-11";
	expect(() => new Order(cpf)).toThrow(new Error("Invalid CPF"));
});

test("Should create an order with three items", function () {
	const cpf = "839.435.452-10";
	const order = new Order(cpf);
	order.addItem(new Item(1, "Music", "CD", 30), 3);
	order.addItem(new Item(2, "Video", "DVD", 50), 1);
	order.addItem(new Item(3, "Video", "VHS", 10), 2);
	const total = order.getTotal();
	expect(total).toBe(160);
});

test("Should create an order with three items and discount coupon", function () {
	const cpf = "839.435.452-10";
	const order = new Order(cpf);
	order.addItem(new Item(1, "Music", "CD", 30), 3);
	order.addItem(new Item(2, "Video", "DVD", 50), 1);
	order.addItem(new Item(3, "Video", "VHS", 10), 2);
	order.addCoupon(new Coupon("VALE20", 20));
	const total = order.getTotal();
	expect(total).toBe(128);
});

test("Should not apply discount coupon expired", function () {
    const expirationDate = new Date('2020-01-01');
    const cpf = "839.435.452-10";
    const order = new Order(cpf, new Date("2021-12-10"));
    order.addItem(new Item(1, "Music", "CD", 30), 3);
    order.addItem(new Item(2, "Video", "DVD", 50), 1);
	order.addCoupon(new Coupon("VALE20", 20, expirationDate))
	const total = order.getTotal();
	expect(total).toBe(140);
});

test("Should create an order with three items with freight with default strategy", function () {
	const cpf = "839.435.452-10";
	const order = new Order(cpf, new Date(), new DefaultFreightCalculator());
	order.addItem(new Item(4, "Sport", "Soccer Ball", 20, 50, 20, 20, 0.3), 1);
	order.addItem(new Item(5, "Instruments", "Guitar Gibson Les Paul", 8000, 100, 30, 10, 3), 1);
	order.addItem(new Item(6, "Clothes", "Shirt", 30, 70, 1, 1, 0.1), 2);
	const freight = order.getFreight();
	console.log(freight);
	expect(freight).toBe(60);
});

test("Should create an order with three items with freight with fixed strategy", function () {
	const cpf = "839.435.452-10";
	const order = new Order(cpf, new Date(), new FixedFreightCalculator());
	order.addItem(new Item(4, "Sport", "Soccer Ball", 20, 50, 20, 20, 0.3), 1);
	order.addItem(new Item(5, "Instruments", "Guitar Gibson Les Paul", 8000, 100, 30, 10, 3), 1);
	order.addItem(new Item(6, "Clothes", "Shirt", 30, 70, 1, 1, 0.1), 2);
	const freight = order.getFreight();
	console.log(freight);
	expect(freight).toBe(40);
});