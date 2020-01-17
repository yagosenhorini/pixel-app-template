
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
      break;

    default: {
      return
    }
  }
}


if (canUseDOM) {
  window.addEventListener('message', handleEvents)
}
