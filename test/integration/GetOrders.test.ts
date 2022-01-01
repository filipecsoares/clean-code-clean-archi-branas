import GetOrders from '../../src/application/query/GetOrders';
import PlaceOrder from '../../src/application/usecase/place_order/PlaceOrder';
import PlaceOrderInput from '../../src/application/usecase/place_order/PlaceOrderInput';
import OrderDAODatabase from '../../src/infra/dao/OrderDAODatabase';
import PgPromiseConnectionAdapter from '../../src/infra/database/PgPromiseConnectionAdapter';
import CouponRepositoryDatabase from '../../src/infra/repository/database/CouponRepositoryDatabase';
import ItemRepositoryDatabase from '../../src/infra/repository/database/ItemRepositoryDatabase';
import OrderRepositoryDatabase from '../../src/infra/repository/database/OrderRepositoryDatabase';

let placeOrder: PlaceOrder;
let getOrders: GetOrders;
let orderRepository: OrderRepositoryDatabase;

beforeEach(function () {
	const connection = PgPromiseConnectionAdapter.getInstance();
    const itemRepository = new ItemRepositoryDatabase(connection);
	orderRepository = new OrderRepositoryDatabase(connection);
	const couponRepository = new CouponRepositoryDatabase(connection);
	placeOrder = new PlaceOrder(itemRepository, orderRepository, couponRepository);
	const orderDAO = new OrderDAODatabase(connection);
	getOrders = new GetOrders(orderDAO);
});

test("Should get all orders", async function () {
	const input = new PlaceOrderInput(
		"847.903.332-05", 
		[
			{
				idItem: 1,
				quantity: 1
			},
			{
				idItem: 2,
				quantity: 1
			},
			{
				idItem: 3,
				quantity: 3
			}
		], 
		new Date("2021-03-01"), 
		"VALE20"
	);
	await placeOrder.execute(input);
	const getOrdersOutput = await getOrders.execute();
    expect(getOrdersOutput.length).toBe(1);
});

afterEach(async function () {
	await orderRepository.clear();
});