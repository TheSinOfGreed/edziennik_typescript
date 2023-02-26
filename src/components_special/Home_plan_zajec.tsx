import React, {useState, useEffect} from 'react';
import '../styles/Home_plan_zajec.css';

import { godziny } from '../listy/godziny';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useMediaQuery } from 'react-responsive';

const Home_plan_zajec: React.FC = () => {
    
    type dniTygodnia = ("Poniedziałek"| "Wtorek"| "Środa"| "Czwartek"| "Piątek"| "Sobota")[];
    
    const tydzien_dni: Date[] = []; //daty tygodnia w tym tygodniu czyli np 12.12.2022-17.12.2022
    const [dni_tygodnia, setDniTygodnia] = useState<dniTygodnia>([ //dni tyogdnia po ktoych iteruje tabela
        "Poniedziałek",
         "Wtorek", 
         "Środa", 
         "Czwartek", 
         "Piątek", 
         "Sobota"
        ]);

    const [plan, setPlanLekcji] = useState<any>(null); //plan zajec pobierany z bazy
    
    //funkcja pobierająca dzisiejszy dzien i reszte dni
    var curr: Date = new Date(); 
    var first: number = curr.getDate() - curr.getDay();
    
    for(var i = 1; i < 7; i++) {
        let next: Date = new Date(curr.getTime());
        next.setDate(first+i);
        
        tydzien_dni.push(new Date(next.getTime()));
    }

    //? RESPONSYWNOSC TABELI START
    const wyswietlDzien = function(dzien: number, pierwszyNav: boolean): void{
        if(pierwszyNav){
            switch(dzien){
                case 1:
                    setDniTygodnia(["Poniedziałek", "Wtorek",]);
                    break;
                case 2:
                    setDniTygodnia(["Środa", "Czwartek",]);
                    break;
                case 3:
                    setDniTygodnia(["Piątek", "Sobota",]);
                    break;
                default:
                    break;    
            }
        }else{
            switch(dzien){
                case 1:
                    setDniTygodnia(["Poniedziałek"]);
                    break;
                case 2:
                    setDniTygodnia(["Wtorek"]);
                    break;
                case 3:
                    setDniTygodnia(["Środa"]);
                    break;
                case 4:
                    setDniTygodnia(["Czwartek"]);
                    break;
                case 5:
                    setDniTygodnia(["Piątek"]);
                    break;
                case 6:
                    setDniTygodnia(["Sobota"]);
                    break;    
                default:
                    break;    
            }
        }
    }
    const isMobile: boolean = useMediaQuery({ query: `(max-width: 862px)` });
    const isMinMobile: boolean = useMediaQuery({ query: `(max-width: 490px)` });
    useEffect(()=>{
        if(isMinMobile){
            setDniTygodnia(["Poniedziałek"]);
        }else{
            if(isMobile){
                setDniTygodnia([
                    "Poniedziałek",
                     "Wtorek", 
                    ]);
            }else{
                setDniTygodnia([
                    "Poniedziałek",
                     "Wtorek", 
                     "Środa", 
                     "Czwartek", 
                     "Piątek", 
                     "Sobota"
                    ]);
            }
        }
    }, [isMinMobile]);

    useEffect(()=>{
        if(isMobile){
            setDniTygodnia(["Poniedziałek","Wtorek"]);
        }else{
            setDniTygodnia([
                "Poniedziałek",
                 "Wtorek", 
                 "Środa", 
                 "Czwartek", 
                 "Piątek", 
                 "Sobota"
                ]);
        }
    }, [isMobile]);
    //? RESPONSYWNOSC END

    useEffect(()=>{
        
        fetch('http://localhost:3001/plans/single',{
            method: 'GET',
            credentials: 'include'
          })
            .then((response: Response) => response.json())
            .then((json: any) => {
                setPlanLekcji(json);
                console.log(json)
            })
            .catch((error: Error) => alert(error));
    }, []);
    // liczenie nowych dni jak uzytkownik wybierze inny tydzien
    const [pon, setPon] = useState<Date>(tydzien_dni[0]);const [czw, setCzw] = useState<Date>(tydzien_dni[3]);
    const [wt, setWt] = useState<Date>(tydzien_dni[1]);const [pt, setPt] = useState<Date>(tydzien_dni[4]);
    const [sr, setSr] = useState<Date>(tydzien_dni[2]);const [sob, setSob] = useState<Date>(tydzien_dni[5]);
    const [reload, setReload] = useState<boolean>(false);

    const countDate = function(date: Date, days: number): Date{
        date.setDate(date.getDate() + days);
        return date;
    }

    const countDateMinus =function(date: Date, days: number): Date{
        date.setDate(date.getDate() - days);
        return date;
    }

    const nastepnyTydz = function(): void{
        setPon(countDate(pon, 7)); 
        setWt(countDate(wt, 7)); 
        setSr(countDate(sr, 7)); 
        setCzw(countDate(czw, 7)); 
        setPt(countDate(pt, 7)); 
        setSob(countDate(sob, 7)); 
        reload ? setReload(false) : setReload(true)
    }

    const poprzedniTydz = function(): void{
        setPon(countDateMinus(pon, 7)); 
        setWt(countDateMinus(wt, 7)); 
        setSr(countDateMinus(sr, 7)); 
        setCzw(countDateMinus(czw, 7)); 
        setPt(countDateMinus(pt, 7)); 
        setSob(countDateMinus(sob, 7)); 
        reload ? setReload(false) : setReload(true)
    }

    const getDateOfDay = function(dzien: string): string{
        
        switch (dzien) {
            case "Poniedziałek":
                return pon.getDate()+'.'+(pon.getMonth()+1)+'.'+pon.getFullYear();
            case "Wtorek":
                return wt.getDate()+'.'+(wt.getMonth()+1)+'.'+wt.getFullYear();  
            case "Środa":
                return sr.getDate()+'.'+(sr.getMonth()+1)+'.'+sr.getFullYear();
            case "Czwartek":
                return czw.getDate()+'.'+(czw.getMonth()+1)+'.'+czw.getFullYear();
            case "Piątek":
                return pt.getDate()+'.'+(pt.getMonth()+1)+'.'+pt.getFullYear();
            case "Sobota":
                return sob.getDate()+'.'+(sob.getMonth()+1)+'.'+sob.getFullYear();                                                 
            default:
              return "Bład";
          }
    }
    
  return (<>
    <div className='row mb-2'>
        <div className='col-3 text-start'>
            <button type="button" onClick={()=>{poprzedniTydz()}} className="btn btn-primary"><FontAwesomeIcon icon={faArrowLeft}/></button>   
        </div>

        <div className='col-6 text-center'>
            <div className='next_day_avg'>
                <button type="button" onClick={ () => wyswietlDzien(1, true)} className="btn btn-primary mfm1px">Pon-Wt</button>
                <button type="button" onClick={ () => wyswietlDzien(2, true)} className="btn btn-primary mfm1px">Śr-Czw</button>
                <button type="button" onClick={ () => wyswietlDzien(3, true)} className="btn btn-primary mfm1px">Pt-Sob</button>
            </div>

            <div className='next_day_min'>
                <button type="button" onClick={ () => wyswietlDzien(1, false)} className="btn btn-primary mfm1px">Pn</button>
                <button type="button" onClick={ () => wyswietlDzien(2, false)} className="btn btn-primary mfm1px">Wt</button>
                <button type="button" onClick={ () => wyswietlDzien(3, false)} className="btn btn-primary mfm1px">Śr</button>
                <button type="button" onClick={ () => wyswietlDzien(4, false)} className="btn btn-primary mfm1px">Cz</button>
                <button type="button" onClick={ () => wyswietlDzien(5, false)} className="btn btn-primary mfm1px">Pt</button>
                <button type="button" onClick={ () => wyswietlDzien(6, false)} className="btn btn-primary mfm1px">Sob</button>
            </div>
        </div>
        
        <div className='col-3 text-end'>
            <button type="button" onClick={()=>{nastepnyTydz()}} className="btn btn-primary"><FontAwesomeIcon icon={faArrowRight}/></button>   
        </div>
    </div>

    <div className="container">
        <div className="table-responsive">
            {plan === null ?
            <div className="d-flex justify-content-center">
                <div className="spinner-border ml-2" role="status">
                <span className="sr-only">Loading...</span>
                </div>
            </div>
            :
            <table className="table table-bordered text-center">
                <thead>
                    <tr className="bg-light-gray" data-reload={reload}>
                        <th className="text-uppercase">Godzina</th>
                        {dni_tygodnia.map((dzien: string, key: number)=>{
                            return(<th key={key} className='text-uppercase'>{dzien} <br/><span style={{fontSize:'10px'}}>{getDateOfDay(dzien)}</span></th>);
                        })}
                    </tr>
                </thead>
                <tbody>
                    {godziny.map((godzina, key)=>{
                        return(
                            <tr key={key}>
                                <td className='align-middle'>{godzina}</td>
                                {dni_tygodnia.map((dzien, dzien_key)=>{
                                    if(Object.keys(plan[0][godzina][dzien]).length > 0){
                                        
                                        if(plan[0][godzina][dzien].hasOwnProperty(getDateOfDay(dzien))){
                                            return(
                                                <td className='komorka_hover' key={dzien_key}>
                                                    <span style={{backgroundColor: `${plan[0][godzina][dzien][getDateOfDay(dzien)].kolor}` }} className={'padding-5px-tb padding-15px-lr border-radius-5 margin-10px-bottom text-white font-size16 xs-font-size13'}>{plan[0][godzina][dzien][getDateOfDay(dzien)].przedmiot}</span>
                                                    <div className="margin-10px-top font-size14">Klasa {plan[0][godzina][dzien][getDateOfDay(dzien)].klasa}</div>
                                                    <div className="font-size13 text-light-gray">Sala {plan[0][godzina][dzien][getDateOfDay(dzien)].sala}</div>
                                                </td>
                                            )
                                        }else{
                                            return(
                                                <td key={dzien_key} className='komorka_hover'></td> //? usunalem klase 'table-active'
                                            )
                                        }
                                    }else{
                                        return(
                                            <td key={dzien_key} className='komorka_hover'></td> //? usunalem klase 'table-active'
                                        )
                                    }
                                })}
                            </tr>
                        )
                    })}                      
                </tbody>
            </table>
            }
        </div>
    </div>
    </>
  )
}

export default Home_plan_zajec
