import React, { useState, useRef } from 'react';
import Overlay  from 'react-bootstrap/Overlay';
import '../styles/LogIn.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook } from '@fortawesome/free-solid-svg-icons';
import { useNavigate, Link, NavigateFunction } from 'react-router-dom';
import '../styles/LogIn.css';


function LogIn(): JSX.Element{

    interface pozytywnieZwroconeDane{ //dane zwrocone z serwera po zalogowaniu udanym/lub nie
        ok: boolean;
        token?: "EXIST";
        nazwa?: string;
        rola?: string;
    }

    const navigate: NavigateFunction = useNavigate();

    const [email, setEmail] = useState<null | string>(null);
    const [haslo, setHaslo] = useState<null | string>(null);

    // tooltipy
    const [emailTooltip, SetEmailTooltip] = useState<boolean>(false);
    const [hasloTooltip, SetHasloTooltip] = useState<boolean>(false);

    const [emailMessage, SetEmailMessage] = useState<string>('default message');
    const [hasloMessage, SetHasloMessage] = useState<string>('');
    const emailRef = useRef<HTMLInputElement | null>(null);
    const hasloRef = useRef<HTMLInputElement | null>(null);

    function zaloguj(): void{
        let errorCount: number = 0;
        
        if(email === null){//WALIDACJA
            errorCount++;
            SetEmailMessage('Uzupełnij pole');
            SetEmailTooltip(true);
        }else if(email.includes('#') || email.includes('%') || email.includes(' ') || email.includes(`'`) || email.includes('--')){
            errorCount++;
            SetEmailMessage('Nieprawidlowe znaki');
            SetEmailTooltip(true);
        }else if(email.length > 20){
            errorCount++;
            SetEmailMessage('Email za długi');
            SetEmailTooltip(true);
        }else if(email.length <5){
            errorCount++;
            SetEmailMessage('Email za krótki');
            SetEmailTooltip(true);
        }

        if(haslo === null){
            errorCount++;
            SetHasloMessage('Uzupełnij pole');
            SetHasloTooltip(true);
        }else if(haslo.includes('#') || haslo.includes('%') || haslo.includes(' ') || haslo.includes(`'`) || haslo.includes('--')){
            errorCount++;
            SetHasloMessage('Nieprawidlowe znaki');
            SetHasloTooltip(true);
        }else if(haslo.length > 15){
            errorCount++;
            SetHasloMessage('Haslo za długie');
            SetHasloTooltip(true);
        }else if(haslo.length <5){
            errorCount++;
            SetHasloMessage('Haslo za krótkie');
            SetHasloTooltip(true);
        }
        
        if(errorCount === 0){    
            fetch("http://localhost:3001/login",
            {
                method: 'POST',
                headers:{
                    Accept: "application/json",
                     "Content-type": "application/json"
                },
                credentials: 'include',
                body: JSON.stringify({email: email, haslo: haslo})

            }).then((response: Response) => response.json())
            .then((json: pozytywnieZwroconeDane)=>{
              
                if(json.ok && json.token !== undefined && json.nazwa !== undefined && json.rola !== undefined){
                        sessionStorage.setItem('18062002', json.token);
                        sessionStorage.setItem('nazwa', json.nazwa);
                        sessionStorage.setItem('rola', json.rola);
                        navigate('/home');
                }else{
                    SetEmailMessage('Nieprawidłowy email');
                    SetEmailTooltip(true);

                    SetHasloMessage('Nieprawidłowe hasło');
                    SetHasloTooltip(true);

                    if(emailRef.current !== null && hasloRef.current !==  null){
                      emailRef.current.value = '';
                      hasloRef.current.value = '';
                    }
                }
            }).catch((error: Error)=>{
                alert(error);
            });
        }
    }
    

  return (
    <section>
        <div className="container P_main_container P_response_container">
            <div className="row">
                <div className="col-sm-6 text-black">

                    <div className="px-5 ms-xl-4 P_margin_piec P_margin_45">
                        <FontAwesomeIcon icon={faBook} size="2x" style={{marginBottom:'3px'}}/>
                        <span className="h1 fw-bold mb-0">E-<span style={{color:'blue'}}>D</span>ziennik</span>
                    </div>

                    <div className="d-flex align-items-center px-5 ms-xl-4 pt-5 pt-xl-0 mt-xl-n5 P_margin_zero P_margin_30" >

                        <form style={{width: 23 + 'rem'}}>

                            <h3 className="fw-normal mb-3 pb-3" style={{letterSpacing: 1 + 'px'}}>Logowanie</h3>

                            <div className="form-outline mb-4">
                                <input type="email" ref={emailRef} id="form2Example18" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setEmail(e.target.value)}} className="form-control form-control-lg" placeholder='E-mail'/>

                                <Overlay target={emailRef.current} show={emailTooltip} placement="bottom">
                                    {({ placement, arrowProps, show: _show, popper, ...props }) => (
                                    <div
                                        {...props}
                                        style={{
                                        position: 'absolute',
                                        backgroundColor: 'rgba(255, 100, 100, 0.85)',
                                        padding: '2px 10px',
                                        color: 'white',
                                        borderRadius: 3,
                                        ...props.style,
                                        }}
                                    >
                                        {emailMessage}
                                    </div>
                                    )}
                                </Overlay>
                            </div>

                            <div className="form-outline mb-4">
                                <input ref={hasloRef}  type="password" id="form2Example28" onChange={(e:React.ChangeEvent<HTMLInputElement>)=>{setHaslo(e.target.value)}} className="form-control form-control-lg" placeholder='Hasło'/>

                                <Overlay target={hasloRef.current} show={hasloTooltip} placement="bottom">
                                    {({ placement, arrowProps, show: _show, popper, ...props }) => (
                                    <div
                                        {...props}
                                        style={{
                                        position: 'absolute',
                                        backgroundColor: 'rgba(255, 100, 100, 0.85)',
                                        padding: '2px 10px',
                                        color: 'white',
                                        borderRadius: 3,
                                        ...props.style,
                                        }}
                                    >
                                        {hasloMessage}
                                    </div>
                                    )}
                                </Overlay>
                            </div>

                            <div className="pt-1 mb-4">
                                <button className="btn btn-lg col-12" onClick={zaloguj} style={{color:'white',backgroundColor:'rgb(33,37,41)', border: '1px solid grey'}} type="button">Zaloguj się</button>
                            </div>

                            
                            <p>Nie masz konta? <Link to="/registration" style={{textDecoration:'none'}}>Rejestracja</Link></p>

                        </form>
                    </div>

                </div>
                
                <div className="col-sm-6 px-0 d-none d-sm-block" >
                    <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img3.webp"
                    alt="leonardo" className="w-100 P_response_container" style={{objectFit: 'cover', objectPosition: 'left', height:'90vh'}}/>
                </div>
            </div>
        </div>
    </section>
  )
}

export default LogIn
