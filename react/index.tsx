/*eslint-disable*/
import { canUseDOM } from 'vtex.render-runtime'
import { PixelMessage } from './typings/events'

export function handleEvents(e: PixelMessage) {
  if(e.data.eventName){
    console.log('Teste', e);
  }
}

if (canUseDOM) {
  window.addEventListener('message', handleEvents)
}
