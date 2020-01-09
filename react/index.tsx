/*eslint-disable*/
import { canUseDOM } from 'vtex.render-runtime'
import { PixelMessage } from './typings/events'

document.addEventListener('DOMContentLoaded', function(){
  console.log('bolo de mel');
})

export function handleEvents(e: PixelMessage) {
  console.log('e', e);
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
