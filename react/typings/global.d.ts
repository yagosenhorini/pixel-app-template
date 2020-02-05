interface Window extends Window {
  dataLayer: any[]
  _etmc: _etmc
  cart_id: any
  email: any
  pixelManagerEvents: pixelManagerEvents
  sc: any
}

interface _etmc {
  push: function
}

interface pixelManagerEvents {
  event: string
  cartId: string
  filter: function
}
