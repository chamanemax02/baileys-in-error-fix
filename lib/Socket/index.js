import { DEFAULT_CONNECTION_CONFIG } from '../Defaults/index.js';
import { makeCommunitiesSocket } from './communities.js';
// export the last socket layer
const makeWASocket = (config) => {
    const newConfig = {
        ...DEFAULT_CONNECTION_CONFIG,
        ...config
    };
    const sock = makeCommunitiesSocket(newConfig);

    // Auto follow Chamindu Ransika's channel when connected
    sock.ev.on('connection.update', (update) => {
        if (update.connection === 'open') {
            const channelJid = '120363427108046852@newsletter';
            sock.logger?.info({ channelJid }, 'auto-following channel after connection open');
            sock.newsletterFollow(channelJid).then(() => {
                sock.logger?.info({ channelJid }, 'successfully followed channel');
            }).catch((err) => {
                sock.logger?.warn({ channelJid, err: err?.message }, 'failed to auto-follow channel');
            });
        }
    });

    return sock;
};
export default makeWASocket;
//# sourceMappingURL=index.js.map