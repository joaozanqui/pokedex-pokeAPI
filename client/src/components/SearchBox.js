import React from 'react';

const SearchBox = ({searchValue, setSearchValue, handleSearch}) => {

    // Funcionamento da tecla enter para busca
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        // Caixa de pesquisa
        <div className="input-group m-5">
            <input
                type="search"
                className="form-control rounded"
                placeholder="Escreva o nome do pokemon..."
                aria-label="Search"
                aria-describedby="search-addon"
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
                onKeyDown={handleKeyDown}
            />
            {/* Botao 'Buscar' */}
            <button
                type="button"
                className="btn btn-outline-primary"
                data-mdb-ripple-init
                onClick={handleSearch}
            > Buscar
            </button>
        </div>
    );
}

export default SearchBox;
