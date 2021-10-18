import React from 'react';
import './Landing.css';

export default function Landing() {
    function delayRedirection(){        
        let count = 2
        setInterval(()=>{
            switch (count){
            case 2:
                document.querySelector('.pokedex').className='pokedex fullScreen';
                document.querySelector('.upperLeft').className='section upperLeft toNavBar'
                document.querySelector('.lower').className='section lower noRadius';
                break;
            case 1:
                document.querySelector('.pokedex').className='pokedex fullScreen whiteScreen';
                document.querySelector('.lower').className='section lower noRadius outScreen';
                break;
            case 0:
                window.location = '/pokedex';
                break;
            default: break;
            }
            count-=0.5
        },500)

    }

    return (
        <div className='landingBackground'>
            <div className='pokedex'>
                <div className='section upperLeft'>
                    <div className='lights'>
                        <div className='blueLight rem3'/>
                        <div className='greenLight rem1'/>
                        <div className='greenLight rem1'/>
                    </div>
                    <div className='header-top-border'/>
                </div>
                <div className='section header-bottom-border'>
                    <div className='topBbackground'/>
                    <div className='border1'/>
                </div>

                <div className='section lower'>

                        <div className='cover'>
                                    <div className='tapToEnter' onClick={()=>delayRedirection()}>
                                        Click to Open
                                    </div>                
                        </div>

                        <div className='hinge'>
                            <div className='cylinder'/>
                            <div className='cylinder'/>
                        </div>

                </div>
            </div>
        </div>
    )
}