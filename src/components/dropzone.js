import React, { useCallback, useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';

function Dropzone(props) {
    const { onDrop } = props;

  const { acceptedFiles, fileRejections, getRootProps, getInputProps } =
    useDropzone({
        onDrop,
      accept:
        'application/zip, application/octet-stream, application/x-zip-compressed, multipart/x-zip',
        multiple: false,
    });

  return (
    <section className="container">
      <div {...getRootProps({ className: 'dropzone' })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </div>
    </section>
  );
}

export default Dropzone;
