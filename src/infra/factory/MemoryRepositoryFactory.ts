import RepositoryFactory from '../../domain/factory/RepositoryFactory';
import CouponRepository from '../../domain/repository/CouponRepository';
import ItemRepository from '../../domain/repository/ItemRepository';
import OrderRepository from '../../domain/repository/OrderRepository';
import StockEntryRepository from '../../domain/repository/StockEntryRepository';
import CouponRepositoryMemory from '../repository/memory/CouponRepositoryMemory';
import ItemRepositoryMemory from '../repository/memory/ItemRepositoryMemory';
import OrderRepositoryMemory from '../repository/memory/OrderRepositoryMemory';
import StockEntryRepositoryMemory from '../repository/memory/StockEntryRepositoryMemory';

export default class MemoryRepositoryFactory implements RepositoryFactory {
    createOrderRepository(): OrderRepository {
        throw new OrderRepositoryMemory();
    }
    createItemRepository(): ItemRepository {
        throw new ItemRepositoryMemory();
    }
    createCouponRepository(): CouponRepository {
        throw new CouponRepositoryMemory();
    }
    createStockEntryRepository(): StockEntryRepository {
        throw new StockEntryRepositoryMemory();
    }
}