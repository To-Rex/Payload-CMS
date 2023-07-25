import { buildConfig } from 'payload/config';
import path from 'path';
import Examples from './collections/Examples';
import Users from './collections/Users';
import Media from './collections/Media';

const serverURL = process.env.PAYLOAD_PUBLIC_SERVER_URL;

export default buildConfig({
  serverURL: (serverURL == 'https://') ? 'http://127.0.0.1:3000' : serverURL,
  admin: {
    user: Users.slug
  },
  collections: [Users, Media, Examples],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts')
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql')
  }
})