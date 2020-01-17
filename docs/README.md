# Boticario Pixel APP - VTEX IO

## Como iniciar o desenvolvimento do pixel:

Para iniciar o pixel, primeiro você deve:

- Verificar se o ambiente possui permissão para instalação do Pixel (caso não tenha, solicitar a permissão por chamado na VTEX);
- Configurar os arquivos manifest.json na raíz do projeto e os arquivos interfaces.json e plugins.json dentro da pasta store;
- Instalar globalmente o pacote da VTEX com o comando: ```yarn global add vtex```
- Configurar um workspace com o comando ```vtex workspace create <nome_do_workspace>```
- Instalar as apps que estão [neste link](https://vtex.io/docs/getting-started/build-stores-with-vtex-io/3);

### Manifest.json

```json
{
  "name": "einstein-core", //Nome do app
  "vendor": "enext", //Nome da empresa 
  "version": "0.0.1",
  "title": "Einstein Core Events", //título do app
  "description": "Events dispatch for Einstein Salesforce", //descricao do app
  "billingOptions": {
    "termsURL": "",
    "support": {
      "url": "https://support.vtex.com/hc/requests"
    },
    "free": true
  },
  "builders": {
    "react": "3.x",
    "store": "0.x",
    "pixel": "0.x",
    "docs": "0.x"
  },
  "dependencies": {
    "vtex.pixel-interfaces": "1.x"
  },
  "settingsSchema": {
    "title": "Einstein Core Events", //título do app
    "type": "object",
    "properties": {
      "gtmId": {
        "title": "SAMPLE FIELD",
        "description": "Enter the ID (GTM-XXXX) from your Google Tag Manager",
        "type": "string"
      }
    }
  },
  "$schema": "https://raw.githubusercontent.com/vtex/node-vtex-api/master/gen/manifest.schema"
}

```

### Interfaces.json

```json
{
  "pixel.einstein-core": { //nome do app deve ser <pixel.app-name>
    "component": "index"
  }
}
```

### Plugins.json

```json
{
  "pixels > pixel": "pixel.einstein-core" //nome do app
}
```
