
/*
The return object format MUST contain the field 'success':
{success:true}

If the result of your code is 'false' then return:
{success:false, erroeMessage:{the reason why it is false}}
The error Message is importent! it will be written in the audit log and help the user to understand what happen
*/

import { Client, Request } from '@pepperi-addons/debug-server'
import { NgComponentRelation, Page, Relation } from '@pepperi-addons/papi-sdk';
import PageBuilderTesterService from './my.service';

export async function install(client: Client, request: Request): Promise<any> {
    return await upsertPageBlockRelations(client);
}

export async function uninstall(client: Client, request: Request): Promise<any> {
    return {success:true,resultObject:{}}
}

export async function upgrade(client: Client, request: Request): Promise<any> {
    return await upsertPageBlockRelations(client);
}

export async function downgrade(client: Client, request: Request): Promise<any> {
    return {success:true,resultObject:{}}
}

async function upsertPageBlockRelations(client: Client){
    const service = new PageBuilderTesterService(client);
    const namePrefix : string = "PBBT";
    let pageRelations : NgComponentRelation[] =[
        {
            RelationName: "PageBlock",
            Name: "Ofer Producer",
            Description: "Ofer Producer example",
            Type: "NgComponent",
            SubType: "NG11",
            AddonUUID: client.AddonUUID,
            AddonRelativeURL: "producer",
            ComponentName: "ProducerBlockComponent",
            ModuleName: "ProducerBlockModule",
            EditorComponentName: 'ProducerBlockEditorComponent',
            EditorModuleName: 'ProducerBlockEditorModule'
        },
        {
            RelationName: "PageBlock",
            Name: "Ofer Consumer",
            Description: "Ofer Consumer example",
            Type: "NgComponent",
            SubType: "NG11",
            AddonUUID: client.AddonUUID,
            AddonRelativeURL: "consumer",
            ComponentName: "ConsumerBlockComponent",
            ModuleName: "ConsumerBlockModule",
            EditorComponentName: 'ConsumerBlockEditorComponent',
            EditorModuleName: 'ConsumerBlockEditorModule'
        }
    ] 

    // pageComponentRelation.Key = `${pageComponentRelation.Name}_${pageComponentRelation.AddonUUID}_${pageComponentRelation.RelationName}`;
    for (let pageRelation of pageRelations){
        await service.upsertRelation(pageRelation);
    }
    return {success: true};
}