
/*
The return object format MUST contain the field 'success':
{success:true}

If the result of your code is 'false' then return:
{success:false, erroeMessage:{the reason why it is false}}
The error Message is importent! it will be written in the audit log and help the user to understand what happen
*/

import { Client, Request } from '@pepperi-addons/debug-server'
import { NgComponentRelation, Page, Relation } from '@pepperi-addons/papi-sdk';
import pageBuilderTesterService from './my.service';

export async function install(client: Client, request: Request): Promise<any> {
    return await upsertFirstRelation(client);
}

export async function uninstall(client: Client, request: Request): Promise<any> {
    return {success:true,resultObject:{}}
}

export async function upgrade(client: Client, request: Request): Promise<any> {
    return await upsertFirstRelation(client);
}

export async function downgrade(client: Client, request: Request): Promise<any> {
    return {success:true,resultObject:{}}
}

async function upsertFirstRelation(client){
    const blockName = "PageBuilderTester";
    const pageComponentRelation: NgComponentRelation = {
        RelationName: "PageBlock",
        Name: blockName,
        Description: blockName,
        Type: "NgComponent",
        SubType: "NG11",
        AddonUUID: client.AddonUUID,
        AddonRelativeURL: blockName.toLowerCase(),
        ComponentName: 'AddonComponent',
        ModuleName: 'AddonModule',
        EditorComponentName: 'AddonEditorComponent',
        EditorModuleName: 'AddonEditorModule'
    };

    // pageComponentRelation.Key = `${pageComponentRelation.Name}_${pageComponentRelation.AddonUUID}_${pageComponentRelation.RelationName}`;

    const service = new pageBuilderTesterService(client);
    return await service.upsertRelation(pageComponentRelation);
}