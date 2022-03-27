import * as React from 'react';
import { useMemo, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import '../styles/style.scss';

const IndexPage = () => {
  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach(file => {
      const reader = new FileReader();

      reader.onabort = () => console.log('file reading was aborted');
      reader.onerror = () => console.log('file reading has failed');
      reader.onload = () => {
        const binaryStr = reader.result;
        console.log(binaryStr);
      };
      reader.readAsArrayBuffer(file);
    });
  }, []);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({ onDrop });

  const style = useMemo(
    () => ({
      ...['base'],
      ...(isFocused ? ['base focused'] : {}),
      ...(isDragAccept ? ['base accept'] : {}),
      ...(isDragReject ? ['base reject'] : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <main>
      <title>Home Page</title>
      <h1>Hello world</h1>

      <div className="container">
        <div className="column">
          <div className="dndinput">
            <div {...getRootProps()} className={style[0]}>
              <input {...getInputProps()} />
              <p>Drag 'n' drop some files here, or click to select files</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default IndexPage;
