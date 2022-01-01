import GetOrder from '../../src/application/query/GetOrder';
import PlaceOrder from '../../src/application/usecase/place_order/PlaceOrder';
import OrderDAODatabase from '../../src/infra/dao/OrderDAODatabase';
import PgPromiseConnectionAdapter from '../../src/infra/database/PgPromiseConnectionAdapter';
import CouponRepositoryDatabase from '../../src/infra/repository/database/CouponRepositoryDatabase';
import ItemRepositoryDatabase from '../../src/infra/repository/database/ItemRepositoryDatabase';
import OrderRepositoryDatabase from '../../src/infra/repository/database/OrderRepositoryDatabase';

let placeOrder: PlaceOrder;
let getOrder: GetOrder;
let orderRepository: OrderRepositoryDatabase;

beforeEach(function () {
    const connection = PgPromiseConnectionAdapter.getInstance();
	const itemRepository = new ItemRepositoryDatabase(connection);
	orderRepository = new OrderRepositoryDatabase(connection);
	const couponRepository = new CouponRepositoryDatabase(connection);
	const orderDAO = new OrderDAODatabase(connection);
	placeOrder = new PlaceOrder(itemRepository, orderRepository, couponRepository);
	getOrder = new GetOrder(orderDAO);
});

test("Should get an order by code", async function () {
	const input = {
		cpf: "839.435.452-10",
		orderItems: [
			{ idItem: 4, quantity: 1},
			{ idItem: 5, quantity: 1},
			{ idItem: 6, quantity: 3}
		],
		date: new Date("2021-12-10")
	};
	const placeOrderOutput = await placeOrder.execute(input);
	const getOrderOutput = await getOrder.execute(placeOrderOutput.code);
	expect(getOrderOutput.total).toBe(6350);
});

afterEach(async function () {
	await orderRepository.clear();
});