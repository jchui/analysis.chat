import React, { useCallback, useState } from 'react';
import JSZip from 'jszip';

const parseAcceptedFile = (acceptedFile) => {

    let output = { name: null, files: [], chatLog: [] };
    let fileContent = [];

    var title = acceptedFile[0].name;
    title = title.replace('WhatsApp Chat - ', '');
    title = title.substring(0, title.length - 4)
    
    JSZip.loadAsync(acceptedFile[0])                                   // 1) read the Blob
        .then(function(zip) {
            var dateAfter = new Date();

            zip.forEach(function (relativePath, zipEntry) {  // 2) print entries
                fileContent.push(zipEntry);
            });
        }, function (e) {
            console.log(acceptedFile[0].name + ': ' + e.message);
        });

    output.name = title;
    output.files = fileContent;

    return output;

};

export {
    parseAcceptedFile
}