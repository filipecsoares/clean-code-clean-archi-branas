import GetStock from "../../../src/application/usecase/get_stock/GetStock";
import SaveStock from "../../../src/application/usecase/save_stock/SaveStock";
import StockEntryRepository from '../../../src/domain/repository/StockEntryRepository';
import DatabaseRepositoryFactory from "../../../src/infra/factory/DatabaseRepositoryFactory";

let stockEntryRepository: StockEntryRepository;
let saveStock: SaveStock;
let getStock: GetStock;

beforeEach(function () {
    const repositoryFactory = new DatabaseRepositoryFactory();
	stockEntryRepository = repositoryFactory.createStockEntryRepository();
	saveStock = new SaveStock(repositoryFactory);
	getStock = new GetStock(repositoryFactory);
});

test("Should get an item stock", async function () {
	const saveStockInputa = {
		idItem: 1,
		operation: "in",
		quantity: 10
	};
	await saveStock.execute(saveStockInputa);
	const saveStockInputb = {
		idItem: 1,
		operation: "out",
		quantity: 5
	};
	await saveStock.execute(saveStockInputb);
	const total = await getStock.execute(1);
	expect(total).toBe(5);
});

afterEach(async function () {
	await stockEntryRepository.clear();
});