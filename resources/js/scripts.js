const itemsContainer = document.getElementById('items')
import data from './data.js'

const itemList = document.getElementById('item-list')
const cartQty = document.getElementById('cart-qty')
const cartTotal = document.getElementById('cart-total')


// the length of our data determines how many times this loop goes around
for (let i=0; i<data.length; ++i) {
    let newDiv = document.createElement('div');
      newDiv.className = 'item'
    // display the image
    let img = document.createElement('img');
    img.src = data[i].image
    img.width = 300
    img.height = 300
    newDiv.appendChild(img)
  
    let desc = document.createElement('P')
    desc.innerText =data[i].desc
    newDiv.appendChild(desc)
    let price = document.createElement('P')
    price.innerText = data[i].price
    newDiv.appendChild(price)
  
    let button = document.createElement('button')
    button.id = data[i].name
  
    // creates a custom attribute called data-price.
    // That will hold the price for each element in the button
    button.dataset.price = data[i].price
    button.innerHTML = "Add to Cart"
    newDiv.appendChild(button)
    // put new div inside items container
    itemsContainer.appendChild(newDiv)
  }

  const all_items_button = Array.from(document.querySelectorAll("button"))

  all_items_button.forEach(elt => elt.addEventListener('click', () => {
    addItem(elt.getAttribute('id'), elt.getAttribute('data-price'))
    showItems()
  }))

  const cart = [ ]

itemList.onchange = function(e) {
  if (e.target && e.target.classList.contains('update')) {
    const name = e.target.dataset.name
    const qty = parseInt(e.target.value)
    updateCart(name, qty)

  }

}

  // ------------------------------------------------
  // Add Item
  function addItem(name, price) {
    for (let i = 0; i < cart.length; i += 1) {
        if (cart[i].name === name) {
            cart[i].qty += 1
            showItems()
            return
        }
    }
    const item = { name, price, qty: 1 }
    cart.push(item)
  }

  // ------------------------------------------------------------------------------
  // Show Items
  function showItems() {
    
    cartQty.innerHTML = `You have ${getQty()} items in your cart`

    let itemStr = ''

    for (let i = 0; i < cart.length; i += 1) {

        const { name, price, qty } = cart[i]

        itemStr += `<li>
        ${name} $${price} x ${qty} = ${qty * price} 
        <button class="remove" data-name="${name}">Remove</button>
        <button class="add-one" data-name="${name}"> + </button>
        <button class="remove-one" data-name="${name}"> - </button>
        <input class="update" type="number" data-name="${name}">
        </li>`
    }

    itemList.innerHTML = itemStr

    cartTotal.innerHTML = `Total in cart: $${getTotal()}`

  }

  // -----------------------------------------------
  // Get Quantity
  function getQty() {
    let qty = 0

    for (let i = 0; i < cart.length; i += 1) {
        qty += cart[i].qty
    }

    return qty

  }

  // ---------------------------------------------
  // Get Total
  function getTotal() {
    let total = 0

    for (let i = 0; i < cart.length; i += 1) {
        total += cart[i].price * cart[i].qty
    }

    return total.toFixed(2)

  }

  function removeItem(name, qty = 0) {
    for (let i = 0; i < cart.length; i += 1) {
        if (cart[i].name === name) {
            if (qty > 0) {
               cart[i].qty -= qty
            }

            if (cart[i].qty < 1 || qty === 0) {
                cart.splice(i, 1)
            }
            showItems()
            return
        }
    }
  }

  itemList.onclick = function(e) {
    if (e.target && e.target.classList.contains('remove'))  {
      const name = e.target.dataset.name 
      removeItem(name) 
    } else if (e.target && e.target.classList.contains('add-one')) {
      const name = e.target.dataset.name
      addItem(name)
    } else if (e.target && e.target.classList.contains('remove-one')) {
      const name = e.target.dataset.name
      removeItem(name, 1)
    }  
  }

  function updateCart(name, qty) {
    for (let i = 0; i < cart.length; i += 1) {
      if (cart[i].name === name) {
        if (qty < 1) {
          removeItem(name)
          return
        }
        cart[i].qty = qty
        showItems()
        return
      }

    }
  }

  // ----------------------------
  showItems()