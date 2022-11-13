import React, { useRef, useState } from 'react';

export default function ImageSelector({
  title,
  onFileChange,
}) {
  const inputRef = useRef(null);
  const [fileContent, setFileContent] = useState('');

  function onFileSelected(e) {
    let file = null;

    if (e.target.files.length) {
      file = e.target.files[0];

      const fileReader = new FileReader();

      fileReader.onload = (res) => {
        // get result of file read
        setFileContent(res.target.result);
      };
      fileReader.readAsDataURL(file);
    }

    onFileChange(file);
  }

  return (
    <div className="mb-3">
      <label className="form-label">
        {title}
      </label>
      <input
        ref={inputRef}
        onChange={onFileSelected}
        type="file"
        className="form-control"
        style={{ display: 'none' }}
      />

      {
        fileContent ?
          <div className='text-center mb-3'>
            <img style={{
              width: '200px',
              height: '200px',
              borderRadius: '50%',
              'objectFit': 'cover',
            }}
              src={fileContent} alt='selected file' />
          </div>
          :
          <></>
      }

      <div className='text-center'>
        <button type='button' onClick={() => {
          inputRef.current.click();
        }} className='btn btn-success'>Select Image</button>
      </div>
    </div>
  )
}
