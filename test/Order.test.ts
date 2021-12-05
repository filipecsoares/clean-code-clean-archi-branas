import Coupon from "../src/Coupon";
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