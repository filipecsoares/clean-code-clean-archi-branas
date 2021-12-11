import OrderItem from "../../src/domain/entity/OrderItem";

test("Should create an Order Item", function () {
	const orderItem = new OrderItem(1, 1000, 10);
	expect(orderItem.getTotal()).toBe(10000);
});