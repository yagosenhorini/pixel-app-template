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
import push from './modules/pushEinstein';

export function handleEvents(e: PixelMessage) {
  switch (e.data.eventName) {
    case 'vtex:pageInfo': {

      switch (e.data.eventType) {

        case 'categoryView':
          console.log(push(["setOrgId", "100023394"]),
         push(["trackPageView", { "category": e.data.category?.name }]));

         push(["setOrgId", "100023394"]);
         push(["trackPageView", { "category": e.data.category?.name }]);
          break;

        case 'internalSiteSearchView': {
         push(["setOrgId", "100023394"]);
         push(["trackPageView", { "search": e.data.search?.term }]);
        }
        default: {
          return;
        }
      }
      break;
    }

    case 'vtex:productView': {
     push(["setOrgId", "100023394"]);
     push(["trackPageView", { "item": e.data.product.productId }]);
      break;
    }

    case 'vtex:addToCart':
      console.log('oi',push(["trackCart", {
        "cart": [
          {
            "item": e.data.items,
            "quantity": "INSERT_QUANTITY",
            "price": "INSERT_PRICE",
            "unique_id": "INSERT_UNIQUE_ID"
          },
        ]
      }]));
     push(["setOrgId", "100023394"]);
     push(["trackCart", {
        "cart": [
          {
            "item": e.data.items,
            "quantity": "INSERT_QUANTITY",
            "price": "INSERT_PRICE",
            "unique_id": "INSERT_UNIQUE_ID"
          },
        ]
      }]);
      break;
    default: {
      console.log('saindo do switch')
      return
    }
  }
}


if (canUseDOM) {
  window.addEventListener('message', handleEvents)
}
