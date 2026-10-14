function notImplemented() {
  throw new Error('Корзина ещё не реализована. Сначала прочитайте тесты.');
}

function addToCart(cart, product, quantity) {
  if (quantity <= 0) {
    throw new RangeError('Количество должно быть больше 0');
  }

  const existingItem = cart.find((item) => item.id === product.id);
  const currentQuantity = existingItem ? existingItem.quantity : 0;
  const newQuantity = currentQuantity + quantity;

  if (newQuantity > product.stock) {
    throw new RangeError('Количество превышает остаток на складе');
  }

  if (existingItem) {
    return cart.map((item) => (item.id === product.id ? { ...item, quantity: newQuantity } : item));
  }

  return [...cart, { ...product, quantity: newQuantity }];
}

function changeQuantity(cart, productId, newQuantity) {
  const item = cart.find((product) => product.id === productId);
  if (!item) {
    return cart;
  }

  if (newQuantity <= 0) {
    throw new RangeError('Количество должно быть больше 0');
  }

  if (newQuantity > item.stock) {
    throw new RangeError('Количество превышает остаток на складе');
  }

  return cart.map((product) => (product.id === productId ? { ...product, quantity: newQuantity } : product));
}

function removeFromCart(cart, productId) {
  return cart.filter((item) => item.id !== productId);
}

function calculateCartSubtotal(cart) {
  return cart.reduce((subtotal, item) => subtotal + item.price * item.quantity, 0);
}

function calculateOrderTotal() { return notImplemented(); }

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
