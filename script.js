let cart = [];

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

function addToCart(button) {
  const item = button.closest('.item');
  const name = item.querySelector('h2').innerText;
  const quantity = parseInt(item.querySelector('input').value);
  const totalPrice = parseFloat(item.querySelector('.total-price').innerText);
  cart.push({ name, quantity, totalPrice });
  updateCartSummary();
}

function updateCartSummary() {
  const summary = document.getElementById('cart-summary');
  if (!summary) return;
  summary.classList.remove('hidden');
  let totalGeral = 0;
  let content = `<h3>Resumo do Pedido:</h3><ul>`;
  cart.forEach(item => {
    content += `<li>${item.quantity}x ${item.name} - R$ ${item.totalPrice.toFixed(2)}</li>`;
    totalGeral += item.totalPrice;
  });
  content += `</ul><strong>Total Geral: R$ ${totalGeral.toFixed(2)}</strong><br><br>`;
  content += `<button onclick="finalizarPedido()">Finalizar Pedido</button>`;
  summary.innerHTML = content;
}

function finalizarPedido() {
  if (cart.length === 0) {
    alert("Você ainda não selecionou nenhum item.");
    return;
  }
  const confirmDiv = document.getElementById('cart-confirmation');
  const detailsDiv = document.getElementById('confirm-details');
  let content = "<ul>";
  let total = 0;
  cart.forEach(item => {
    content += `<li>${item.quantity}x ${item.name} - R$ ${item.totalPrice.toFixed(2)}</li>`;
    total += item.totalPrice;
  });
  content += `</ul><strong>Total: R$ ${total.toFixed(2)}</strong>`;
  detailsDiv.innerHTML = content;
  confirmDiv.classList.remove('hidden');
}

function enviarParaWhatsapp() {
  let mensagem = `Olá! Gostaria de fazer o seguinte pedido:\n\n`;
  let total = 0;
  cart.forEach(item => {
    mensagem += `• ${item.quantity}x ${item.name} - R$ ${item.totalPrice.toFixed(2)}\n`;
    total += item.totalPrice;
  });
  mensagem += `\nTotal: R$ ${total.toFixed(2)}\n`;
  mensagem += `\nAguardo confirmação. Obrigado!`;
  const textoCodificado = encodeURIComponent(mensagem);
  const numero = "5511999999999"; // Substitua pelo seu número do WhatsApp
  const url = `https://wa.me/${numero}?text=${textoCodificado}`;
  window.open(url, '_blank');
}
