##  Music Weather  API

Minha resposta ao Desafio Back End Big Bang.

Esta API recebe o nome de uma cidade ou coordenadas geográficas de uma região, e retorna uma lista de músicas. Conforme a temperatura local do ambiente informado.


## Requisitos

* Node >= 12; 

## Modo de Uso

### A API pode ser utilizada de 3 formas: via url, docker ou server de desenvolvimento

1. Via URL

    1.1 Por meio da URL https://music-weather-api-s.herokuapp.com, acesse a rota **playlist**. Passando o nome de uma cidade(city) ou coordenadas geográficas(lat&long) como parâmetro:

    Exemplos:

    1.1.2 Caso busque pelo nome de uma cidade:
    ```
    https://music-weather-api-s.herokuapp.com/playlist?city=Londres

    ```
    1.1.3 Caso busque por coordenadas geográficas:
    ```
    https://music-weather-api-s.herokuapp.com/playlist?lat=35long=139

    ```

    1.1.4 Caso a cidade possua um nome composto, utilize o carácter "&" para representar o espaço entre as palavras.

    * Exemplo de uma playlist retornada com sucesso:

    ```
    {
    "items": [
        {
        "track": {
            "name": "The Carnival of the Animals, R. 125: XIII. The Swan (Arr. for Cello and Piano)"
        }
        },
        {
        "track": {
            "name": "Satie / Orch. Ducros: Gymnopédie No. 1"
        }
        },
        {
        "track": {
            "name": "Pini di Roma (The Pines of Rome): III. I pini del Gianiclo"
        }
        },
        {
        "track": {
            "name": "Fauré: Pavane in F-Sharp Minor, Op. 50"
        }
        },
        {
        "track": {
            "name": "Fracture"
        }
        },
        {
        "track": {
            "name": "Sechs Klavierstücke, Op. 118: II. Intermezzo in A Major"
        }
        },
        {
        "track": {
            "name": "Suite bergamasque, L. 75: 3. Clair de lune"
        }
        },
        {
        "track": {
            "name": "Concertino bianco: 2. Con venerazione"
        }
        },
        {
        "track": {
            "name": "Dappled Light"
        }
        },
        {
        "track": {
            "name": "Cancion de cuna"
        }
        }
    ]
    }

    ```



2. Via Docker

    2.1 Certifique-se de ter o Docker instalado em sua máquina. 

    2.2 Crie uma conta no [Open Weather](https://home.openweathermap.org/users/sign_in)

    2.3 Crie uma conta no [Spotify](https://developer.spotify.com/dashboard/login), e cadastre a sua aplicação.

    2.4 Clone o código fonte deste repositório, e acesse o diretório, na qual o repositório foi baixado.

    2.5 Instale as dependências deste projeto, por meio do comando:
    ```
    npm i

    ```
    2.6 Crie um arquivo **.env** com as mesmas keys informadas no **.env.example**

    2.7 Atribua o valor para a variável **OPEN_WEATHER_API_KEY** conforme API key fornecida pelo Open Weather ao criar a conta.

    2.8 Para a variável **CREDENTIALS_BASE64_FORMAT**: converta o valor do seu clienteId e clienteSecrete, fornecido pelo Spotify, para o formato base64. Utilize qualquer encoder online para formatar as credencias, Vide exemplo:[BASE64](https://www.base64encode.org/)

    2.8.1 Certifique-se de converter as credencias no seguinte formato:
    ```
    clienteId:clienteSecrete

    ```

    Conforme a documentação do [Spotify](https://developer.spotify.com/documentation/general/guides/authorization-guide/)

    E por fim, basta atribuir a variável de ambiente ao valor convertido das credencias.


    2.9 Execute o comando no terminal:
    ```
    npm run up

    ```
    para baixar e criar todo o ambiente Docker da aplicação.

    2.10 Espere aparecer a mensagem: 

    ```
    Creating music-weather-api ... done

    ```
    E por fim, basta acessar o endereço http://localhost:3003, por meio do browser ou API client(Insomnia, Postman etc); e buscar por uma playlist. Passando os parâmetros conforme os passos 1.1.2 - 1.1.4

    * Caso queira utilizar outra porta para acessar a aplicação, altere as configurações no arquivo docker-composer, bem com o arquivo .env

    2.11 Para fechar o servidor, execute o seguinte comando no terminal:
    ```
    npm run down

    ```


3. Via servidor de desenvolvimento 

    3.1 siga os passos 2.2 á 2.8.1;

    3.2 Atribua um valor para variável de ambiente **PORT**

    3.3 E para iniciar o servidor, execute o seguinte comando no terminal:
    ```
    npm run dev

    ```
    3.4 Acesse o endereço informado no terminal e busque pelas playlists. Vide passo 1.1.2 - 1.1.3
