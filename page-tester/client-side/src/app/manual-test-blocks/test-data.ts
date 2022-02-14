import { IBlockFilterParameter, IBlockStringParameter } from 'src/models/page-block.model';

export const stringTestParam: IBlockStringParameter = {
    Key: "StringKey",
    Type: "String",
    Consume: true,
    Mandatory: false,
    Produce: true
};

export const filterTestParam: IBlockFilterParameter = {
    Key: "FilterKey",
    Type: "Filter",
    Consume: true,
    Mandatory: false,
    Produce: true,
    Resource: 'accounts',
    Fields: ['x'],
};