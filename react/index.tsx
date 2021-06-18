
/*eslint-disable*/
/*tslint-disable*/
import { canUseDOM } from 'vtex.render-runtime'
import { PixelMessage } from './typings/events'

export function handleEvents(e: PixelMessage) {

  const { data } = e;

  switch (data.eventName) {
    case 'vtex:pageInfo':
      console.log('Page Info: ', e?.data);
      switch (data.eventType) {

        case 'homeView':
          console.log('homeView');
          break;

        case 'categoryView':
          console.log('category', data?.pageTitle);
          window._etmc.push(["setOrgId", "514007805"]);
          window._etmc.push(["trackPageView", { "category": data?.pageTitle }]);
          console.log('Setado OrgId: 514007805');
          break;

        case 'departmentView':
          console.log('category', data?.pageTitle);
          window._etmc.push(["setOrgId", "514007805"]);
          window._etmc.push(["trackPageView", { "category": data?.pageTitle }]);
          console.log('Setado OrgId: 514007805');
          break;

        case 'internalSiteSearchView':
          window._etmc.push(["setOrgId", "514007805"]);
          window._etmc.push(["trackPageView", { "search": data.search?.term }]);
          console.log('Setado OrgId: 514007805');
          break;

        default:
          return;
      }
      break;

    case 'vtex:pageView':
      break;

    case 'vtex:productView': {
      const { product } = data
      window._etmc.push(["setOrgId", "514007805"]);
      window._etmc.push(["trackPageView", { item: product.productId }]);
      var price = product?.items[0]?.sellers[0]?.commertialOffer?.ListPrice;
      console.log('Salesforce Einstein - Visualizado Produto ID: ' + product.productId + ' Nome: ' + product.productName, 'Preço', + price);
      break;
    }

    case 'vtex:addToCart':
      const { items } = data;
      const productsAdded = items.map((item: any) => {
        return {
          "item": item?.skuId,
          "quantity": item?.quantity,
          "price": item?.price / 100,
          "unique_id": item?.skuId
        }
      })
      localStorage.setItem('items', JSON.stringify(productsAdded));
      window._etmc.push(["setOrgId", "514007805"]);
      window._etmc.push(["trackCart", { "cart": productsAdded }]);
      console.log('Produtos: ', productsAdded);
      break;

    case 'vtex:userData':
      console.log('profile', data.isAuthenticated);
      window.email = data.email;
      window._etmc.push(["setOrgId", "514007805"]);
      window._etmc.push(["setUserInfo", { "email": window.email }]);
      window._etmc.push(["trackPageView"]);
      console.log('Email', window.email)

      break;

    case 'vtex:removeFromCart':
      if (data.items.length <= 0) {
        window._etmc.push(["setOrgId", "514007805"]);
        window._etmc.push(["trackCart", { "clear_cart": true }]);
        console.log('Salesforce Einstein - Carrinho Vazio');
      }
      break;

    case 'vtex:cartChanged':

      var pixel = window.pixelManagerEvents;
      var cartId = pixel.filter((el: any) => {
        return el.event === "cartId"
      });
      console.log(cartId);
      
      if (data?.items?.length === 0) console.log('Itens === 0');
      const itemsOnCart = data.items.map((item: any) => {
        console.log('items', data.items);
        return {
          "item": item?.skuId,
          "quantity": item?.quantity,
          "price": item?.price / 100,
          "unique_id": item?.skuId
        }
      })
      localStorage.setItem('items', JSON.stringify(itemsOnCart));
      break;

    case 'vtex:orderPlaced':
      const itemsAdded = JSON.parse(localStorage.getItem('items') || '{}');
      const products = itemsAdded.map((item: any) => {
        return {
          "item": item?.item,
          "quantity": item.quantity,
          "price": item.price,
          "unique_id": item.unique_id
        };
      });
      window._etmc.push(["setOrgId", "514007805"]);
      window._etmc.push(["trackConversion", { "cart": products }]);
      console.log('products:', products);
      localStorage.removeItem('items');
      // const itemsCarrinho = itemsAdded.slice(-3).reduce((items: any, item: any, index: any) => {
      //   return `${items}&fields[product${index + 1}]=${item.id}&fields[preco${index + 1}=${item.listPrice}]`
      // }, '');
      break;

    default: {
      return
    }
  }
}

if (canUseDOM) {
  window.addEventListener('message', handleEvents)
}
