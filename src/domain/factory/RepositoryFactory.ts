import CouponRepository from '../repository/CouponRepository';
import ItemRepository from '../repository/ItemRepository';
import OrderRepository from '../repository/OrderRepository';

export default interface RepositoryFactory {
    createOrderRepository(): OrderRepository;
    createItemRepository(): ItemRepository;
    createCouponRepository(): CouponRepository;
}