import React, { useState } from 'react';
import '../styles/Frekwencja.css';
import FrekwencjaBox from '../components_special/Frekwencja_box';

const Frekwencja: React.FC = () => {

    interface Uczen{
        imie: string;
        nazwisko: string;
        status: "N" | "U" | "O" | "S";
    }

    type uczen_kolorPrzycisku = Record<string, string>;
    type klasa_daty = Record<string, string[]>;
    type klasy_przedmioty = Record<string, klasa_daty>;

    //zewnetrzny state trzymajacy tablice z info o zaznaczonych obecnie inputach
    const[stateColor, setStateColor] = useState<null | uczen_kolorPrzycisku>(null);
    //ref do SELECTÓW przedmiot/data
    const refPrzedmiot = React.useRef<HTMLSelectElement>(document.createElement("select"));
    const refData = React.useRef<HTMLSelectElement>(document.createElement("select"));
    //lista klas, przedmiotow, dat zajec jakie ma pobrany nauczyciel 
    const [ListaKlas, setListaKlas] = useState<null | klasy_przedmioty[]>(null);
    //lista uczniow z obecnoscia
    const [ListaUczniow, setListaUczniow]= useState<null | Uczen[]>(null);

    //Aktualnie ustawione selecty:
    const [klasa, setKlasa] = useState<string>('1 A');
    const [przedmiot, setPrzedmiot] = useState<string>('Przyroda');
    
    const stworzObejctColor = function(uczniowie: Uczen[]): uczen_kolorPrzycisku{
        var obj: uczen_kolorPrzycisku = {};
        uczniowie.forEach((colorItem: Uczen, colorKey: number): void=>{
            obj[colorKey+1] = colorItem.status  === "U" ? "bg-secondary" : 
                              colorItem.status  === "O" ? "bg-success" : 
                              colorItem.status  === "N" ? "bg-danger" : 
                              colorItem.status  === "S" ? "bg-warning" : ""      
        });
        return obj;
    }

    const handleClick = function(color: uczen_kolorPrzycisku): void{
        setStateColor(color);
    }

    React.useEffect(()=>{
        
        fetch('http://localhost:3001/inputsData',{
            method: 'GET',
            credentials: 'include'
          })
            .then((response: Response) => response.json())
            .then((json: klasy_przedmioty[]) => {
                setListaKlas(json);
                // console.log(json);
                if(Object.values(json[0])[0] !== undefined){
                    const json2: klasa_daty = Object.values(json[0])[0];
                    setKlasa(Object.keys(json[0])[0]);
                    setPrzedmiot(Object.keys(json2)[0]);
                }
            })
            .catch((error: Error) => alert(error));
    }, []);

    const wyszukaj = function(): void{    //Wyszukaj po klasie, przedmiocie, dacie uczniów z frekwencja
        fetch(`http://localhost:3001/frequency/${klasa}/${przedmiot}/${refData.current.value}`,{
            method: 'GET',
            credentials: 'include',
          })
        .then((response: Response) => response.json())
        .then((response_json: Uczen[])=>{setListaUczniow(response_json);setStateColor(stworzObejctColor(response_json));})
        .catch((error: Error) => alert(error));
    }

    const zapisz = function(): void{  //zapisz frekwencje

        const uczniowieDoWyslania = [];
        if(ListaUczniow !== null && stateColor !== null){
            for(var i = 0; i < ListaUczniow.length; i++){
                uczniowieDoWyslania.push({name: ListaUczniow[i].imie, nazwisko: ListaUczniow[i].nazwisko, status: stateColor[i+1] })
            }
        }

        const frek_do_wyslania: string = JSON.stringify({
            klasa: klasa,
            przedmiot: przedmiot,
            data: refData.current.value,
            uczniowie: uczniowieDoWyslania
        })

        fetch('http://localhost:3001/frequency',{
            method: 'PUT',
            headers:{
              Accept: "application/json"    ,
              "Content-type": "application/json",
            },
            credentials: 'include',
            body: frek_do_wyslania
          })
        .then((response: Response) => response.status === 200 ? alert("Dodano frekwencję") : alert("Coś poszło nie tak"))
        .catch((error: Error) => console.log(error));
    }


  return (
    <main>
        <div className="container-fluid px-4">
            <h1 className="mt-4">Frekwencja</h1>
            <ol className="breadcrumb mb-4">
                <li className="breadcrumb-item active">Frekwencja</li>
            </ol>
            
            <div className="row">
                <div className="col-sm">
                    <div className='opis_button'>Klasa:</div>
                    <select onChange={(e)=>{
                        if(ListaKlas !== null){
                            setKlasa(e.target.value);
                            setPrzedmiot(Object.keys(ListaKlas[0][e.target.value])[0]);
                            refPrzedmiot.current.value = Object.keys(ListaKlas[0][klasa])[0];
                        }
                        }} className="form-select" aria-label="Default select example">
                    
                    {ListaKlas !== null && Object.values(ListaKlas[0])[0] !== undefined ? 
                    Object.keys(ListaKlas[0]).map((item, key)=>{
                        return (<option key={key} value={item}>{item}</option>)
                    })
                    : <option>Ładuje...</option>}
                    </select> 
                </div>    

                <div className="col-sm">
                    <div className='opis_button'>Przedmiot:</div>
                    <select ref={refPrzedmiot} onChange={(e)=>{setPrzedmiot(e.target.value)}} className="form-select" aria-label="Default select example">
                    {ListaKlas !== null && Object.values(ListaKlas[0])[0] !== undefined ?
                    Object.keys(ListaKlas[0][klasa]).map((item, key)=>{
                        return (<option key={key} value={item}>{item}</option>)
                    })
                    :<option>Ładuje...</option>}
                    </select> 
                </div>   

                <div className="col-sm">
                    <div className='opis_button'>Data:</div>
                    <select ref={refData} className="form-select" aria-label="Default select example">
                    {ListaKlas !== null && Object.values(ListaKlas[0])[0] !== undefined ?
                    ListaKlas[0][klasa][przedmiot].map((item, key)=>{
                        return (<option key={key} value={item}>{item}</option>)
                    })
                    :<option>Ładuje...</option>}
                    </select> 
                </div>   
            </div>

           <div className='text-center mt-3 mb-3'>
                    <button onClick={wyszukaj} className="btn btn-primary">Wyszukaj</button>
           </div>
                
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nazwisko</th>
                    <th scope="col">Imię</th>
                    <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {ListaUczniow === null ? null :ListaUczniow.map((item, key)=>{
                        return <tr key={key}>
                            <th scope='row'>{key+1}</th>
                            <td>{item.nazwisko}</td>
                            <td>{item.imie}</td>
                            <td>
                                <FrekwencjaBox arrayZState={stateColor} name={key+1} kolor="bg-danger" checked={stateColor !== null && stateColor[key+1] === "bg-danger" ? true : false} status="N" parentCollback={handleClick}/>
                                <FrekwencjaBox arrayZState={stateColor} name={key+1} kolor="bg-secondary" checked={stateColor !== null && stateColor[key+1] === "bg-secondary"  ? true : false} status="U" parentCollback={handleClick}/>
                                <FrekwencjaBox arrayZState={stateColor} name={key+1} kolor="bg-success" checked={stateColor !== null && stateColor[key+1] === "bg-success"  ? true : false} status="O" parentCollback={handleClick}/>
                                <FrekwencjaBox arrayZState={stateColor} name={key+1} kolor="bg-warning" checked={stateColor !== null && stateColor[key+1] === "bg-warning"  ? true : false} status="S" parentCollback={handleClick}/>
                                <div style={{clear:"both"}}></div>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
            {ListaUczniow === null ? null :
            <div className='text-center'>
                <button className="btn btn-success" onClick={zapisz}>Zapisz</button>
            </div>    
            }       
        </div>
    </main>
  )
}

export default Frekwencja
