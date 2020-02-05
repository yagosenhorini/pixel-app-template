
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
          console.log('Setado OrgId', e.data.category?.name);
          break;
        case 'internalSiteSearchView': {
          window._etmc.push(["setOrgId", "100023394"]);
          window._etmc.push(["trackPageView", { "search": e.data.search?.term }]);
          console.log('Setado OrgId', e.data.search?.term);
          break;
        }
        default: {
          return;
        }
      }
      break;
    }

    case 'vtex:productView': {
      const { product } = e.data
      window._etmc.push(["setOrgId", "100023394"]);
      window._etmc.push(["trackPageView", { item: product.productId }]);
      console.log('Salesforce Einstein - Visualizado Produto ID: ' + product.selectedSku + ' Nome: ' + product.productName);
      break;
    }

    case 'vtex:addToCart':
      window.sc = window.dataLayer.filter(el => {
        return (el.dimension12);
      })
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
      console.log('Setado', productsAdded);
      fetch(`https://landfy.smartcampaign.com.br/landfy/api/f90e48f7-4845-11ea-979f-0e55972e184b?fields[Visit_ID]=${Date.now() + Math.random().toFixed()}&fields[Email]=${window.email}&fields[Product_Sku]=${items[0].skuId}&fields[Preco]=${items[0].price / 100}&fields[SalesChannel]=${window.sc[0].dimension12}`).then(res => res.json()).then(console.log);
      break;

    case 'vtex:userData':
      console.log('profile', e.data);
      window.email = e.data.email;
      window._etmc.push(["setOrgId", "100023394"]);
      window._etmc.push(["setUserInfo", { "email": window.email }]);
      window._etmc.push(["trackPageView"]);
      console.log('Email', window.email)

      break;

    case 'vtex:removeFromCart':
      if (e.data.items.length <= 0) {
        window._etmc.push(["setOrgId", "100023394"]);
        window._etmc.push(["trackCart", { "clear_cart": true }]);
        console.log('Salesforce Einstein - Carrinho Vazio');
      }
      break;

    case 'vtex:cartChanged':
      window.sc = window.dataLayer.filter(el => {
        return (el.dimension12);
      })
      var pixel = window.pixelManagerEvents;
      var cartId = pixel.filter((el: any) => {
        return el.event === "cartId"
      });
      console.log(cartId);
      if (e.data.items.length <= 0) {
        console.log('sem itens no carrinho', e.data.items.length)
      } else {
        let carrinhoAbandonado = e.data.items;
        let trying = false;
        if (trying === false) {
          let items = carrinhoAbandonado.slice(0, 3).reduce((items, item, index) => {
            return `${items}&fields[product${index + 1}]=${item.skuId}&fields[preco${index + 1}]=${item.price}`
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
            var params = `fields[cart_id]=${cartId[0].cartId + date + '0'}&fields[Email]=${window.email}&fields[ordered]=0${items}&unique=cart_id&fields[SalesChannel]=${window.sc[0].dimension12}`
            fetch(`${url}?${params}`)
              .then((resp) => resp.json())
              .then(function (status) {
                console.log('status', status)
                if ([1, 3].indexOf(status.response) !== -1) {
                  localStorage.setItem('carrinhoAbandonado', json);
                  localStorage.setItem('cart_id', cartId[0].cartId);
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

    case 'vtex:orderPlaced':
      window.sc = window.dataLayer.filter(el => {
        return (el.dimension12);
      })
      var pixel = window.pixelManagerEvents;
      var cartId = pixel.filter((el: any) => {
        return el.event === "cartId"
      });
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
      window.cart_id = localStorage.getItem('orderForm');
      const itemsCarrinho = transactionProducts.slice(-3).reduce((items, item, index) => {
        return `${items}&fields[product${index + 1}]=${item.id}&fields[preco${index + 1}=${item.price}]`
      }, '');
      const url = '//landfy.smartcampaign.com.br/landfy/api/5c694cf4-1ac3-11ea-8061-0ebf47f38cdc';
      var params = `fields[cart_id]=${cartId[0].cartId + '1'}&fields[Email]=${window.email}.com&fields[ordered]=1${itemsCarrinho}&unique=cart_id&fields[SalesChannel]=${window.sc[0].dimension12}`;
      fetch(`${url}?${params}`)
        .then(resp => resp.json())
        .then(resp => {
          localStorage.remove('orderForm');
          localStorage.remove('cart_id');
          localStorage.remove('carrinhoAbandonado');
          console.log(resp)
        });
      break;

    default: {
      return
    }
  }
}


if (canUseDOM) {
  window.addEventListener('message', handleEvents)
}
