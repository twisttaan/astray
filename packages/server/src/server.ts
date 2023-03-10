import { packageSong } from '@astray/swrapper-node';
import { WebSocketServer } from 'ws';
import type { ILibrary } from './ILibrary';
export interface ServerDependencies {
	library: ILibrary;
}

/**
 * @returns Function to close the server.
 */
export function createServer({ library }: ServerDependencies) {
	const wss = new WebSocketServer({ port: 9999 });

	wss.on('connection', (ws) => {
		ws.on('message', async (message) => {
			console.log(`Received message => ${message}`);

			const m = message.toString();

			const command = m.split(' ')[0];
			const args = m.split(' ').slice(1);

			if (command === 'getSongs') {
				const songs = library.getSongs();
				ws.send(
					JSON.stringify({
						songs: songs.map((s) => s.serialize()),
					}),
				);
			} else if (command === 'getSong') {
				const song = library.getSong(args[0] ?? '');
				if (!song) {
					ws.send(
						JSON.stringify({
							error: 'Song not found',
						}),
					);
					return;
				}

				const packaged = await packageSong(song);

				ws.send(packaged, { binary: true });
			} else {
				ws.send(
					JSON.stringify({
						error: 'Command not found',
					}),
				);
			}
		});
	});

	return () => {
		wss.close();
	};
}
