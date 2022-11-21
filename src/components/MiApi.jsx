import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

const MiApi = () => {
    const [apiContent, setApiContent] = useState([]); // estado para guardar los datos obtenidos del llamado a la API
    const [paisBuscado, setPaisBuscado] = useState(""); // estado para guardar el país tipeado en el input de búsqueda por país
    const [filtroDePaisActivado, setFiltroDePaisActivado] = useState(false); // estado para registrar si se filtro o no por país
    const [listaFiltrada, setListaFiltrada] = useState([]); // estado para guardar el resultado del filter aplicado a apiContent y que usaremos para renderizar los datos del país buscado
    const [ordenPoblacionUno, setOrdenPoblacionUno] = useState(false); // estado para registrar si se filtro por país con mayor población
    const [listaOrdenada, setListaOrdenada] = useState([]); // estado para guardar el resultado del sort aplicado a apiContent

    const firstUrl = 'https://restcountries.com/v2/all';

    const llamarApi = async (endPoint) => { // función para obtener los datos de la API
        const url = endPoint;
        const response = await fetch(url);
        const data = await response.json();
        const orderedData = data.sort((a, b) => a.translations.es.localeCompare(b.translations.es)); // método usado para ordenar apiContent a una muestra más cómoda y en español
        setApiContent(orderedData);
    }

    useEffect(() => { // hook para llamar a la API
        llamarApi(firstUrl);
    }, []);

    const capturarPais = (e) => { // función para registrar el país tipeado por el usuario y guardarlo en un estado
        setPaisBuscado(e.target.value);
    };

    const detallesPais = () => { // función para filtrar apiContent en base al país tipeado por el usuario
        setOrdenPoblacionUno(false);
        setFiltroDePaisActivado(true);
        setListaFiltrada(apiContent.filter(country => country.translations.es === paisBuscado));
        setPaisBuscado("");
    };

    const handleKeyDown = event => { // función para ejecutar búsqueda pulsando la tecla enter
        if (event.key === 'Enter') {
            detallesPais();
        }
    };

    const ordenarLista = (arg) => { // función para ordenar lista según criterio deseado
        setFiltroDePaisActivado(false);
        setOrdenPoblacionUno(true);
        setListaOrdenada(arg);
    }

    return (
        <>
            <div className="row align-items-start container bg-dark text-white p-3 m-auto border rounded">
                <div className="col">
                    <h5 className='mb-3 text-center'>Búsqueda por país</h5>
                    <div className="input-group mb-3">
                        <button className="btn btn-outline-light" onClick={detallesPais} type="button">Buscar</button>
                        <input aria-label='Search for a country'
                            aria-autocomplete='both'
                            aria-controls='autocomplete-results'
                            type="text"
                            className="form-control"
                            onChange={capturarPais}
                            value={paisBuscado}
                            onKeyDown={handleKeyDown} />
                    </div>
                </div>
                <div className="col">
                    <h5 className='mb-3 text-center'>Más información</h5>
                    <div className="dropdown">
                        <button className="btn btn-outline-light dropdown-toggle container" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Filtros disponibles
                        </button>
                        <ul className="dropdown-menu container text-center">
                            <li><a className="dropdown-item" onClick={() => ordenarLista((apiContent.sort((a, b) => b.population - a.population)))}>Ordenar por mayor población</a></li>
                            <li><a className="dropdown-item" onClick={() => ordenarLista((apiContent.sort((a, b) => a.population - b.population)))}>Ordenar por mayor población</a></li>
                        </ul>
                    </div>
                </div>
            </div>
            <div className='row p-5 m-0'>
                {filtroDePaisActivado === true ?
                    listaFiltrada.map(country =>
                        <div key={country.name} className="row align-items-center">
                            <div className="col-6">
                                <img src={country.flag} className="img-fluid" alt="" />
                            </div>
                            <div className="col-4 container-fluid">
                                <ul className='list-group'>
                                    <li className='list-group-item list-group-item-dark'>País: {country.translations.es}</li>
                                    <li className='list-group-item list-group-item-dark'>Continente: {country.region}</li>
                                    <li className='list-group-item list-group-item-dark'>Sub-Continente: {country.subregion}</li>
                                    <li className='list-group-item list-group-item-dark'>Capital: {country.capital}</li>
                                    <li className='list-group-item list-group-item-dark'>Población: {Intl.NumberFormat('es-CL').format(country.population)} habitantes</li>
                                    <li className='list-group-item list-group-item-dark'>Área: {Intl.NumberFormat('es-CL').format(country.area)} km²</li>
                                </ul>
                            </div>
                        </div>)
                    :
                    ordenPoblacionUno === true ?
                        <ul className='list-group container list-group-numbered col'>
                            {listaOrdenada.map((country) => (
                                <li className='list-group-item list-group-item-dark'
                                    key={country.name}>
                                    <img src={country.flag} alt="" style={{ width: "16px" }} className='me-2' />
                                    {country.translations.es} -
                                    Población: {Intl.NumberFormat('es-CL').format(country.population)} habitantes.</li>
                            ))}
                        </ul>
                        :
                        apiContent.map((country) => (
                            <div key={country.name} className='col'>
                                <div className='card mb-2 bg-dark text-white' style={{ width: "200px", height: "315px" }}>
                                    <img className='p-2' style={{ height: "140px" }} src={country.flag} alt="" />
                                    <div className='card-body'>
                                        <h5 className='card-title'>{country.translations.es}</h5>
                                        <p className='card-text mb-0'>Región: {country.region}</p>
                                        <p className='card-text'>Capital: {country.capital}</p>
                                    </div>
                                </div>
                            </div>))
                }
            </div>
        </>
    )
}

export default MiApi