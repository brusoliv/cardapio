function filterMenu(category) {
  const items = document.querySelectorAll('.item');

  items.forEach(item => {
    if (category === 'all' || item.classList.contains(category)) {
      item.classList.remove('hidden');
    } else {
      item.classList.add('hidden');
    }
  });
}

function showDetails(button) {
  const item = button.closest('.item');
  const name = item.querySelector('h2').innerText;
  const desc = item.querySelector('p').innerText;
  const price = item.querySelector('span').innerText;

  alert(`🔍 ${name}\n\nDescrição: ${desc}\nPreço: ${price}`);
}
function filterMenu(category) {
  const items = document.querySelectorAll('.item');

  items.forEach(item => {
    if (category === 'all' || item.classList.contains(category)) {
      item.classList.remove('hidden');
    } else {
      item.classList.add('hidden');
    }
  });
}

function showDetails(button) {
  const item = button.closest('.item');
  const name = item.querySelector('h2').innerText;
  const desc = item.querySelector('p').innerText;
  const price = item.querySelector('.price').innerText;

  alert(`🔍 ${name}\n\nDescrição: ${desc}\nPreço: ${price}`);
}

function changeQty(button, delta) {
  const item = button.closest('.item');
  const input = item.querySelector('input');
  let quantity = parseInt(input.value);

  quantity += delta;
  if (quantity < 1) quantity = 1;

  input.value = quantity;

  const unitPrice = parseFloat(item.querySelector('.price').dataset.price);
  const total = (unitPrice * quantity).toFixed(2);
  item.querySelector('.total-price').innerText = total;
}
let cart = [];

function addToCart(button) {
  const item = button.closest('.item');
  const name = item.querySelector('h2').innerText;
  const quantity = parseInt(item.querySelector('input').value);
  const totalPrice = parseFloat(item.querySelector('.total-price').innerText);

  cart.push({ name, quantity, totalPrice });

  updateCartSummary();
}

function updateCartSummary() {
  let summary = document.getElementById('cart-summary');

  if (!summary) {
    summary = document.createElement('div');
    summary.id = 'cart-summary';
    summary.className = 'cart-summary';
    document.body.appendChild(summary);
  }

  let totalGeral = 0;
  let content = `<h3>Resumo do Pedido:</h3><ul>`;

  cart.forEach(item => {
    content += `<li>${item.quantity}x ${item.name} - R$ ${(item.totalPrice).toFixed(2)}</li>`;
    totalGeral += item.totalPrice;
  });

  content += `</ul><strong>Total Geral: R$ ${totalGeral.toFixed(2)}</strong><br><br>`;
  content += `<button onclick="finalizarPedido()">Finalizar Pedido</button>`;

  summary.innerHTML = content;
}

function finalizarPedido() {
  let total = cart.reduce((acc, item) => acc + item.totalPrice, 0).toFixed(2);
  alert(`✅ Pedido finalizado com sucesso!\nTotal: R$ ${total}\n(Exemplo de integração com WhatsApp ou pagamento online)`);
}

function finalizarPedido() {
  let mensagem = `Olá! Gostaria de fazer o seguinte pedido:\n\n`;
  let total = 0;

  cart.forEach(item => {
    mensagem += `• ${item.quantity}x ${item.name} - R$ ${item.totalPrice.toFixed(2)}\n`;
    total += item.totalPrice;
  });

  mensagem += `\nTotal: R$ ${total.toFixed(2)}\n`;
  mensagem += `\nAguardo confirmação. Obrigado!`;

  // Codifica a mensagem para URL
  const textoCodificado = encodeURIComponent(mensagem);

  // Número de WhatsApp do restaurante (somente números, com DDD e país)
  const numero = "5519999274500"; // exemplo com DDD 11 (SP) e +55 (Brasil)

  // Monta link do WhatsApp
  const url = `https://wa.me/${5519999274500}?text=${textoCodificado}`;

  // Redireciona
  window.open(url, '_blank');
}
