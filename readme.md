# Manual de Instalação do App Enext Einstein Core

## 1º Passo

Clone o repositório [https://github.com/yagosenhorini/pixel-app-template](https://github.com/yagosenhorini/pixel-app-template) e entre no diretório pelo CMD ou pelo terminal da IDE/Editor de Texto de sua preferência.

## 2º Passo

Efetuar o login no ambiente utilizando o comando `vtex login <nome_da_conta>`

## 3º Passo

Trocar de workspace utlizando o comando ```vtex workspace use <nome_do_workspace>```
Obs: Não utilizar o ambiente Master para teste.

## 4º Passo

Utilizar o comando ```vtex link``` e abrir o link do ambiente selecionado no passo 3.

__IMPORTANTE: Verificar o comportamento da loja para garantir que não tenha ocorrido quebras no site, causando o impedimento total da navegação__.

## 5º Passo

Utilizar o comando ```vtex unlink```, para tirar o vínculo com o ambiente atual, trocar para o ambiente master ```vtex workspace use master``` e utilizar o comando ```vtex install enext.einstein-core``` para instalar o app do Einstein Salesforce.

Feito isso, o app estará instalado no ambiente de produção e o time de CRM terá acesso aos dados de navegação.


