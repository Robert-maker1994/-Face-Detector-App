import React from 'react';
import Tilt from 'react-tilt';
import Brain from './Brain.png'
import './Logo.css';


const Logo = () => {
	return (
		<div className='na-4 nt-1 ' > 
			 <Tilt className="Tilt ma0 br-2 shadow-2" options={{ max : 55 }} style={{ height: 150, width: 150 }} >
 			<div className="Tilt-inner pa-3">
 				<img style={{paddingTop: '5px'}} alt='logo' src={Brain}/>
 			</div>
			 </Tilt>
		</div>	
  );
}


export default Logo;