import React from 'react';

//Criacao da janela modal de cada pokemon
const PokemonModal = ({ currentPokemon, displayPopup, hidePopup, buildPokemonsComparing }) => {
    return (
        <div className="modal fade show" tabIndex="-1" id='modal-to-remove' style={{ display: displayPopup }}>
            <div className="modal-md position-absolute top-50 start-50 translate-middle card rounded-4 border border-5" id='pokemonSelected'>
                
                {/* Nome do pokemon e botao de fechar */}
                <div className="modal-header bg-primary-subtle">
                    <h1 className="modal-title fs-4">{currentPokemon.name}</h1>
                    <button type="button" className="btn-close button-to-remove" data-bs-dismiss="modal" aria-label="Close" onClick={hidePopup}></button>
                </div>

                {/* Informacoes do pokemon */}
                <div className="modal-body d-flex align-items-center justify-content-center bg-white">
                    {/* Foto e informacoes na esquerda */}
                    <div className='d-flex flex-column align-items-center'>

                        <img src={currentPokemon.image} alt={currentPokemon.name}></img>
                        <div className='d-flex align-items-center'>
                            <p className='m-2'>Altura: {currentPokemon.height}</p>
                            <p className='m-2'>Peso: {currentPokemon.weight}</p>
                        </div>
                        <p className='m-2'>Tipo: {currentPokemon && currentPokemon.types ? currentPokemon.types.join(', ') : 'No types available'}</p>

                    </div>
                    
                    {/* Informacoes na direita e botao para comparacao */}
                    <div className='d-flex flex-column align-items-center'>
                        <p className='m-2'>Habilidades: {currentPokemon && currentPokemon.abilities ? currentPokemon.abilities.join(', ') : 'No types available'}</p>
                        <p className='m-2'>Pontos de Experiência: {currentPokemon.base_experience}</p>
                        <p className='m-2'>Soma dos Atributos de Base: {currentPokemon.base_stat}</p>
                        <button
                            type="button"
                            className="btn btn-outline-primary button-to-remove"
                            data-mdb-ripple-init
                            data-mdb-ripple-color="dark"
                            onClick={() => buildPokemonsComparing(1)}
                        >
                            Comparar Atributos de Base
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default PokemonModal;
