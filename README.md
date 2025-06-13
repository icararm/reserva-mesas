 # reserva-mesas
 
Uma aplicação de gerenciamento de reserva de mesas que reune o fluxo de trabalho do atendente,garçom e gerente em um unico programa, incluindo registro de funcionários e criação de relatórios



## 1. Integrantes da Equipe

Ícara da Rocha Marques - 12725161283

Caio Sento Sé da Fonseca Matos- 12724122482

Guilherme Carneiro Andrade - 12725157330

Marcus Vinicius Belo Sá Ribeiro - 1272410190

Fernando Rodrigues Pinheiro Neto - 12724131828

Gabriel Gomes Paixão Souza - 12724128887

Matheus Vianelo de Carvalho - 12724121616



## 2. Requisitos de Software

- Linguagem de Programação: JavaScript (ES6+)

- Ambiente de Execução: Node.js (versão 14 ou superior)

- Banco de Dados: SQLite3

| Biblioteca    | Função                                                           |
| ------------- | ---------------------------------------------------------------- |
| `express`     | Framework para criação da API REST                               |
| `sqlite3`     | Integração com banco de dados SQLite                             |
| `nodemon`     | Reinicialização automática do servidor durante o desenvolvimento |
| `body-parser` | Middleware para tratar JSON nas requisições HTTP     |



## 3. Instruções para Instalação e Execução (Download ZIP)
   
  ### Instalar o Node.js
    
  - Acesse: https://nodejs.org/
  
  - Baixe a versão LTS (Recomendada)
  
  - Instale normalmente (clicando em “Avançar” até o final)
  
  ### Baixar o projeto
  - Vá até o repositório no GitHub.
  
  - Clique em Code > Download ZIP.
  
  - Salve e extraia o arquivo ZIP em uma pasta no seu computador.

  ### Abrir o terminal na pasta do projeto
  - Entre na pasta extraída.
  
  - Clique com o botão direito em um espaço vazio da pasta.
  
  - Escolha Abrir no Terminal ou Abrir no PowerShell.

  ### Instalar as dependências
  - No terminal, digite:
  ```bash
npm install
```
  Isso vai instalar todas as dependências que o projeto precisa para funcionar. 

  ### Banco de dados
  - Se o arquivo reservas.db já estiver na pasta do projeto, você não precisa criar o banco de dados. Pode pular esta etapa.
  
  - Caso não esteja, execute:
  ```bash
node src/database/db.js
```

  ### Iniciar a aplicação
  - No terminal, rode:

  ```bash
npm start
```
  
  Aguarde a mensagem indicando que o servidor está funcionando:  Servidor rodando em http://localhost:3000

  ### Acessar o sistema
  - Abra o navegador e digite:
```bash
http://localhost:3000/
```
  
  Agora a aplicação está pronta para uso!



## 4. Teste do projeto

# Login 

| Nome      | Tipo      | Permissões                                                                 |
|-----------|-----------|-----------------------------------------------------------------------------|
| Atendente | Atendente | Cadastra e cancela reservas                                                 |
| Garçom    | Garçom    | Confirma reservas                                                           |
| Gerente   | Gerente   | Gera relatórios por período, de determinada mesa e por determinado garçom   |

 
## 5. Justificativa da Abordagem de Comunicação

   A aplicação utiliza API RESTful sobre protocolo HTTP para comunicação entre cliente e servidor, por ser uma abordagem:

- Simples e compatível com diversas plataformas e interfaces.

- De fácil teste usando ferramentas como Postman ou Insomnia.

- Escalável, permitindo que o sistema evolua facilmente.

- Alinhada com boas práticas amplamente adotadas no mercado de desenvolvimento web.

 
    
