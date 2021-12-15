import { Client, Request } from '@pepperi-addons/debug-server'
import { BlockFiltersService } from './block-filters.service'

// add functions here
// this function will run on the 'api/foo' endpoint
// the real function is runnning on another typescript file
export async function blockfilters(client: Client, request: Request) {
    const service = new BlockFiltersService(client)
    switch (request.method) {
        case 'POST':
            return service.upsert(request);
        case 'GET':
            return service.get(request);
        default:
            throw new Error(`Method '${request.method}' is not supported`);
    }
};

