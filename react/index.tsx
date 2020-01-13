/*eslint-disable*/
import { canUseDOM } from 'vtex.render-runtime'
import { PixelMessage } from './typings/events'

export function handleEvents(e: PixelMessage) {
  if(e.data.eventName){
    console.log('Teste', e);
  }
  switch (e.data.eventName) {
    case 'vtex:pageView': {

    }
    default: {
      return
    }
  }
}

if (canUseDOM) {
  window.addEventListener('message', handleEvents)
}
