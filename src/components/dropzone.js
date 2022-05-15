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
    <div {...getRootProps({ className: 'dropzone' })}>
      <input {...getInputProps()} />
      <p>Drag 'n' drop your Whatsapp chatlog zip file here, or click to select the file</p>
    </div>
  );
}

export default Dropzone;
