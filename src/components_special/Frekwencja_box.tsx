import React, {FC} from 'react';
import '../styles/Frekwencja_box.css'

interface Props{
    arrayZState: uczen_kolorPrzycisku | null; 
    name: number;
    kolor: "bg-secondary" | "bg-success" | "bg-danger" | "bg-warning";
    checked: boolean; 
    status: "N" | "U" | "O" | "S";
    parentCollback: (color: uczen_kolorPrzycisku) => void;
}

type uczen_kolorPrzycisku = Record<string, string>;

function Frekwencja_box(props: Props): JSX.Element {

  let czyChecked: {
    opacity: number;
  } = {
    opacity: 0.0,
  };

  if(props.checked){
    czyChecked.opacity = 1.0
  }else{
    czyChecked.opacity = 0.5;
  }

  const zaktualizujTabliceZaznaczonychKolorow = function(): void{
    const nowaTablica: uczen_kolorPrzycisku = {...props.arrayZState}; //stworzenie nowej tablicy
    nowaTablica[props.name] = props.kolor; //zmiana wartosci na aktualna
    props.parentCollback(nowaTablica); //wyslanie zmieniowej tablicy do rodzica
  }  

  return (
      <div 
      className={`box_freq ${props.kolor}`} 
      style={czyChecked} 
      title={props.status === "N" ? "Nieobecny" : props.status === "O" ? "Obecny" : props.status === "S" ? "Spóźniony" : props.status === "U" ? "Usprawiedliwiony" : "Error"}
      // name={`${props.name}`}
      onClick={zaktualizujTabliceZaznaczonychKolorow}>
        {props.status}
      </div>
  )
}

export default Frekwencja_box
