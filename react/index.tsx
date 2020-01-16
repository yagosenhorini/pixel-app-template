// declare global {
//   interface Window {
//     window._etmc:any[]
//   }
// }
// let window._etmc = window.window._etmc
/*eslint-disable*/
/*tslint-disable*/
import { canUseDOM } from 'vtex.render-runtime'
import { PixelMessage } from './typings/events'
// import window._etmc.push from './modules/window._etmc.pushEinstein';

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
      window._etmc.push(["setOrgId", "100023394"]);
      window._etmc.push(["trackPageView", { "item": e.data.product.productId }]);
      break;
    }

    case 'vtex:addToCart':
      window._etmc.push(["setOrgId", "100023394"]);
      window._etmc.push(["trackCart", {
        "cart": [
          {
            "item": e.data.items[0].skuId,
            "quantity": e.data.items[0].quantity,
            "price": e.data.items[0].price,
            "unique_id": e.data.items[0].skuId
          },
        ]
      }]);
      console.log('Setado OrgId');
      break;
    default: {
      return
    }
  }
}


if (canUseDOM) {
  window.addEventListener('message', handleEvents)
}
