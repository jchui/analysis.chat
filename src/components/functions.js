import React, { useCallback, useState } from 'react';
import JSZip from 'jszip';

const parseAcceptedFile = (acceptedFile) => {

    let output = { name: null, files: [], chatLog: [] };
    let fileContent = [];
    let chatLog = [];

    var title = acceptedFile[0].name;
    title = title.replace('WhatsApp Chat - ', '');
    title = title.substring(0, title.length - 4)
    
    JSZip.loadAsync(acceptedFile[0])                                   // 1) read the Blob
        .then(function(zip) {

            zip.forEach(function (relativePath, zipEntry) {  // 2) print entries
                fileContent.push(zipEntry);
            });

            chatLog = zip.file('_chat.txt');

        }, function (e) {
            console.log(acceptedFile[0].name + ': ' + e.message);
        });
        

    output.name = title;
    output.files = fileContent;
    output.chatLog = chatLog;

    return output;

};

export {
    parseAcceptedFile
}