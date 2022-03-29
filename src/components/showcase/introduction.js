import * as React from 'react';
import { useCallback, useMemo, useState, Link } from 'react';
import { useDropzone } from 'react-dropzone';
import JSZip from 'jszip';

import '../../styles/style.scss';

const Introduction = () => {
  return (
    <>
      <div className="container">
        <div className="introduction">
          <div className="columns">
            <div className="column">
              <h2>Hello!</h2>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Introduction;
