import { connectGanCube } from 'https://cdn.jsdelivr.net/npm/gan-web-bluetooth@3.0.2/+esm';

let conn = null;

document.getElementById('connectBtn').addEventListener('click', async () => {
  try {
    conn = await connectGanCube(async (device, isFallbackCall) => {
        return isFallbackCall ? prompt('Enter cube MAC (AA:BB:CC:DD:EE:FF) (chrome://bluetooth-internals)') : null;
    });
    console.log('Connected:', conn.deviceName);

    conn.events$.subscribe(event => {
      switch (event.type) {
        case 'MOVE':
          console.log('Move:', event.move, 'cube ts:', event.cubeTimestamp, 'serial:', event.serial);
          break;
        case 'FACELETS':
          console.log('Facelets:', event.facelets);   // 54-char Kociemba string
          break;
        case 'GYRO':
          console.log('Gyro:', event.quaternion);
          break;
        case 'BATTERY':
          console.log('Battery:', event.batteryLevel);
          break;
        case 'HARDWARE':
          console.log('Hardware:', event);
          break;
        case 'DISCONNECT':
          console.log('Cube disconnected');
          break;
      }
    });

    // Ask the cube for its current state and info
    await conn.sendCubeCommand({ type: 'REQUEST_HARDWARE' });
    await conn.sendCubeCommand({ type: 'REQUEST_BATTERY' });
    await conn.sendCubeCommand({ type: 'REQUEST_FACELETS' });
  } catch (error) {
    console.error(error);
  }
});

// Later, to disconnect:
// await conn.disconnect();

