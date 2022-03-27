import * as React from 'react';
import { useMemo, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import JSZip from 'jszip';

import '../styles/style.scss';

const IndexPage = () => {
  const onDrop = useCallback(acceptedFiles => {
    acceptedFiles.forEach(file => {
      // Get Chat Log
      JSZip.loadAsync(file)
        .then(function (zip) {
          return zip.file('_chat.txt').async('text');
        })
        .then(function (chatlog) {
          //console.log(chatlog);
        });

      JSZip.loadAsync(file).then(function (zip) {
        console.log(zip.file());
      });
    });
  }, []);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      onDrop,
      accept:
        'application/zip, application/octet-stream, application/x-zip-compressed, multipart/x-zip',
    });

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
