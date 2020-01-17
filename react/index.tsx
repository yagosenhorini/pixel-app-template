
/*eslint-disable*/
/*tslint-disable*/
import { canUseDOM } from 'vtex.render-runtime'
import { PixelMessage } from './typings/events'

export function handleEvents(e: PixelMessage) {
  switch (e.data.eventName) {
    case 'vtex:pageInfo': {
      switch (e.data.eventType) {
        case 'categoryView':
          window._etmc.push(["setOrgId", "100023394"]);
          window._etmc.push(["trackPageView", { "category": e.data.category?.name }]);
          console.log('Setado OrgId');
          break;

        case 'internalSiteSearchView': {
          window._etmc.push(["setOrgId", "100023394"]);
          window._etmc.push(["trackPageView", { "search": e.data.search?.term }]);
          console.log('Setado OrgId');
          break;
        }
        default: {
          return;
        }
      }
      break;
    }

    case 'vtex:cartChanged':
      var cart_id: any
      if (e.data.items.length <= 0) {
        console.log('sem itens no carrinho', e.data.items.length)
      } else {
        cart_id = localStorage.getItem('orderForm');
        let orderFormId = JSON.parse(cart_id);
        let carrinhoAbandonado = e.data.items;
        let trying = false;
        if (trying === false) {
          let items = carrinhoAbandonado.slice(0, 3).reduce((items, item, index) => {
            console.log('items reduce', items);
            return `${items}&fields[product${index + 1}]=${item.skuId}`
          }, '');
          let json = JSON.stringify(items);
          if (json !== localStorage.getItem('carrinhoAbandonado') && json !== '{}') {
            trying = true;
            const url = '//landfy.smartcampaign.com.br/landfy/api/5c694cf4-1ac3-11ea-8061-0ebf47f38cdc';
            let date = (new Date()).toISOString().split('T').map(function (string, index) {
              if (index === 0) return string.split('-').reverse().join('');
              else return string.split(':').slice(0, 2).join('');
            }).join('');
            console.log(date);
            var params = `fields[0][cart_id]=${orderFormId.orderFormId + date + '0'}&fields[Email]=teste@teste.com&fields[ordered]=0${items}&unique=cart_id`
            console.log(params);
            fetch(`${url}?${params}`)
              .then((resp) => resp.json())
              .then(function (status) {
                console.log(status)
                if ([1, 3].indexOf(status.response) !== -1) {
                  localStorage.setItem('carrinhoAbandonado', json);
                  localStorage.setItem('cart_id', orderFormId);
                } else {
                  console.error(status);
                }
                trying = false;
              }, console.error)
              .catch(function () {
                trying = false;
              });
          }
        }
      }
      break;

    case 'vtex:productView': {
      const { product } = e.data
      window._etmc.push(["setOrgId", "100023394"]);
      window._etmc.push(["trackPageView", { item: product.productId }]);
      console.log('Salesforce Einstein - Visualizado Produto ID: ' + product.selectedSku + ' Nome: ' + product.productName);
      break
    }

    case 'vtex:addToCart':
      const { items } = e.data;
      const productsAdded = items.map((item) => {
        return {
          "item": item.skuId,
          "quantity": item.quantity,
          "price": item.price / 100,
          "unique_id": item.skuId
        }
      })
      window._etmc.push(["setOrgId", "100023394"]);
      window._etmc.push(["trackCart", { "cart": productsAdded }]);
      break;

    case 'vtex:removeFromCart':
      if (e.data.items.length <= 0) {
        window._etmc.push(["setOrgId", "100023394"]);
        window._etmc.push(["trackCart", { "clear_cart": true }]);
        console.log('Salesforce Einstein - Carrinho Vazio');
      }
      break;

    case 'vtex:orderPlaced':
      var cart_id: any
      const { transactionProducts } = e.data;
      const products = transactionProducts.map((item) => {
        return [
          {
            "item": item.sku,
            "quantity": item.quantity,
            "price": item.price,
            "unique_id": item.id
          },
        ];
      });
      window._etmc.push(["setOrgId", "100023394"]);
      window._etmc.push(["trackConversion", { "cart": products }]);
      cart_id = localStorage.getItem('orderForm');
      const orderFormId = JSON.parse(cart_id);
      const itemsCarrinho = transactionProducts.slice(-3).reduce((items, item, index) => {
        return `${items}&fields[product${index + 1}]=${item.id}`
      }, '');
      const url = '//landfy.smartcampaign.com.br/landfy/api/5c694cf4-1ac3-11ea-8061-0ebf47f38cdc';
      var params = `fields[0][cart_id]=${orderFormId.orderFormId + '1'}&fields[Email]=teste@teste.com&fields[ordered]=1${itemsCarrinho}&unique=cart_id`;
      fetch(`${url}?${params}`)
        .then(resp => resp.json())
        .then(console.log);
      break;

    default: {
      return
    }
  }
}


if (canUseDOM) {
  window.addEventListener('message', handleEvents)
}
