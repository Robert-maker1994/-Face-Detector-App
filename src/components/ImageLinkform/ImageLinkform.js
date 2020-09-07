import React from 'react';
import './ImageLinkform.css'

const ImageLinkform = ({onInputChange, onButtonSubmit}) => {
	return (
	  <div> 
		<p className='f3'>
			{'This Magic Brain will faces in your pictures. Give it a picture'}
		</p>
		<div className='center'> 
		 <div className='form center pa4 br3 shadow-5'>
		 <input className=' f4 pa2 w-7 center' type='tex' onChange={onInputChange} /> 
	 	 <button
	 	 className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
	 	 onClick={onButtonSubmit}>
	 	 Detect</button>
	 	</div>
	 </div>
	</div> 
  );
}

export default ImageLinkform;