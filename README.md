# Rails on Vacation

### Descrição
O Rails on Vacation é um aplicativo para agendamento de férias. Foi desenvolvido com API Ruby on Rails, banco de dados Postgres e frontend em React e TailwindCSS.

### Instalação e Execução

Clone o repositório para sua máquina local.

Navegue até a pasta raiz do projeto.

Execute o comando docker-compose up -d. Isso criará e iniciará os contêineres para a API, o banco de dados e o frontend.

Para criar dados de amostra, entre no container da API com docker exec -it vacation-api bash e então execute rails db:seed.

Também é possivel executar o projeto localmente.

### Estrutura do Projeto
./backend: Contém o código para a API Ruby on Rails. Isso inclui o modelo de dados e as rotas API.
./frontend: Contém o código do frontend React. Isso inclui componentes e serviços para chamar a API.
./docker-compose.yml: Define os serviços para a API, banco de dados e frontend.
Seeding
O arquivo de seed pode ser encontrado em ./backend/db/seeds.rb. Ele cria dados de amostra para funcionários e férias.

### Description
Rails on Vacation is a vacation scheduling application. It was developed with a Ruby on Rails API, a Postgres database, and a frontend in React and TailwindCSS.

### Installation and Execution

Clone the repository to your local machine.

Navigate to the project's root folder.

Run the command docker-compose up -d. This will create and start containers for the API, the database, and the frontend.

To create sample data, enter the API container with docker exec -it vacation-api bash and then execute rails db:seed.

The project can also be run locally.

### Project Structure
./backend: Contains the code for the Ruby on Rails API. This includes the data model and API routes.
./frontend: Contains the React frontend code. This includes components and services to call the API.
./docker-compose.yml: Defines the services for the API, database, and frontend.
Seeding
The seed file can be found in ./backend/db/seeds.rb. It creates sample data for employees and vacations.

