import PlaceOrder from '../../src/application/usecase/PlaceOrder';
import PgPromiseConnectionAdapter from '../../src/infra/database/PgPromiseConnectionAdapter';
import ItemRepositoryDatabase from '../../src/infra/repository/database/ItemRepositoryDatabase';
import CouponRepositoryMemory from '../../src/infra/repository/memory/CouponRepositoryMemory';
import OrderRepositoryMemory from '../../src/infra/repository/memory/OrderRepositoryMemory';

let placeOrder: PlaceOrder;

beforeEach(() => {
	const connection = new PgPromiseConnectionAdapter();
	const itemRepository = new ItemRepositoryDatabase(connection);
	const orderRepository = new OrderRepositoryMemory();
	const couponRepository = new CouponRepositoryMemory();
	placeOrder = new PlaceOrder(itemRepository, orderRepository, couponRepository);
});

test("Should place an order", async () => {
    const input = {
		cpf: "839.435.452-10",
		orderItems: [
			{ idItem: 1, quantity: 1},
			{ idItem: 2, quantity: 1},
			{ idItem: 3, quantity: 3}
		],
		date: new Date("2021-12-10"),
		coupon: "VALE20"
	};
    const output = await placeOrder.execute(input);
    expect(output.total).toBe(138);
});

test("Should place an order with freight", async () => {
	const input = {
		cpf: "839.435.452-10",
		orderItems: [
			{ idItem: 4, quantity: 1},
			{ idItem: 5, quantity: 1},
			{ idItem: 6, quantity: 3}
		],
		date: new Date("2021-12-10")
	};
	const output = await placeOrder.execute(input);
	expect(output.total).toBe(6350);
});

test("Should place an order with code", async () => {
    const input = {
		cpf: "839.435.452-10",
		orderItems: [
			{ idItem: 1, quantity: 1},
			{ idItem: 2, quantity: 1},
			{ idItem: 3, quantity: 3}
		],
		date: new Date("2021-12-10"),
		coupon: "VALE20"
	};
    const output = await placeOrder.execute(input);
	expect(output.code).toBe("202100000001");
});