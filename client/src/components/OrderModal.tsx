import { useOrders } from "../context/OrderContext";

const OrderModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const { orders } = useOrders();

  if (!isOpen) return null;

  return (
    <div className="order-modal">
      <button onClick={onClose}>Close</button>
      {orders.length > 0 ? (
        <ul>
          {orders.map((order, index) => (
            <li key={index}>
              Order Nummer: {order.orderNumber}, Total: {order.total} SEK
            </li>
          ))}
        </ul>
      ) : (
        <p>No Orders</p>
      )}
    </div>
  );
};

export default OrderModal;
