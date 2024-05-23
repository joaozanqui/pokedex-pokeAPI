// João Pedro de Freitas Zanqui, 2024
// https://github.com/joaozanqui
// https://www.linkedin.com/in/joao-zanqui/

import React, { useEffect, useState } from 'react';

//Importando os estilos, foi utilizado a biblioteca bootstrap para a estilização do projeto
import 'bootstrap/dist/css/bootstrap.min.css';

//Importando os componentes
import Header from './components/Header';
import SearchBox from './components/SearchBox';
import PokemonList from './components/PokemonList';
import PokemonModal from './components/PokemonModal';
import ComparingBox from './components/ComparingBox';

// Variável global para abrir a janela modal do Pokemon selecionado
var current_pokemon = {};
// Variável global para controlar se o pokemon selecionado vai ser comparado ou nao
var is_comparing = false;
// Variavel global pra saber se ja foi feita uma comparacao
var is_compared = false;
// Variavel global pra salvar o primeiro pokemon a ser comparado
var pokemon_to_compare

function App() {
  // Estado para armazenar os dados recebidos do backend
  const [backendData, setBackendData] = useState([{}]);
  // Estado para controlar a visibilidade do popup e da secao de comparacao dos pokemons
  const [displayPopup, setDisplayPopup] = useState('none');
  const [displayComparingBox, setDisplayComparingBox] = useState('none');
  // Estado para para filtrar a lista de Pokémon
  const [searchValue, setSearchValue] = useState('');

  // Solicitação para buscar dados do backend.
  useEffect(() => {
    fetch("/api").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
  }, [])
  // Salvando todos os pokemons encontrados em uma variavel
  const pokemons = backendData.pokemons;

  // Busca pelo nome do Pokemon
  const handleSearch = () => {
    if (is_compared)
      restartPage();
    const found_pokemon = pokemons.find(pokemon => pokemon.name.toLowerCase() === searchValue.toLowerCase());
    if (found_pokemon) {
      selectPokemon(found_pokemon);
    } else {
      alert('Pokémon não encontrado');
    }
  };

  //Função para reiniciar a pagina 
  function restartPage() {
    window.location.reload();

    window.scrollTo({
      top: 0,
      left: 0,
    });
  }

  // Função para selecionar o Pokemon
  function selectPokemon(pokemon) {
    // Se ja foi feita uma comparacao, reiniciar a pagina
    if (is_compared) {
      restartPage();
    }

    current_pokemon = { ...pokemon };
    setDisplayPopup("block");

    //Se esta sendo feita uma comparacao, entao coloca o card do segundo pokemon na box de comparacao
    if (is_comparing) {
      buildPokemonsComparing(2);
    }
  }

  // Função para fechar a janela modal de cada Pokemon 
  function hidePopup() {
    setDisplayPopup("none");
  }

  //Função para construir a seção de comparação de dois pokemons
  function buildPokemonsComparing(pos) {
    is_comparing = true;
    setDisplayComparingBox("block");

    //Fazer o scrool subir para o topo da tela
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth'
    });

    //Guardar o html do card do pokemon selecionado
    var current_pokemon_card = document.getElementById('pokemonSelected');
    //Selecionar o espaco onde vai adicionar o card do pokemon selecionado
    var card_to_put_pokemon = document.getElementById('pokemonToCompare' + pos);

    if (pos === 1) {
      var buttons_to_remove;

      //Salva o primeiro pokemon selecionado em uma variavel para que possa selecionar o segundo
      pokemon_to_compare = { ...current_pokemon };
      var first_pokemon_card = current_pokemon_card.cloneNode(true);


      // Remove algumas classes para encaixar o card na seção de comparação
      first_pokemon_card.classList.remove('position-absolute', 'top-50', 'start-50', 'translate-middle', 'card');
      first_pokemon_card.removeAttribute('id', 'pokemonSelected');

      card_to_put_pokemon.appendChild(first_pokemon_card);

      // Remove os botoes de "fechar" e de "comparar atributos de base" do card
      buttons_to_remove = first_pokemon_card.querySelectorAll('.button-to-remove');
      buttons_to_remove.forEach(button => {
        button.remove();
      });

      hidePopup();
    } else {
      // Remove algumas classes para encaixar o card na seção de comparação
      current_pokemon_card.classList.remove('position-absolute', 'top-50', 'start-50', 'translate-middle');
      current_pokemon_card.removeAttribute('id', 'pokemonSelected');
      card_to_put_pokemon.appendChild(current_pokemon_card);

      // Remove os botoes de "fechar" e de "comparar atributos de base" do card
      buttons_to_remove = current_pokemon_card.querySelectorAll('.button-to-remove');
      buttons_to_remove.forEach(button => {
        button.remove();
      });

      comparingPokemons(pokemon_to_compare, current_pokemon);
    }
  }

  // Função que realiza a comparação entre os atributos de base
  function comparingPokemons(pokemon1, pokemon2) {
    // Removendo a janela modal
    var modal_to_remove = document.getElementById("modal-to-remove");
    modal_to_remove.remove();

    // Descobrindo qual pokemon tem a maior soma dos atributos de base
    var best_pokemon;
    if (pokemon1.base_stat > pokemon2.base_stat) {
      best_pokemon = pokemon1;
    } else if (pokemon1.base_stat < pokemon2.base_stat) {
      best_pokemon = pokemon2;
    } else {
      best_pokemon = false;
    }

    // Adicionando o texto e o botao de restart na seção de comparação
    var card = document.getElementById("pokemonsComparingCard");
    var best_pokemon_text = document.createElement("h3");
    best_pokemon_text.classList.add('text-center', 'text-capitalize');
    var restart_button = document.createElement("button");
    restart_button.classList.add('btn', 'btn-outline-primary', 'mt-3');
    restart_button.textContent = "REINICIAR";
    restart_button.addEventListener('click', function () {
      window.location.reload();
    });

    if (!best_pokemon)
      best_pokemon_text.textContent = pokemon1.name + " e " + pokemon2.name + " possuem o mesmo valor da soma dos atributos de base: " + pokemon1.base_stat;
    else
      best_pokemon_text.textContent = best_pokemon.name + " possui a maior soma dos atributos de base: " + best_pokemon.base_stat;

    card.appendChild(best_pokemon_text);
    card.appendChild(restart_button);

    is_comparing = false;
    is_compared = true;
  }

  return (
    <div className='bg-dark text-white'>
      <div className='d-flex justify-content-center flex-wrap container'>
        {/* Titulo da pagina */}
        <Header />

        {/* Seção de comparacao dos pokemons */}
        <ComparingBox displayComparingBox={displayComparingBox} />

        {/* Caixa de pesquisa dos pokemons */}
        <SearchBox
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          handleSearch={handleSearch}
        />

        {/* Lista de pokemons */}
        <PokemonList pokemons={pokemons} selectPokemon={selectPokemon} />

        {/* Janela modal de cada pokemon */}
        <PokemonModal
          currentPokemon={current_pokemon}
          displayPopup={displayPopup}
          hidePopup={hidePopup}
          buildPokemonsComparing={buildPokemonsComparing}
        />
      </div>
    </div>
  );
}

export default App;

