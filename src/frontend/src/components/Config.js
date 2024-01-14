import React from 'react';

const Config = ({config}) => {

  return (
    <div className='container'>
        <div className='row d-flex align-items-center justify-content-center'>
            <div className='col-4 text-end'>
                <h3 className='w-75 fw-light text-light mt-1'>
                    {config.key}
                </h3>
            </div>
            <div className='col-8 text-start'>
                <input className='w-100' value={config.value}/>
            </div>
        </div>
    </div>
  );
};

export default Config;