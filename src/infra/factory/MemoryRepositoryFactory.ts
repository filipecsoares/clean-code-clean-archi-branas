import RepositoryFactory from '../../domain/factory/RepositoryFactory';
import CouponRepository from '../../domain/repository/CouponRepository';
import ItemRepository from '../../domain/repository/ItemRepository';
import OrderRepository from '../../domain/repository/OrderRepository';
import CouponRepositoryMemory from '../repository/memory/CouponRepositoryMemory';
import ItemRepositoryMemory from '../repository/memory/ItemRepositoryMemory';
import OrderRepositoryMemory from '../repository/memory/OrderRepositoryMemory';

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
}