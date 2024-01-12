import React from 'react';

const Config = ({config}) => {

  return (
    <div className='container'>
        <div className='row d-flex align-items-center justify-content-center'>
            <div className='col-6 text-start'>
                {/* <h3 className='fw-light text-light mt-1'>
                    {config.projectName}
                </h3> */}
                <input className='w-75' value={config.key}/>
            </div>
            <div className='col-6 text-start'>
                <input className='w-75' value={config.value}/>
            </div>
        </div>
    </div>
  );
};

export default Config;