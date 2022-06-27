# Projeto WebSockets

Necessário ter o Node.js instalado na máquina, juntamente com algum gerenciador de banco de dados (DBeaver, por exemplo).

Após baixar o projeto localmente, acessar o seu diretório e rodar os comandos abaixo para iniciar ambos os servidores via script:

Servidor Alpha:
```
npm run alphaServer
```
Servidor Bravo:
```
npm run bravoServer
```
<br>
Próximo passo: acessar o navegador de sua preferência, abrir as ferramentas de desenvolvedor, ir até o console e digitar os seguintes comandos:

1. Conectar ao servidor principal (Alpha):
```javascript
const ws = new WebSocket("ws://localhost:8090");
```
2. Criar um objeto para a coordenada a ser salva nos bancos:
```javascript
const object = {latitude: "18.98217", longitude:"-153.54939", comment: "Esta é uma mensagem"};
```
3. Enviar a coordenada (mensagem) para o servidor:
```javascript
const object = {latitude: "18.98217", ws.send(JSON.stringify(object));
```
<br>
Verificar o registro salvo em ambos os bancos (Alpha e Bravo), o que caracteriza o cenário ideal da aplicação.
<br>
<br>

O segundo cenário é aquele em que o Servidor Bravo para de funcionar, bastando seguir os seguintes passos:
1. Apertar as teclas ``CTRL + C`` no terminal de seu editor/IDE (na janela onde o script do Servidor Bravo foi rodado), para parar o respectivo servidor; 
2. Repetir a sequência acima no navegador, de forma que seja enviada uma nova coordenada para ser salva no servidor principal (Servidor Alpha);
3. Uma vez que o Servidor Bravo não está disponível, o registro será salvo em memória (porém será persistido no primeiro banco de dados - Alpha);
4. Ao iniciar o Servidor Bravo, o registro será persistido no segundo banco de dados a partir do array que ficou em memória.
