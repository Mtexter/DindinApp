import './resumoMain.css'

function Resumo({ entradas, saidas }) {

    const saldo = ((entradas / 100) - (saidas / 100)).toFixed(2).replace(".", ",")
    const valorEntradas = (entradas / 100).toFixed(2).replace(".", ",")
    const valorSaidas = (saidas / 100).toFixed(2).replace(".", ",")

    return (
        <div className="resumo">
            <div>
                <h4>Resumo</h4>
                <div className='cima'>
                    <div className='entradas'>
                        <p>
                            Entradas
                        </p>
                        <p>
                            R${valorEntradas}
                        </p>
                    </div>
                    <div className='saidas'>
                        <p>
                            Saidas
                        </p>
                        <p>
                            R${valorSaidas}
                        </p>
                    </div>
                </div>
                <div className='baixo'>
                    <p>
                        Saldo
                    </p>
                    <p>
                        R${saldo}
                    </p>
                </div>
            </div>
        </div>

    )
}

export default Resumo