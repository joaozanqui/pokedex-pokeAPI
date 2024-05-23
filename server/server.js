import express from 'express';
import axios from 'axios';

const app = express();
const port = 3333;
//Criacao de uma lista que vai armazenar os pokemons da api
const pokemons = [];

const getPokemons = async () => {
    //Pegando os 151 primeiros pokemons da api e armazenando em uma variavel
    const response = await axios.get('https://pokeapi.co/api/v2/pokemon/?limit=151');
    const pokemons_infos = response.data.results;

    for (const pokemon of pokemons_infos) {
        //Pegando os dados contidos nos links de cada pokemon
        const pokemon_data = await axios.get(pokemon.url);

        //Criando um objeto com os dados de cada pokemon
        const each_pokemon = {
            id: pokemon_data.data.id,
            name: pokemon_data.data.name,
            base_experience: pokemon_data.data.base_experience,
            height: pokemon_data.data.height,
            weight: pokemon_data.data.weight,
            image: pokemon_data.data.sprites.front_default,
        }

        each_pokemon.types = pokemon_data.data.types.map((item) => {
            return item.type.name;
        });

        each_pokemon.abilities = pokemon_data.data.abilities.map((item) => {
            return item.ability.name;
        });

        //Somando os atributos de base de cada pokemon
        let base_stats_sum = 0;
        pokemon_data.data.stats.map((item) => {
            base_stats_sum += item.base_stat;
        });
        each_pokemon.base_stat = base_stats_sum;

        //Adicionando o objeto com os dados de cada pokemon na lista de pokemons
        pokemons.push(each_pokemon);
    };
}

getPokemons();

//Solicitação com um objeto JSON que contém a lista de pokémons.
app.get("/api", (req, res) => {
    res.json({ pokemons });
});

// Inicia o servidor na porta especificada.
app.listen(port, () => {
    console.log(`Running at http://localhost:${port}`);
});