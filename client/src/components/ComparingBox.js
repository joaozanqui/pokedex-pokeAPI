import React from 'react';

//Criacao da secao para comparar a soma dos atributos de base
const ComparingBox = ({ displayComparingBox }) => {
    return (
        <div className="container" style={{ display: displayComparingBox }}>

            <div className="card border-primary" id='pokemonsComparingCard'>

                {/* Titulo */}
                <div className="card-header bg-primary-subtle">
                    <h5 className="card-title">Comparar Atributos de Base</h5>
                </div>

                {/* Cards dos pokemons que serao comparados */}
                <div className="card-body row">
                    
                    {/* Primeiro pokemon */}
                    <div className="card-body col-md-6">
                        <div className="" id='pokemonToCompare1'></div>
                    </div>

                    {/* Segundo pokemon */}
                    <div className="card-body col-md-6">
                        <div className="" id='pokemonToCompare2'></div>
                    </div>

                </div>
            </div>

        </div>
    );
}

export default ComparingBox;
