/*eslint-disable*/
import { canUseDOM } from 'vtex.render-runtime'
import { PixelMessage } from './typings/events'

export function handleEvents(e: PixelMessage) {
  switch (e.data.event) {
    case 'pageInfo': {
      console.log(e.data);
      break;
    }
    case 'addToCart': {
      console.log(e.data);
      break;
    }
    case 'productView': {
      console.log('produto', e.data);
      break;
    }
    case 'addToCart': {
      console.log('add carrinho', e.data);
      break;
    }
    default: {
      return
    }
  }
}

if (canUseDOM) {
  window.addEventListener('message', handleEvents)
}
