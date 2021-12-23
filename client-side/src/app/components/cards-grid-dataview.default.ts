import { CardsGridDataView } from "@pepperi-addons/papi-sdk";

export const pageFiltersDataView: CardsGridDataView =

{
	Type: 'CardsGrid',
	Fields: [
		{
			FieldID: 'Resource',
			Type: 'TextBox',
			Title: "Resource",
			Mandatory: false,
			ReadOnly: true,
			Style: {
				Alignment: {
					Horizontal: "Left",
					Vertical: "Center",
				},
			}
		},
		{
			FieldID: 'Fields',
			Type: 'TextBox',
			Title: "Fields",
			Mandatory: false,
			ReadOnly: true,
			Style: {
				Alignment: {
					Horizontal: "Left",
					Vertical: "Center",
				},
			}
		}
	],
	Columns: [
		{
			Width: 0
		},
		{
			Width: 0
		}
	]
}
