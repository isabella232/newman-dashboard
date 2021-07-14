// mount sockets
import { io } from 'socket.io-client';
import { nanoid } from 'nanoid';

const frontendId = nanoid(16);

const mountSockets = (store) => {
    const socket = io('http://localhost:5001/', {
        auth: {
            id: frontendId,
            type: 'frontend'
        }
    });
    
    socket.on('process:start', (data) => {
        store.newRun(data);
    });

    socket.on('abort', (data) => {
        store.updateRunStatus(data, 'abort');
    });

    socket.on('pause', (data) => {
        store.updateRunStatus(data, 'pause');
    });

    socket.on('resume', (data) => {
        store.updateRunStatus(data, 'resume');
    });

    socket.on('done', (data) => {
        store.setRunFinished(data);
    });

    return socket;
};

module.exports = { mountSockets };





